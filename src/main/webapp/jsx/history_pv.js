var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
(function ($) {
    $(function () {
        var params = UrlUtil.parseURL(window.location.href).params;
        var pvOrCtr = params.t = params.t || "PV";
        params.query = decodeURIComponent(params.query || "");
        var jsogoubaidu = searchtool_addInputById("sogoubaidu");
        jsogoubaidu.val(params.sogoubaidu || "");
        function isSogouBaidu(params) {
            return params.sogoubaidu == "sogou" || params.sogoubaidu == "baidu";
        }
        function init(params, useEnd) {
            UrlUtil.initParams(function (p) {
                var st_day = p.st;
                var et_day = p.et;
                if (useEnd) {
                    var et = getEndDateFromParams(p);
                    et_day = et.format("YYYYMMDD");
                    st_day = et.add("day", -31).format("YYYYMMDD");
                }
                if (p.isInitStEt == "t") {
                    $("#st").html(st_day);
                    $("#et").html(et_day);
                }
                $("[name=t_pc_crt]").html(p.t);
                $("#i_query").val(limitArrFormString(p.query || "", 5).join(","));
            }, params);
        }
        init(params, true);
        function getParams() {
            return UrlUtil.getParams(function (p) {
                var querys = $("#i_query").val();
                var qArr = limitArrFormString(querys, 5);
                return $.extend({ pno: 1, psize: 10 }, p, {
                    st: $("#st").html(),
                    et: $("#et").html(),
                    query: qArr.join(","),
                    qArr: qArr,
                    qType: $("#jingque_mohu_select span").attr("data-val"),
                    t: "pv",
                    pageType: $("[name=pageType]").val() == null || $("[name=pageType]").val() == "" ? "all" : $("[name=pageType]").val(),
                    sogoubaidu: jsogoubaidu.val()
                });
            });
        }
        var dom = document.getElementById("container");
        afterLoad(["js/echarts/echarts3_all.min.js", "jsx/DeepCopyUtil.js", "jsx/RQueryWords.js"], function () {
            var myChart = echarts.init(dom);
            if (pvOrCtr == "PV" || pvOrCtr == "pv") {
                var r_select = {
                    rit: {},
                    item: { val: "JINQUE", cn: "精确查询" },
                    items: [
                        { val: "MEHU", cn: "模糊查询" },
                        { val: "NOMAL", cn: "精确查询" }
                    ], qcb: function (now) {
                        queryHistory();
                    }
                };
                ReactDOM.render(React.createElement(RSelect, __assign({}, r_select)), document.getElementById("jingque_mohu_select"));
            }
            var dquerywordsProp = {
                rit: {},
                qArr: getParams().qArr,
                qcb: function (qArr) {
                    $("#i_query").val((qArr || []).join(","));
                    startPage();
                }
            };
            ReactDOM.render(React.createElement(RQueryWords, __assign({}, dquerywordsProp)), document.getElementById("d_query_words"));
            dquerywords_react = dquerywordsProp.rit["it"];
            function rePaintHistory(res, params) {
                try {
                    dquerywords_react.setState({ qArr: params.qArr });
                    var data = res;
                    for (var i in data["series"] || []) {
                        var item = data["series"][i];
                        if (i == 0) {
                            itemStyle = {
                                normal: {
                                    label: { show: true, position: 'top', formatter: '{c} %' }
                                }
                            };
                        }
                        item.type = "line";
                    }
                    var option = {
                        title: { text: '历史' + pvOrCtr },
                        tooltip: {
                            trigger: 'axis',
                        },
                        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
                        toolbox: { feature: { saveAsImage: {} } },
                        xAxis: { type: 'category', boundaryGap: false },
                        yAxis: {
                            type: 'value', axisLabel: {
                                show: true,
                                interval: 'auto'
                            }
                        }
                    };
                    var real = DeepCopyUtil.deepExtend(option, data);
                    var queryArr = limitArr(getParams().qArr, 5);
                    var legendArr = [];
                    if (isSogouBaidu(params)) {
                        _.map(queryArr, function (it) {
                            legendArr.push(it + "_baidu");
                            legendArr.push(it + "_sogou");
                        });
                    }
                    else {
                        legendArr = queryArr;
                    }
                    real.legend = { data: legendArr };
                    if (real && typeof real === "object") {
                        // var startTime = +new Date();
                        myChart.setOption(option, true);
                        // var endTime = +new Date();
                        // var updateTime = endTime - startTime;
                        // console.log("Time used:", updateTime);
                    }
                    myChart.on('click', function (params) {
                        console.log("mouseover  dddd ", params);
                    });
                }
                catch (e) {
                }
            }
            function startPage(params) {
                var p = $.extend({ typekey: "NORMAL" }, getParams(), params || {});
                if (p.qType == "MEHU") {
                    window.location.href = "query.html?isQuery=t&st=" + p.st + "&et=" + p.et + "&query=" + p.query + "&pc_wap=" + p.pc_wap;
                }
                else {
                    var pc_wap = p.pc_wap || "wap";
                    var apiName = pc_wap + "_history_pv";
                    if (isSogouBaidu(p)) {
                        apiName += "_sogoubaidu";
                    }
                    var apiUrl = SEARCHTOOLS_API_SERVER(apiName, p);
                    if (_.trim(p.query) != "" && p.st != "" && p.et != "") {
                        $.ajax(apiUrl, { dataType: "jsonp" }).done(function (res) {
                            rePaintHistory(res, p);
                        }).fail(function (e) {
                            rePaintHistory({}, p);
                        });
                    }
                    else {
                        rePaintHistory({}, p);
                        console.log("need params[ query st  et]", p);
                    }
                }
            }
            $("#a_query").click(startPage).click();
            $("body").on("click", '[name="time_se"]', function () {
                var type = $(this).attr("data-type");
                var num = $(this).attr("data-num");
                var noDate = getEndDateFromParams(getParams());
                var et = noDate.format("YYYYMMDD");
                var st = noDate.add(type, -1 * num).format("YYYYMMDD");
                var params2 = _.extend(getParams(), { st: st, et: et });
                params2.isInitStEt = "t";
                init(params2);
                startPage(params2);
            });
            window.searchtool_requery = startPage;
            $(".qkey-near").on("click", ".qkn-btn", function () {
                $(".qkey-near").find(".qkn-btn").removeClass("cur");
                $(this).addClass("cur");
            });
            $("body").keydown(function (e) {
                if (e.keyCode == 13) {
                    startPage();
                }
            });
        });
    });
})(jQuery);
//# sourceMappingURL=history_pv.js.map