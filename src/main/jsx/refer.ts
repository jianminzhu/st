(function ($, num_ctr, num_average_click_position, SEARCHTOOLS_API_SERVER) {
    $(function () {
        var uparams = UrlUtil.parseURL(window.location.href).params;
        var params={};
        eval("params=" + decodeURIComponent(uparams.jsonStr))

        afterLoad(["js/echarts/echarts3_all.min.js", "jsx/DeepCopyUtil.js"], function () {
            var referPieChart = echarts.init( document.getElementById("refer_pie"));
            var searchToolReferDetailTable = new QueryTable('refer_detail', {
                tcss: "opr-table",
                cols: [{
                    css: "qkey",
                    name: "refer",
                    cname: "refer",
                    style: {"text-align": "left"},
                    width: 150,
                    toHtml: function (val) {
                        if($.trim(val||"")!=""){
                            return `<a target="_blank" href="${val}">${val}</a>`;
                        }
                        return "无refer";
                    }
                },
                    {css: "num", name: "pv", cname: "PV", width: 80},
                    {css: "num", name: "percent", cname: "pv占比", width: 80}
                ],
                modCss: {index: 2, css: "bgfc"}
            }, params, function (res) {
                var results = res.result || [];
                var hostValueMap={}
                _.map(results,function(it){
                    var host="无域名"
                    var refer = it .refer||"";
                    if(_.trim(refer)!=""){
                        host=UrlUtil.parseURL(refer).host
                    }
                    var percent= Number(it .percent.replace("%",""))
                    var key=host;
                    if(percent!=NaN&&percent!=Infinity){
                        if(percent<1){
                            key="其它";
                        }
                        hostValueMap[key]=hostValueMap[key]||0;
                        hostValueMap[key]=hostValueMap[key]+percent;
                    }
                })
                var keyArr=[]
                var objArr=[]
                _.map(hostValueMap,function(val,key){
                    keyArr.push(key);
                    objArr.push({value:  Math.ceil(val*1000)  /1000, name: key})
                })
                var option = {
                    title: {
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c}% "
                    },
                    toolbox: {feature: {saveAsImage: {}}},
                    series: [
                        {
                            name: '来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: objArr,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                referPieChart.setOption(option, true);
                return results;
            }, function (params) {
                var pc_wap = (params.pc_wap || "wap")
                var apiName = pc_wap + "_refer_detail";
                var apiUrl = SEARCHTOOLS_API_SERVER(apiName, params);
                return apiUrl;
            })

            if (params.query && params.st && params.et) {
                $("#s_query").html(decodeURIComponent(params.query))
                $("#s_st_et").html(params.st + "~" + params.et)
                searchToolReferDetailTable.render();
            }
            $("#a_export").click(function(){
                var apiName = params.pc_wap+"_refer_detail_export";
                var url = SEARCHTOOLS_API_SERVER(apiName,params);
                if(_.trim(url||"")==""){
                    console.log(apiName,"没有配置url")
                }else{
                    window.open(url)
                }
            })
        })

    })
})(jQuery, num_ctr, num_average_click_position, SEARCHTOOLS_API_SERVER)