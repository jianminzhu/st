/**
 * 依赖 md5.js  lodash1.4.2.js  jquery-json.2.4.js
 */
class SgWxUrlUtil {
    KEY_MD5 = "__md5__";
    srcMd5UrlMap={};
    decryptMd5UrlMap={};
    doA(decodeUrl:any|string, isOpenInNew:boolean) {
        if (isOpenInNew) {
            window.open(decodeUrl)
        } else {
            window.location.href = decodeUrl
        }
    };
    /**
     * 过滤微信，并组装成数组
     * url(单个),urls(字符串数组),urlObj(url对象{encUrl})
     * @param hrefOrEncObjs
     * @returns {Array}
     */
    madeToEncObjArr(hrefOrEncObjs){
        var encObjArr=[];
        var v=this;
        var appendMd5={}
        if(_.isString(hrefOrEncObjs)){
            var url=hrefOrEncObjs;
            v.appendEncObj(encObjArr, url,appendMd5)
        }else if(_.isArray(hrefOrEncObjs)){
            _.map(hrefOrEncObjs,function(urlOrObj){
                if(_.isString(urlOrObj)){
                    var url=urlOrObj
                    v.appendEncObj(encObjArr,url,appendMd5)
                }else if(_.isPlainObject(urlOrObj)){
                    var encObj=urlOrObj;
                    v.appendEncObj(encObjArr,encObj.encUrl,appendMd5)
                }
            })
        }else if(_.isPlainObject(hrefOrEncObjs)){
            var encObj=hrefOrEncObjs;
            v.appendEncObj(encObjArr,encObj.encUrl,appendMd5)
        }
        return encObjArr;
    }
    appendEncObj(encObjArr,url,appendMd5){
        var isWxUrl = this.isWxUrl;
        var appendMd5=appendMd5||{}
        var notDecrypt=this.notDecrypt;
        var url = url||"";
        var urlMd5 = md5(url);
        var srcMd5UrlMap = this.srcMd5UrlMap;
        if(isWxUrl(url)&&notDecrypt(urlMd5)&&appendMd5[urlMd5]!=true){
            var encObj={};
            encObj[this.KEY_MD5]=  urlMd5;
            appendMd5[urlMd5]=true;
            encObj["encUrl"]= url;
            srcMd5UrlMap[urlMd5]=url;
            encObjArr.push(encObj)
        }
    }
    isWxUrl(url){
        var url=url||"";
        return (url.indexOf("mp.weixin.qq.com") != -1) && (url.indexOf("signature=") != -1) && (url.indexOf("timestamp=") != -1)
    }
    notDecrypt(md5){
        try {
            return _.trim(this.decryptMd5UrlMap[md5] || "") == "";
        } catch (e) {
            return true;
        }
    }

    decodeUrl(hrefOrEncObjs, timeout) {
        var v=this;
        var dtd = $.Deferred();
        var encObjArr=this.madeToEncObjArr(hrefOrEncObjs);
        var decryptMd5UrlMap=this.decryptMd5UrlMap;
        var start=new Date().getTime()
        if(encObjArr.length>0){
            $.ajax({
                url: "http://weixin.sogou.com/websearch/weixinurldecpy.jsp"
                , data: {
                    jsonParams: $.toJSON(encObjArr)
                },
                timeout: timeout||2000
                , dataType: "jsonp"
                , success: function (res) {
                    _.map(res.items, function (r) {
                        if(_.trim(r.url||"")!=""){
                            var urlMd5=r[v.KEY_MD5];
                            decryptMd5UrlMap[urlMd5]=r.url;
                        }
                    })
                    dtd.resolve(decryptMd5UrlMap,encObjArr,start,res.items)
                }, error: function () {
                    dtd.resolve(decryptMd5UrlMap,encObjArr,start)
                }
            })
        }else{
            dtd.resolve(decryptMd5UrlMap,encObjArr,start)
        }
        return dtd.promise();
    }
    dealWxUrls(jroot){
        var v=this;
        var urls=[];
        var jroot=jroot||$("body");
        jroot.find("a").each(function(){
            var url=$(this).attr("href");
            var isNotDecrypt=($(this).attr("data-isdecrypt")!="t")
            if(v.isWxUrl(url) && isNotDecrypt ){
                urls.push(url)
                $(this).attr("href","javascript:void(0)");
                $(this).attr("data-wxmd5",md5(url));
                $(this).attr("data-wxhref",url);
            }
        })
        return urls;
    }
    dealAllEncUrl(jroot){
        var v=this;
        var urls=v.dealWxUrls(jroot||$("body"));
        v.decodeUrl(urls,8000).then(function(decryptMd5UrlMap, encObjArr,start){
            console.log("cost",new Date().getTime()-start)
            _.map(encObjArr,function(encObj){
                var decUrl="";
                var md5="";
                try {
                    md5 = encObj[v.KEY_MD5];
                    decUrl = decryptMd5UrlMap[md5];
                } catch (e) {
                }
                if(_.trim(decUrl)!=""){
                    $("[data-wxmd5="+md5+"]").attr("href",decUrl).attr("data-isdecrypt","t");
                }
            })

        })
    }

}

try {
    if (window.jQuery) {
        (function ($) {
            $(function(){
                SEARCHTOOLS_WXURLUTIL = new SgWxUrlUtil();
                SEARCHTOOLS_WXURLUTIL.dealAllEncUrl();
                // setInterval(function(){
                //     SEARCHTOOLS_WXURLUTIL.dealAllEncUrl()
                // },15000);
                $("body").on('click', 'a[data-wxhref]', function (e) {
                    var openInNew = $(this).attr("target") == "_blank";
                    var url = $(this).attr("data-wxhref")
                    var decUrl = _.trim($(this).attr("href")||"")
                    if(decUrl!=""&&decUrl!="javascript:void(0)"){//已经解密成功的什么也不做
                        return ;
                    }else{
                        SEARCHTOOLS_WXURLUTIL.decodeUrl(url,3000).then(function(decryptMd5UrlMap, encObjArr){
                            var decUrl=url;
                            if(encObjArr.length==1){
                                try {
                                    decUrl = decryptMd5UrlMap[encObjArr[0][SEARCHTOOLS_WXURLUTIL.KEY_MD5]];
                                } catch (e) {
                                }
                            }
                            SEARCHTOOLS_WXURLUTIL.doA(decUrl, openInNew);
                        })
                    }
                });
            })
        })(jQuery)
    }
} catch (e) {
}
