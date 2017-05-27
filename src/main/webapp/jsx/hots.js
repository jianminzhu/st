var changeWeekStEt = function (et, days) {
    var et_day = et || "";
    var ymd = "YYYYMMDD";
    if (_.trim(et_day) == "") {
        et_day = moment().add('days', -1).format(ymd);
    }
    try {
        var st_day = moment(et_day, ymd).add('days', -1 * Number(days)).format(ymd);
        $("#st").html(st_day);
    }
    catch (e) {
        console.log("error in init st ,use default et ");
        $("#st").html(et_day);
    }
    $("#et").html(et_day);
    return { et: et_day, st: st_day };
};
function getParams() {
    var ymd = "YYYYMMDD";
    return UrlUtil.getParams(function (p) {
        var p = $.extend({ pno: 1, psize: 10 }, p, {
            st: $("#st").html(),
            et: $("#et").html(),
            hotType: $("#hotType span").attr("data-val")
        });
        var hotType = p.hotType;
        if (hotType == "realtime") {
            p.st = p.et = moment().format(ymd);
        }
        else if (hotType == "week") {
            p.st = moment(p.et, ymd).add("days", -6).format(ymd);
            var ymdarr = p.ymdarr = [];
            var ymdShowarr = p.ymdShowarr = [];
            _.range(-1 * 6, 1).map(function (it) {
                var endDate = moment(p.et, "YYYYMMDD");
                var theDay = endDate.add("day", it);
                ymdarr.push(theDay.format("YYYYMMDD"));
                ymdShowarr.push(theDay.format("YYYY-MM-DD"));
            });
        }
        var sourceTypeSel = $("#channelType input").attr("data-val");
        p.source_type = sourceTypeSel || "all";
        return p;
    });
}
var SEARCHTOOL_ST_ET_ISCHANGE = true;
SEARCHTOOL_HOTS_CHANNELTYPE = [];
var changeSelect = function (items, selectVal) {
    $("#channelType").html("");
    var selectItem = items[0];
    if (selectVal) {
        selectItem = { cn: selectVal, val: selectVal };
    }
    var tpl = '<select style="width:800px;" >{@each items as it,index}<option value="${it.val}"   {@if it.val==selectItem.val}selected{@/if}  >${it.cn }</option>{@/each}</select>';
    var htmlStr = juicer(tpl, { items: items, selectItem: selectItem });
    $("#channelType").html(htmlStr);
    var jselect = $("#channelType").find("select");
    jselect.comboSelect();
    $("#channelType").find("select").remove();
    var jinput = $("#channelType").find("input");
    $("#channelType li").click(function () {
        var value = $(this).attr("data-value");
        jinput.val($(this).html());
        jinput.attr("data-val", value);
    });
};
var dealChannelTypeShow = function () {
    var jinput = $("#channelType input");
    var typeVal = jinput.attr("data-val") || "";
    if (typeVal == "" || typeVal == "all") {
        typeVal = "全部";
    }
    jinput.val(typeVal);
};
function date_picking(old, newDateStr) {
    if (old != newDateStr) {
        SEARCHTOOL_ST_ET_ISCHANGE = true;
    }
}
function date_picked(eid, old, newDateStr) {
    var params = getParams();
    dealChannelType(params);
}
function dealChannelType(params) {
    if (SEARCHTOOL_ST_ET_ISCHANGE) {
        SEARCHTOOL_ST_ET_ISCHANGE = false;
        var params = params || getParams();
        $.ajax({
            url: searchtool_getApiUrl(params, "hots_chanel"), dataType: "jsonp",
            beforeSend: function () {
            }, complete: function () {
            }
        }).done(function (res) {
            var items = res["result"] || [];
            if (items.length > 0) {
                SEARCHTOOL_HOTS_CHANNELTYPE = items;
            }
            changeSelect(items, params.source_type);
        }).fail(function () {
            SEARCHTOOL_ERRORUTIL.emsg("初始化来源失败");
        });
    }
}
function showMontior(now) {
    if (now != "realtime") {
        SEARCHTOOL_MONTIOR_TASK("hots");
    }
}
(function ($, num_ctr, num_average_click_position, SEARCHTOOLS_API_SERVER, UrlUtil, QueryTable, kkpager, moment, window) {
    $(function () {
        var p = UrlUtil.parseURL(window.location.href).params;
        p.query = decodeURIComponent(p.query || "");
        searchtool_ReactSelectRender("hotType", [
            { val: "week", cn: "一周热词" },
            { val: "realtime", cn: "实时热词" },
            { val: "gather", cn: "汇总热词" }
        ], function (now) {
            $("[data-mshow]").hide().each(function () {
                if ($(this).attr("data-mshow").indexOf(now) != -1) {
                    $(this).show();
                }
                var hotType = $("#hotType span").attr("data-val");
                if (hotType == "week" || hotType == "gather") {
                    changeWeekStEt(moment().add('days', -1).format("YYYYMMDD"), 6);
                }
                changeSelect(SEARCHTOOL_HOTS_CHANNELTYPE);
            });
            showMontior(now);
        });
        var params = getParams();
        dealChannelType();
        //realTime===========================================================================
        //根据日期动态生成表格配置
        var getTableConfForRealTime = function (params) {
            var p = params || getParams();
            var config = {
                tcss: "opr-table",
                modCss: { index: 2, css: "bgfc" }
            };
            var cols = config.cols = [{
                    css: "num",
                    name: "top",
                    cname: "TOP",
                    width: 30
                }];
            cols.push({
                css: "num", name: "query", cname: "查询词", width: 1500, toHtml: function (val, row, col, data) {
                    var query = val;
                    var pc_wap = p.pc_wap;
                    var queryUrl = searchtool_getKeywordUrl(query, pc_wap);
                    return "<a target=\"_blank\" href=\"" + queryUrl + "\">" + sgDecodeURIComponent(query) + "</a>";
                }
            });
            _.map(_.range(0, 24), function (hour) {
                showHour = hour + 1;
                cols.push({
                    css: "num",
                    name: "c" + hour,
                    cname: showHour < 10 ? "0" + showHour : showHour,
                    width: 80
                });
            });
            cols.push({
                css: "num", name: "total", cname: "total", width: 100, toHtml: function (val, row, col, data) {
                    var total = 0;
                    _.map(_.range(0, 24), function (hour, index) {
                        total += row["c" + hour] || 0;
                    });
                    return "" + total;
                }
            });
            return config;
        };
        var coverDataForRealTime = function (res, params) {
            var items = res || [];
            var coverdResults = [];
            _.map(items, function (it, index) {
                var cit = {};
                cit["query"] = it.query;
                for (var i = 0; i < 24; i++) {
                    var pv = it.pvlist[i];
                    cit["c" + i] = pv;
                }
                cit["top"] = index + 1;
                coverdResults.push(cit);
            });
            return coverdResults;
        };
        window.hots_realtime_QT = new QueryTable('hotsRealTimeLst', getTableConfForRealTime(params), params, function (res) {
            var v = this;
            // var totalPage = (Math.floor(res.total / res.psize) + ( res.total % res.psize == 0 ? 0 : 1));
            // if (totalPage > 1) {
            //     new kkpager("kkpagerRealTime", res.psize).generPageHtml({
            //         pno: res.pno,
            //         //总页码
            //         total: totalPage,
            //         //总数据条数
            //         totalRecords: res.total,
            //         mode: 'click',//默认值是link，可选link或者click
            //         click: function (n) {
            //             pageSubmit($.extend(getParams(), {pno: n}));
            //         }
            //     });
            //     $("#kkpager").show();
            // } else {
            //     $("#kkpager").hide();
            // }
            var coverData2 = coverDataForRealTime(res);
            return coverData2;
        }, function (params) {
            return searchtool_getApiUrl(params, "hots_realtime");
        }, null, null, function (params) {
            //TODO 过了一小时则变更 
            return md5("hots_realtime_" + params.st + params.et + params.source_type);
        });
        //end realTime=======================================================
        //week===========================================================================
        //根据日期动态生成表格配置
        var getTableConfForWeek = function (params) {
            var p = params || getParams();
            var config = {
                tcss: "opr-table",
                isCache: true,
                modCss: { index: 2, css: "bgfc" }
            };
            var cols = config.cols = [{
                    css: "num",
                    name: "top",
                    cname: "TOP",
                    width: 30
                }];
            var ymdarr = (p.ymdarr || []).reverse();
            var ymdShowarr = (p.ymdShowarr || []).reverse();
            ymdarr.map(function (ymd, index) {
                var showYmd = ymdShowarr[index];
                cols.push({
                    css: "num",
                    name: ymd,
                    cname: showYmd,
                    width: 80,
                    toHtml: function (val, row, col, data) {
                        var html = "";
                        try {
                            var data = row[ymd];
                            var query = data["query"] || "";
                            var pv = data["pv"] || "";
                            var ctr = data["ctr"] || "";
                            var pv_ctr = [];
                            var pvIsNotBlank = _.trim(pv) != "";
                            var ctrIsNotBlank = _.trim(ctr) != "";
                            if (pvIsNotBlank || ctrIsNotBlank) {
                                pv_ctr.push(pv);
                                if (pvIsNotBlank && ctrIsNotBlank) {
                                    pv_ctr.push("(");
                                    pv_ctr.push("ctr");
                                    pv_ctr.push(")");
                                }
                            }
                            var queryUrl = searchtool_getKeywordUrl(query, p.pc_wap);
                            html = " <a target=\"_blank\" href=\"" + queryUrl + "\">" + sgDecodeURIComponent(query) + "</a>  <br/>" + pv_ctr.join("");
                        }
                        catch (e) {
                            return "";
                        }
                        return html;
                    }
                });
            });
            return config;
        };
        var coverData = function (res, params) {
            var p = params || getParams();
            var needCoverResults = res.result || [];
            var maxItemsNum = 0;
            _.map(needCoverResults, function (it, key) {
                maxItemsNum = (it.length > maxItemsNum ? it.length : maxItemsNum);
            });
            var coverdResults = [];
            _.range(0, maxItemsNum).map(function (rowIndex) {
                var rowObj = {};
                (p.ymdarr || []).map(function (ymd) {
                    try {
                        rowObj[ymd] = (needCoverResults[ymd] || [])[rowIndex] || {};
                    }
                    catch (e) {
                    }
                });
                rowObj["top"] = rowIndex + 1;
                coverdResults.push(rowObj);
            });
            return coverdResults;
        };
        window.hots_QT = new QueryTable('hotsLst', getTableConfForWeek(params), params, function (res) {
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
                        pageSubmit($.extend(getParams(), { pno: n }));
                    }
                });
                $("#kkpager").show();
            }
            else {
                $("#kkpager").hide();
            }
            var coverData2 = coverData(res);
            return coverData2;
        }, function (params) {
            return searchtool_getApiUrl(params, "hots");
        }, null, null);
        //end week=======================================================
        //start gather=======================================================
        //根据日期动态生成表格配置
        var getTableConfForGather = function (params) {
            var p = params || getParams();
            var config = {
                tcss: "opr-table",
                modCss: { index: 2, css: "bgfc" }
            };
            var cols = config.cols = [
                {
                    css: "num",
                    name: "top",
                    isCache: true,
                    cname: "TOP",
                    width: 30
                },
                /*query	来源	PV	主动搜索PV	点击量	CTR	平均点击位置	其他*/
                {
                    css: "num", name: "query", cname: "query", width: 50, toHtml: function (query) {
                        var queryUrl = searchtool_getKeywordUrl(query, getParams().pc_wap);
                        return "<a target=\"_blank\" href=\"" + queryUrl + "\">" + sgDecodeURIComponent(query) + "</a>";
                    }
                },
                {
                    css: "num", name: "query", cname: "来源", width: 50, toHtml: function (query) {
                        var p = getParams();
                        var pc_wap = p.pc_wap || "wap";
                        var jsonParams = {
                            query: query,
                            st: p.st,
                            et: p.et,
                            source_type: p.source_type,
                            pc_wap: p.pc_wap || "wap"
                        };
                        var jsonStr = encodeURIComponent($.toJSON(jsonParams));
                        var navId = p.navId;
                        var url = "hots_gather_refer_" + pc_wap + ".html?nnavId=" + navId + "&_toP=hot&jsonStr=" + jsonStr + getCzUrlParams();
                        return "<a target=\"_blank\" href=\"" + url + "\">refer\u8BE6\u60C5</a>";
                    }
                },
                { css: "num", name: "pv", cname: "PV", width: 50 }
            ];
            if (p.pc_wap == "wap") {
                cols.push({ css: "num", name: "activepv", cname: "主动搜索PV", width: 50 });
            }
            var items = [{ css: "num", name: "click", cname: "点击量", width: 50 },
                { css: "num", name: "ctr", cname: "CTR", width: 50 },
                { css: "num", name: "pos", cname: "平均点击位置", width: 50, toHtml: num_average_click_position },
                {
                    css: "", name: "other", cname: "其他", width: 100, toHtml: function (val, row) {
                        var p = getParams();
                        var pc_wap = p.pc_wap || "wap";
                        var navId = p.navId;
                        function getUrl(query) {
                            return "history_pv_iframe_" + pc_wap + ".html?nnavId=" + navId + "&_toP=pv&query=" + query + "&t=PV" + getCzUrlParams();
                        }
                        var query = encodeURIComponent(row["query"]);
                        return "<div class=\"q-sbtn\"><a target=\"_blank\" href=\"" + getUrl(query) + "\" class=\"edit\">\u5386\u53F2PV</a><a target=\"_blank\" href=\"query_click_iframe_" + pc_wap + ".html?nnavId=" + navId + "&_toP=qclick&st=" + p.st + "&et=" + p.et + "&query=" + query + "\" class=\"edit\">SA</a></div>";
                    }
                }];
            for (var i in items) {
                cols.push(items[i]);
            }
            return config;
        };
        window.hots_gather_QT = new QueryTable('hotsGatherLst', getTableConfForGather(params), params, function (res) {
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
                        pageSubmit($.extend(getParams(), { pno: n }));
                    }
                });
                $("#kkpager").show();
            }
            else {
                $("#kkpager").hide();
            }
            var p = getParams();
            var rows = [];
            try {
                rows = res["result"][p.st + "-" + p.et];
            }
            catch (e) {
            }
            try {
                _.map(rows, function (row, index) {
                    row.top = index + 1;
                });
            }
            catch (e) {
            }
            return rows;
        }, function (params) {
            return searchtool_getApiUrl(params, "hots_gather");
        }, null, null);
        //end gather=======================================================
        var pageSubmit = function () {
            var p = getParams();
            dealChannelTypeShow();
            showMontior(p.source_type);
            searchtools_isPassStEtDateCheck(p, function () {
                if (p.source_type) {
                    if (p.hotType == "week") {
                        window.hots_QT.setTableConf(getTableConfForWeek(p));
                        window.hots_QT.changeParams(p);
                    }
                    if (p.hotType == "gather") {
                        window.hots_gather_QT.setTableConf(getTableConfForGather(p));
                        window.hots_gather_QT.changeParams(p);
                    }
                    if (p.hotType == "realtime") {
                        window.hots_realtime_QT.setTableConf(getTableConfForRealTime(p));
                        window.hots_realtime_QT.changeParams(p);
                    }
                    var jtime = $("[data-mshowcontent=" + p.hotType + "][name=dt_st_et]");
                    jtime.html(p.st + "~" + p.et);
                    $("[data-mshowContent]").hide().each(function () {
                        if ($(this).attr("data-mshowContent").indexOf(p.hotType) != -1) {
                            $(this).show();
                        }
                    });
                }
                else {
                    SEARCHTOOL_ERRORUTIL.emsg("请检查来源");
                }
            });
        };
        $("#a_export").click(function () {
            var params = getParams();
            if (params.st && params.et && params.source_type) {
                window.open(searchtool_getApiUrl(params, "hots_export_" + params.hotType));
            }
        });
        $("body").on("click", "#a_query", pageSubmit);
        $("#a_query").click();
        searchtools_enter_event(pageSubmit);
    });
})(jQuery, num_ctr, num_average_click_position, SEARCHTOOLS_API_SERVER, UrlUtil, QueryTable, kkpager, moment, window);
//# sourceMappingURL=hots.js.map