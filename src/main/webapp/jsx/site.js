var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
function showMontior() {
    SEARCHTOOL_MONTIOR_TASK("site");
}
(function ($) {
    $(function () {
        var params = UrlUtil.parseURL(window.location.href).params;
        params.query = decodeURIComponent(params.query || "");
        function init(params) {
            UrlUtil.initParams(function (p) {
                var st_day = moment().add(-1, "day").format("YYYYMMDD");
                var et_day = st_day;
                $("#st").html(p.st || st_day);
                $("#et").html(p.et || et_day);
                //$("#i_query").val(_.uniq((p.query || "").split(",")).join(","))
                $("#pc_wap").val(p.pc_wap || "wap");
            }, params);
        }
        init(params);
        function getParams() {
            return UrlUtil.getParams(function (p) {
                return $.extend({ pno: 1, psize: 50 }, p, {
                    st: $("#st").html(),
                    et: $("#et").html(),
                    query: $("#i_query").val(),
                    t: $("#d_select span").attr("data-val"),
                    pc_wap: $("#pc_wap").val() || "wap"
                });
            });
        }
        window.siteDetail = new QueryTable('siteDetail', {
            tcss: "opr-table",
            cols: [
                { css: "num", name: "click", cname: "点击量", width: 100 },
                { css: "num", name: "pos", cname: "平均点击位置", width: 100, toHtml: num_average_click_position },
                {
                    css: "num", name: "query", cname: "query", width: 400, toHtml: function (val) {
                        var p = getParams();
                        var query = val;
                        var pc_wap = p.pc_wap;
                        var queryUrl = searchtool_getKeywordUrl(query, pc_wap);
                        return "<a target=\"_blank\" href=\"" + queryUrl + "\">" + sgDecodeURIComponent(query) + "</a>";
                    }
                }
            ],
            modCss: { index: 2, css: "bgfc" }
        }, params, function (res) {
            //6TODO  分页相关参数
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
                        this.selectPage(n);
                        var params = $.extend({}, v.params, getParams(), { pno: n });
                        v.changeParams(params);
                        goToSel();
                        return true;
                    }
                });
                $("#kkpager").show();
            }
            else {
                $("#kkpager").hide();
            }
            return res.querys || [];
        }, function (params) {
            var pc_wap = params.pc_wap || "wap";
            return SEARCHTOOLS_API_SERVER(pc_wap + "_site_domain_url_detail_" + params.t, params);
        }, function (e) {
            window.siteDetail.clean();
        });
        var r_select = {
            rit: {},
            item: { val: "0", cn: "site" },
            items: [{ val: "0", cn: "site" },
                { val: "1", cn: "domain" },
                { val: "2", cn: "url" }
            ], qcb: function (now) {
            }
        };
        ReactDOM.render(React.createElement(RSelect, __assign({}, r_select)), document.getElementById("d_select"));
        var pageSubmit = function () {
            var p = getParams();
            showMontior();
            searchtools_isPassStEtDateCheck(p, function () {
                try {
                    var params = getParams();
                    if (params.query) {
                        window.siteDetail.clean();
                        var pc_wap = params.pc_wap || "wap";
                        var totalUrl = SEARCHTOOLS_API_SERVER(pc_wap + "_site_domain_url_total_" + params.t, params);
                        if (_.trim(params.query || "") != "") {
                            $.ajax(totalUrl, { dataType: "jsonp" }).done(function (data) {
                                fillHtmlOrInput(data, "", $("#total"));
                            });
                            if (params.query && params.st && params.et) {
                                window.siteDetail.changeParams($.extend(window.siteDetail.params, params));
                            }
                            else {
                                window.siteDetail.clean();
                            }
                        }
                    }
                }
                catch (e) {
                    console.log("error in site query", e);
                }
            });
        };
        $("body").on("click", "#a_export", function () {
            var params = getParams();
            var pc_wap = params.pc_wap || "wap";
            var url = SEARCHTOOLS_API_SERVER(pc_wap + "_site_domain_url_export_" + params.t, params);
            window.open(url);
        }).on("click", "#a_submit", pageSubmit);
        searchtools_enter_event(pageSubmit);
        $("#a_submit").click();
        $(".date-left,.date-right").on("click", showMontior);
    });
})(jQuery);
//# sourceMappingURL=site.js.map