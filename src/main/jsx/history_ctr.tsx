(function ($) {
    $(function () {

        var params = UrlUtil.parseURL(window.location.href).params;
        var pvOrCtr = params.t = params.t || "CTR";
        params.query = decodeURIComponent(params.query || "")
        var jsogoubaidu = searchtool_addInputById("sogoubaidu");
        jsogoubaidu.val(params.sogoubaidu||"")
        function isSogouBaidu(params){
            return params.sogoubaidu == "sogou" || params.sogoubaidu == "baidu";
        }

        function init(params,useEnd) {
            UrlUtil.initParams(function (p) {
                var st_day =p.st;
                var et_day =p.et;
                if(useEnd){
                    var et = getEndDateFromParams(p);
                    et_day = et.format("YYYYMMDD");
                    st_day = et.add("day", -31).format("YYYYMMDD");
                }
                // $("#st").html(st_day)
                // $("#et").html(et_day)
                $("[name=t_pc_crt]").html(p.t)
                $("#i_query").val(limitArrFormString(p.query || "", 5).join(","))
            }, params);
        }

        init(params,true);
        function getParams() {
            return UrlUtil.getParams(function (p) {
                var querys = $("#i_query").val();
                var qArr = limitArrFormString(querys, 5)
                return $.extend({pno: 1, psize: 10}, p, {
                    st: $("#st").html()
                    , et: $("#et").html()
                    , query: qArr.join(",")
                    , qArr: qArr
                    , qType: $("#jingque_mohu_select span").attr("data-val")
                    , t: "ctr"
                    , pageType: $("[name=pageType]").val()==null|| $("[name=pageType]").val()==""?"all":$("[name=pageType]").val()
                })
            });
        }

        var dom = document.getElementById("container");
        afterLoad(["js/echarts/echarts3_all.min.js", "jsx/DeepCopyUtil.js", "jsx/RQueryWords.js"], function () {
            var myChart = echarts.init(dom);
            var r_qwords = {}
            $("#i_query").change(function () {
                r_qwords["it"].changeMax5(getParams().qArr)
            })
            function rePaintHistory(res) {
                try {
                    var data = res
                    for (var i in data["series"] || []) {

                        var item = data["series"][i];
                        if (i == 0) {
                            itemStyle = {
                                normal: {
                                    label: {show: true, position: 'top', formatter: '{c} %'}
                                }
                            }
                        }
                        var rowDatas = item["data"]
                        item.type = "line"
                        for (var j in rowDatas) {
                            try {
                                rowDatas[j] = Math.ceil(rowDatas[j] * 10000) / 100
                            } catch (e) {
                            }
                        }
                    }
                    var option = {
                        title: {text: '历史' + pvOrCtr},

                        tooltip: {
                            trigger: 'axis',
                            formatter: function (items) {
                                var arr = [];
                                arr.push(items[0].name + "<br>")
                                for (var i in items) {
                                    var it = items[i];
                                    arr.push('<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + it.color + '"> </span>' + it.seriesName + ":" + it.value + "%<br/>")
                                }
                                return arr.join("");
                            }
                        },
                        grid: {left: '3%', right: '4%', bottom: '3%', containLabel: true},
                        toolbox: {feature: {saveAsImage: {}}},
                        xAxis: {type: 'category', boundaryGap: false},
                        yAxis: {
                            type: 'value', axisLabel: {
                                show: true,
                                interval: 'auto',
                                formatter: '{value} %'
                            }
                        }
                    };
                    var real = DeepCopyUtil.deepExtend(option, data)
                    const queryArr = limitArr(getParams().qArr,5);
                    var legendArr=[];
                    if(isSogouBaidu(params)){
                        _.map(queryArr,function(it){
                            legendArr.push(it+"_baidu")
                            legendArr.push(it+"_sogou")
                        })
                    }else{
                        legendArr=queryArr;
                    }
                    real.legend = {data: legendArr}
                    if (real && typeof real === "object") {
                        // var startTime = +new Date();
                        myChart.setOption(option, true);
                        // var endTime = +new Date();
                        // var updateTime = endTime - startTime;
                        // console.log("Time used:", updateTime);
                    }
                    myChart.on('click', function (params) {
                        console.log("mouseover  dddd ", params)
                    });
                } catch (e) {
                }
            }

            function queryHistory(params2) {
                var p = params2||getParams();
                var pc_wap = p.pc_wap;
                var apiName = "_history_ctr";
                if(isSogouBaidu(p)){
                    apiName+="_sogoubaidu";
                }
                var apiUrl = SEARCHTOOLS_API_SERVER(pc_wap + apiName, p);
                if (_.trim(p.query) != "" && p.st != "" && p.et != "") {
                    $.ajax(apiUrl, { dataType: "jsonp"}).done(function (res) {
                        rePaintHistory(res, p);
                    }).fail(function (e) {
                        rePaintHistory({})
                    })
                } else {
                    rePaintHistory({})
                    console.log("need params[ query st  et]", p)
                }
            }

            $("#a_query").click(function(){
                queryHistory()
            }).blur(function(){
                queryHistory()
            }).click();
            $("body").on("click", '[name="time_se"]', function () {
                var type = $(this).attr("data-type")
                var num = $(this).attr("data-num")
                var noDate = getEndDateFromParams(getParams());
                var et = noDate.format("YYYYMMDD");
                var st = noDate.add(type, -1 * num).format("YYYYMMDD");
                var params2 = _.extend(getParams(), {st: st, et: et});
                init(params2)
                queryHistory(params2);
            })

            $(".qkey-near").on("click", ".qkn-btn", function () {
                $(".qkey-near").find(".qkn-btn").removeClass("cur")
                $(this).addClass("cur")
            })
            var props = {
                rit: r_qwords,
                qArr: getParams().qArr
                , qcb: function (qArr) {
                    $("#i_query").val((qArr || []).join(","));
                    queryHistory()
                }
            }
            ReactDOM.render(<RQueryWords {...props}/>, document.getElementById("d_query_words"))
            $("body").keydown(function (e) {

                if (e.keyCode == 13) {
                    queryHistory();
                }
            })
        })
    })
})(jQuery);
