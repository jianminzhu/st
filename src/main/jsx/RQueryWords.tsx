var RQueryWords = React.createClass({

    limitArr: function (qArr, limit) {
        var qArr = qArr || []
        var rQarr=[]
        if(qArr.length>limit){
            _.map(qArr,function(it,index){
                if(index<limit){
                    rQarr.push(it)
                }
            })
        }else{
            rQarr=qArr;
        }
        return rQarr;
    },

    splitRemoveRepeat: function (querys) {
        var qArr = (querys || "").split(",");
        var a={}
        var uQarr=[]
        _.map(qArr,function (it) {
            var it=_.trim(it)
            if(it!=""&&a[it]!=true){
                a[it]==true;
                uQarr.push(it)
            }
        })
        return _.union(uQarr);
    },

    limitArrFormString: function (querys, limitNum) {
        return this.limitArr(this.splitRemoveRepeat(querys, limitNum))
    },
    changeCb(qArr){
        var v = this;
        var qcb = v.props.qcb;
        v.changeMax5(qArr);
        if (_.isFunction(qcb)) {
            try {
                qcb(qArr)
            } catch (e) {
                console.log(e.toString())
            }
        }
    },
    changeMax5: function (qArr) {
        this.setState({qArr: this.limitArr( qArr || [],5) });
    }, getDiffrentAndNotEmpty: function (querys) {
        return _.filter(_.uniq((querys || "").split(",")), function (qword) {
            return _.trim(qword) != "";
        });
    },
    handleDelete: function (event:__React.FormEvent) {
        var delVal = $(event.target).parent().find("label").html();
        var v = this;
        var qArr = _.without(v.state.qArr, delVal);
        v.changeCb(qArr)
        v.setState({qArr: qArr});
    },
    handleSubmit: function (event:__React.FormEvent) {
        try {
            var v = this;
            var addQuery = _.trim(v.refs.q.value);
            if (addQuery != "" && v.state.qArr.length < 5) {
                var qArr = _.union(v.state.qArr, [addQuery]);
                this.setState({q: ""});
                v.changeCb(qArr)
            }
        } catch (e) {
        }
    }
    , getInitialState: function () {
        return {q: ''};
    }, componentWillMount(){
        this.changeMax5(this.props.qArr||[]);
        try {
            this.props.rit["it"] = this;
        } catch (e) {
        }
    },
    handleChange: function (event:__React.FormEvent) {
        var input:any = event.target;
        this.setState({q: input.value});
    },
    render: function () {
        var v = this
        var qArr = this.state.qArr;
        return (
            <div className="qkey-op">
                {qArr.map(function (value, index) {
                    if (qArr.length > 0) {
                        return <span className="qk-word"><label>{value}</label>
                        <a href="javascript:void(0)" className={qArr.length==1?"":"qk-x"}
                           onClick={qArr.length==1?function(){}:v.handleDelete}></a>
                     </span>
                    }
                })}
                <input ref="q" value={v.state.q} placeholder="添加对比词" className="qk-add" onChange={v.handleChange} style={{display:qArr.length>=5?"none":""}}/>
                <a href="javascript:void(0)" className="serbtn qk-g"  onClick={v.handleSubmit} style={{display:qArr.length>=5?"none":""}}>确定</a>
            </div>
        );
    }
});