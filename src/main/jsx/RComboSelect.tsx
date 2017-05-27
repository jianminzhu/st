/*var RComboSelect = React.createClass({
    getInitialState:function() {
        return {"items":[],"item": {}}
    },
    componentDidMount:function(){
        var v = this;
        var jroot=$(ReactDOM.findDOMNode(v))
        jroot.find("select").comboSelect();
        v.props.rit["it"] = v;
        var items=v.props.items||[]
        v.setState({"items":items,"item":items[0]||{}} )
    },
    render: function () { 
        var s=this.state;
        return (

            <select>
                {s.items.map(function(item){
                    var isChecked=(item.val==s.item.val)
                    return <option value={item.val} {isChecked?`checked=""`:""}>{item.cn||item.val||""}</option>
                })}
            </select>
        );
    }
});*/

var RComboSelect = React.createClass({
    changeCb(now){
        var v = this;
        var qcb = v.props.qcb;
        if (_.isFunction(qcb)) {
            try {
                qcb(now)
            } catch (e) {
            }
        }
    },
    handleChange: function (event:__React.FormEvent) {
        try {
            var v = this;
            var addQuery = v.refs.q.value;
            if (_.trim(addQuery || "") != "") {
                var qArr = _.union(v.state.qArr, [addQuery]);
                v.changeCb(qArr)
                v.setState({qArr: qArr, q: ""});
            }
        } catch (e) {
        }
    },
    componentDidMount:function(){
        var jroot=$(ReactDOM.findDOMNode(this))
        jroot.find("[data-rselect-bhide]").click(function(e){
            $(this).next().toggle()
            return false;
        })
        $("body").click(function(){
            jroot.find("[data-rselect-bhide]").next().hide()
        })
    }
    ,componentWillMount: function (){
        this.setState({ item:this.props.item||{},items:this.props.items||[]})

        try {
            this.props.rit["it"] = this;
        } catch (e) {
        }
    },
    handleShowVals:function (e) {
        var s = this.refs.sons.style;
        var ndp=s.display||""
        if(ndp!="none"){
            s.display="none"
        }else {
            s.display = ""
        }
    },
    inputChange:function (e) {
        var val = e.target.value;
        this.setState({value:val})
        var items = this.props.items;
        var matchedItems=_.find(items, function(it) { return it.val.indexOf(val) !=-1; });
        this.setState({items:matchedItems})
    },
    handleChange: function (e) {
        var val = e.target.getAttribute("data-val");
        var item  = _.filter(this.state.items,["val",val])[0];
        this.handleShowVals();
        this.changeCb(item.val)
        $(e.target).parent().hide()
        this.setState({item: item });
    },
    render: function () {
        var v=this;
        var s=this.state;
        var p=this.props;
        var width=p.width||"128px"
        var display = s.isShow==true?"":"none";
        return (
            <div className="sel-box q-nr" style={{"width":width}}>
                <input  data-rselect-bhide="" value={s.value}  onChange={v.inputChange} />
                <div className="sel-list" ref="sons" style={{display: display}}>
                    {s.items.map(function(item){
                        return <a href="javascript:void(0)" data-val={item.val||""} onClick={v.handleChange}>{item.cn||item.val||""}</a>
                    })}
                </div>
            </div>
        );
    }
});