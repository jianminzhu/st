(function ($) {
    $(function () {
        var params = UrlUtil.parseURL(window.location.href).params;
        params.query = decodeURIComponent(params.query || "")
        function init(params) {
            UrlUtil.initParams(function (p) {
                var st_day = moment().add(-1, "day").format("YYYYMMDD");
                var et_day = moment().add(-1, "day").format("YYYYMMDD");
                $("#st").html(p.st || st_day)
                $("#num").val(p.num)
            }, params);
        }
        init(params);
        function getParams() {
            return UrlUtil.getParams(function (p) {
                return $.extend({pno: 1, psize: 10}, p, {
                    st: $("#st").html()
                    , et:$("#st").html()
                    , num: $("#num").val()
                })
            });
        }

        var sessionExport = function () {
            var p = getParams()
            var num = 0;
            try {
                num = Number(_.trim(p.num || "0"))
            } catch (e) {
            }
            var maxExport = 1000;
            if (isNaN(num) || num > maxExport || num == 0) {
                SEARCHTOOL_ERRORUTIL.emsg("(导出条数需大于0，最大可为" + maxExport + "条)")
            } else if (num > 0) {
                $("#errormsg").html("")
                var apiName = p.pc_wap + "_session_random_export";
                var url = SEARCHTOOLS_API_SERVER(apiName, p);
                if (_.trim(url || "") == "") {
                    console.log(apiName, "没有配置url")
                } else {
                    window.open(url)
                }
            }
        };
        searchtools_enter_event(sessionExport)
        $("#a_export").click(sessionExport)
    })
})(jQuery);
