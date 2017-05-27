class SpinnerUtil {

    target
    spinner
    count=0
    jloading
    constructor(opts,spinnerId){
        var v=this;
        var jloading=$("body").find("#searchtool_loading")
        if(jloading.size()==0){
            jloading=$('<div class="load-tip" style="display:none" id="searchtool_loading"><img src="images/loading.gif">加载中...</div>')
            $("body div.op-result").prepend(jloading)
        }
        this.jloading=jloading;
    }
    show(){
        ++this.count
        this.jloading.show()
    }
    hide(){
        --this.count
        if(this.count==0){
            this.jloading.hide()
        }

    }
}
