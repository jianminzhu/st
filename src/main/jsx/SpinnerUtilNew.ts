class SpinnerUtilNew {
    opts = {
        lines: 13 // The number of lines to draw
        , length: 28 // The length of each line
        , width: 14 // The line thickness
        , radius: 42 // The radius of the inner circle
        , scale: 1 // Scales overall size of the spinner
        , corners: 1 // Corner roundness (0..1)
        , color: '#585858' // #rgb or #rrggbb or array of colors
        , opacity: 0.25 // Opacity of the lines
        , rotate: 0 // The rotation offset
        , direction: 1 // 1: clockwise, -1: counterclockwise
        , speed: 1 // Rounds per second
        , trail: 60 // Afterglow percentage
        , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
        , zIndex: 2e9 // The z-index (defaults to 2000000000)
        , className: 'spinner' // The CSS class to assign to the spinner
        , top: '50%' // Top position relative to parent
        , left: '45%' // Left position relative to parent
        , shadow: false // Whether to render a shadow
        , hwaccel: false // Whether to use hardware acceleration
        , position: 'absolute' // Element positioning
    }
    target
    spinner
    count=0
    constructor(opts,spinnerId){
        var v=this;
        var opts=opts||{}
        var spinnerId = spinnerId||'__windonw_spinner__';
        for(var key in v.opts ){
            if(!opts.hasOwnProperty(key)){
                opts[key]=v.opts[key]
            }
        }
        var target =v.target =document.getElementById(spinnerId)
        if(!target){
            var div=document.createElement("div")
            div.style.background="#333"
            div.setAttribute("id",spinnerId);
            var last=document.body.lastChild
            document.body.insertBefore(div,last)
            target=v.target=div
        }
        v.spinner = new Spinner(opts) ;
    }
    show(){
        ++this.count
        this.spinner.spin(this.target);
    }
    hide(){
        --this.count
        if(this.count==0){
            this.spinner.stop();
        }

    }
}
