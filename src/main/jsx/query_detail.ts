(function($,num_ctr,num_average_click_position,SEARCHTOOLS_API_SERVER){
    $(function () {
        var uparams = UrlUtil.parseURL(window.location.href);
        var params = {};
        var row = {};
        eval("params=" + decodeURIComponent(uparams.params.paramsJson))
        eval("row=" + decodeURIComponent(uparams.params.rowJson))
        function init(p) {
            $("#l_st_et").html(`${p.st}-${p.et}`)
            $("#l_query").html(p["query"] || "")
        }
        init(params)
        params=$.extend({pno:1,psize:100},row,params)
        console.log("{pno:1,psize:100},row,params" ,row,params)
        function renderTotal (urlkey){
            if((row.urlkey||"")=="" && (urlkey||"")!=""){
                row.urlkey=urlkey;
            }
            var totalShow = {
                conf: {
                    tcss: "opr-table",
                    cols: [{
                        css: "qkey", name: "typekey", cname: "名称", width: 200, toHtml: function (val, row) {
                            var tk = row["typekey"] || "";
                            var split = ":";
                            if (tk == "NORMAL") {
                                tk = "普通结果"
                                split = ""
                            }
                            return `${tk}${split}${row["typename"] || ""}`;
                        }
                    }
                        , {css: "num", name: "urlkey", cname: "结果主链接", width: 200, style: {"text-align": "left"}, toHtml: function (val, row) {
                            return `<a target="_blank" href="javascript:void(0)" data-wxhref="${val}">${limitUrl(val )}</a>`;
                        }
                        }
                        , {css: "num", name: "pv", cname: "PV", width: 80}
                        , {css: "num", name: "click", cname: "点击量", width: 80}
                        , {css: "num", name: "pos", cname: "平均点击位置", width: 80, toHtml: num_average_click_position},
                        , {css: "num", name: "ctr", cname: "CTR", width: 80, toHtml: num_ctr}
                    ]
                }, rows: [row]
            };
            ReactDOM.render(React.createElement(RTable, {data: totalShow}), document.getElementById("wapqueryclick_per_total"));
        };


        wapQueryDetail = new QueryTable('wapqueryclick_detail', {
            tcss: "opr-table",
            cols: [{css: "qkey",name: "url",cname: "url",style:{"text-align":"left"},width: 400,toHtml:function(val){return `<a target="_blank" href="javascript:void(0)" data-wxhref="${val}">${limitUrl(val,70)}</a>`}},
                {css: "num",name: "pv",cname: "PV",width: 80},
                {css: "num", name: "click", cname: "点击量", width: 80},
                {css: "num", name: "pos", cname: "平均点击位置", width: 80,toHtml:num_average_click_position},
                {css: "num",name: "ctr",cname: "CTR",width: 80,toHtml:num_ctr},
            ],
            modCss: {index: 2, css: "bgfc"}
        }, params, function (res) {
            if(res.total==0||res.pno==1){//第一页请求成功或总数据为0,渲染total
                var urlkey="";
                try {
                    urlkey = res.details[0].url
                } catch (e) {
                }
                renderTotal(urlkey);
            }
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
            return SEARCHTOOLS_API_SERVER((params.pc_wap||"wap")+"_query_detail",params);
        })
        if (params.query && params.st && params.et) {
            wapQueryDetail.render();
        }
    })
})(jQuery,num_ctr,num_average_click_position,SEARCHTOOLS_API_SERVER)