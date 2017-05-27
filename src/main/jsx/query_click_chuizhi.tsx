function showMontior() {
    SEARCHTOOL_MONTIOR_TASK("query_click")
}

(function ($, window, UrlUtil, moment, QueryTable, num_ctr, num_average_click_position, SEARCHTOOLS_API_SERVER, kkpager, BrowserUtil, limitUrl, _) {
    $(function () {
        var yestoday = moment().add(-1, "day").format("YYYYMMDD");
        UrlUtil.initParams(function (p) {
            $("#st").html(p.st || yestoday)
            $("#et").html(p.et || yestoday)
            if (p.needInit == "t") {
                $("#i_query").val((sgDecodeURIComponent(p.query || "") || $("#i_query").val()))
            }
        });
        function getParams() {
            var p = UrlUtil.getParams(function (p) {
                return $.extend({pno: 1, psize: 50}, p, {
                    st: $("#st").html()
                    , et: $("#et").html()
                    , query: $("#i_query").val()
                    , pageType: $("[name=pageType]").val()
                })
            });
            if (p.psize > 50) {
                p.psize = 50;
            }
            return p
        }

        var params = getParams()
        var ed_query_click_total = 'ed_query_click_total';
        var queryClickTotal = window.queryClickTotal = new QueryTable(ed_query_click_total, {
            tcss: "opr-table",
            cols: [
                {
                    css: "num", name: "_query", cname: "查询词", width: 100, toHtml: function (val, row, col, data) {
                    var p = getParams();
                    var query = p.query
                    var pc_wap = p.pc_wap;
                    var queryUrl = searchtool_getKeywordUrl(query, pc_wap)
                    return `<a target="_blank" href="${queryUrl}">${sgDecodeURIComponent(query)}</a>`;
                }
                },
                {css: "num", name: "pv", cname: "PV", width: 80},
                {css: "num", name: "click", cname: "点击量", width: 80},
                {css: "num", name: "ctr", cname: "CTR", width: 80, toHtml: num_ctr},
                {css: "num", name: "pos", cname: "平均点击位置", width: 80, toHtml: num_average_click_position}
                , {
                    css: "num", name: "___", cname: "其他", width: 100, toHtml: function (val, row, col, data) {
                        var p = getParams()
                        var pc_wap = p.pc_wap || "wap";
                        var navId = p.navId

                        function getUrl(type) {
                            return `history_${type.toLowerCase()}_iframe_${pc_wap}.html?navId=${navId}&_toP=${type.toLowerCase()}&query=${p.query}&t=${type}` + getCzUrlParams()
                        }

                        return ` <a target="_blank" href="${getUrl('PV')}" >历史pv</a>&nbsp;&nbsp;&nbsp;&nbsp;<a target="_blank" href="${getUrl('CTR')}">历史ctr</a>`
                    }
                }
            ],
            modCss: {index: 2, css: "bgfc"}
        }, params, function (res) {
            var tableRows = [];
            tableRows.push(res);
            return tableRows;
        }, function (params) {
            var pc_wap = params.pc_wap || "wap";
            var apiUrl = SEARCHTOOLS_API_SERVER(pc_wap + "_query_total", params)
            return apiUrl;
        }, null, null)

        wapQueryDetail = new QueryTable('ed_query_click_detail', {
            tcss: "opr-table",
            cols: [{css: "qkey",name: "url",cname: "url",style:{"text-align":"left"},width: 400,toHtml:function(val){return `<a target="_blank" href="javascript:void(0)" data-wxhref="${val}">${limitUrl(val,70)}</a>`}},
                {css: "num",name: "pv",cname: "PV",width: 80},
                {css: "num", name: "click", cname: "点击量", width: 80},
                {css: "num", name: "pos", cname: "平均点击位置", width: 80,toHtml:num_average_click_position},
                {css: "num",name: "ctr",cname: "CTR",width: 80,toHtml:num_ctr},
            ],
            modCss: {index: 2, css: "bgfc"}
        }, params, function (res) {
            var v = this;
            var totalPage = (Math.floor(res.total / res.psize) + ( res.total % res.psize == 0 ? 0 : 1));
            if (totalPage > 1) {
                new kkpager("kkpager",res.psize).generPageHtml({
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
                        return false;
                    }
                });
                $("#kkpager").show();
            } else {
                $("#kkpager").hide();
            }
            return res.details || [];
        }, function (params) {
            return SEARCHTOOLS_API_SERVER((params.pc_wap||"wap")+"_query_detail",params);
        })
        if (params.query && params.st && params.et) {
            wapQueryDetail.render();
        }



        var bu = new BrowserUtil();
        /**所有事件*/
        $("#a_export").click(function () {
            var p = getParams()
            if (p.query && p.st && p.et) {
                console.log("start export:p.pc_wap,p.query,p.st,p.et ", p.pc_wap, p.query, p.st, p.et)
                var apiName = p.pc_wap + "_query_export";
                var url = SEARCHTOOLS_API_SERVER(apiName, p);
                if (_.trim(url || "") == "") {
                    console.log(apiName, "没有配置url")
                } else {
                    window.open(url)
                }
            } else {
                console.log("p.query&&p.st&&p.et must ", p.query, p.st, p.et)
            }
        })
        var pageSubmit = function () {
            var p = getParams()
            try {
                showMontior();
            } catch (e) {
                console.log("error in showMonitor")
            }
            if (_.trim(p.query) != "") {
                searchtools_isPassStEtDateCheck(p, function () {
                    try {
                        $("#itemContent").show();
                        if (p.query && p.st && p.et) {
                            queryClickTotal.changeParams($.extend(queryClickTotal.params, p))
                            wapQueryDetail.changeParams($.extend(wapQueryDetail.params, p))
                        } else {
                            console.log("params.query && params.st && params.et ", p.query, p.st, p.et)
                        }
                    } catch (e) {
                    }
                })
            }
        };
        window.searchtool_requery = pageSubmit
        $(".date-left,.date-right").on("click", showMontior);
        searchtools_enter_event(pageSubmit)
        $("#a_submit").click(pageSubmit).click()
    })
})(jQuery, window, UrlUtil, moment, QueryTable, num_ctr, num_average_click_position, SEARCHTOOLS_API_SERVER, kkpager, BrowserUtil, limitUrl, _)