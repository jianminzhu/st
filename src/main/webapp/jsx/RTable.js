var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var RTable = (function (_super) {
    __extends(RTable, _super);
    function RTable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RTable.prototype.componentDidMount = function () {
        var v = this;
        var props = v.props;
        var jroot = $(ReactDOM.findDOMNode(this));
        if ($.isFunction(props.init)) {
            props.init(jroot, this);
        }
        this.updateCallBack();
    };
    RTable.prototype.componentDidUpdate = function () {
        this.updateCallBack();
    };
    RTable.prototype.updateCallBack = function () {
        try {
            this.props.updateF(this.props);
        }
        catch (e) {
            console.log("11111", e);
        }
    };
    RTable.prototype.render = function () {
        var v = this;
        var data = v.props.data || {};
        try {
            data["_rit_RTable"] = v;
        }
        catch (e) {
            console.log(e);
        }
        ;
        var conf = data.conf || {};
        var cols = conf.cols || [];
        var rows = data.rows;
        var tableId = v.props.tableId || "";
        var s = v.state || {};
        return (React.createElement("table", { className: conf.tcss || "", "data-tableId": tableId },
            React.createElement("colgroup", null, cols.map(function (col, index) {
                var width = (col.width || 0) + "px";
                return React.createElement("col", { width: width });
            })),
            React.createElement("tr", null, cols.map(function (col, index) {
                var html = (col.thtml || col.cname || col.name);
                return (React.createElement("th", { className: col.thcss || "", dangerouslySetInnerHTML: { __html: html }, style: col.thstyle || {} }));
            })),
            React.createElement("tbody", null, rows.map(function (row, rowIndex) {
                var css = "";
                try {
                    var perChangeCss = Number(conf.modCss.index);
                    if (perChangeCss > 0 && rowIndex % perChangeCss == 0) {
                        css = conf.modCss.css;
                    }
                }
                catch (e) {
                }
                return (React.createElement("tr", { className: css }, cols.map(function (col, colIndex) {
                    var colVal = row[col.name];
                    if (colVal == null || typeof (colVal) == "undefined") {
                        colVal = "";
                    }
                    if ($.isFunction(col.toHtml)) {
                        try {
                            colVal = col.toHtml(colVal, row, col, data, colIndex, rowIndex);
                        }
                        catch (e) {
                        }
                    }
                    var colspan = 0;
                    var rowspan = 0;
                    if ($.isFunction(col.colRowSpan)) {
                        try {
                            var crSpanobj = col.colRowSpan(colVal, row, col, data, colIndex, rowIndex);
                            rowspan = crSpanobj["rowspan"] || 0;
                            colspan = crSpanobj["colspan"] || 0;
                        }
                        catch (e) {
                        }
                        //console.log('333',rowIndex,colIndex, rowspan,colspan )
                    }
                    if (colspan == 0) {
                        colspan = 1;
                    }
                    if (rowspan == 0) {
                        rowspan = 1;
                    }
                    if (rowspan == -1 || colspan == -1) {
                        return;
                    }
                    else {
                        return (React.createElement("td", { rowSpan: rowspan, colSpan: colspan, className: col.css, style: col.style || {}, dangerouslySetInnerHTML: { __html: colVal } }));
                    }
                })));
            }))));
    };
    return RTable;
}(React.Component));
//# sourceMappingURL=RTable.js.map