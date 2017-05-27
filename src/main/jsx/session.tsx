function showMontior() {
    SEARCHTOOL_MONTIOR_TASK("session")
}

(function ($) {
    $(function () {
        var OLD_PARAMS=window.OLD_PARAMS||{};
        var params = UrlUtil.parseURL(window.location.href).params;
        params.query = decodeURIComponent(params.query || "")
        function init(params) {
            UrlUtil.initParams(function (p) {
                var st_day = moment().add(-1, "day").format("YYYYMMDD");
                var et_day = moment().add(-1, "day").format("YYYYMMDD");
                $("#st").html(p.st || st_day)
                $("#et").html(p.et || et_day)
                //$("#i_query").val(_.uniq((p.query || p.uid||"").split(",")).join(","))
            }, params);
        }
        init(params);

        function getParams() {
            return UrlUtil.getParams(function (params) {
                var p = $.extend({pno: 1, psize: 10}, params||{}, {
                    st: $("#st").html()
                    , et: $("#et").html()
                    , t: $("#query_uid_select  span").attr("data-val")
                    , pageType: $("[name=pageType]").val() == "" ? "all" : $("[name=pageType]").val()
                    , type: "all"
                })
                var queryOrUid=$("#i_query").val();
                if(p.t!="1"){
                    p.uid=queryOrUid
                    p.query=""
                }else{
                    p.query=queryOrUid
                    p.uid=""
                }
                var sourceTypeSel = $("#channelType input").attr("data-val");
                p.source_type = sourceTypeSel || "all";
                return p;
            });
        }

        var SEARCHTOOL_ST_ET_ISCHANGE = true;
        SEARCHTOOL_HOTS_CHANNELTYPE = [];
        var changeSelect = function (items:any|Array, selectVal) {
            $("#channelType").html("")
            var selectItem = items[0]
            if (selectVal) {
                selectItem = {cn: selectVal, val: selectVal}
            }
            var tpl = '<select style="width:800px;" >{@each items as it,index}<option value="${it.val}"   {@if it.val==selectItem.val}selected{@/if}  >${it.cn }</option>{@/each}</select>'
            const htmlStr = juicer(tpl, {items: items, selectItem: selectItem});
            $("#channelType").html(htmlStr)
            var jselect = $("#channelType").find("select");
            jselect.comboSelect();
            $("#channelType").find("select").remove();
            var jinput = $("#channelType").find("input");
            $("#channelType li").click(function () {
                const value = $(this).attr("data-value");
                jinput.val($(this).html())
                jinput.attr("data-val", value)
            })
        };
        var dealChannelTypeShow = function () {
            var jinput = $("#channelType input");
            const typeVal = jinput.attr("data-val") || "";
            if (typeVal == "" || typeVal == "all") {
                typeVal = "全部"
            }
            jinput.val(typeVal)
        };

        function date_picking(old, newDateStr) {
            if (old != newDateStr) {
                SEARCHTOOL_ST_ET_ISCHANGE = true;
            }
        }
        function date_picked(eid, old, newDateStr) {
            const params = getParams();
            dealChannelType(params);
        }

        function dealChannelType(params) {
            // if(SEARCHTOOLS_ISCHUIZHI( )){//如果是垂直则不显示来源
            //     return;
            // }
            if (SEARCHTOOL_ST_ET_ISCHANGE) {
                SEARCHTOOL_ST_ET_ISCHANGE = false;
                var params = params || getParams();
                $.ajax({
                    url: searchtool_getApiUrl(params, "hots_chanel"), dataType: "jsonp"
                    , beforeSend: function () {
                    }, complete: function () {
                    }
                }).done(function (res) {
                    var items = res["result"] || [];
                    if (items.length > 0) {
                        SEARCHTOOL_HOTS_CHANNELTYPE = items;
                    }
                    changeSelect(items, params.source_type);
                }).fail(function () {
                    SEARCHTOOL_ERRORUTIL.emsg("初始化来源失败")
                })
            }
        }
        var query_uid_select = {
            rit: {}
            , item: {val: "1", cn: "query"}
            , items: [{val: "1", cn: "query"}
                , {val: "0", cn: "uid"}
            ], qcb: function (now) {
            }
        }
        ReactDOM.render(<RSelect {...query_uid_select}/>, document.getElementById("query_uid_select"))
        dealChannelType()
        $("body").on("click", "[data-toggle]", function () {
            var jit = $(this);
            var jroot=jit.closest("#d_session_all");
            var jtoggle = $("#" + jit.attr("data-toggle"));
            jtoggle.toggle()
            var hideCss = jit.attr("data-toggle-css-hide")
            if(jtoggle.css("display")=="none"){
                jit.addClass(hideCss)
            }else{
                jit.removeClass(hideCss) 
            }
        }).on("click", "[data-hide]", function () {
            $("#" + $(this).attr("data-hide")).hide()
        }).on("click","#a_export",function(){
            var p=getParams();
            var apiName=p.pc_wap+"_session_export";
            var url = SEARCHTOOLS_API_SERVER(apiName,p);
            if(_.trim(url||"")==""){
                console.log(apiName,"没有配置url")
            }else{
                console.log(apiName,"export url",url)
                window.open(url)
            }
        })




        var pageSubmit = function () {
            var p = getParams();
            showMontior();
            searchtools_isPassStEtDateCheck(p,function () {
                if((p.query||p.uid)&&p.st&&p.et){
                    $("#d_session_all").html("")
                    var props = {
                        params: p,
                        startPno: p.startPno || 1,
                        rit: {},
                        pcb: function (select) {
                        }
                    }
                    var o = OLD_PARAMS
                    var n = p
                    if (o.query != n.query || o.st != n.st || o.et != n.et) {
                        OLD_PARAMS = $.extend({}, p);
                    }
                    $("#d_session_all").html("");
                    head.load(["jsx/RSession.js", "jsx/RSessionAll.js"], function () {
                        ReactDOM.render(<RSessionAll {...props}  />, document.getElementById("d_session_all"))
                    })
                }
            })
        };
        $(".date-left,.date-right").on("click", showMontior);
        searchtools_enter_event(pageSubmit)
        $("#a_submit").click(pageSubmit).click()
        window.searchtool_requery = pageSubmit;
    })
})(jQuery);
