var DeepCopyUtil = (function () {
    function DeepCopyUtil() {
    }
    DeepCopyUtil.type = function (obj) {
        return {}.toString.call(obj).slice(8, -1);
    };
    DeepCopyUtil.deepExtend = function (target, source) {
        var type = DeepCopyUtil.type;
        var copy, tar, tpc, tpt, newTar, f = arguments.callee;
        if (!source) {
            tpt = type(target);
            if (tpt != "Object" && tpt != "Array")
                return target;
            source = target;
            target = [];
            if (tpt == "Object")
                target = {};
        }
        for (var i in source) {
            copy = source[i], tar = target[i], tpc = type(copy), tpt = type(tar);
            if (tpc == "Array") {
                target[i] = f(tpt == "Array" ? tar : [], copy);
            }
            else if (tpc == "Object") {
                target[i] = f(tpt == "Object" ? tar : {}, copy);
            }
            else {
                target[i] = copy;
            }
        }
        return target;
    };
    return DeepCopyUtil;
}());
//# sourceMappingURL=DeepCopyUtil.js.map