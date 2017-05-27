function SearchToolZtree(jnav, defaultOpenNode, idMapConfig, zNodes,jiframeChange) {
    var getRootParentConfig = function (id,pmid) {
		var realId=pmid?pmid:(id+"").charAt(0) 
		console.log("realId",realId)
        return idMapConfig[ realId ];
    };

    //同级只展开一个节点
    var curExpandNode = null

    function beforeExpand(treeId, treeNode) {
        var pNode = curExpandNode ? curExpandNode.getParentNode() : null;
        var treeNodeP = treeNode.parentTId ? treeNode.getParentNode() : null;
        var zTree = $.fn.zTree.getZTreeObj(treeId);
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
            singlePath(treeNode,treeId);
        }

    }

    function singlePath(newNode,treeId) {
        if (newNode === curExpandNode) return;

        var zTree = $.fn.zTree.getZTreeObj(treeId),
            rootNodes, tmpRoot, tmpTId, i, j, n;

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
        } else if (curExpandNode && curExpandNode.open) {
            if (newNode.parentTId === curExpandNode.parentTId) {
                zTree.expandNode(curExpandNode, false);
            } else {
                var newParents = [];
                while (newNode) {
                    newNode = newNode.getParentNode();
                    if (newNode === curExpandNode) {
                        newParents = null;
                        break;
                    } else if (newNode) {
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
                    } else {
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
        var href = treeNode.href
        if (treeNode.id != 0) {
            if (href) {
                var it = getRootParentConfig(treeNode.id,treeNode.pmid);
                var _czVal = it._cz;
                var href = treeNode.href + "?pc_wap=" + it.pc_wap + "&_cz=" + _czVal + "&navId=" + treeNode.id;
                if(jiframeChange){
                    jiframeChange.attr("src",href)
                }
                try {
                    store.set("_cz", _czVal)
                } catch (e) {
                }
            }
            return true;
        }
        return false;

    };
    var addDiyDom = function (treeId, treeNode) {
        var spaceWidth = 5;
        var switchObj = $("#" + treeNode.tId + "_switch"),
            icoObj = $("#" + treeNode.tId + "_ico");
        /*if (treeNode.id == 0) {
         icoObj.after("&nbsp;<span class='all_open' data-tId='"+treeId+"'>展开全部</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class='all_close' data-tId='"+treeId+"'>折叠全部</span>");
         }*/
        var it = getRootParentConfig(treeNode.id,treeNode.pmid);
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
            $("#" + treeNode.tId + "_switch").trigger("click")
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
            var treeId = jnav.attr("id");
            if (!treeId) {
                treeId = "_treeId1";
                jnav.attr("id", treeId);
            }
            var treeObj = $("#" + treeId);
            $.fn.zTree.init(treeObj, setting, zNodes);
            treeObj.addClass("showIcon");
            $("#" + treeId + "_1_a").remove()
            tobj = $.fn.zTree.getZTreeObj(treeId);
            var realWindow = (window.parent||window);
            var wUrl=realWindow.location.href
            var iUrl=""
            if(jiframeChange){
                iUrl=jiframeChange.attr("src" )
            }
            var params = UrlUtil.parseURL(iUrl||wUrl).params;
            var navId = params["navId"]
            var toP=params["_toP"]
            var isTriggerClick=true;
            if (!navId) {
                navId=params["nnavId"]
            }
            if(toP){//说明不需要触发点击事件,只是定位导航上
                var it = getRootParentConfig(navId)
                if(it["_toP"][toP]){
                    navId=it["_toP"][toP];
                    isTriggerClick=false;
                }
            }
            if(!navId||navId=="undefined"){
                navId = defaultOpenNode;

            }
            if (navId) {
                var node = tobj.getNodeByParam("id", navId, null);
                if (node == null) {
                    node = tobj.getNodeByParam("id", defaultOpenNode, null);
                }
                if (node != null) {
                    tobj.selectNode(node)
                    tobj.expandNode(node, true, false, true)
                    if(isTriggerClick){
                        tobj.setting.callback.onClick(null, tobj.setting.treeId, node);
                    }
                }
            }
        }
        return tobj;
    }
    return initMenu()
}