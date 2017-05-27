function showMontior() {
    SEARCHTOOL_MONTIOR_TASK("query_extract");
}
(function ($, num_ctr, num_average_click_position, SEARCHTOOLS_API_SERVER) {
    $(function () {
        var params = UrlUtil.parseURL(window.location.href).params;
        if (!SEARCHTOOLS_ISCHUIZHI()) {
            $("[data-pwshow]").show();
            //pc时才有
            if (params.pc_wap == "pc") {
                $("#topPvQuery").show();
            }
            else {
                $("#wapTopPvQuery").show();
                $("#d_platform").show();
            }
        }
        else {
            $("[data-czshow]").show();
        }
        function init(p) {
            if (_.trim(p.st || "") != "") {
                $("#st").html(p.st);
            }
            var extract_type = p["extract_type"] || "random";
            $("[name=extract_type][value=" + (extract_type) + "]").attr("checked", "checked");
        }
        init(params);
        showMontior();
        function getParams() {
            var p = UrlUtil.getParams(function (p) {
                return $.extend({ pno: 1, psize: 50 }, p, {
                    st: $("#st").html(),
                    extract_type: $("[name=extract_type]:checked").val() || "random",
                    num: $("#num").val(),
                    platform: $("input[name=platform]:checked").val(),
                    pageType: $("[name=pageType]").val()
                });
            });
            return p;
        }
        var checkForSumit = function (p, callBack) {
            var p = p || getParams();
            var num = -1;
            if ($.isNumeric(p.num)) {
                num = Number(p.num);
            }
            var isPassChecked = (_.trim(p.st || "") != "" && _.trim(p.num || "") != "" && _.trim(p.extract_type || "") != "" && (num > 0 && num <= 50000));
            if (isPassChecked) {
                callBack(p);
            }
            else {
                SEARCHTOOL_ERRORUTIL.emsg("请检查抽取日期及取词数量(0～50000)");
            }
        };
        $("#a_export").click(function () {
            var params = getParams();
            checkForSumit(params, function (p) {
                var apiName = (p.pc_wap || "wap") + "_extract_export";
                var url = SEARCHTOOLS_API_SERVER(apiName, params);
                console.log("export_url：", url);
                window.open(url);
            });
        });
        window.searchtool_requery = function () {
            // $("#a_export").trigger("click")
        };
        /*
        query_extract_QT = new QueryTable('wapqueryclick_detail', {
                tcss: "opr-table",
                cols: [{
                        css: "qkey",
                        name: "query",
                        cname: "query",
                        style: {"text-align": "left"},
                        width: 150,
                        toHtml: function (val) {
                            return `<a target="_blank" href="${val}">${limitUrl(val, 70)}</a>`
                        }
                    },
                    {css: "num", name: "refer", cname: "来源", width: 150},
                    {css: "num", name: "pv", cname: "PV", width: 80},
                    {css: "num", name: "pos", cname: "主动搜索PV", width: 80 }
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
                return SEARCHTOOLS_API_SERVER((params.pc_wap||"wap")+"_extract",params);
            })
            var pageSubmit =function(){
            var params = getParams();
                    checkForSumit(params,function(p){
                    query_extract_QT.changeParams(p);
                })
            }
        $("#a_query").click(pageSubmit)
        */
    });
    // extract_export
})(jQuery, num_ctr, num_average_click_position, SEARCHTOOLS_API_SERVER);
//# sourceMappingURL=query_extract.js.map