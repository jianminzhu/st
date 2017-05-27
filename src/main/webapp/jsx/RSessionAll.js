var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var RSessionAll = React.createClass({
    getInitialState: function () {
        return { sessions: [], hasNext: false, pager: { pno: 1, psize: 10, total: 0 }, type: "all" };
    },
    componentWillMount: function () {
        var v = this;
        try {
            v.props.rit["_rit"] = v;
        }
        catch (e) {
        }
        var pager = v.state.pager;
        pager.pno = v.props.startPno || 1;
        v.setState({ pager: pager });
        v.toPage(pager.pno);
    },
    nextPage: function () {
        this.toPage(this.state.pager.pno + 1);
    },
    toPage: function (pno) {
        var v = this;
        var pager = v.state.pager;
        pager.pno = pno;
        v.setState({ pager: pager, hasNext: false });
        var url = v.getUrl(pno);
        var ap = $.ajax(url, { dataType: "jsonp" });
        ap.done(function (resData) {
            var oldSessions = v.state.sessions || [];
            var totalPage = (Math.floor(resData.total / resData.psize) + (resData.total % resData.psize == 0 ? 0 : 1));
            var pager = v.state.pager;
            pager.total = resData.total;
            var hasNext = false;
            if (pno + 1 <= totalPage) {
                pager.psize = resData.psize;
                hasNext = true;
            }
            for (var index in resData.sessions || []) {
                oldSessions.push(resData.sessions[index]);
            }
            v.setState({ sessions: oldSessions, hasNext: hasNext, pager: pager });
        });
    },
    getUrl: function (pno) {
        var v = this;
        var p = v.props.params;
        var pc_wap = p.pc_wap;
        var apiName = pc_wap + "_session";
        var url = SEARCHTOOLS_API_SERVER(apiName, $.extend({}, p, { pno: pno || p.pno || 1 }));
        return url;
    },
    changeType: function (e) {
        var a = e.target;
        var type = this.props.params.type = a.getAttribute("data-type");
        this.setState({ sessions: [], hasNext: false, pager: { pno: 1, psize: 10, total: 0 }, type: type });
        this.toPage(1);
    },
    render: function () {
        var v = this;
        var params = v.props.params;
        var sessions = v.state.sessions;
        var pager = v.state.pager;
        var t = v.state.type;
        return (React.createElement("div", { className: "op-result" },
            React.createElement("ul", { className: "qr-nav clearfix" },
                React.createElement("li", null,
                    React.createElement("a", { href: "javascript:void(0)", onClick: v.changeType, className: t == "all" ? "cur" : "", "data-type": "all" }, "\u9ED8\u8BA4\u7ED3\u679C")),
                React.createElement("li", null,
                    React.createElement("a", { href: "javascript:void(0)", onClick: v.changeType, className: t == "CHANGE" ? "cur" : "", "data-type": "CHANGE" }, "\u53EA\u770B\u6362\u8BCD")),
                React.createElement("li", null,
                    React.createElement("a", { href: "javascript:void(0)", onClick: v.changeType, className: t == "VR" ? "cur" : "", "data-type": "VR" }, "\u53EA\u770B\u70B9\u51FBvr")),
                React.createElement("li", null,
                    React.createElement("a", { href: "javascript:void(0)", onClick: v.changeType, className: t == "NORMAL" ? "cur" : "", "data-type": "NORMAL" }, "\u53EA\u770B\u70B9\u51FB\u81EA\u7136\u7ED3\u679C")),
                React.createElement("li", null,
                    React.createElement("a", { href: "javascript:void(0)", onClick: v.changeType, className: t == "KMAP_QA" ? "cur" : "", "data-type": "KMAP_QA" }, "\u53EA\u770B\u70B9\u51FB\u77E5\u7ACB\u65B9")),
                React.createElement("li", null,
                    React.createElement("a", { href: "javascript:void(0)", onClick: v.changeType, className: t == "STRUCT" ? "cur" : "", "data-type": "STRUCT" }, "\u53EA\u770B\u70B9\u51FB\u7ED3\u6784\u5316")),
                React.createElement("li", null,
                    React.createElement("a", { href: "javascript:void(0)", onClick: v.changeType, className: t == "JH" ? "cur" : "", "data-type": "JH" }, "\u53EA\u770B\u70B9\u51FB\u805A\u5408"))),
            sessions.map(function (it, index) {
                var props = {
                    items: it.list,
                    uid: it.uid,
                    params: params,
                    pager: { pno: it.pno, psize: it.psize, total: it.total },
                    index: index
                };
                //TODO  分页接口处理
                return React.createElement(RSession, __assign({}, props));
            }),
            React.createElement("a", { href: "javascript:void(0)", className: "load-more", onClick: this.nextPage, style: { "display": v.state.hasNext && (sessions || []).length > 0 ? "" : "none" } },
                "\u52A0\u8F7D\u66F4\u591A",
                React.createElement("i", null),
                React.createElement("span", null,
                    "\uFF08\u5171",
                    pager.total || 0,
                    "\u6761\u6570\u636E\uFF0C\u6BCF\u6B21\u52A0\u8F7D \u663E\u793A",
                    pager.psize,
                    "\u6761\uFF09"))));
    }
});
//# sourceMappingURL=RSessionAll.js.map