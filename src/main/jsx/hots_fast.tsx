var changeWeekStEt = function (et:string|any, days:any|string) {
    var et_day = et || "";
    var ymd = "YYYYMMDD";
    if (_.trim(et_day) == "") {
        et_day = moment().add('days',  1).format(ymd);
    }
    try {
        var st_day = moment(et_day, ymd) .add('days', -1 * Number(days)).format(ymd);
        $("#st").html(st_day)
    } catch (e) {
        console.log("error in init st ,use default et ")
        $("#st").html(et_day)
    }
    $("#et").html(et_day)
    return {et: et_day, st: st_day};
};
function getParams() {
    var ymd = "YYYYMMDD";
    return UrlUtil.getParams(function (p) {
        var p = $.extend({pno: 1, psize: 10}, p, {
            st: $("#st").html(),
            et: $("#et").html(),
            hotType: $("#hotType span").attr("data-val")
        })
        var hotType = p.hotType;
        if (hotType == "realtime") {
            p.st = p.et = moment().format(ymd)
        } else if (hotType == "week") {
            p.st = moment(p.et, ymd).add("days", -6).format(ymd)
            var ymdarr = p.ymdarr = []
            var ymdShowarr = p.ymdShowarr = []
            _.range(-1 * 6, 1).map(function (it) {
                var endDate = moment(p.et, "YYYYMMDD");
                var theDay = endDate.add("day", it);
                ymdarr.push(theDay.format("YYYYMMDD"))
                ymdShowarr.push(theDay.format("YYYY-MM-DD"))
            })
        }
        var sourceTypeSel = $("#channelType input").attr("data-val");
        p.source_type = sourceTypeSel || "all"
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

}

function showMontior(now){
    if(now!="realtime"){
        SEARCHTOOL_MONTIOR_TASK("hots" )
    }
}

(function ($, num_ctr, num_average_click_position, SEARCHTOOLS_API_SERVER, UrlUtil, QueryTable, kkpager, moment, window) {
    $(function () {

        var p = UrlUtil.parseURL(window.location.href).params;
        p.query = decodeURIComponent(p.query || "")

        searchtool_ReactSelectRender("hotType", [
            {val: "week", cn: "一周热词"}
            , {val: "realtime", cn: "实时热词"}
            , {val: "gather", cn: "汇总热词"}
        ], function (now) {
            $("[data-mshow]").hide().each(function () {
                if ($(this).attr("data-mshow").indexOf(now) != -1) {
                    $(this).show()
                }
                var hotType = $("#hotType span").attr("data-val")
                if (hotType == "week" || hotType == "gather") {
                    changeWeekStEt(moment().add('days', -1).format("YYYYMMDD"), 6)
                }
                changeSelect(SEARCHTOOL_HOTS_CHANNELTYPE);
            })
            showMontior(now);
        })

        var params = getParams();



        //week===========================================================================
        //根据日期动态生成表格配置
        var getTableConfForWeek = function (params) {
            var p = params || getParams();
            var config = {
                tcss: "opr-table",
                isCache:true,
                modCss: {index: 2, css: "bgfc"}
            }
            var cols = config.cols = [{
                css: "num",
                name: "top",
                cname: "TOP",
                width: 30
            }];
            var ymdarr=(p.ymdarr || []).reverse();
            var ymdShowarr=(p.ymdShowarr|| []).reverse();
            ymdarr.map(function (ymd, index) {
                var showYmd =ymdShowarr[index];
                cols.push({
                    css: "num",
                    name: ymd,
                    cname: showYmd,
                    width: 80,
                    toHtml: function (val, row, col, data) {
                        var html = "";
                        try {
                            var data = row[ymd]
                            var query = data["query"] || "";
                            var pv = data["pv"] || "";
                            var activepv = data["activepv"] || "";
                            var pv_ctr = [];
                            var pvIsNotBlank = _.trim(pv) != "";
                            var activepvIsNotBlank = _.trim(activepv) != "";
                            if (pvIsNotBlank || activepvIsNotBlank) {
                                pv_ctr.push("<span style='color: red'>+"+(activepv)+"</span>("+ pv+")")
                            }
                            var queryUrl = searchtool_getKeywordUrl(query, p.pc_wap)
                            html = ` <a target="_blank" href="${queryUrl}">${sgDecodeURIComponent(query)}</a>  <br/>${pv_ctr.join("")}`
                        } catch (e) {
                            return "";
                        }
                        return html;
                    }
                })
            })
            return config;
        }
        var coverData = function (res, params) {
            var p = params || getParams();
            var needCoverResults = res.result || [];
            var maxItemsNum = 0;

            _.map(needCoverResults, function (it, key) {
                maxItemsNum = (it.length > maxItemsNum ? it.length : maxItemsNum)
            })

            var coverdResults = [];
            _.range(0, maxItemsNum).map(function (rowIndex) {
                var rowObj = {};
                (p.ymdarr || []).map(function (ymd) {
                    try {
                        rowObj[ymd] = (needCoverResults[ymd] || [])[rowIndex] || {}
                    } catch (e) {
                    }
                });
                rowObj["top"] = rowIndex + 1;
                coverdResults.push(rowObj)
            })
            return coverdResults;
        }


        window.hots_QT = new QueryTable('hotsLst', getTableConfForWeek(params), params, function (res) {
            var v = this;
            var totalPage = (Math.floor(res.total / res.psize) + ( res.total % res.psize == 0 ? 0 : 1));
            if (totalPage > 1) {
                new kkpager("kkpager", res.psize).generPageHtml({
                    pno: res.pno,
                    //总页码
                    total: totalPage,
                    //总数据条数
                    totalRecords: res.total,
                    mode: 'click',//默认值是link，可选link或者click
                    click: function (n) {
                        pageSubmit($.extend(getParams(), {pno: n}));
                    }
                });
                $("#kkpager").show();
            } else {
                $("#kkpager").hide();
            }

            var coverData2 = coverData(res);
            return coverData2;
        }, function (params) {
            return searchtool_getApiUrl(params, "hots_fast");
        },null,null)
        //end week=======================================================




        var pageSubmit = function () {
            var p = getParams()
            dealChannelTypeShow();
            showMontior(p.source_type);
            searchtools_isPassStEtDateCheck(p, function () {
                window.hots_QT.setTableConf(getTableConfForWeek(p));
                window.hots_QT.changeParams(p);
            })
        };
       /* $("#a_export").click(function () {
            var params = getParams()
            if (params.st && params.et && params.source_type) {
                window.open(searchtool_getApiUrl(params, "hots_export_" + params.hotType))
            }
        })
*/
        $("body").on("click", "#a_query", pageSubmit)
        $("#a_query").click()
        searchtools_enter_event(pageSubmit)
    })
})(jQuery, num_ctr, num_average_click_position, SEARCHTOOLS_API_SERVER, UrlUtil, QueryTable, kkpager, moment, window)