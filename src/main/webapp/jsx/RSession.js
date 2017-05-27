var RSession = React.createClass({
    getInitialState: function () {
        return { items: [], showResults: false };
    },
    componentWillMount: function () {
        var v = this;
        var items = v.props.items || [];
        v.setState({ items: items });
        var uid = _.trim(v.props.params.uid || "");
        var query = _.trim(v.props.params.query || "");
        if (uid == "" && !v.hasQuery(items, query)) {
            v.findFirstQueryPage(2);
        }
    }, hasQuery: function (items, paramsQuery) {
        var items = items || [];
        var hasQuery = false;
        for (var i in items) {
            var it = items[i];
            var itQueryTrim = _.trim(it.query || "");
            var paramsQueryTrim = _.trim(paramsQuery);
            if (itQueryTrim == paramsQueryTrim) {
                hasQuery = true;
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
        var p = $.extend({}, params, { uidpno: pno, uidpsize: uidpsize, uid: uid });
        var pc_wap = p.pc_wap;
        var apiName = pc_wap + "_session_uid";
        var url = SEARCHTOOLS_API_SERVER(apiName, p);
        var ap = $.ajax({ url: url, dataType: "jsonp", success: function (resData) {
                try {
                    var theSession = resData["sessions"][0];
                    var items = theSession.list || [];
                    var hasQueryInItems = v.hasQuery(items, params.query);
                    if (hasQueryInItems) {
                        v.repaintPager({ pno: theSession.pno, psize: theSession.psize, total: theSession.total });
                        v.setState({ items: items });
                    }
                    else {
                        var totalPage = (Math.floor(theSession.total / theSession.psize) + (theSession.total % theSession.psize == 0 ? 0 : 1));
                        if (theSession.pno < totalPage) {
                            v.findFirstQueryPage(theSession.pno + 1);
                        }
                        if (theSession.pno == totalPage) {
                            v.repaintPager({ pno: theSession.pno, psize: theSession.psize, total: theSession.total });
                            v.setState({ items: items });
                        }
                    }
                }
                catch (e) {
                    v.setState({ items: [] });
                }
            }, error: function (e) {
                v.setState({ items: [] });
            } });
    },
    componentDidMount: function () {
        var v = this;
        var p = v.props.pager;
        v.repaintPager(p);
    },
    repaintPager: function (p) {
        var v = this;
        var totalPage = (Math.floor(p.total / p.psize) + (p.total % p.psize == 0 ? 0 : 1));
        if (totalPage > 1) {
            var ele = v.refs.pager;
            var number = (v.props.index || 0);
            if (number < 0) {
                number = 0;
            }
            new kkpager(ele.getAttribute("id"), p.psize, "").generPageHtml({
                pno: p.pno,
                //总页码
                total: totalPage,
                //总数据条数
                totalRecords: p.total,
                mode: 'click',
                click: function (n) {
                    this.selectPage(n);
                    v.toPage(n);
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
        var p = $.extend({}, params, { uidpno: pno, uidpsize: uidpsize, uid: uid });
        var pc_wap = p.pc_wap;
        var apiName = pc_wap + "_session_uid";
        var url = SEARCHTOOLS_API_SERVER(apiName, p);
        var ap = $.ajax({ url: url, dataType: "jsonp", success: function (resData) {
                try {
                    var oneSession = resData["sessions"][0];
                    v.repaintPager({ pno: oneSession.pno, psize: oneSession.psize, total: oneSession.total });
                    v.setState({ items: oneSession.list });
                }
                catch (e) {
                    v.setState({ items: [] });
                }
            }, error: function (e) {
                v.setState({ items: [] });
            } });
    },
    toggleShowData: function () {
        var v = this;
        var isShowResult = v.state.showResults ? "" : "none";
        v.setState({ showResults: !v.state.showResults });
        v.refs["sessionData"].style.display = isShowResult;
    },
    limitUrl: function (url, limit) {
        var limit = limit || 55;
        var showVal = url;
        if ((showVal || "").length > limit) {
            showVal = url.substr(0, limit) + "...";
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
        var ip = "";
        try {
            ip = items[0].ip;
        }
        catch (e) {
        }
        var showResults = v.state.showResults;
        function em_red_query(msg, query) {
            var m = msg || "";
            var q = query || "";
            var s = m.replace(new RegExp("(.{1,})" + q + "(.{1,})", "g"), "$1<em class='red'>" + q + "</em>$2");
            return s;
        }
        return (React.createElement("div", { id: "sid_" + index },
            React.createElement("div", { className: "qr-sinfo" },
                React.createElement("span", { className: "time" },
                    React.createElement("i", null),
                    st_et),
                React.createElement("span", { className: "ip" },
                    "ip:",
                    ip),
                React.createElement("span", { className: "uid" },
                    "uid: ",
                    sessionId),
                React.createElement("a", { href: "javascript:void(0)", className: "qr-os", "data-toggle": sessionId + "_content", "data-toggle-css-hide": "qr-osc" }),
                React.createElement("a", { href: "javascript:void(0)", className: "qr-close", "data-hide": "sid_" + index })),
            React.createElement("div", { id: sessionId + "_content" },
                React.createElement("div", { className: "query-r query-r2 query-scroolbox", ref: "sessionData" },
                    React.createElement("table", { className: "opr-table" },
                        React.createElement("colgroup", null,
                            React.createElement("col", { width: "110px" }),
                            React.createElement("col", { width: "180px" }),
                            React.createElement("col", { width: "100px" }),
                            React.createElement("col", { width: "150px" }),
                            React.createElement("col", { width: "150px" })),
                        React.createElement("tr", null,
                            React.createElement("th", { className: "qkey" }, "\u65F6\u95F4"),
                            React.createElement("th", { className: "qkey" }, "\u52A8\u4F5C"),
                            React.createElement("th", { className: "qkey" }, "query"),
                            React.createElement("th", { className: "qkey" }, "URL"),
                            React.createElement("th", { className: "qkey" }, "\u6E20\u9053")),
                        items.map(function (item) {
                            var query = item.query;
                            var pc_wap = params.pc_wap;
                            var queryUrl = searchtool_getKeywordUrl(query, pc_wap);
                            var queryHtml = " <p><a target=\"_blank\" href=\"javascript:void(0)\" data-wxhref=\"" + queryUrl + "\">" + sgDecodeURIComponent(query) + "</a></p>";
                            return (React.createElement("tr", null,
                                React.createElement("td", { className: "qkey" },
                                    React.createElement("p", null, item.optime)),
                                React.createElement("td", { className: "qkey", dangerouslySetInnerHTML: { __html: " <p>" + em_red_query(item.typename, params.query) + "</p>" } }),
                                React.createElement("td", { className: "qkey", dangerouslySetInnerHTML: { __html: queryHtml } }),
                                React.createElement("td", { className: "qkey" },
                                    React.createElement("a", { href: "javascript:void(0)", "data-wxhref": item.url, target: "_blank" }, v.limitUrl(item.url, 50))),
                                React.createElement("td", { className: "qkey" }, item.channel || "")));
                        }))),
                React.createElement("div", { id: "page_" + index, ref: "pager" }))));
    }
});
//# sourceMappingURL=RSession.js.map