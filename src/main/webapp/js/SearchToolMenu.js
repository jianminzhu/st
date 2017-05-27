var search_tool_menu = {
    defOpen:201
    , config: {
           3 : {_cz: "weixin", pc_wap: "pc"}
        ,  1 : {_cz: "def", pc_wap: "pc",      _toP:{pv: 101,ctr: 101, qclick: 10301,hot:105}}
        ,  2 : {_cz: "def", pc_wap: "wap",     _toP:{pv: 201,ctr: 201, qclick: 20301,hot:205}}
        ,  5 : {_cz: "mingyi", pc_wap: "pc"  , _toP:{pv: 501,ctr: 501, qclick: 50301,hot:505}}
        ,  6 : {_cz: "mingyi", pc_wap: "wap" , _toP:{pv: 601,ctr: 601, qclick: 60301,hot:605}}
        ,  7 : {_cz: "zhihu", pc_wap: "pc"   , _toP:{pv: 701,ctr: 701, qclick: 70301,hot:705}}
        ,  8 : {_cz: "zhihu", pc_wap: "wap"  , _toP:{pv: 801,ctr: 801, qclick: 80301,hot:805}}
        ,  9 : {_cz: "weixin", pc_wap: "pc"  , _toP:{pv: 901,ctr: 901, qclick: 90301,hot:905}}
        ,  "englishpc" : {_cz: "english", pc_wap: "pc"  , _toP:{pv: 1101,ctr:1101, qclick: 110301,hot:1105}}
        ,  "englishwap" : {_cz: "english", pc_wap: "wap"  , _toP:{pv: 1201,ctr:1201, qclick: 120301,hot:1205}}
        , "weixinwap": {_cz: "weixin", pc_wap: "wap"  , _toP:{pv: 1001,ctr: 1001, qclick: 100301,hot:1005}}
    }, menus: [
        {pId: -1, id: 0, name: "", open: true}
        , {pId: 0, id: 1, name: "PC网页"}
        , {pId: 0, id: 2, name: "WAP网页"}
        //去除该功能 , {pId: 0, id: 3, name: "微信"}
        , {pId: 0, id: 5, name: "PC明医"}
        , {pId: 0, id: 6, name: "WAP明医"}
        , {pId: 0, id: 7, name: "PC知乎"}
        , {pId: 0, id: 8, name: "WAP知乎"}
        , {pId: 0, id: 9, name: "PC微信"}
	    , {pId: 0, id:10, name: "WAP微信"}
        , {pId: 0, id:11, name: "PC英文"}
        , {pId: 0, id:12, name: "WAP英文"}

        , {pId: 1, id: 101, name: "query查询", "href": "query.html"}
        , {pId: 1, id: 102, name: "用户行为分析"}
        , {pId: 102, id: 10201, "name": "　session查询", "href": "session.html"}
        , {pId: 102, id: 10203, "name": "　随机session导出", "href": "session_export.html"}
        , {pId: 1, id: 103, name: "SA"}
        , {pId: 103, id: 10301, "name": "　query点击分析", "href": "query_click.html"}
        , {pId: 103, id: 10302, "name": "　百度点击分析（元搜索）", "href": "baidu_click_parse.html"}
        , {pId: 103, id: 10303, "name": "　站点点击分析", "href": "site.html"}
        , {pId: 1, id: 104, "name": "query抽取", "href": "query_extract.html"}
        , {pId: 1, id: 105, "name": "热门query", "href": "hots.html"}
        , {pId: 1, id: 107, "name": "搜索词上升排行榜", "href": "hots_fast.html"}
        , {pId: 1, id: 106, "name": "渠道管理", "href": "pid_manage.html"}

        , {pId: 2, id: 201, name: "query查询", "href": "query.html"}
        , {pId: 2, id: 202, name: "用户行为分析"}
        , {pId: 202, id: 20201, "name": "　session查询", "href": "session.html"}
        , {pId: 202, id: 20203, "name": "　随机session导出", "href": "session_export.html"}
        , {pId: 2, id: 203, name: "SA"}
        , {pId: 203, id: 20301, "name": "　query点击分析", "href": "query_click.html"}
        , {pId: 203, id: 20302, "name": "　百度点击分析（元搜索）", "href": "baidu_click_parse.html"}
        , {pId: 203, id: 20303, "name": "　站点点击分析", "href": "site.html"}
        , {pId: 2, id: 204, "name": "query抽取", "href": "query_extract.html"}
        , {pId: 2, id: 205, "name": "热门query", "href": "hots.html"}
        , {pId: 2, id: 207, "name": "搜索词上升排行榜", "href": "hots_fast.html"}
        , {pId: 2, id: 206, "name": "渠道管理", "href": "pid_manage.html"}

        //去除该功能 ,{pId: 3, id: 301, "name": "query抽取", "href": "query_extract_weixin.html"}

        , {pId: 5, id: 501, name: "query查询", "href": "query.html"}
        , {pId: 5, id: 502, name: "用户行为分析"}
        , {pId: 502, id: 50201, "name": "　session查询", "href": "session.html"}
        , {pId: 502, id: 50203, "name": "　随机session导出", "href": "session_export.html"}
        , {pId: 5, id: 503, name: "SA"}
        , {pId: 503, id: 50301, "name": "　query点击分析", "href": "query_click_chuizhi.html"}
//            , {pId: 503, id: 50302, "name": "　百度点击分析（元搜索）", "href": "baidu_click_parse.html"}
        , {pId: 503, id: 50303, "name": "　站点点击分析", "href": "site.html"}
        , {pId: 5, id: 504, "name": "query抽取", "href": "query_extract.html"}
//            , {pId: 5, id: 505, "name": "热门query", "href": "hots.html"}
//            , {pId: 5, id: 506, "name": "渠道管理", "href": "pid_manage.html"}

        , {pId: 6, id: 601, name: "query查询", "href": "query.html"}
        , {pId: 6, id: 602, name: "用户行为分析"}
        , {pId: 602, id: 60201, "name": "　session查询", "href": "session.html"}
        , {pId: 602, id: 60203, "name": "　随机session导出", "href": "session_export.html"}
        , {pId: 6, id: 603, name: "SA"}
        , {pId: 603, id: 60301, "name": "　query点击分析", "href": "query_click_chuizhi.html"}
//            , {pId: 603, id: 60302, "name": "　百度点击分析（元搜索）", "href": "baidu_click_parse.html"}
        , {pId: 603, id: 60303, "name": "　站点点击分析", "href": "site.html"}
        , {pId: 6, id: 604, "name": "query抽取", "href": "query_extract.html"}
//            , {pId: 6, id: 605, "name": "热门query", "href": "hots.html"}
//            , {pId: 6, id: 606, "name": "渠道管理", "href": "pid_manage.html"}


        , {pId: 7, id: 701, name: "query查询", "href": "query.html"}
        , {pId: 7, id: 702, name: "用户行为分析"}
        , {pId: 702, id: 70201, "name": "　session查询", "href": "session.html"}
        , {pId: 702, id: 70203, "name": "　随机session导出", "href": "session_export.html"}
        , {pId: 7, id: 703, name: "SA"}
        , {pId: 703, id: 70301, "name": "　query点击分析", "href": "query_click_chuizhi.html"}
//            , {pId: 703, id: 70302, "name": "　百度点击分析（元搜索）", "href": "baidu_click_parse.html"}
        , {pId: 703, id: 70303, "name": "　站点点击分析", "href": "site.html"}
        , {pId: 7, id: 704, "name": "query抽取", "href": "query_extract.html"}
//            , {pId: 7, id: 705, "name": "热门query", "href": "hots.html"}
//            , {pId: 7, id: 706, "name": "渠道管理", "href": "pid_manage.html"}

        , {pId: 8, id: 801, name: "query查询", "href": "query.html"}
        , {pId: 8, id: 802, name: "用户行为分析"}
        , {pId: 802, id: 80201, "name": "　session查询", "href": "session.html"}
        , {pId: 802, id: 80203, "name": "　随机session导出", "href": "session_export.html"}
        , {pId: 8, id: 803, name: "SA"}
        , {pId: 803, id: 80301, "name": "　query点击分析", "href": "query_click_chuizhi.html"}
//            , {pId: 803, id: 80302, "name": "　百度点击分析（元搜索）", "href": "baidu_click_parse.html"}
        , {pId: 803, id: 80303, "name": "　站点点击分析", "href": "site.html"}
        , {pId: 8, id: 804, "name": "query抽取", "href": "query_extract.html"}
//            , {pId: 8, id: 805, "name": "热门query", "href": "hots.html"}
//            , {pId: 8, id: 806, "name": "渠道管理", "href": "pid_manage.html"}

        , {pId: 9, id: 901, name: "query查询", "href": "query.html"}
        , {pId: 9, id: 902, name: "用户行为分析"}
        , {pId: 902, id: 90201, "name": "　session查询", "href": "session.html"}
        , {pId: 902, id: 90203, "name": "　随机session导出", "href": "session_export.html"}
        , {pId: 9, id: 903, name: "SA"}
        , {pId: 903, id: 90301, "name": "　query点击分析", "href": "query_click_chuizhi.html"}
//            , {pId: 903, id: 90302, "name": "　百度点击分析（元搜索）", "href": "baidu_click_parse.html"}
        , {pId: 903, id: 90303, "name": "　站点点击分析", "href": "site.html"}
        , {pId: 9, id: 904, "name": "query抽取", "href": "query_extract.html"}
//            , {pId: 9, id: 905, "name": "热门query", "href": "hots.html"}
//            , {pId: 9, id: 906, "name": "渠道管理", "href": "pid_manage.html"}

        , {pmid:"weixinwap",pId: 10, id: 1001, name: "query查询", "href": "query.html"}
        , {pmid:"weixinwap",pId: 10, id: 1002, name: "用户行为分析"}
        , {pmid:"weixinwap",pId: 1002, id: 100201, "name": "　session查询", "href": "session.html"}
        , {pmid:"weixinwap",pId: 1002, id: 100203, "name": "　随机session导出", "href": "session_export.html"}
        , {pmid:"weixinwap",pId: 10, id: 1003, name: "SA"}
        , {pmid:"weixinwap",pId: 1003, id: 100301, "name": "　query点击分析", "href": "query_click_chuizhi.html"}
//           , { pmid:"weixinwap",pId: 1003, id: 100302, "name": "　百度点击分析（元搜索）", "href": "baidu_click_parse.html"}
        , {pmid:"weixinwap",pId: 1003, id: 100303, "name": "　站点点击分析", "href": "site.html"}
        , {pmid:"weixinwap",pId: 10, id: 1004, "name": "query抽取", "href": "query_extract.html"}
//            , {pId: 10, id: 1005, "name": "热门query", "href": "hots.html"}
//            , {pId: 10, id: 1006, "name": "渠道管理", "href": "pid_manage.html"}

        , {pmid:"englishpc",pId: 11, id: 1101, name: "query查询", "href": "query.html"}
        , {pmid:"englishpc",pId: 11, id: 1102, name: "用户行为分析"}
        , {pmid:"englishpc",pId: 1102, id: 110201, "name": "　session查询", "href": "session.html"}
        , {pmid:"englishpc",pId: 1102, id: 110203, "name": "　随机session导出", "href": "session_export.html"}
        , {pmid:"englishpc",pId: 11, id: 1103, name: "SA"}
        , {pmid:"englishpc",pId: 1103, id: 110301, "name": "　query点击分析", "href": "query_click_chuizhi.html"}
//           , { pmid:"englishpc",pId: 1103, id: 110302, "name": "　百度点击分析（元搜索）", "href": "baidu_click_parse.html"}
        , {pmid:"englishpc",pId: 1103, id: 110303, "name": "　站点点击分析", "href": "site.html"}
        , {pmid:"englishpc",pId: 11, id: 1104, "name": "query抽取", "href": "query_extract.html"}
//            , {pmid:"englishpc",pId: 11, id: 1105, "name": "热门query", "href": "hots.html"}
//            , {pmid:"englishpc",pId: 11, id: 1106, "name": "渠道管理", "href": "pid_manage.html"}

        , {pmid:"englishwap",pId: 12, id: 1201, name: "query查询", "href": "query.html"}
        , {pmid:"englishwap",pId: 12, id: 1202, name: "用户行为分析"}
        , {pmid:"englishwap",pId: 1202, id: 120201, "name": "　session查询", "href": "session.html"}
        , {pmid:"englishwap",pId: 1202, id: 120203, "name": "　随机session导出", "href": "session_export.html"}
        , {pmid:"englishwap",pId: 12, id: 1203, name: "SA"}
        , {pmid:"englishwap",pId: 1203, id: 120301, "name": "　query点击分析", "href": "query_click_chuizhi.html"}
//           , { pmid:"englishwap",pId: 1203, id: 110302, "name": "　百度点击分析（元搜索）", "href": "baidu_click_parse.html"}
        , {pmid:"englishwap",pId: 1203, id: 120303, "name": "　站点点击分析", "href": "site.html"}
        , {pmid:"englishwap",pId: 12, id: 1204, "name": "query抽取", "href": "query_extract.html"}
//            , {pmid:"englishwap",pId: 12, id: 1205, "name": "热门query", "href": "hots.html"}
//            , {pmid:"englishwap",pId: 12, id: 1206, "name": "渠道管理", "href": "pid_manage.html"}


    ]
}