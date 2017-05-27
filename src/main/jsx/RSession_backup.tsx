var RSession = React.createClass({
    getInitialState: function () {
        return {items: [], showResults: false,ip:""}
    },
    chagneItems: function (items:any|Array) {
        var changedState={};
        changedState.items=items|| []
        try {
            var ip = changedState.items[0].ip||"";
            if(ip!=""){
                changedState.ip=ip;
            }
        } catch (e) {
            //console.log(e.toString())
        }
        this.setState(changedState)
    }, componentWillMount: function () {
        var v=this;
        var items = v.props.items || [];
        v.chagneItems(items);
        var uid = _.trim(v.props.params.uid||"");
        var query = _.trim(v.props.params.query||"");
        if(uid==""&&!v.hasQuery(items,query)){
           v.findFirstQueryPage(2)
        }
    } ,hasQuery:function(items,paramsQuery){
        var items=items||[]
        var hasQuery=false;
        for(var i in items){
            var it=items[i]
            var itQueryTrim = _.trim(it.query||"");
            var paramsQueryTrim = _.trim(paramsQuery);
            if(itQueryTrim==paramsQueryTrim){
                hasQuery= true;
                break;
            }
        }
        return hasQuery;
    },

    findFirstQueryPage: function (pno) {
        var v = this;
        var uid = v.props.uid;
        var params = v.props.params;
        var uidpsize = v.props.pager.psize;
        var p=$.extend({},params,{uidpno:pno,uidpsize:uidpsize,uid:uid})
        var pc_wap=p.pc_wap
        var apiName = pc_wap+"_session_uid";
        var url = SEARCHTOOLS_API_SERVER(apiName,p)
        var ap = $.ajax({url:url,dataType: "jsonp",success:function(resData){
            try {
                var theSession=resData["sessions"][0]
                var items = theSession.list||[];
                var hasQueryInItems = v.hasQuery(items,params.query);
                if(hasQueryInItems){//检查本页是否包含 query
                    v.repaintPager({pno: theSession.pno, psize: theSession.psize, total: theSession.total})
                    v.setState({items:items})
                }else{
                    var totalPage = (Math.floor(theSession.total / theSession.psize) + ( theSession.total %theSession.psize == 0 ? 0 : 1));
                    if(theSession.pno< totalPage){
                        v.findFirstQueryPage(theSession.pno+1)
                    }
                    if(theSession.pno==totalPage){//如果找到最后一页，还是没有query，则显示最后一页数据
                        v.repaintPager({pno: theSession.pno, psize: theSession.psize, total: theSession.total})
                        v.chagneItems(items);
                    }
                }
            } catch (e) {
                v.chagneItems([]);
            }
        },error:function(e){
            v.chagneItems([]);
        }})
    },
    componentDidMount: function () {
        var v = this;
        var p = v.props.pager;
        v.repaintPager(p)
    },
    repaintPager: function (p) {
        var v = this;
        var totalPage = (Math.floor(p.total / p.psize) + ( p.total % p.psize == 0 ? 0 : 1));
        if (totalPage > 1) {
            var ele = v.refs.pager;
            var number = (v.props.index||0) ;
            if(number<0){
                number=0
            }

            new kkpager(ele.getAttribute("id"),p.psize,"").generPageHtml({
                pno: p.pno,
                //总页码
                total: totalPage,
                //总数据条数
                totalRecords: p.total,
                mode: 'click',//默认值是link，可选link或者click
                click: function (n) {
                    this.selectPage(n);
                    v.toPage(n)
                    return false;
                }
            });
        }
    },
    toPage: function (pno) {
        var v = this;
        var uid = v.props.uid;
        var params = v.props.params;
        var uidpsize = v.props.pager.psize;
        var p=$.extend({},params,{uidpno:pno,uidpsize:uidpsize,uid:uid})
        var pc_wap=p.pc_wap
        var apiName = pc_wap+"_session_uid";
        var url = SEARCHTOOLS_API_SERVER(apiName,p)
       var ap = $.ajax( {url:url,dataType: "jsonp",success:function(resData){
            try {
                var oneSession=resData["sessions"][0]
                v.repaintPager({pno: oneSession.pno, psize: oneSession.psize, total: oneSession.total})
                v.setState({items:oneSession.list})
            } catch (e) {
                v.setState({items:[]})
            }
        },error:function(e){
            v.setState({items:[]})
        }})
    },

    toggleShowData: function () {
        var v = this;
        var isShowResult = v.state.showResults ? "" : "none"
        v.setState({showResults: !v.state.showResults})
        v.refs["sessionData"].style.display = isShowResult;
    },
     limitUrl:function(url:string, limit) {
        var limit=limit||55;
        var showVal = url
        if ((showVal || "").length > limit) {
            showVal = url.substr(0, limit) + "..."
        }
        return showVal;
    },
    render: function () {
        var v = this;
        var sessionId = v.props.uid;
        var index = v.props.index;

        var params = v.props.params;
        var st_et = params.st + "~" + params.et;
        var items = v.state.items || [];
        var ip=v.state.ip
        var showResults = v.state.showResults;
        function em_red_query(msg,query){
            var m= msg||""
            var q=query||"";
            var s = m.replace( new RegExp("(.{1,})"+q+"(.{1,})","g"),"$1<em class='red'>"+q+"</em>$2");
            return  s;
        }
        return (
            <div id={"sid_"+index}>
                <div className="qr-sinfo">
                    <span className="time"><i></i>{st_et}</span>
                    <span className="ip">ip:{ip}</span>
                    <span className="uid">uid: {sessionId}</span>
                    <a href="javascript:void(0)" className="qr-os" data-toggle={sessionId+"_content"}  data-toggle-css-hide="qr-osc"></a>
                    <a href="javascript:void(0)" className="qr-close"  data-hide={"sid_"+index}></a>
                </div>
                <div id={sessionId+"_content"}>
                    <div className="query-r query-r2 query-scroolbox" ref="sessionData">
                        <table className="opr-table">
                            <colgroup>
                                <col width="110px"/>
                                <col width="180px"/>
                                <col width="100px"/>
                                <col width="300px"/>
                            </colgroup>
                            <tr>
                                <th className="qkey">时间</th>
                                <th className="qkey">动作</th>
                                <th className="qkey">query</th>
                                <th className="qkey">URL</th>
                            </tr>
                            {items.map(function (item) {
                                var query=item.query
                                var pc_wap = params.pc_wap;
                                var site="http://m.sogou.com/web/searchList.jsp?keyword="
                                if(pc_wap=="pc"){
                                    site = " https://www.sogou.com/web?query=";
                                }
                                var queryHtml=`<a target="_blank" href="${site}${encodeURIComponent(query)}">${query}</a>`
                                var queryHtml =` <p>${queryHtml}</p>`;
                                return (
                                    <tr>
                                        <td className="qkey">
                                            <p>{item.optime}</p>
                                        </td>
                                        <td className="qkey"  dangerouslySetInnerHTML={{__html:" <p>"+em_red_query(item.typename,params.query)+"</p>"}}>
                                        </td>
                                        <td className="qkey" dangerouslySetInnerHTML={{__html: queryHtml}}>

                                        </td>
                                        <td className="qkey">
                                            <a href={item.url} target="_blank">{v.limitUrl(item.url,50)}</a>
                                        </td>
                                    </tr>
                                )
                            })}
                        </table>
                    </div>
                    <div id={"page_"+index} ref="pager"></div>
                </div>
            </div>
        )
    }
})