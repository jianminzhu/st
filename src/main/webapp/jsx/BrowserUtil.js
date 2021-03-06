/**
 * Created by zhujianmin on 2016/4/21.
 */
var BrowserUtil = (function () {
    function BrowserUtil() {
    }
    BrowserUtil.prototype.genDownloadFile = function (fileName, content) {
        var aLink = document.createElement('a');
        var blob = new Blob([content]);
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", false, false); //initEvent 不加后两个参数在FF下会报错, 感谢 Barret Lee 的反馈
        aLink.download = fileName;
        aLink.href = URL.createObjectURL(blob);
        aLink.dispatchEvent(evt);
    };
    BrowserUtil.prototype.genCsvContent = function (cols, rows, titles) {
        var fileRows = [];
        try {
            var colArr = cols.split(",");
            var titleArr = (titles || "").split(",");
            var dealTitle = function (colArr, titleArr) {
                var realTitleArr = [];
                for (var i = 0; i < colArr.length; i++) {
                    realTitleArr.push(titleArr[i] || colArr[i]);
                }
                return realTitleArr;
            };
            fileRows.push(dealTitle(colArr, titleArr).join(","));
            for (var i = 0; i < rows.length; i++) {
                var rowContent = [];
                for (var j = 0; j < colArr.length; j++) {
                    rowContent.push(rows[i][colArr[j]] || "");
                }
                fileRows.push(rowContent.join(","));
            }
        }
        catch (e) {
        }
        return fileRows.join("\n");
    };
    return BrowserUtil;
}());
//# sourceMappingURL=BrowserUtil.js.map