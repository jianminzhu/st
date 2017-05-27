function SearchToolZtree(jnav, defaultOpenNode, idMapConfig, zNodes) {
    var getRootParentConfig = function (id) {
        return idMapConfig[(id + "").charAt(0)];
    };
    //同级只展开一个节点
    var curExpandNode = null;
    function beforeExpand(treeId, treeNode) {
        var pNode = curExpandNode ? curExpandNode.getParentNode() : null;
        var treeNodeP = treeNode.parentTId ? treeNode.getParentNode() : null;
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        for (var i = 0, l = !treeNodeP ? 0 : treeNodeP.children.length; i < l; i++) {
            if (treeNode !== treeNodeP.children[i]) {
                zTree.expandNode(treeNodeP.children[i], false);
            }
        }
        while (pNode) {
            if (pNode === treeNode) {
                break;
            }
            pNode = pNode.getParentNode();
        }
        if (!pNode) {
            singlePath(treeNode);
        }
    }
    function singlePath(newNode) {
        if (newNode === curExpandNode)
            return;
        var zTree = $.fn.zTree.getZTreeObj("treeDemo"), rootNodes, tmpRoot, tmpTId, i, j, n;
        if (!curExpandNode) {
            tmpRoot = newNode;
            while (tmpRoot) {
                tmpTId = tmpRoot.tId;
                tmpRoot = tmpRoot.getParentNode();
            }
            rootNodes = zTree.getNodes();
            for (i = 0, j = rootNodes.length; i < j; i++) {
                n = rootNodes[i];
                if (n.tId != tmpTId) {
                    zTree.expandNode(n, false);
                }
            }
        }
        else if (curExpandNode && curExpandNode.open) {
            if (newNode.parentTId === curExpandNode.parentTId) {
                zTree.expandNode(curExpandNode, false);
            }
            else {
                var newParents = [];
                while (newNode) {
                    newNode = newNode.getParentNode();
                    if (newNode === curExpandNode) {
                        newParents = null;
                        break;
                    }
                    else if (newNode) {
                        newParents.push(newNode);
                    }
                }
                if (newParents != null) {
                    var oldNode = curExpandNode;
                    var oldParents = [];
                    while (oldNode) {
                        oldNode = oldNode.getParentNode();
                        if (oldNode) {
                            oldParents.push(oldNode);
                        }
                    }
                    if (newParents.length > 0) {
                        zTree.expandNode(oldParents[Math.abs(oldParents.length - newParents.length) - 1], false);
                    }
                    else {
                        zTree.expandNode(oldParents[oldParents.length - 1], false);
                    }
                }
            }
        }
        curExpandNode = newNode;
    }
    function onExpand(event, treeId, treeNode) {
        curExpandNode = treeNode;
    }
    var onClick = function (e, treeId, treeNode) {
        var href = treeNode.href;
        if (treeNode.id != 0) {
            if (href) {
                var it = getRootParentConfig(treeNode.pId);
                var _czVal = it._cz;
                console.log("" + treeNode.href + "?pc_wap=" + it.pc_wap + "&_cz=" + _czVal + "&navId=" + treeNode.id);
                try {
                    store.set("_cz", _czVal);
                }
                catch (e) {
                }
            }
            return true;
        }
        return false;
    };
    var addDiyDom = function (treeId, treeNode) {
        var spaceWidth = 5;
        var switchObj = $("#" + treeNode.tId + "_switch"), icoObj = $("#" + treeNode.tId + "_ico");
        /*if (treeNode.id == 0) {
         icoObj.after("&nbsp;<span class='all_open' data-tId='"+treeId+"'>展开全部</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class='all_close' data-tId='"+treeId+"'>折叠全部</span>");
         }*/
        var it = getRootParentConfig(treeNode.id);
        if (it) {
            switchObj.remove();
            icoObj.after(switchObj);
            if (treeNode.level == 1) {
                icoObj.before("<span class='myicon " + it.pc_wap + "'></span>");
            }
            if (treeNode.level > 1) {
                var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level) + "px'></span>";
                switchObj.after(spaceStr);
            }
        }
    };
    var beforeClick = function (treeId, treeNode) {
        if (treeNode.id != 0 && !treeNode.href) {
            $("#" + treeNode.tId + "_switch").trigger("click");
            return false;
        }
        return true;
    };
    var setting = {
        view: {
            showLine: false,
            showIcon: false,
            selectedMulti: false,
            dblClickExpand: false,
            addDiyDom: addDiyDom
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            beforeClick: beforeClick,
            beforeExpand: beforeExpand,
            onExpand: onExpand,
            onClick: onClick
        }
    };
    function initMenu() {
        var tobj = null;
        if (jnav.size() > 0) {
            var navId = jnav.attr("id");
            if (!navId) {
                navId = "_navId1";
                jnav.attr("id", navId);
            }
            var treeObj = $("#" + navId);
            $.fn.zTree.init(treeObj, setting, zNodes);
            treeObj.addClass("showIcon");
            $("#" + navId + "_1_a").remove();
            tobj = $.fn.zTree.getZTreeObj(navId);
            var mId = UrlUtil.parseURL((window.parent || window).location.href).params["mId"];
            if (mId) {
                var node = tobj.getNodeByParam("id", mId, null);
                if (node == null) {
                    node = tobj.getNodeByParam("id", defaultOpenNode, null);
                }
                if (node != null) {
                    tobj.selectNode(node);
                    tobj.expandNode(node, true, false, true);
                    tobj.setting.callback.onClick(null, tobj.setting.treeId, node);
                }
            }
        }
        return tobj;
    }
    return initMenu();
}
//# sourceMappingURL=SearchToolZtree.js.map