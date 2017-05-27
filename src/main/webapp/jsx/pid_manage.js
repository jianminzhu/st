var renderPage = function (kpageId, res, queryTable) {
    var totalPage = (Math.floor(res.total / res.psize) + (res.total % res.psize == 0 ? 0 : 1));
    new kkpager(kpageId, res.psize).generPageHtml({
        pno: res.pno,
        //总页码
        total: totalPage,
        //总数据条数
        totalRecords: res.total,
        mode: 'click',
        click: function (n) {
            this.selectPage(n);
            try {
                var params = $.extend({}, queryTable.params, { pno: n });
                queryTable.changeParams(params);
                SEARCHTOOLS_WXURLUTIL.dealAllEncUrl();
            }
            catch (e) {
            }
            return false;
        }
    });
    if (totalPage > 1) {
        $("#" + kpageId).find(".kkpager").show();
    }
    else {
        $("#" + kpageId).find(".kkpager").hide();
    }
};
function changeSubchannelContent(td) {
    console.log(td.find("p").html());
    var btn_submit = "<button onclick=\"changePid($(this).parents('tr'))\">确定</button>";
    var btn_cancel = "<button onclick=\"cancelChangeSubchannel($(this).parent(),'" + td.find("p").html() + "')\">取消</button>";
    td.html("<input type='text' data-old='" + td.find("p").html() + "' id='new_subchannel' value='" + td.find("p").html() + "' />" + btn_submit + btn_cancel);
}
function cancelChangeSubchannel(td, val) {
    console.log(td);
    td.eq(2).html("<p ondblclick='changeSubchannelContent($(this).parent())'>" + val + "</p>");
}
function changePid(tr) {
    var td = tr.find("td");
    var old_subchannel = $("#new_subchannel").data("old");
    var new_subchannel = $("#new_subchannel").val();
    var pw;
    pw = UrlUtil.getParams(function (p) { return p.pc_wap; }, pw);
    var url = SEARCHTOOLS_APIS_ROOT + "/pidchannel/pidrelationedit?type=" + pw + "&firstchannel=" + td[0].innerText + "&secondchannel=" + td[1].innerText + "&subchannel=" + new_subchannel + "&user=&callback=?";
    console.log(url);
    $.getJSON(url, function (data) {
        if (data == "success") {
            cancelChangeSubchannel(td, new_subchannel);
        }
        if (data == "fail") {
            cancelChangeSubchannel(td, old_subchannel);
            alert("修改失败！");
        }
    });
}
// function showPidRelationHistory(){
//     if($("#query_pid_relation_history").parent().css("display")=="none")
//         $("#query_pid_relation_history").parent().css("display", "block");
//     else
//         $("#query_pid_relation_history").parent().css("display", "none");
// }
(function ($, window, UrlUtil, moment, QueryTable, num_ctr, num_average_click_position, SEARCHTOOLS_API_SERVER, kkpager, BrowserUtil) {
    $(function () {
        var yestoday = moment().add(-1, "day").format("YYYYMMDD");
        UrlUtil.initParams(function (p) {
            $("#st").html(p.st || yestoday);
            console.log(p.needInit);
            if (p.needInit == "t") {
                $("#i_query").val((sgDecodeURIComponent(p.query || "") || $("#i_query").val()));
            }
        });
        var pw;
        pw = UrlUtil.getParams(function (p) { return p.pc_wap; }, pw);
        $.ajax({
            "dataType": 'jsonp',
            "type": "GET",
            "url": SEARCHTOOLS_APIS_ROOT + "/pidchannel/channeldesc?type=" + pw + "&date=" + yestoday,
            "success": function (data) {
                var zNodes = data;
                var t = $("#channelTree");
                t = $.fn.zTree.init(t, setting, zNodes);
                var zTree = $.fn.zTree.getZTreeObj("channelTree");
                zTree.selectNode(zTree.getNodeByParam("id", 0));
            }
        });
        var setting = {
            view: {
                dblClickExpand: false,
                showLine: true,
                selectedMulti: false,
                showIcon: false
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                beforeClick: function (treeId, treeNode) {
                    var zTree = $.fn.zTree.getZTreeObj(treeId);
                    if (treeNode.isParent) {
                        zTree.expandNode(treeNode);
                        $("#" + treeNode.tId + "_ul").removeClass("line");
                        return false;
                    }
                    else {
                        return true;
                    }
                },
                onClick: function (treeId, treeNode) {
                    var p = getParams("pid_tree");
                    queryDetailTableTree.changeParams($.extend(queryDetailTableTree.params, p));
                },
                onExpand: expand
            }
        };
        function expand(event, treeId, treeNode) {
            $("#" + treeNode.tId + "_ul").removeClass("line");
        }
        function getParams(tab) {
            var p;
            switch (tab) {
                case "pid_channel":
                    p = UrlUtil.getParams(function (p) {
                        return $.extend({ pno: 1, psize: 30 }, p, {
                            st: $("#pid_channel_st").html(),
                            firstchannel: "",
                            secondchannel: "",
                            thirdchannel: "",
                            query: $("#pid_channel_i_query").val()
                        });
                    }, p);
                    break;
                case "pid_tree":
                    p = UrlUtil.getParams(function (p) {
                        var treeObj = $.fn.zTree.getZTreeObj("channelTree");
                        var nodes = treeObj.getSelectedNodes()[0].getPath();
                        return $.extend(p, {
                            st: $("#pid_tree_st").html(),
                            firstchannel: nodes[0].name,
                            secondchannel: nodes[1].name,
                            thirdchannel: nodes[2].name == "无描述" ? "" : nodes[2].name
                        });
                    }, p);
                    break;
                case "pid_relation":
                    p = UrlUtil.getParams(function (p) {
                        return $.extend(p, {
                            query: $("#pid_relation_i_query").val()
                        });
                    }, p);
                    break;
            }
            return p;
        }
        var params = getParams($(".cur").data("host"));
        queryDetailTableChannel = new QueryTable('query_pid_channel', {
            tcss: "opr-table",
            cols: [{ css: "num", name: "firstchannel", cname: "一级渠道", width: 200 },
                { css: "num", name: "secondchannel", cname: "二级渠道（瀚海）", width: 200 },
                { css: "num", name: "subchannel", cname: "二级级渠道（绿皮）", width: 200 },
                { css: "num", name: "thirdchannel", cname: "三级渠道", width: 200 },
                { css: "qkey", name: "pid", cname: "主PID/规则", style: { "text-align": "center", "word-break": "break-all" }, width: 200 },
                { css: "qkey", name: "zhanghao", cname: "账号", style: { "text-align": "center", "word-break": "break-all" }, width: 200 }
            ],
            modCss: { index: 2, css: "bgfc" },
        }, params, function (res) {
            var v = queryDetailTableChannel;
            if (!res.total || !res.psize || !res.pno) {
                res.total = res.count;
                res.psize = v.params.psize;
                res.pno = v.params.pno;
            }
            renderPage("kkpager_pid_channel", res, v);
            return res.channellist || [];
        }, function (params) {
            var apiName = (params.pc_wap || "wap") + "_pid_channel";
            params.host = "pid_channel";
            return SEARCHTOOLS_API_SERVER(apiName, params);
        }, null, null);
        queryDetailTableTree = new QueryTable('query_pid_tree', {
            tcss: "opr-table",
            cols: [{ css: "num", name: "firstchannel", cname: "一级渠道", width: 200 },
                { css: "num", name: "secondchannel", cname: "二级渠道（瀚海）", width: 200 },
                { css: "num", name: "subchannel", cname: "二级渠道（绿皮）", width: 200 },
                { css: "num", name: "thirdchannel", cname: "三级渠道", width: 200 },
                { css: "qkey", name: "pid", cname: "主PID/规则", style: { "text-align": "center", "word-break": "break-all" }, width: 200 },
                { css: "qkey", name: "zhanghao", cname: "账号", style: { "text-align": "center", "word-break": "break-all" }, width: 200 }
            ],
            modCss: { index: 2, css: "bgfc" }
        }, params, function (res) {
            // var v = queryDetailTableTree;
            // if(!res.total || !res.psize || !res.pno){
            //     res.total = res.count;
            //     res.psize = v.params.psize;
            //     res.pno = v.params.pno;
            // }
            // renderPage("kkpager_pid_tree", res,   v);
            return res.channellist || [];
        }, function (params) {
            var apiName = (params.pc_wap || "wap") + "_pid_channel";
            params.host = "pid_tree";
            return SEARCHTOOLS_API_SERVER(apiName, params);
        }, null, null);
        queryDetailTableRelation = new QueryTable('query_pid_relation', {
            tcss: "opr-table",
            cols: [{ css: "num", name: "firstchannel", cname: "瀚海一级渠道", width: 200 },
                { css: "num", name: "secondchannel", cname: "瀚海二级渠道", width: 200 },
                { css: "qkey", name: "subchannel", cname: "绿皮二级渠道（可双击进行编辑）", style: { "text-align": "center" }, width: 200,
                    toHtml: function (val) { return "<p ondblclick=\"changeSubchannelContent($(this).parent())\">" + val + "</p>"; } }
            ],
            modCss: { index: 2, css: "bgfc" }
        }, params, function (res) {
            return res || [];
        }, function (params) {
            var apiName = (params.pc_wap || "wap") + "_pid_relation";
            params.host = "pid_relation";
            return SEARCHTOOLS_API_SERVER(apiName, params);
        }, null, null);
        // queryDetailTableRelationHistory = new QueryTable('query_pid_relation_history', {
        //     tcss: "opr-table",
        //     cols: [{css: "qkey", name: "firstchannel", cname: "时间", style:{"text-align":"center"}, width: 200},
        //         {css: "num",name: "secondchannel",cname: "操作者",width: 200},
        //         {css: "num", name: "subchannel", cname: "操作",  width: 200}
        //     ],
        //     modCss: {index: 2, css: "bgfc"},
        //     isShowPager: true
        // }, params, function (res) {
        //     var v = queryDetailTableRelationHistory;
        //     if(!res.total || !res.psize || !res.pno){
        //         res.total = res.count;
        //         res.psize = v.params.psize;
        //         res.pno = v.params.pno;
        //     }
        //     console.log(res)
        //     renderPage("kkpager_pid_relation_history",res,   v);
        //     return res || [];
        // }, function (params) {
        //     const apiName = (params.pc_wap||"wap")+"_pid_relation_history";
        //     params.host="pid_relation_history"
        //     return SEARCHTOOLS_API_SERVER(apiName,params);
        // },null,null)
        var pageSubmit = function () {
            var tab = $(".cur").data("host");
            var p = getParams(tab);
            try {
                switch (tab) {
                    case "pid_channel":
                        queryDetailTableChannel.changeParams($.extend(queryDetailTableChannel.params, p));
                        break;
                    case "pid_tree":
                        queryDetailTableTree.changeParams($.extend(queryDetailTableTree.params, p));
                        break;
                    case "pid_relation":
                        queryDetailTableRelation.changeParams($.extend(queryDetailTableRelation.params, p));
                        break;
                }
            }
            catch (e) {
                console.log(e);
            }
        };
        // var historyPageSubmit = function () {
        //     var p = getParams("pid_relation_history")
        //     try {
        //         queryDetailTableRelationHistory.changeParams($.extend(queryDetailTableRelationHistory.params, p))
        //     } catch (e) {
        //         console.log(e)
        //     }
        // };
        searchtools_enter_event(pageSubmit);
        searchtool_tabevent("#channel_tree_relation_tab", "a", "cur", function (jit) {
            $("#pid_channel,#pid_tree,#pid_relation").hide();
            var host = jit.attr("data-host");
            $("#" + host).show();
            $("#" + host + "_a_query").click(pageSubmit).click();
        });
        $("#pid_channel_a_query").click(pageSubmit).click();
        $("#pid_tree_a_query").click(function () {
            $.fn.zTree.destroy("channelTree");
            $.ajax({
                "dataType": 'jsonp',
                "type": "GET",
                "url": SEARCHTOOLS_APIS_ROOT + "/pidchannel/channeldesc?type=" + pw + "&date=" + $("#pid_tree_st").html(),
                "success": function (data) {
                    var zNodes = data;
                    var t = $("#channelTree");
                    t = $.fn.zTree.init(t, setting, zNodes);
                    var zTree = $.fn.zTree.getZTreeObj("channelTree");
                    zTree.selectNode(zTree.getNodeByParam("id", 0));
                }
            });
            console.log("end ajax!");
        }).click();
        $("#pid_relation_a_query").click(pageSubmit).click();
        // $("#getHistory").click(historyPageSubmit).click()
        $("#pid_channel_export").click(function () {
            var date = $.trim($("#pid_channel_st").html() || "");
            if (date != "") {
                window.open(SEARCHTOOLS_APIS_ROOT + "/pidchannel/pidexport?type=" + pw + "&date=" + date);
            }
        });
    });
})(jQuery, window, UrlUtil, moment, QueryTable, num_ctr, num_average_click_position, SEARCHTOOLS_API_SERVER, kkpager, BrowserUtil);
//# sourceMappingURL=pid_manage.js.map