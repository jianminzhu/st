function showMontior() {
    SEARCHTOOL_MONTIOR_TASK("query_click");
}
(function ($, window, UrlUtil, moment, QueryTable, num_ctr, num_average_click_position, SEARCHTOOLS_API_SERVER, kkpager, BrowserUtil, limitUrl, _) {
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
                    query: $("#i_query").val(),
                    pageType: $("[name=pageType]").val()
                });
            });
            if (p.psize > 50) {
                p.psize = 50;
            }
            return p;
        }
        var params = getParams();
        var ed_query_click_total = 'ed_query_click_total';
        var queryClickTotal = window.queryClickTotal = new QueryTable(ed_query_click_total, {
            tcss: "opr-table",
            cols: [
                {
                    css: "num", name: "_query", cname: "查询词", width: 100, toHtml: function (val, row, col, data) {
                        var p = getParams();
                        var query = p.query;
                        var pc_wap = p.pc_wap;
                        var queryUrl = searchtool_getKeywordUrl(query, pc_wap);
                        return "<a target=\"_blank\" href=\"" + queryUrl + "\">" + sgDecodeURIComponent(query) + "</a>";
                    }
                },
                { css: "num", name: "pv", cname: "PV", width: 80 },
                { css: "num", name: "click", cname: "点击量", width: 80 },
                { css: "num", name: "ctr", cname: "CTR", width: 80, toHtml: num_ctr },
                { css: "num", name: "pos", cname: "平均点击位置", width: 80, toHtml: num_average_click_position },
                {
                    css: "num", name: "___", cname: "其他", width: 100, toHtml: function (val, row, col, data) {
                        var p = getParams();
                        var pc_wap = p.pc_wap || "wap";
                        var navId = (pc_wap == "wap" ? 20301 : 10301);
                        function getUrl(type) {
                            return "history_" + type.toLowerCase() + "_iframe_" + pc_wap + ".html?navId=" + navId + "&_toP=" + type.toLowerCase() + "&query=" + p.query + "&t=" + type + getCzUrlParams();
                        }
                        return " <a target=\"_blank\" href=\"" + getUrl('PV') + "\" >\u5386\u53F2pv</a>&nbsp;&nbsp;&nbsp;&nbsp;<a target=\"_blank\" href=\"" + getUrl('CTR') + "\">\u5386\u53F2ctr</a>";
                    }
                }
            ],
            modCss: { index: 2, css: "bgfc" }
        }, params, function (res) {
            var tableRows = [];
            tableRows.push(res);
            return tableRows;
        }, function (params) {
            var pc_wap = params.pc_wap || "wap";
            var apiUrl = SEARCHTOOLS_API_SERVER(pc_wap + "_query_total", params);
            return apiUrl;
        }, null, null);
        function checkEmptyUrl(props) {
            var p = $.extend({}, getParams(), { pno: 1, psize: 1 });
            var jbody = $("#ed_query_click_class").find("tbody");
            var pc_wap = p.pc_wap;
            if (pc_wap == "wap") {
                var tplkeyArr = [];
                var tplkeyObj = {};
                //收集那个typekey需要补url,并记录对应行号
                _.map(props.data.rows, function (item, index) {
                    if (_.trim(item["urlkey"] || "") == "") {
                        var tplkey = item["typekey"];
                        tplkeyArr.push(tplkey);
                        tplkeyObj[tplkey] = index;
                    }
                });
                p.typekeys = tplkeyArr.join(",");
                var apiUrl = SEARCHTOOLS_API_SERVER(pc_wap + "_query_detail_top", p);
                if (tplkeyArr.length > 0) {
                    $.ajax(apiUrl, { dataType: "jsonp" }).done(function (res) {
                        var items = res.details || [];
                        for (var i in items) {
                            var it = items[i];
                            //根据typekey找到行号
                            var index = tplkeyObj[it["typekey"]];
                            var ja = jbody.find(">tr:eq(" + index + ")").find(">td:eq(1)").find("a");
                            if (_.trim(ja.html()) == "") {
                                var url = _.trim(it.url);
                                var showVal = limitUrl(sgDecodeURIComponent(url));
                                ja.html(showVal).attr("data-wxhref", url);
                                console.log("dealed tplkey url", it["typekey"], url);
                            }
                        }
                    });
                }
            }
            else {
                _.map(props.data.rows, function (item, index) {
                    if (_.trim(item["urlkey"] || "") == "") {
                        var detailParams = {
                            query: p.query,
                            st: p.st,
                            et: p.et,
                            pno: p.pno || 1,
                            psize: p.psize || 1,
                            typekey: item.typekey || "",
                            urlkey: item.urlkey || ""
                        };
                        var apiUrl = SEARCHTOOLS_API_SERVER(pc_wap + "_query_detail", detailParams);
                        setTimeout(function () {
                            console.log("apiUrl query_click_detail:", apiUrl, new Date());
                            $.ajax(apiUrl, { dataType: "jsonp" }).done(function (res) {
                                var items = res.details || [];
                                try {
                                    var jtr = jbody.find(">tr:eq(" + index + ")");
                                    if (items.length > 0) {
                                        var jtd = jtr.find(">td:eq(1)");
                                        var ja = jtd.find("a");
                                        if (_.trim(ja.html()) == "") {
                                            var url = _.trim(items[0].url);
                                            var showVal = limitUrl(sgDecodeURIComponent(url));
                                            ja.html(showVal).attr("data-wxhref", url);
                                        }
                                        var jxiangQing = jtr.find('[name="to_detail"]').html();
                                        jxiangQing.html(jxiangQing.html() + "(" + items.length + ")");
                                    }
                                }
                                catch (e) {
                                }
                            });
                        }, index * 50);
                    }
                });
            }
        }
        var queryClickClass = window.queryClickClass = new QueryTable('ed_query_click_class', {
            tcss: "opr-table",
            cols: [
                {
                    css: "num",
                    name: "typename",
                    cname: "名称",
                    width: 200,
                    style: { "text-align": "left" },
                    toHtml: function (val, row) {
                        var tk = sgDecodeURIComponent(row["typekey"] || "");
                        var split = ":";
                        var typename = _.trim(row["typename"] || "");
                        if (tk == "NORMAL" || typename == "") {
                            split = "";
                        }
                        if (tk == "NORMAL") {
                            tk = "普通结果";
                        }
                        return "" + tk + split + typename;
                    }
                },
                {
                    css: "num",
                    name: "urlkey",
                    cname: "结果主链接",
                    width: 400,
                    style: { "text-align": "left" },
                    toHtml: function (val, row, col, data) {
                        var showVal = limitUrl(sgDecodeURIComponent(val));
                        return "<a target=\"_blank\" href=\"javascript:void(0)\" data-wxhref='" + val + "' name=\"to_detail\" >" + showVal + "</a>";
                    }
                },
                { css: "num", name: "pv", cname: "PV", width: 50 },
                { css: "num", name: "click", cname: "点击量", width: 50 },
                { css: "num", name: "pos", cname: "平均点击位置", width: 50, toHtml: num_average_click_position },
                { css: "num", name: "ctr", cname: "CTR", width: 50, toHtml: num_ctr },
                {
                    css: "",
                    name: "",
                    cname: "其它",
                    width: 50,
                    style: { "text-align": "center" },
                    toHtml: function (val, row, col, data) {
                        var it = "<a></a>";
                        try {
                            var params = getParams();
                            var pc_wap = params.pc_wap || "wap";
                            var href = "query_detail_iframe_" + pc_wap + ".html?paramsJson=" + encodeURIComponent($.toJSON(params)) + "&rowJson=" + encodeURIComponent($.toJSON(row)) + "&nnavId=" + params.navId;
                            it = "<a target=\"_blank\" href='" + href + "' name=\"to_detail\" >\u8BE6\u60C5</a>";
                        }
                        catch (e) {
                            console.log(e);
                        }
                        return it;
                    }
                }
            ],
            modCss: { index: 2, css: "bgfc" }
        }, params, function (res) {
            var v = this;
            var totalPage = (Math.floor(res.total / res.psize) + (res.total % res.psize == 0 ? 0 : 1));
            if (totalPage > 1) {
                var conf = {
                    pno: res.pno,
                    //总页码
                    total: totalPage,
                    //总数据条数
                    totalRecords: res.total,
                    mode: 'click',
                    click: function (n) {
                        this.selectPage(n);
                        var params = $.extend({}, v.params, { pno: n });
                        v.changeParams(params);
                        return false;
                    }
                };
                new kkpager("kkpager", res.psize).generPageHtml(conf);
                //new kkpager("kkpager2",res.psize).generPageHtml(conf);
                $("#kkpager").show();
            }
            else {
                $("#kkpager").hide();
            }
            return res.details || [];
        }, function (params) {
            var pc_wap = params.pc_wap;
            var apiUrl = SEARCHTOOLS_API_SERVER(pc_wap + "_query_class", params);
            return apiUrl;
        }, null, checkEmptyUrl);
        var bu = new BrowserUtil();
        /**所有事件*/
        $("#a_export").click(function () {
            var p = getParams();
            if (p.query && p.st && p.et) {
                console.log("start export:p.pc_wap,p.query,p.st,p.et ", p.pc_wap, p.query, p.st, p.et);
                var apiName = p.pc_wap + "_query_export";
                var url = SEARCHTOOLS_API_SERVER(apiName, p);
                if (_.trim(url || "") == "") {
                    console.log(apiName, "没有配置url");
                }
                else {
                    window.open(url);
                }
            }
            else {
                console.log("p.query&&p.st&&p.et must ", p.query, p.st, p.et);
            }
        });
        var pageSubmit = function () {
            var p = getParams();
            try {
                showMontior();
            }
            catch (e) {
                console.log("error in showMonitor");
            }
            if (_.trim(p.query) != "") {
                searchtools_isPassStEtDateCheck(p, function () {
                    try {
                        $("#itemContent").show();
                        if (p.query && p.st && p.et) {
                            queryClickTotal.changeParams($.extend(queryClickTotal.params, p));
                            queryClickClass.changeParams($.extend(queryClickClass.params, p));
                        }
                        else {
                            console.log("params.query && params.st && params.et ", p.query, p.st, p.et);
                        }
                    }
                    catch (e) {
                    }
                });
            }
        };
        window.searchtool_requery = pageSubmit;
        $(".date-left,.date-right").on("click", showMontior);
        searchtools_enter_event(pageSubmit);
        $("#a_submit").click(pageSubmit).click();
    });
})(jQuery, window, UrlUtil, moment, QueryTable, num_ctr, num_average_click_position, SEARCHTOOLS_API_SERVER, kkpager, BrowserUtil, limitUrl, _);
//# sourceMappingURL=query_click.js.map