var ___JSARR__ = [
    "js/My97DatePicker/WdatePicker.js?v=2"
    , "js/jquery-1.10.2.js"
    , "js/piwik.js"
    , "js/jquery-ui.js"
    , "js/comboselect/jquery.combo.select.js"
    , "js/lodash/lodash.min.js"
    , "js/juicer-min.js"
    , "js/moment.js"
    , "js/spin.min.js"
    , "jsx/SpinnerUtil.js"
    , "js/jquery.json-2.4.js"
    , "js/kkpager/kkpager.js"
    , "js/react15/react.js"
    , "js/react15/react-dom.js"
    , "js/md5.js"
    , "lib/vue/js/vue.min.js"
    , "js/store/store_json2.min.js"
    , "js/zTree/js/jquery.ztree.core.js"
    // , "jsx/nav.js"
    , "jsx/SgWxUrlUtil.js"
    /*, "jsx/ScrollToTop.js"*/
    , "jsx/UrlUtil.js"
    , "jsx/searchtool_common.js"
    , "jsx/BrowserUtil.js"
    , "jsx/DateUtil.js"
    , "jsx/DeepCopyUtil.js"
    , "jsx/RSelect.js"
    , "jsx/RTable.js"
    , "jsx/QueryTable.js"
]

var ___CSSARR__ = [
    "css/layout.css"
    , "css/element.css"
    , "css/layout_index.css"
    , "css/login.css"
    , "css/reset.css"
    , "js/kkpager/kkpager_orange.css"
    , "js/zTree/css/zTreeStyle/zTreeStyle.css"
]
if (window.console == undefined) {
    window.console = {
        log: function () {
        }
    }
}
function version() {
    return "1.61";
}
function getVersion() {
    return "?v=" + version();
}
function addVersion(jsOrJsArr) {
    if (typeof jsOrJsArr == "object") {
        for (var i = 0; i < jsOrJsArr.length; i++) {
            var hasParams = jsOrJsArr[i].indexOf("?");
            var start = "?"
            if (hasParams != -1) {
                start = "&"
            }
            jsOrJsArr[i] += start + "v=" + version()
        }
    }
    return jsOrJsArr;
}
function afterLoad(jsOrJsArr, callBack) {
    if (typeof(callBack) == "function") {
        head.load(jsOrJsArr, callBack)
    } else {
        head.load(jsOrJsArr)
    }
}
afterLoad(addVersion(___JSARR__))
afterLoad(addVersion(___CSSARR__))
// head.load("js/kkpager/kkpager_orange.css");
head.ready(function () {
    try {
        try {
            window.__SEARCHTOOLS_SPINNER = new SpinnerUtil()
            $.ajaxSetup({
                timeout:60000
                , beforeSend: function () {
                    window.__SEARCHTOOLS_SPINNER.show()
                }, complete: function () {
                    window.__SEARCHTOOLS_SPINNER.hide()
                },error:function(xhr,textStatus){
                    if(textStatus=="timeout"){
                        try {
                            SEARCHTOOL_ERRORUTIL.emsg("后端接口返回超时")
                        } catch (e) {
                            console.log("error",e)
                        }
                    }
                }
            })
            $("body").prepend('<span id="ltop"></span>')
        } catch (e) {
        }
        main()
    } catch (e) {
    }
    (function ($) {
        $(function () {
            $("a").each(function () {
                var href = $(this).attr("href")
                if (href == "#") {
                    $(this).attr("javascript:void(0)")
                }
            })
        })
    })(jQuery)
});