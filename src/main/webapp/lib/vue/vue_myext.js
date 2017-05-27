require.config({
    paths: {
        text: './js/text',
        vue: './js/vue.min'
    }
});
var web_root_for_vue = ""; //vue组件相对于站点的根路径
function require_vue_conponent(name) {
    return function (resolve, reject) {
        var s = web_root_for_vue + name;
        //修复因绝对路径导致的不能加载问题（绝对路径时对应的真实url没有.js）
        if (s.charAt(0) == "/" && s.lastIndexOf(".js") == -1) {
            s += ".js";
        }
        require([s], function (comp) {
            resolve(comp);
        });
    };
}
vuerun = function (vueCopomentnames) {
    var arr = (vueCopomentnames || "").split(",");
    var reg = function (name, compomentPath) {
        return Q.promise(function (r, rj) {
            require(['./js/vue'], function (Vue) {
                Vue.component(name, require_vue_conponent(compomentPath || name));
                try {
                    r(Vue);
                }
                catch (e) {
                }
            });
        });
    };
    var qArr = [];
    arr.map(function (value) {
        if (value.trim() != "") {
            qArr.push(reg(value));
        }
    });
    return Q.promise(function (r, rj) {
        Q.all(qArr).then(function (arr) {
            r(arr[0]);
        });
    });
};
//# sourceMappingURL=vue_myext.js.map 
//# sourceMappingURL=vue_myext.js.map