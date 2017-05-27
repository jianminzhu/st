var renderPage = function (kpageId, res, queryTable) {
    var totalPage = (Math.floor(res.total / res.psize) + (res.total % res.psize == 0 ? 0 : 1));
    new kkpager(kpageId, res.psize).generPageHtml({
        pno: res.pno,
        //总页码
        total: totalPage,
        //总数据条数
        totalRecords: res.total,
        mode: 'click',
        click: function (n) {
            this.selectPage(n);
            try {
                var params = $.extend({}, queryTable.params, { pno: n });
                queryTable.changeParams(params);
                SEARCHTOOLS_WXURLUTIL.dealAllEncUrl();
            }
            catch (e) {
            }
            return false;
        }
    });
    if (totalPage > 1) {
        $("#" + kpageId).find(".kkpager").show();
    }
    else {
        $("#" + kpageId).find(".kkpager").hide();
    }
};
function showMontior() {
    SEARCHTOOL_MONTIOR_TASK("baidu_click_parse");
}
(function ($, window, UrlUtil, moment, QueryTable, num_ctr, num_average_click_position, SEARCHTOOLS_API_SERVER, kkpager, BrowserUtil) {
    $(function () {
        var yestoday = moment().add(-1, "day").format("YYYYMMDD");
        UrlUtil.initParams(function (p) {
            $("#st").html(p.st || yestoday);
            $("#et").html(p.et || yestoday);
            if (p.needInit == "t") {
                $("#i_query").val((sgDecodeURIComponent(p.query || "") || $("#i_query").val()));
            }
        });
        function getParams() {
            var p = UrlUtil.getParams(function (p) {
                return $.extend({ pno: 1, psize: 50 }, p, {
                    st: $("#st").html(),
                    et: $("#et").html(),
                    query: $("#i_query").val()
                });
            });
            if (p.psize > 50) {
                p.psize = 50;
            }
            return p;
        }
        var params = getParams();
        var queryClickTotal = window.queryClickTotal = new QueryTable('ed_query_click_total', {
            tcss: "opr-table",
            cols: [
                { css: "num", name: "host", cname: "host", width: 80 },
                {
                    css: "num", name: "query", cname: "查询词", width: 80, toHtml: function (val, row, col, data) {
                        var p = getParams();
                        var query = p.query;
                        var pc_wap = p.pc_wap;
                        var queryUrl = "";
                        if (row["host"] == "baidu") {
                            queryUrl = "https://www.baidu.com/s?&wd=" + encodeURIComponent(query);
                        }
                        else {
                            queryUrl = searchtool_getKeywordUrl(query, pc_wap);
                        }
                        return "<a target=\"_blank\" href=\"" + queryUrl + "\">" + sgDecodeURIComponent(query) + "</a>";
                    }
                },
                { css: "num", name: "pv", cname: "PV", width: 80 },
                { css: "num", name: "click", cname: "点击量", width: 80 },
                { css: "num", name: "ctr", cname: "CTR", width: 80, toHtml: num_ctr },
                ,
                {
                    css: "num",
                    name: "___",
                    cname: "其他",
                    width: 200,
                    toHtml: function (val, row, col, data, colIndex, rowIndex) {
                        var p = getParams();
                        var pc_wap = p.pc_wap || "wap";
                        var navId = p.navId;
                        var host = row["host"] || "";
                        function getUrl(type) {
                            var tlowerCase = (type || "").toLowerCase();
                            return "history_" + tlowerCase + "_iframe_sogoubaidu_" + pc_wap + ".html?sogoubaidu=" + host + "&nnavId=" + navId + "&_toP=" + tlowerCase + "&query=" + p.query + "&t=" + type + getCzUrlParams();
                        }
                        return " <a target=\"_blank\" href=\"" + getUrl('PV') + "\" >\u5386\u53F2pv</a>&nbsp;&nbsp;&nbsp;&nbsp;<a target=\"_blank\" href=\"" + getUrl('CTR') + "\">\u5386\u53F2ctr</a>&nbsp;&nbsp;&nbsp;&nbsp;";
                    },
                    colRowSpan: function (val, row, col, data, colIndex, rowIndex) {
                        return { rowspan: (rowIndex == 0 ? 2 : -1), colspan: 1 };
                    }
                }
            ],
            modCss: { index: 2, css: "bgfc" }
        }, params, function (res) {
            return res.result;
        }, function (params) {
            var pc_wap = params.pc_wap || "wap";
            var apiUrl = SEARCHTOOLS_API_SERVER(pc_wap + "_query_total_baidu", params);
            return apiUrl;
        }, null, null);
        queryDetailTableSogou = new QueryTable('queryclick_detail_sogou', {
            tcss: "opr-table",
            cols: [{
                    css: "qkey",
                    name: "url",
                    cname: "url",
                    style: { "text-align": "left" },
                    width: 600,
                    toHtml: function (val) {
                        return "<a target=\"_blank\" href=\"javascript:void(0)\" title=\"" + sgDecodeURIComponent(val) + "\" data-wxhref=\"" + val + "\">" + limitUrl(sgDecodeURIComponent(val), 100) + "</a>";
                    }
                },
                { css: "num", name: "click", cname: "点击量", width: 200 },
            ],
            modCss: { index: 2, css: "bgfc" }
        }, params, function (res) {
            var v = this;
            renderPage("kkpager_sogou", res, v);
            return res.result || [];
        }, function (params) {
            var apiName = (params.pc_wap || "wap") + "_query_detail_sogoubaidu";
            params.host = "sogou";
            return SEARCHTOOLS_API_SERVER(apiName, params);
        }, null, null);
        queryDetailTableBaidu = new QueryTable('queryclick_detail_baidu', {
            tcss: "opr-table",
            cols: [{
                    css: "qkey",
                    name: "url",
                    cname: "url",
                    style: { "text-align": "left" },
                    width: 600,
                    toHtml: function (val) {
                        return "<a target=\"_blank\" href=\"javascript:void(0)\" title=\"" + val + "\" data-wxhref=\"" + val + "\">" + limitUrl(val, 100) + "</a>";
                    }
                },
                { css: "num", name: "click", cname: "点击量", width: 200 },
            ],
            modCss: { index: 2, css: "bgfc" }
        }, params, function (res) {
            renderPage("kkpager_baidu", res, this);
            return res.result || [];
        }, function (params) {
            var apiName = (params.pc_wap || "wap") + "_query_detail_sogoubaidu";
            params.host = "baidu";
            return SEARCHTOOLS_API_SERVER(apiName, params);
        }, null, null);
        var bu = new BrowserUtil();
        /**所有事件*/
        $("#a_export").click(function () {
            var p = getParams();
            if (p.query && p.st && p.et) {
                var apiName = p.pc_wap + "_query_export_sogoubaidu";
                var url = SEARCHTOOLS_API_SERVER(apiName, p);
                if (_.trim(url || "") == "") {
                    console.log(apiName, "没有配置url");
                }
                else {
                    window.open(url);
                }
            }
        });
        var pageSubmit = function () {
            var p = getParams();
            showMontior();
            searchtools_isPassStEtDateCheck(p, function () {
                try {
                    if (p.query && p.st && p.et) {
                        queryClickTotal.changeParams($.extend(queryClickTotal.params, p));
                        queryDetailTableSogou.changeParams($.extend(queryDetailTableSogou.params, p));
                        queryDetailTableBaidu.changeParams($.extend(queryDetailTableBaidu.params, p));
                        setTimeout(function () {
                            $("[data-host=baidu]").click();
                        }, 1000);
                    }
                    else {
                        console.log("params.query && params.st && params.et ", p.query, p.st, p.et);
                    }
                }
                catch (e) {
                }
            });
        };
        searchtools_enter_event(pageSubmit);
        searchtool_tabevent("#sogoubaidu_tab", "a", "cur", function (jit) {
            $("#queryclick_detail_sogou,#queryclick_detail_baidu,#kkpager_baidu,#kkpager_sogou").hide();
            var host = jit.attr("data-host");
            $("#queryclick_detail_" + host + ",#kkpager_" + host).show();
        });
        $("#a_submit").click(pageSubmit).click();
        $(".date-left,.date-right").on("click", showMontior);
    });
})(jQuery, window, UrlUtil, moment, QueryTable, num_ctr, num_average_click_position, SEARCHTOOLS_API_SERVER, kkpager, BrowserUtil);
//# sourceMappingURL=baidu_click_parse.js.map