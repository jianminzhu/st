var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var changeWeekStEt = function (et, days) {
    var et_day = et || "";
    var ymd = "YYYYMMDD";
    if (_.trim(et_day) == "") {
        et_day = moment().add('days', -1).format(ymd);
    }
    try {
        var st_day = moment(et_day, ymd).add('days', -1 * Number(days)).format(ymd);
        $("#st").html(st_day);
    }
    catch (e) {
        console.log("error in init st ,use default et ");
        $("#st").html(et_day);
    }
    $("#et").html(et_day);
    return { et: et_day, st: st_day };
};
(function ($, num_ctr, num_average_click_position, SEARCHTOOLS_API_SERVER, UrlUtil, QueryTable, kkpager, moment, window) {
    $(function () {
        function getParams() {
            var ymd = "YYYYMMDD";
            return UrlUtil.getParams(function (p) {
                var p = $.extend({ pno: 1, psize: 10 }, p, {
                    et: $("#et").html()
                });
                var passDays = 0;
                try {
                    passDays = Number($("#passDays span").attr("data-val"));
                }
                catch (e) {
                }
                p.passDays = passDays;
                if (passDays != NaN && passDays != Infinity) {
                    p.st = moment(p.et, ymd).add("days", -1 * passDays).format(ymd);
                }
                var sourceTypeSel = $("#source_type_sel span").attr("data-val");
                p.source_type = sourceTypeSel;
                if (sourceTypeSel == "other") {
                    p.source_type = $("#source_type").val();
                }
                var ymdarr = p.ymdarr = [];
                var ymdShowarr = p.ymdShowarr = [];
                _.range(-1 * p.passDays, 1).map(function (it) {
                    var endDate = moment(p.et, "YYYYMMDD");
                    var theDay = endDate.add("day", it);
                    ymdarr.push(theDay.format("YYYYMMDD"));
                    ymdShowarr.push(theDay.format("YYYY-MM-DD"));
                });
                return p;
            });
        }
        var p = UrlUtil.parseURL(window.location.href).params;
        p.query = decodeURIComponent(p.query || "");
        var DEFAULT_RTYPE = "week";
        function init(params) {
            UrlUtil.initParams(function (p) {
                var etHtml = p.et || moment().add("days", -1).format("YYYYMMDD");
                $("#et").val(etHtml);
                $("#st").val(p.st || "");
                changeWeekStEt(etHtml, $("#passDays span").attr("data-val"));
            }, params);
        }
        init(p);
        var passDays = {
            rit: {},
            item: { val: "6", cn: "过去一周" },
            items: [
                { val: "30", cn: "过去一月" },
                { val: "6", cn: "过去一周" }
            ], qcb: function (now) {
                changeWeekStEt($("#et").html(), now);
            }
        };
        ReactDOM.render(React.createElement(RSelect, __assign({}, passDays)), document.getElementById("passDays"));
        var source_types = {
            rit: {},
            item: { val: "all", cn: "全部" },
            items: [
                { val: "web", cn: "互联网" },
                { val: "it", cn: "IT" },
                { val: "input", cn: "输入法" },
                { val: "system", cn: "搜狗后台系统" },
                { val: "all", cn: "全部" },
                { val: "other", cn: "其它" }
            ], qcb: function (now) {
            }
        };
        ReactDOM.render(React.createElement(RSelect, __assign({}, source_types)), document.getElementById("source_type_sel"));
        var params2 = getParams();
        //根据日期动态生成表格配置
        var getTableConfForGather = function (params) {
            var p = params || getParams();
            var config = {
                tcss: "opr-table",
                modCss: { index: 2, css: "bgfc" },
                cols: [
                    /*query	来源	PV	主动搜索PV	点击量	CTR	平均点击位置	其他*/
                    {
                        css: "num", name: "query", cname: "query", width: 50, toHtml: function (query) {
                            var queryUrl = searchtool_getKeywordUrl(query, getParams().pc_wap);
                            return "<a target=\"_blank\" href=\"" + queryUrl + "\">" + sgDecodeURIComponent(query) + "</a>";
                        }
                    },
                    {
                        css: "num", name: "query", cname: "来源", width: 50, toHtml: function (query) {
                            var p = getParams();
                            function getUrl(query) {
                                var pc_wap = p.pc_wap || "wap";
                                return "hots_gather_refer_" + pc_wap + ".html?query=" + encodeURIComponent(query) + "&st=" + p.st + "&et=" + p.et + "&source_type=" + p.source_type + getCzUrlParams();
                            }
                            var url = getUrl(query);
                            return "<a target=\"_blank\" href=\"" + url + "\">refen\u8BE6\u60C5</a>";
                        }
                    },
                    { css: "num", name: "pv", cname: "PV", width: 50 },
                    { css: "num", name: "activepv", cname: "主动搜索PV", width: 50 },
                    { css: "num", name: "click", cname: "点击量", width: 50 },
                    { css: "num", name: "ctr", cname: "CTR", width: 50 },
                    { css: "num", name: "pos", cname: "平均点击位置", width: 50, toHtml: num_average_click_position },
                    {
                        css: "", name: "other", cname: "其他", width: 100, toHtml: function (val, row) {
                            var p = getParams();
                            var pc_wap = p.pc_wap || "wap";
                            var navId = p.navId;
                            function getUrl(query) {
                                return "history_pv_iframe_" + pc_wap + ".html?nnavId=" + navId + "&_toP=pvquery=" + query + "&t=PV" + getCzUrlParams();
                            }
                            var query = encodeURIComponent(row["query"]);
                            return "<div class=\"q-sbtn\"><a target=\"_blank\" href=\"" + getUrl(query) + "\" class=\"edit\">\u5386\u53F2PV</a><a target=\"_blank\" href=\"query_click_iframe_" + pc_wap + ".html?nnavId=" + navId + "&_toP=qclick&st=" + p.st + "&et=" + p.et + "&query=" + query + "\" class=\"edit\">SA</a></div>";
                        }
                    }
                ]
            };
            return config;
        };
        window.hots_gather_QT = new QueryTable('hotsLst', getTableConfForGather(params2), params2, function (res) {
            var v = this;
            var totalPage = (Math.floor(res.total / res.psize) + (res.total % res.psize == 0 ? 0 : 1));
            if (totalPage > 1) {
                new kkpager("kkpager", res.psize).generPageHtml({
                    pno: res.pno,
                    //总页码
                    total: totalPage,
                    //总数据条数
                    totalRecords: res.total,
                    mode: 'click',
                    click: function (n) {
                        pageSubmit($.extend(getParams(), { pno: n }));
                    }
                });
                $("#kkpager").show();
            }
            else {
                $("#kkpager").hide();
            }
            var p = getParams();
            var rows = [];
            try {
                rows = res["result"][p.st + "-" + p.et];
            }
            catch (e) {
            }
            return rows;
        }, function (params) {
            var pc_wap = params.pc_wap || "wap";
            var apiName = pc_wap + "_hots_gather";
            var apiUrl = SEARCHTOOLS_API_SERVER(apiName, params);
            return apiUrl;
        });
        var pageSubmit = function () {
            try {
                var p = getParams();
                if (p.st && p.et && p.passDays && p.source_type) {
                    $("#dt_source_type").html(p.passDays == 6 ? "一周" : "一月");
                    $("#dt_st_et").html(p.st + "~" + p.et);
                    window.hots_gather_QT.setTableConf(getTableConfForGather(p));
                    window.hots_gather_QT.changeParams(p);
                }
            }
            catch (e) {
                console.log("error in query", e);
            }
        };
        $("#a_export").click(function () {
            var p = getParams();
            var pc_wap = p.pc_wap || "wap";
            if (p.st && p.et && p.source_type) {
                var apiName = pc_wap + "_hots_gather_export";
                var apiUrl = SEARCHTOOLS_API_SERVER(apiName, p);
                window.open(apiUrl);
            }
        });
        $("body").on("click", "#a_query", pageSubmit);
        $("#a_query").click();
        searchtools_enter_event(pageSubmit);
    });
})(jQuery, num_ctr, num_average_click_position, SEARCHTOOLS_API_SERVER, UrlUtil, QueryTable, kkpager, moment, window);
//# sourceMappingURL=hots_gather.js.map