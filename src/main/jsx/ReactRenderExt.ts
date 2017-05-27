class ReactRenderExt   {
    reactjs=["https://cdnjs.cloudflare.com/ajax/libs/react/15.0.2/react.min.js","https://cdnjs.cloudflare.com/ajax/libs/react/15.0.2/react-dom.min.js"]
    //reactjs:["js/react15/react.js","js/react15/react-dom.js"],
    renderObjToDom (reactClassName, props, domId) {
        var real=this.reactjs.slice()
        real.push('jsx/' + reactClassName + '.js')
        head.js(real, function () {
            eval('ReactDOM.render(React.createElement(' + reactClassName + ', props), document.getElementById("' + domId + '"))');
        })
    }
    bRender (domId_reactItem_objs) {
        var v=this;
        var eidRitems = domId_reactItem_objs || [];
        if (typeof eidRitems =="object" ) {
            if((eidRitems.eid || "") != ""){
                var one = eidRitems;
                v.renderObjToDom(one.name, one.props, one.eid);
            }else{
                for(var key in eidRitems){
                    var one=eidRitems[key]
                    try {
                        v.renderObjToDom(one.name, one.props, one.eid);
                    } catch (e) {
                    }
                }
            }
        }
    }
}
