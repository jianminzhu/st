class RTable extends React.Component {
    componentDidMount() {
        var v = this;
        var props = v.props;
        var jroot = $(ReactDOM.findDOMNode(this));
        if ($.isFunction(props.init)) {
            props.init(jroot, this);
        }
        this.updateCallBack();
    }
    componentDidUpdate(){
       this.updateCallBack();
    }
    updateCallBack(){
        try {
            this.props.updateF(this.props)
        } catch (e) {
            console.log("11111",e)
        }
    }
    render() {
        var v = this;
        var data = v.props.data || {};
        try {
            data["_rit_RTable"] = v
        } catch (e) {
            console.log(e)
        };
        var conf = data.conf || {};
        var cols = conf.cols || []
        var rows = data.rows;
        var tableId = v.props.tableId||""
        var s = v.state || {};
        return (
            <table className={conf.tcss||""} data-tableId={tableId}>
                <colgroup>
                    {cols.map(function (col, index) {
                        var width = (col.width || 0) + "px"
                        return <col width={width}/>
                    })}
                </colgroup>
                <tr>
                    {cols.map(function (col, index) {
                        var html = (col.thtml || col.cname || col.name); 
                        return (
                            <th className={col.thcss||""} dangerouslySetInnerHTML={{__html:html}}
                                style={col.thstyle||{}}/>
                        )
                    })
                    }
                </tr>
                <tbody>
                {rows.map(function (row, rowIndex) {
                    var css = "";
                    try {
                        var perChangeCss = Number(conf.modCss.index);
                        if (perChangeCss > 0 && rowIndex % perChangeCss == 0) {
                            css = conf.modCss.css;
                        }
                    } catch (e) {
                    }
                    return (
                        <tr className={css}>
                            {cols.map(function (col, colIndex) {
                                var colVal =row[col.name];
                                if(colVal==null|| typeof(colVal) == "undefined"){
                                    colVal="";
                                }
                                if ($.isFunction(col.toHtml)) {
                                    try {
                                        colVal = col.toHtml(colVal, row, col, data,colIndex,rowIndex);
                                    } catch (e) {
                                    }
                                }
                                var colspan=0
                                var rowspan=0
                                if ($.isFunction(col.colRowSpan)) {
                                    try {
                                        var crSpanobj = col.colRowSpan(colVal, row, col, data,colIndex,rowIndex);
                                        rowspan=crSpanobj["rowspan"]||0;
                                        colspan=crSpanobj["colspan"]||0;
                                    } catch (e) {
                                    }
                                    //console.log('333',rowIndex,colIndex, rowspan,colspan )
                                }
                                if(colspan==0){colspan=1}
                                if(rowspan==0){rowspan=1}
                                if(rowspan == -1 || colspan==-1){
                                    return   
                                }else{
                                    return (
                                        <td rowSpan={rowspan} colSpan={colspan} className={col.css} style={col.style||{}} dangerouslySetInnerHTML={{__html: colVal}}/>
                                    )
                                }

                            })
                            }
                        </tr>
                    )
                })
                }
                </tbody>
            </table>
        )
    }
}