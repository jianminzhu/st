/**
 * Created by zhujianmin on 2016/4/25.
 */
class QueryTable {
    constructor(eid, tableConf, params, coverToRowsF, apiUrlF, ajaxFialF, updateF, paramMd5F) {
        var v = this;
        v.eid = eid;
        v.tableConf = tableConf;
        v.params = params;
        v.coverToRowsF = coverToRowsF
        v.apiUrlF = apiUrlF;
        v.ajaxFialF = ajaxFialF || function (e) {
            };
        v.nowData = {conf: v.tableConf, params: v.params}
        v.updateF = updateF || function () {
            }
        v.paramMd5F = paramMd5F
        v.reactCache={};
    }

    setTableConf(tableConf) {
        this.nowData["conf"] = tableConf;
    }

    changeParams(params, extparams) {
        this.params = params
        this.extparams = extparams
        this.render()
    }

    render() {
        var v = this;
        var apiUrl = v.apiUrlF(v.params, this.extparams, v);
        
        var paramsMk5Key="";
        if(_.isFunction(v.paramMd5F)){
            try {
                paramsMk5Key = v.paramMd5F(v.params)
            } catch (e) {
            }
        }else{
            paramsMk5Key=md5(apiUrl);
        }
        var reactId= v.eid;
        v.showPager( )
        if (v.tableConf["isCache"]==true) {
            reactId="m_"+paramsMk5Key
            var isCached=v.reactCache[reactId]
            if($("#" + v.eid).find("#"+reactId).size()==0){
                $("#" + v.eid).append(`<div id='${reactId}' />`);
            }
            $("#"+v.eid).find(">div").each(function(){
                var jit=$(this)
                if(jit.attr("id")!=reactId){
                    jit.hide();
                }else{
                    jit.show();
                }
            });
            if(isCached==true){
                return;
            }
        } else {
            $("#" + v.eid).html("");
        }
        var params = v.params || {};
        var settings = {dataType: params._dataType_ || "jsonp"};
        if (params._jsonpCallback_) {
            settings.jsonpCallback = params._jsonpCallback_
        }
        if(_.trim(apiUrl)!=""){
            $.ajax(apiUrl, settings).done(function (res) {
                var tableRows = [];
                if (typeof (v.coverToRowsF) == "function") {
                    tableRows = v.coverToRowsF(res)
                }
                v.nowData["rows"] = tableRows
                var start = new Date().getTime();
                ReactDOM.render(<RTable data={v.nowData} updateF={v.updateF}/>, document.getElementById(reactId));
                var end = new Date().getTime();
                v.reactCache[reactId]=true;
                console.log(reactId, " render time ", end - start)
                v.renderPager(res)
            }).fail(function (e) {
                try {
                    v.ajaxFialF(e);
                } catch (e) {
                }
            })
        }else{
            console.log("[warn] apiUrl is empty,be ignore render the ",v.eid)
        }
    }
    getPageMd5Key(){//同一查询词相同参数（除去当前页数的），只保留一个分页
        var params=$.extend({},this.params,{pno:1})
        return "kpage_"+md5(this.apiUrlF(params))
    }
    showPager(){
        var v=this;
        var tableConf = v.tableConf;
        if(tableConf.isShowPager==true){
            var jpageRoot =$("#"+tableConf.pageRootSel)
            var kpageId=v.getPageMd5Key()
            var jpage=jpageRoot.find("#"+kpageId);
            if(jpage.size()==0){
                var jpage=$(`<div id='${kpageId}'>`);
                jpageRoot.append(jpage)
            }
            jpageRoot.find(">div").each(function(){
                const jit = $(this);
                var isHideThis=true;
                if(jit.attr("id")==kpageId){
                    isHideThis=false
                }
                if(isHideThis){
                    jit.hide();
                }else{
                    jit.show()
                }
                console.log("kpageId,isHideThis",kpageId,isHideThis)
            })
        }
    }
    renderPager(res, paramsMk5Key) {
        v=this;
        if( v.tableConf.isShowPager==true){
            var kpageId=v.getPageMd5Key()
            if(res.total)
            var totalPage=(Math.floor(res.total / res.psize) + ( res.total % res.psize == 0 ? 0 : 1));
            console.log("kpageId,totalPage",kpageId,totalPage)
            if (totalPage>1) {
                new kkpager(kpageId, res.psize).generPageHtml({
                    pno: res.pno,
                    //总页码
                    total: totalPage,
                    //总数据条数
                    totalRecords: res.total,
                    mode: 'click',//默认值是link，可选link或者click
                    click: function (n) {
                        this.selectPage(n);
                        try {
                            var params = $.extend({}, v.params, {pno: n})
                            v.changeParams(params)
                        } catch (e) {
                        }
                        return false;
                    }
                });
            }
        }
    };

    clean() {
        var v = this;
        v.nowData["rows"] = []
        ReactDOM.render(<RTable data={v.nowData} updateF={v.updateF}/>, document.getElementById(v.eid));
    }
}