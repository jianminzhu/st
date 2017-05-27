var changeWeekStEt = function (et: string|any, rType: any|string) {
    if (rType == "week") {
        var et_day = et || "";
        var ymd = "YYYYMMDD";
        if (_.trim(et_day) == "") {
            et_day = moment().add('days', -1).format(ymd);
        }
        var st_day = moment(et_day, ymd) .add('days', -6).format(ymd);
        $("#st").html(st_day)
        $("#et").html(et_day)
    }
    showMontior();
    return {et: et_day, st: st_day};
};
function query_weekTotaySeEt() {
    changeWeekStEt($dp.cal.getDateStr(), $("[name=r_type]:checked").val())
}

function showMontior(now) {
    var p = UrlUtil.getParams(function (p) {
        var p = $.extend(p, {
            st: $("#st").html()
            , et: $("#et").html()
            , qType: $("#jingque_mohu_select span").attr("data-val")
            , rtype: $("[name=r_type]:checked").val() || DEFAULT_RTYPE
        })
        if (now != null) {
            p.qType = now;
        }
        if (p.rtype == "today") {
            p.st = p.et = moment().format("YYYYMMDD");
        }
        return p;
    });

    if (p.qType == 0) {
        SEARCHTOOL_MONTIOR_TASK("query",p)
    } else
        $(".monitor").html("")
}


