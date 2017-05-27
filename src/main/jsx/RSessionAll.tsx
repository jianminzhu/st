var RSessionAll = React.createClass({
    getInitialState:function(){
        return {sessions:[],hasNext:false ,pager:{pno:1,psize:10,total:0},type:"all"}
    },
    componentWillMount:function() {
        var v=this;
        try {
            v.props.rit["_rit"] = v;
        } catch (e) {
        }
        var pager=v.state.pager;
        pager.pno=v.props.startPno||1;
        v.setState({pager:pager})
        v.toPage(pager.pno)
    },
    nextPage:function(){
        this.toPage(this.state.pager.pno+1)
    },
    toPage:function(pno){
        var v=this;
        var pager=v.state.pager;
        pager.pno=pno;
        v.setState({pager:pager,hasNext:false})
        var url=v.getUrl(pno)
        var ap= $.ajax(url,{dataType:"jsonp"})
        ap.done(function(resData) { //ap.then
            var oldSessions=v.state.sessions||[];
            var totalPage = (Math.floor(resData.total / resData.psize) + ( resData.total % resData.psize == 0 ? 0 : 1));
            var pager=v.state.pager;
            pager.total=resData.total;
            var hasNext=false;
            if( pno+1<=totalPage){
                pager.psize=resData.psize;
                hasNext=true;
            }
            for(var index in resData.sessions||[]){
                oldSessions.push(resData.sessions[index])
            }
            v.setState({sessions:oldSessions,hasNext:hasNext,pager:pager});
        })
    },
    getUrl :function(pno){
        var v = this;
        var p=v.props.params
        var pc_wap=p.pc_wap
        var apiName = pc_wap+"_session";
        var url = SEARCHTOOLS_API_SERVER(apiName,$.extend({},p,{pno : pno||p.pno||1}))
        return url;
    },
    changeType:function(e){
        var a = e.target;
        var type=this.props.params.type=a.getAttribute("data-type")
        this.setState({sessions:[],hasNext:false,pager:{pno:1,psize:10,total:0},type:type});
        this.toPage(1)
    },
    render:function (){
        var v = this;
        var params=v.props.params
        var sessions=v.state.sessions;
        var pager=v.state.pager
        var t=v.state.type
        return (
            <div className="op-result">
                <ul className="qr-nav clearfix">
                    <li><a href="javascript:void(0)" onClick={v.changeType} className={t=="all"    ?"cur":""} data-type="all"     >默认结果</a></li>
                    <li><a href="javascript:void(0)" onClick={v.changeType} className={t=="CHANGE" ?"cur":""} data-type="CHANGE"  >只看换词</a></li>
                    <li><a href="javascript:void(0)" onClick={v.changeType} className={t=="VR"     ?"cur":""} data-type="VR"       >只看点击vr</a></li>
                    <li><a href="javascript:void(0)" onClick={v.changeType} className={t=="NORMAL" ?"cur":""} data-type="NORMAL"  >只看点击自然结果</a></li>
                    <li><a href="javascript:void(0)" onClick={v.changeType} className={t=="KMAP_QA"?"cur":""} data-type="KMAP_QA"  >只看点击知立方</a></li>
                    <li><a href="javascript:void(0)" onClick={v.changeType} className={t=="STRUCT" ?"cur":""} data-type="STRUCT"  >只看点击结构化</a></li>
                    <li><a href="javascript:void(0)" onClick={v.changeType} className={t=="JH"     ?"cur":""} data-type="JH"       >只看点击聚合</a></li>
                    {/*<li>
                        <a href="javascript:void(0)" className="cur qn-more">更多<i></i></a>
                        <ul className="qr-sn" style={{display:"none"}}>
                            <li><a href="javascript:void(0)">只看点击聚合</a></li>
                        </ul>
                    </li>*/}
                </ul>
                {sessions.map(function (it,index) {
                    var props = {
                        items: it.list,
                        uid: it.uid,
                        params: params,
                        pager: {pno: it.pno, psize: it.psize, total:it.total},
                        index:index
                    }
                    //TODO  分页接口处理
                    return <RSession {...props}/>
                })}
                <a href="javascript:void(0)" className="load-more" onClick={this.nextPage}  style={{"display":v.state.hasNext&&(sessions||[]).length>0?"":"none"}}>
                    加载更多<i></i><span>（共{pager.total||0}条数据，每次加载 显示{pager.psize}条）</span>
                </a>
            </div>
        )
    }
});