var RSelect = React.createClass({
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
                <span  data-rselect-bhide="" data-val={s.item.val}>{s.item.cn||s.item.val||""}</span>
                <div className="sel-list" ref="sons" style={{display: display}}>
                    {s.items.map(function(item){
                        return <a href="javascript:void(0)" data-val={item.val||""} onClick={v.handleChange}>{item.cn||item.val||""}</a>
                    })}
                </div>
            </div>
        );
    }
});