(function ($, num_ctr, num_average_click_position, SEARCHTOOLS_API_SERVER, UrlUtil, QueryTable, kkpager, moment, window) {

    $(function () {
        var locationUrlParams = function () {
            return UrlUtil.parseURL(window.location.href).params;
        };
        var params = locationUrlParams(UrlUtil, window);
        params.query = decodeURIComponent(params.query || "")
        var DEFAULT_RTYPE = "week";
        if (!SEARCHTOOLS_ISCHUIZHI()) {
            $("input[value=today]").parent().show();
        }
        function init(params) {
            UrlUtil.initParams(function (p) {
                var rtype = p.rtype || DEFAULT_RTYPE;
                changeWeekStEt(p.et, rtype);
                if ((p.isQuery || "") == "t") {
                    $("#i_query").val(p.query || "");
                }
                $("#num").val(p.num || "");
                $("[name=r_type][value=" + (rtype) + "]").attr("checked", "checked");
            }, params);
        }

        init(params);
        function getParams() {
            return UrlUtil.getParams(function (p) {
                var p = $.extend({pno: 1, psize: 30}, p, {
                    st: $("#st").html()
                    , et: $("#et").html()
                    , query: $("#i_query").val()
                    , qType: $("#jingque_mohu_select span").attr("data-val")
                    , rtype: $("[name=r_type]:checked").val() || DEFAULT_RTYPE
                    , pageType: $("[name=pageType]").val() == "" ? "all" : $("[name=pageType]").val()
                })
                if (p.pc_wap == "wap") {
                    p.type = "wap"
                } else {
                    p.type = "web"
                }
                if (p.rtype == "today") {
                    p.st = p.et = moment().format("YYYYMMDD");
                }
                return p;
            });
        }

        $('input[name="r_type"]').click(function () {
            changeWeekStEt($("#et").html(), $(this).val());
            // showMontior();
        })
        var jingque_mohu_select = {
            rit: {}
            , item: {val: "1", cn: "模糊查询"}
            , items: [
                {val: "1", cn: "模糊查询"}
                , {val: "0", cn: "精确查询"}
            ], qcb: function (now) {
                showMontior(now);
            }
        }
        ReactDOM.render(<RSelect {...jingque_mohu_select}/>, document.getElementById("jingque_mohu_select"))

        //根据日期动态生成表格配置
        var getTableConf = function () {
            var p = getParams();
            var config = {
                tcss: "opr-table",
                modCss: {index: 2, css: "bgfc"}
            }
            if (p.rtype == "week") {
                // config.isCache=true;
            }
            var cols = config.cols = [];
            cols.push({
                css: "qkey",
                name: "query",
                cname: "query",
                style: {"text-align": "left"},
                width: 300,
                toHtml: function (val, row, col, data) {
                    var query = (row["title"]);
                    var queryUrl = searchtool_getKeywordUrl(query, p.pc_wap);
                    if (row.istotal) {
                        return query;
                    } else {
                        return `<a target="_blank" href="${queryUrl}">${sgDecodeURIComponent(query)}</a>`
                    }
                }
            });
            if (p.rtype == "week") {
                _.range(-6, 1).reverse().map(function (it) {
                    var theDay = moment(p.et, "YYYYMMDD").add("day", it);
                    var ymd = theDay.format("YYYYMMDD");
                    var showYmd = theDay.format("YYYY.MM.DD");
                    cols.push({
                        css: "num",
                        name: "___",
                        cname: showYmd,
                        width: 80,
                        toHtml: function (val, row, col, data) {
                            var html = "";
                            try {
                                var activePv = "";
                                var data = row[p.type][ymd]
                                if (p.pc_wap == "wap" && !row.istotal) {//PC不显示主动搜索pv
                                    activePv = "<br/>" + "(" + data["nocl"] + ")";
                                }
                                html = data["pv"] + activePv;
                            } catch (e) {
                                return "";
                            }
                            return html;
                        }
                    })
                })
                cols.push({
                    css: "num",
                    name: "count",
                    cname: "total",
                    width: 80
                })
            } else {
                _.range(0, 24).reverse().map(function (it) {
                    var hour = showHour = (it < 10 ? "0" + it : it);
                    cols.push({
                        css: "num",
                        name: `___`,
                        cname: showHour,
                        width: 80,
                        toHtml: function (val, row, col, data) {
                            var html = "";
                            try {
                                var activePv = "";
                                var data = row[p.type][hour]
                                // if(p.rtype!="week"&&row[p.type]["realtime"]){
                                //     data = row[p.type]["realtime"][hour]
                                // }
                                if (p.pc_wap == "wap" && !row.istotal) {//PC不显示主动搜索pv
                                    activePv = "<br/>" + "(" + data["nocl"] + ")";
                                }
                                html = data["pv"] + activePv;
                            } catch (e) {
                                return "";
                            }
                            return html;
                        }
                    })
                })
            }
            cols.push({
                css: "",
                name: "other",
                cname: "其他",
                width: 100,
                toHtml: function (val, row) {
                    var p = getParams();
                    var pc_wap = p.pc_wap || "wap";
                    var navId = p.navId;

                    function getUrl(query) {
                        return `history_pv_iframe_${pc_wap}.html?nnavId=${navId}&pageType=${p.pageType}&_toP=pv&query=${query}&t=PV` + getCzUrlParams()
                    }

                    var br = (p.rtype == "week") ? "" : "<br/><br/>";
                    if (p.rtype != "week") {
                        p.st = p.et = moment(p.et, "YYYYMMDD").add("day", -1).format("YYYYMMDD");
                    }
                    var query = encodeURIComponent(row["title"]);
                    if (row.istotal) {
                        return "";
                    }
                    return `<div class="q-sbtn"><a target="_blank" href="${getUrl(query)}" class="edit">历史PV</a>${br}<a target="_blank" href="query_click_iframe_${pc_wap}.html?nnavId=${navId}&_toP=qclick&st=${p.st}&et=${p.et}&query=${query}${getCzUrlParams()}" class="edit">SA</a></div>`
                }
            });
            return config;
        }
        window.queryDetail = new QueryTable('queryDetail', getTableConf(), params, function (res) {
            var v = this;
            var totalPage = (Math.floor(res.total / res.psize) + ( res.total % res.psize == 0 ? 0 : 1));
            new kkpager("kkpager", res.psize).generPageHtml({
                pno: res.pno,
                //总页码
                total: totalPage,
                //总数据条数
                totalRecords: res.total,
                mode: 'click',//默认值是link，可选link或者click
                click: function (n) {
                    this.selectPage(n);
                    var params = $.extend({}, v.params, {pno: n})
                    v.changeParams(params)
                    window.queryDetail.nowData["_rit_RTable"].changeContents(getTableConf(), res.doc)
                    return false;
                }
            });
            if (totalPage > 1) {
                $("#kkpager").show();
            } else {
                $("#kkpager").hide();
            }
            var rows = res.doc || []
            const p = getParams();
            if (res.pno == 1 && p.rtype == "week") {//特殊处理逻辑 按周查询时 在第一页显示时增加【总体行】
                //实现原理就是增加一行叫
                var totalRow = {}
                totalRow.title = "总体"
                totalRow.istotal = true
                var totalPerDay = totalRow[p.type] = {}
                for (var key in res.count) {
                    totalPerDay[key] = {pv: res.count[key]}
                }
                rows.splice(0, 0, totalRow);
            }
            return rows;
        }, function (params) {
            var pc_wap = params.pc_wap || "wap"
            var apiName = pc_wap + "_query";
            if (params.rtype != "week") {
                apiName = pc_wap + "_query_realtime";
            }
            var apiUrl = SEARCHTOOLS_API_SERVER(apiName, params);
            return apiUrl;
        })
        var pageSubmit = function () {
            try {
                var p = getParams()
                showMontior();
                if (p.query && p.st && p.et) {
                    if (p.qType == 0) {
                        window.location.href = `history_pv.html?navId=p.navId&_toP=pv&et=${p.et}&query=${p.query}&pc_wap=${p.pc_wap}&t=pv` + getCzUrlParams()
                    } else {
                        window.queryDetail.setTableConf(getTableConf());
                        window.queryDetail.changeParams(p);
                    }
                }
            } catch (e) {
                console.log("error in query", e)
            }
        };
        $("#a_export").click(function () {
            var p = getParams()
            if (p.query && p.st && p.et) {
                var pc_wap = p.pc_wap || "wap"
                var apiName = pc_wap + "_query_mehu_export";
                if (p.rtype != "week") {
                    apiName = pc_wap + "_query_mehu_export_realtime";
                }
                var apiUrl = SEARCHTOOLS_API_SERVER(apiName, p);
                if (apiUrl) {
                    window.open(apiUrl)
                }
            }
        })
        $("#a_query").click(pageSubmit).click()

        searchtools_enter_event(pageSubmit)
        window.searchtool_requery = pageSubmit;


    })
})(jQuery, num_ctr, num_average_click_position, SEARCHTOOLS_API_SERVER, UrlUtil, QueryTable, kkpager, moment, window)