var SpinnerUtil = (function () {
    function SpinnerUtil(opts, spinnerId) {
        this.count = 0;
        var v = this;
        var jloading = $("body").find("#searchtool_loading");
        if (jloading.size() == 0) {
            jloading = $('<div class="load-tip" style="display:none" id="searchtool_loading"><img src="images/loading.gif">加载中...</div>');
            $("body div.op-result").prepend(jloading);
        }
        this.jloading = jloading;
    }
    SpinnerUtil.prototype.show = function () {
        ++this.count;
        this.jloading.show();
    };
    SpinnerUtil.prototype.hide = function () {
        --this.count;
        if (this.count == 0) {
            this.jloading.hide();
        }
    };
    return SpinnerUtil;
}());
//# sourceMappingURL=SpinnerUtil.js.map