class ScrollToTop {
     constructor(showTopMinScrollHeight = 400) {
        $(function(){
            var getstop=function() {
                return ((document.body && document.body.scrollTop) || (document.documentElement && document.documentElement.scrollTop) || 0);
            }
            var jtoTop = $('[name=back-top]')
            if (jtoTop.size() == 0) {
                jtoTop = $(`<a id="back-top" href="#searchtool_a_top"><img  img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQwNEJBQzBFNUZDNDExRTU4NEEzRDkwMkE4NjcxODQ2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQwNEJBQzBGNUZDNDExRTU4NEEzRDkwMkE4NjcxODQ2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDA0QkFDMEM1RkM0MTFFNTg0QTNEOTAyQTg2NzE4NDYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDA0QkFDMEQ1RkM0MTFFNTg0QTNEOTAyQTg2NzE4NDYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7r/rAZAAABJElEQVR42uzYzapFUBQH8HPlNTyFJzExMBTqhIwMlAFFGXg3TAwNKC/gW3Hu/6bO4NapfUrO7bZWkf3R+rXYtPNV1/XtE8HjEAThYrVpGu72oSCYYIIJJvjfwl3XaZqm63rf99fBwEzTzPM8yzLHccZxvAKGatt2WZaKosiyXBQF7Hme35axA3kwxzAMqqqKopimKZr7vsdxjCbu+TRN7Hl+tj3sMFLjuYJJkgTk0YmLMAzReb/f2e03YCQ1DAMASnyqR2zbFgQBhizLWpblTBgqCkJqFPdLfdq+72MCHv+6rqfBWD5IirIAvJqDIc/zMM11XRaYZ1mAbdtKkoS8HPfyLcBQFEU4V1V1/qo+K4DSt5pgggkmmOC/B/PHP5jr4W8BBgAFEcbGe15UjQAAAABJRU5ErkJggg=="  /></a>`)

                $("body ").before(jtoTop)
                $("body div.op-result:eq(0)").before("<a name='searchtool_a_top'></a>")

            }


            jtoTop.css({
                "position": "fixed",
                "bottom": "130px",
                "z-index": " 30",
                "top": "80%",
                "left": "90%",
                "height":"40px",
                "background-color": " black"
            })

            jtoTop.click(function () {
                window.scrollTo(0, 0);
                return false;
            });

            window.onscroll = function () {
                var clientHeight = document.documentElement.clientHeight == 0 ? document.body.clientHeight : document.documentElement.clientHeight;
                var scrollHeight = document.documentElement.scrollHeight == 0 ? document.body.scrollHeight : document.documentElement.scrollHeight;
                console.log(getstop() , showTopMinScrollHeight)
                if (getstop() > showTopMinScrollHeight) {
                    jtoTop.show();
                } else {
                    jtoTop.hide();
                }
            };
        })
    } 
}
new ScrollToTop()
