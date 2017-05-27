class PObj {
    key
    t = "h"//html input
    sel
    dt = "date"
    df = "YYYYMMDD"
    dv = moment().format(this.df)
    dadd = 0

    constructor(obj) {
        if (typeof obj == "object") {
            try {
                this.t = obj.t || "h";
            } catch (e) {
            }
            try {
                this.sel = obj.sel || "";
            } catch (e) {
            }
            try {
                this.dt = obj.dt || "";
            } catch (e) {
            }
            try {
                this.add = obj.add || 0;
            } catch (e) {
            }
            try {
                this.key = obj.key || "";
            } catch (e) {
            }
            try {
                this.dv = obj.dv;
            } catch (e) {
            }
        }
    }

    getVal() {
        var itemVal = "";
        try {
            var jit = $(this.sel);
            if (jit.size() >= 1) {
                var fun = "val";
                if (this.t == "h" || this.t == "html") {
                    itemVal = jit.html();
                } else if (this.t == "t" || this.t == "text") {
                    itemVal = jit.text();
                } else {
                    itemVal = jit.val();
                }
            }
        } catch (e) {
        }
        return itemVal;
    }


    setVal(paramsObjOrValue) {
        try {
            var key = $.trim(this.key)
            if (key != "") {
                var value = ""
                try {
                    value = paramsObjOrValue[key]
                } catch (e) {
                    value = paramsObjOrValue;
                }
                var jit = $(this.sel);
                if (jit.size() >= 1) {
                    var fun = "val";
                    if (this.t == "h" || this.t == "html") {
                        jit.html(value);
                    } else if (this.t == "t" || this.t == "text") {
                        jit.text(value);
                    } else {
                        jit.val(value);
                    }
                }
            }
        } catch (e) {
        }
    }
}

class UrlUtil {
    conf = {};

    constructor(conf) {
        this.conf = conf || {};
    }

    setOrGet(type, oldParams) {
        var conf = {
            et: {sel: "#et", t: "h", dt: "date", add: 0}
            , st: {sel: "#st", t: "h", dt: "date", df: "YYYYMMDD", dadd: 0}
            , query: {sel: "#i_query", t: "i"}
        }

        for (var key in conf) {
            var kconf = conf[key];
            var sel = $.trim(kconf.sel);
            var t = $.trim(kconf.t);
            var dataType = $.trim(kconf.dt);
            var getedParams = {}
            if (sel != "") {
                var jit = $(sel);
                if (t == "html" || t == "h") {
                    if (type == "get") {
                        getedParams[key] = jit.html();
                    }
                }


            }
        }
    }

    initP() {

    }

    static addLocationHrefParams(href:string) {
        var lhref = window.location.href;
        var start = lhref.indexOf("?");
        var s = ""
        if (start != -1) {
            if (href.indexOf("?") != -1) {
                href += "&" + lhref.substr(start + 1)
            } else {
                href += lhref.substr(start);
            }
        }
        return href;
    }

    static addElement(tagName, id, isDisplay, preApp) {
        var tname = $.trim(tagName || "");
        var rid = $.trim(id || "");
        if (tname != "" && rid != "") {
            var jit = $("#" + id)
            if (jit.size() == 0) {
                jit = $(`<${tname} id=${rid} style="display:${(isDisplay || false) == true ? "" : "none"}"/>`)
                if ((preApp || "a") == "p") {
                    $("body").prepend(jit)
                } else {
                    $("body").append(jit)
                }
            }
        }
        return jit;
    }
    static getSearchWithoutMark = function (url) {
        var s = "";
        try {
            var url=(url||"")
            var start = url.indexOf("?");
            if (start != -1) {
                s = url.substr(start + 1);
            }
        } catch (e) {
        }
        return s;
    }
    static initParams(callback, params) {
        var urlParams = UrlUtil.parseURL(window.location.href)
        var paramsAll = $.extend({}, urlParams.params, params || {})
        try {
            UrlUtil.addElement("input", "pc_wap")
            $("#pc_wap").val(urlParams.params.pc_wap || "wap")
        } catch (e) {
        }
        if (typeof callback == "function") {
            try {
                callback(paramsAll)
            } catch (e) {
            }
        }

    }
    static getPVal(name,url) {
        var urlParams = UrlUtil.parseURL(url||window.location.href)
        return urlParams.params[name];
    }

    static getParams(callback, params) {
        var urlParams = UrlUtil.parseURL(window.location.href)
        try {
            UrlUtil.addElement("input", "pc_wap");
            urlParams.params.pc_wap = urlParams.params.pc_wap || $("#pc_wap").val()
            if (urlParams.params.pc_wap == "") {
                urlParams.params.pc_wap = "wap"
                urlParams.params._wap_web = "wap"
            }else{
                urlParams.params._wap_web = "web"
            }
        } catch (e) {
        }
        if (typeof callback == "function") {
            return callback($.extend({}, urlParams.params, params || {}))
        }
    }

    static parseURL(url) {
        var a = document.createElement('a');
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':', ''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function () {
                var ret = {},
                    seg = a.search.replace(/^\?/, '').split('&'),
                    len = seg.length, i = 0, s;
                for (; i < len; i++) {
                    if (!seg[i]) {
                        continue;
                    }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                }
                return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
            hash: a.hash.replace('#', ''),
            path: a.pathname.replace(/^([^\/])/, '/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
            segments: a.pathname.replace(/^\//, '').split('/')
        };
    }

}

