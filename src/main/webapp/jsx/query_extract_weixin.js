function showMontior() {
    SEARCHTOOL_MONTIOR_TASK("query_click");
}
(function ($, num_ctr, num_average_click_position, SEARCHTOOLS_API_SERVER, _) {
    $(function () {
        var params = UrlUtil.parseURL(window.location.href).params;
        //pc时才有
        if (params.pc_wap == "pc") {
            $("#topPvQuery").show();
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
                    type: $("input[name=type]:checked").val()
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
            var isPassChecked = (_.trim(p.st || "") != "" && _.trim(p.num || "") != "" && _.trim(p.extract_type || "") != "" && _.trim(p.type || "") != "" && (num > 0 && num <= 50000));
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
                var apiName = "extract_export_weixin";
                var url = SEARCHTOOLS_API_SERVER(apiName, params);
                window.open(url);
            });
        });
        if (params.pc_wap == "wap") {
            $("#d_platform").show();
        }
    });
})(jQuery, num_ctr, num_average_click_position, SEARCHTOOLS_API_SERVER, _);
//# sourceMappingURL=query_extract_weixin.js.map