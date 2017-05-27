var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var _cz = "_cz";
var SEARCHTOOLS_APIS_ROOT = "http://stservice.sogou";
// var SEARCHTOOLS_APIS_ROOT = "http://10.134.90.196:8080"
var SEARCHTOOLS_APIS_ROOT_waphot = SEARCHTOOLS_APIS_ROOT;
var SEARCHTOOLS_APIS_ROOT_query_mehu = "http://10.142.24.64:20081";
var SEARCHTOOLS_APIS_ROOT_query_mehu_realtime = "http://10.142.24.64:20082";
var SEARCHTOOLS_APIS_ROOT_query_mehu_chuizhi = "http://10.134.90.196:20082";
var SEARCHTOOLS_APIS_ROOT_pid = "http://stservice.sogou";
// var SEARCHTOOLS_APIS_ROOT_pid = "http://10.142.32.159:8080"
var SEARCHTOOLS_APIS = {
    def: {
        wap_session: SEARCHTOOLS_APIS_ROOT + '/wapsession?query=${p.query || ""}&channel=${p.source_type}&st=${p.st}&et=${p.et}&uid=${(p.uid || "")}&pno=${p.pno}&psize=${p.psize}&searchtype=${p.type}',
        wap_session_uid: SEARCHTOOLS_APIS_ROOT + '/wapsession?query=${(p.query || "")}&channel=${p.source_type}&st=${p.st}&et=${p.et}&uid=${(p.uid || "")}&uidpno=${p.uidpno}&uidpsize=${p.uidpsize}&searchtype=${p.type}',
        wap_session_random_export: SEARCHTOOLS_APIS_ROOT + '/wapsession/randomexport?st=${p.st}&et=${p.et}&num=${p.num}',
        wap_session_export: SEARCHTOOLS_APIS_ROOT + '/wapsession/export?query=${p.query}&channel=${p.source_type}&uid=${p.uid}&searchtype=${p.type}&st=${p.st}&et=${p.et}',
        wap_query_export: SEARCHTOOLS_APIS_ROOT + '/wapqueryclick/export?query=${p.query}&st=${p.st}&et=${p.et}',
        wap_query_export_sogoubaidu: SEARCHTOOLS_APIS_ROOT + '/wapsogourank/export?query=${p.query}&st=${p.st}&et=${p.et}',
        wap_query_total: SEARCHTOOLS_APIS_ROOT + '/wapqueryclick/total?query=${p.query}&st=${p.st}&et=${p.et}',
        wap_query_total_baidu: SEARCHTOOLS_APIS_ROOT + '/wapsogourank/total?query=${p.query}&st=${p.st}&et=${p.et}',
        wap_query_class: SEARCHTOOLS_APIS_ROOT + '/wapqueryclick/class?query=${p.query}&st=${p.st}&et=${p.et}&pno=${p.pno || 1}&psize=${p.psize || 100}',
        wap_query_detail: SEARCHTOOLS_APIS_ROOT + '/wapqueryclick/detail?query=${p.query}&typekey=${p.typekey || ""}&urlkey=${(p.urlkey || "")}&st=${p.st}&et=${p.et}&pno=${p.pno || 1}&psize=${p.psize || 100}',
        wap_query_detail_top: SEARCHTOOLS_APIS_ROOT + '/wapqueryclick/detailtop?query=${p.query}&typekey=${p.typekeys}&urlkey=&st=${p.st}&et=${p.et}&pno=${p.pno}&psize=${p.psize}',
        wap_query_detail_sogoubaidu: SEARCHTOOLS_APIS_ROOT + '/wapsogourank/detail?query=${p.query}&host=${p.host}&st=${p.st}&et=${p.et}&pno=${p.pno || 1}&psize=${p.psize || 100}',
        wap_history_ctr: SEARCHTOOLS_APIS_ROOT + '/wapqueryclick/${(p.t || "").toLowerCase()}?query=${p.query}&st=${p.st}&et=${p.et}&typekey=${p.typekey}',
        wap_history_ctr_sogoubaidu: SEARCHTOOLS_APIS_ROOT + '/wapsogourank/ctr?query=${p.query}&st=${p.st}&et=${p.et}',
        wap_history_pv: SEARCHTOOLS_APIS_ROOT + '/wapquery/chart?query=${p.query}&st=${p.st}&et=${p.et}',
        wap_history_pv_sogoubaidu: SEARCHTOOLS_APIS_ROOT + '/wapsogourank/pv?query=${p.query}&st=${p.st}&et=${p.et}',
        wap_site_domain_url_detail_0: SEARCHTOOLS_APIS_ROOT + '/wap_domainclick/detail?domain=${p.query}&st=${p.st}&et=${p.et}&type=${p.t}&pno=${p.pno || 1}&psize=${p.psize || 100}',
        wap_site_domain_url_detail_1: SEARCHTOOLS_APIS_ROOT + '/wap_domainclick/detail?domain=${p.query}&st=${p.st}&et=${p.et}&type=${p.t}&pno=${p.pno || 1}&psize=${p.psize || 100}',
        wap_site_domain_url_detail_2: SEARCHTOOLS_APIS_ROOT + '/wap_urlclick/detail?url=${p.query}&st=${p.st}&et=${p.et}&type=${p.t}&pno=${p.pno || 1}&psize=${p.psize || 100}',
        wap_site_domain_url_total_0: SEARCHTOOLS_APIS_ROOT + '/wap_domainclick/total?domain=${p.query}&st=${p.st}&et=${p.et}&type=${p.t}',
        wap_site_domain_url_total_1: SEARCHTOOLS_APIS_ROOT + '/wap_domainclick/total?domain=${p.query}&st=${p.st}&et=${p.et}&type=${p.t}',
        wap_site_domain_url_total_2: SEARCHTOOLS_APIS_ROOT + '/wap_urlclick/total?url=${p.query}&st=${p.st}&et=${p.et}&type=${p.t}',
        wap_site_domain_url_export_0: SEARCHTOOLS_APIS_ROOT + '/wap_domainclick/export?domain=${p.query}&st=${p.st}&et=${p.et}&type=${p.t}',
        wap_site_domain_url_export_1: SEARCHTOOLS_APIS_ROOT + '/wap_domainclick/export?domain=${p.query}&st=${p.st}&et=${p.et}&type=${p.t}',
        wap_site_domain_url_export_2: SEARCHTOOLS_APIS_ROOT + '/wap_urlclick/export?url=${(p.query)}&st=${p.st}&et=${p.et}&type=${p.t}',
        wap_query: SEARCHTOOLS_APIS_ROOT_query_mehu + '/request?query=${(p.query)}&st=${p.st}&et=${p.et}&type=${p.type}&pno=${p.pno||1}&psize=${p.psize||10}&queryFrom=searchtool',
        wap_query_realtime: SEARCHTOOLS_APIS_ROOT_query_mehu_realtime + '/request?cmd=realtime&query=${(p.query)}&st=${p.st}&et=${p.et}&type=${p.type}&pno=${p.pno||1}&psize=${p.psize||10}&queryFrom=searchtool',
        wap_query_mehu_export: SEARCHTOOLS_APIS_ROOT_query_mehu + '/request?query=${p.query}&st=${p.st}&et=${p.et}&type=${p.type}&pno=${p.pno||1}&psize=${p.psize||10}&cmd=export&queryFrom=searchtool',
        wap_query_mehu_export_realtime: SEARCHTOOLS_APIS_ROOT_query_mehu + '/request?query=${p.query}&st=${p.st}&et=${p.et}&type=${p.type}&pno=${p.pno||1}&psize=${p.psize||10}&cmd=export&queryFrom=searchtool',
        wap_extract_export: SEARCHTOOLS_APIS_ROOT + '/wapquery/export?st=${p.st}&num=${p.num}&type=${p.extract_type}&platform=${p.platform}',
        wap_hots: SEARCHTOOLS_APIS_ROOT_waphot + '/wapquery/hwdetail?st=${p.st}&et=${p.et}&channel=${p.source_type}',
        wap_hots_fast: SEARCHTOOLS_APIS_ROOT_waphot + '/wapqueryrank?st=${p.st}&et=${p.et}',
        wap_hots_export_week: SEARCHTOOLS_APIS_ROOT_waphot + '/wapquery/hwexport?st=${p.st}&et=${p.et}&channel=${p.source_type}',
        wap_hots_gather: SEARCHTOOLS_APIS_ROOT_waphot + '/wapquery/hwtotal?st=${p.st}&et=${p.et}&channel=${p.source_type}',
        wap_hots_export_gather: SEARCHTOOLS_APIS_ROOT_waphot + '/wapquery/hwexporttotal?st=${p.st}&et=${p.et}&channel=${p.source_type}',
        wap_hots_realtime: SEARCHTOOLS_APIS_ROOT + '/wapquery/hwhour?st=${p.st}&channel=${p.source_type}',
        wap_hots_export_realtime: SEARCHTOOLS_APIS_ROOT_waphot + '/wapquery/hourexport?st=${p.st}&channel=${p.source_type}',
        wap_refer_detail: SEARCHTOOLS_APIS_ROOT_waphot + '/wapquery/hwrefer?st=${p.st}&et=${p.et}&channel=${p.source_type}&query=${p.query}',
        wap_refer_detail_export: SEARCHTOOLS_APIS_ROOT_waphot + '/wapquery/hwexportref?st=${p.st}&et=${p.et}&channel=${p.source_type}&query=${p.query}',
        wap_hots_chanel: SEARCHTOOLS_APIS_ROOT + '/wapquery/channel?st=${p.st}&et=${p.et}&&channel=${p.source_type}',
        wap_pid_channel: SEARCHTOOLS_APIS_ROOT_pid + "/pidchannel/channeldescpid?date=${p.st}&type=wap&firstchannel=${p.firstchannel}&secondchannel=${p.secondchannel}&thirdchannel=${p.thirdchannel}&query=${p.query}&pno=${p.pno}&psize=${p.psize}",
        wap_pid_tree_channel: SEARCHTOOLS_APIS_ROOT_pid + "/pidchannel/channeldesc?type=wap&date=${p.st}",
        wap_pid_relation: SEARCHTOOLS_APIS_ROOT_pid + "/pidchannel/pidrelation?type=wap&query=${p.query}",
        wap_pid_relation_history: SEARCHTOOLS_APIS_ROOT_pid + "/pidchannel/pidrelationlog?type=wap&pno=${p.pno}&psize=${p.psize}",
        pc_session: SEARCHTOOLS_APIS_ROOT + '/pcsession?query=${(p.query || "")}&channel=${p.source_type}&st=${p.st}&et=${p.et}&uid=${(p.uid || "")}&pno=${p.pno}&psize=${p.psize}&searchtype=${p.type}',
        pc_session_uid: SEARCHTOOLS_APIS_ROOT + '/pcsession?query=${(p.query || "")}&channel=${p.source_type}&st=${p.st}&et=${p.et}&uid=${(p.uid || "")}&uidpno=${p.uidpno}&uidpsize=${p.uidpsize}&searchtype=${p.type}',
        pc_session_random_export: SEARCHTOOLS_APIS_ROOT + '/pcsession/randomexport?st=${p.st}&et=${p.et}&num=${p.num}&searchtype=all',
        pc_session_export: SEARCHTOOLS_APIS_ROOT + '/pcsession/export?query=${p.query}&channel=${p.source_type}&uid=${p.uid}&searchtype=${p.type}&st=${p.st}&et=${p.et}',
        pc_query_export: SEARCHTOOLS_APIS_ROOT + '/pcqueryclick/export?query=${p.query}&st=${p.st}&et=${p.et}',
        pc_query_export_sogoubaidu: SEARCHTOOLS_APIS_ROOT + '/pcsogourank/export?query=${p.query}&st=${p.st}&et=${p.et}',
        pc_query_total: SEARCHTOOLS_APIS_ROOT + '/pcqueryclick/total?query=${p.query}&st=${p.st}&et=${p.et}',
        pc_query_total_baidu: SEARCHTOOLS_APIS_ROOT + '/pcsogourank/total?query=${p.query}&st=${p.st}&et=${p.et}',
        pc_query_class: SEARCHTOOLS_APIS_ROOT + '/pcqueryclick/class?query=${p.query}&st=${p.st}&et=${p.et}&pno=${p.pno || 1}&psize=${p.psize || 100}',
        pc_query_detail: SEARCHTOOLS_APIS_ROOT + '/pcqueryclick/detail?query=${p.query}&typekey=${p.typekey || ""}&urlkey=${(p.urlkey || "")}&st=${p.st}&et=${p.et}&pno=${p.pno || 1}&psize=${p.psize || 20}',
        pc_query_detail_sogoubaidu: SEARCHTOOLS_APIS_ROOT + '/pcsogourank/detail?query=${p.query}&host=${p.host}&st=${p.st}&et=${p.et}&pno=${p.pno || 1}&psize=${p.psize || 100}',
        pc_history_ctr: SEARCHTOOLS_APIS_ROOT + '/pcqueryclick/${(p.t || "").toLowerCase()}?query=${p.query}&st=${p.st}&et=${p.et}&typekey=${p.typekey}',
        pc_history_ctr_sogoubaidu: SEARCHTOOLS_APIS_ROOT + '/pcsogourank/ctr?query=${p.query}&st=${p.st}&et=${p.et}',
        pc_history_pv: SEARCHTOOLS_APIS_ROOT + '/pcquery/chart?query=${p.query}&st=${p.st}&et=${p.et}',
        pc_history_pv_sogoubaidu: SEARCHTOOLS_APIS_ROOT + '/pcsogourank/pv?query=${p.query}&st=${p.st}&et=${p.et}',
        pc_site_domain_url_detail_0: SEARCHTOOLS_APIS_ROOT + '/pc_domainclick/detail?domain=${p.query}&st=${p.st}&et=${p.et}&type=${p.t}&pno=${p.pno || 1}&psize=${p.psize || 100}',
        pc_site_domain_url_detail_1: SEARCHTOOLS_APIS_ROOT + '/pc_domainclick/detail?domain=${p.query}&st=${p.st}&et=${p.et}&type=${p.t}&pno=${p.pno || 1}&psize=${p.psize || 100}',
        pc_site_domain_url_detail_2: SEARCHTOOLS_APIS_ROOT + '/pc_urlclick/detail?url=${p.query}&st=${p.st}&et=${p.et}&type=${p.t}&pno=${p.pno || 1}&psize=${p.psize || 100}',
        pc_site_domain_url_total_0: SEARCHTOOLS_APIS_ROOT + '/pc_domainclick/total?domain=${p.query}&st=${p.st}&et=${p.et}&type=${p.t}',
        pc_site_domain_url_total_1: SEARCHTOOLS_APIS_ROOT + '/pc_domainclick/total?domain=${p.query}&st=${p.st}&et=${p.et}&type=${p.t}',
        pc_site_domain_url_total_2: SEARCHTOOLS_APIS_ROOT + '/pc_urlclick/total?url=${p.query}&st=${p.st}&et=${p.et}&type=${p.t}',
        pc_site_domain_url_export_0: SEARCHTOOLS_APIS_ROOT + '/pc_domainclick/export?domain=${p.query}&st=${p.st}&et=${p.et}&type=${p.t}',
        pc_site_domain_url_export_1: SEARCHTOOLS_APIS_ROOT + '/pc_domainclick/export?domain=${p.query}&st=${p.st}&et=${p.et}&type=${p.t}',
        pc_site_domain_url_export_2: SEARCHTOOLS_APIS_ROOT + '/pc_urlclick/export?url=${(p.query)}&st=${p.st}&et=${p.et}&type=${p.t}',
        pc_query: SEARCHTOOLS_APIS_ROOT_query_mehu + '/request?query=${p.query}&st=${p.st}&et=${p.et}&type=${p.type}&pno=${p.pno||1}&psize=${p.psize||10}&queryFrom=searchtool',
        pc_query_realtime: SEARCHTOOLS_APIS_ROOT_query_mehu_realtime + '/request?cmd=realtime&query=${(p.query)}&st=${p.st}&et=${p.et}&type=${p.type}&pno=${p.pno||1}&psize=${p.psize||10}&queryFrom=searchtool',
        pc_query_mehu_export: SEARCHTOOLS_APIS_ROOT_query_mehu + '/request?query=${p.query}&st=${p.st}&et=${p.et}&type=${p.type}&pno=${p.pno||1}&psize=${p.psize||10}&cmd=export&queryFrom=searchtool',
        pc_query_mehu_export_realtime: SEARCHTOOLS_APIS_ROOT_query_mehu + '/request?query=${p.query}&st=${p.st}&et=${p.et}&type=${p.type}&pno=${p.pno||1}&psize=${p.psize||10}&cmd=export&queryFrom=searchtool',
        pc_extract_export: SEARCHTOOLS_APIS_ROOT + '/pcquery/export?st=${p.st}&num=${p.num}&type=${p.extract_type}',
        pc_hots: SEARCHTOOLS_APIS_ROOT + '/pcquery/hwdetail?st=${p.st}&et=${p.et}&channel=${p.source_type}',
        pc_hots_fast: SEARCHTOOLS_APIS_ROOT_waphot + '/pcqueryrank?st=${p.st}&et=${p.et}',
        pc_hots_export_week: SEARCHTOOLS_APIS_ROOT + '/pcquery/hwexport?st=${p.st}&et=${p.et}&channel=${p.source_type}',
        pc_hots_gather: SEARCHTOOLS_APIS_ROOT + '/pcquery/hwtotal?st=${p.st}&et=${p.et}&channel=${p.source_type}',
        pc_hots_export_gather: SEARCHTOOLS_APIS_ROOT + '/pcquery/hwexporttotal?st=${p.st}&et=${p.et}&channel=${p.source_type}',
        pc_hots_realtime: SEARCHTOOLS_APIS_ROOT + '/pcquery/hwhour?st=${p.st}&channel=${p.source_type}',
        pc_hots_export_realtime: SEARCHTOOLS_APIS_ROOT + '/pcquery/hourexport?st=${p.st}&channel=${p.source_type}',
        pc_refer_detail: SEARCHTOOLS_APIS_ROOT + '/pcquery/hwrefer?st=${p.st}&et=${p.et}&channel=${p.source_type}&query=${p.query}',
        pc_refer_detail_export: SEARCHTOOLS_APIS_ROOT + '/pcquery/hwexportref?st=${p.st}&et=${p.et}&channel=${p.source_type}&query=${p.query}',
        pc_hots_chanel: SEARCHTOOLS_APIS_ROOT + '/pcquery/channel?st=${p.st}&et=${p.et}&channel=${p.source_type}',
        pc_pid_channel: SEARCHTOOLS_APIS_ROOT_pid + "/pidchannel/channeldescpid?date=${p.st}&type=pc&firstchannel=${p.firstchannel}&secondchannel=${p.secondchannel}&thirdchannel=${p.thirdchannel}&query=${p.query}&pno=${p.pno}&psize=${p.psize}",
        pc_pid_tree_channel: SEARCHTOOLS_APIS_ROOT_pid + "/pidchannel/channeldesc?type=pc&date=${p.st}",
        pc_pid_relation: SEARCHTOOLS_APIS_ROOT_pid + "/pidchannel/pidrelation?type=pc&query=${p.query}",
        pc_pid_relation_history: SEARCHTOOLS_APIS_ROOT_pid + "/pidchannel/pidrelationlog?type=pc&pno=${p.pno}&psize=${p.psize}"
    }, weixin: {}, mingyi: {}, english: {}, zhihu: {}, _vsdef: {
        _session: SEARCHTOOLS_APIS_ROOT + '/vs${p._pc_wap}session?channel=${p.pageType}&query=${(p.query || "")}&st=${p.st}&et=${p.et}&uid=${(p.uid || "")}&pno=${p.pno}&psize=${p.psize}&searchtype=${p.type}&vstype=${p[_cz]}&terminal=${p._terminal}',
        _session_uid: SEARCHTOOLS_APIS_ROOT + '/vs${p._pc_wap}session?query=${(p.query || "")}&channel=${p.source_type}&st=${p.st}&et=${p.et}&uid=${(p.uid || "")}&uidpno=${p.uidpno}&uidpsize=${p.uidpsize}&searchtype=${p.type}&vstype=${p[_cz]}&terminal=${p._terminal}',
        _session_random_export: SEARCHTOOLS_APIS_ROOT + '/vs${p._pc_wap}session/randomexport?st=${p.st}&et=${p.et}&num=${p.num}&terminal=${p._terminal}&vstype=${p[_cz]}',
        _session_export: SEARCHTOOLS_APIS_ROOT + '/vs${p._pc_wap}session/export?query=${(p.query || "")}&st=${p.st}&et=${p.et}&num=${p.num}&searchtype=${p.type}&terminal=${p._terminal}&vstype=${p[_cz]}',
        _query_export: SEARCHTOOLS_APIS_ROOT + '/wapqueryclick/export?query=${p.query}&st=${p.st}&et=${p.et}&channel=${p.pageType}',
        _query_export_sogoubaidu: SEARCHTOOLS_APIS_ROOT + '/wapsogourank/export?query=${p.query}&st=${p.st}&et=${p.et}',
        _query_total: SEARCHTOOLS_APIS_ROOT + '/vs${p._pc_wap}queryclick/total?vstype=${p[_cz]}&channel=${p.pageType}&terminal=${p._terminal}&query=${p.query}&st=${p.st}&et=${p.et}'
        // ,_query_total_baidu: SEARCHTOOLS_APIS_ROOT+ '/wapsogourank/total?query=${p.query}&st=${p.st}&et=${p.et}
        ,
        _query_class: SEARCHTOOLS_APIS_ROOT + '/vs${p._pc_wap}queryclick/total?channel=${p.pageType}&terminal=${p._terminal}&query=${p.query}&st=${p.st}&et=${p.et}&vstype=${p[_cz]}&pno=${p.pno || 1}&psize=${p.psize || 100}',
        _query_detail: SEARCHTOOLS_APIS_ROOT + '/vs${p._pc_wap}queryclick/detail?channel=${p.pageType}&terminal=${p._terminal}&query=${p.query}&st=${p.st}&et=${p.et}&vstype=${p[_cz]}&pno=${p.pno || 1}&psize=${p.psize || 100}'
        //,_query_detail_top: SEARCHTOOLS_APIS_ROOT + '/vs${p._pc_wap}queryclick/detail?query=${p.query}&typekey=${p.typekeys}&urlkey=&st=${p.st}&et=${p.et}&pno=${p.pno}&psize=${p.psize}'
        // ,_query_detail_sogoubaidu:  SEARCHTOOLS_APIS_ROOT +'/wapsogourank/detail?query=${p.query}&host=${p.host}&st=${p.st}&et=${p.et}&pno=${p.pno || 1}&psize=${p.psize || 100}'
        ,
        _history_ctr: SEARCHTOOLS_APIS_ROOT + '/vs${p._pc_wap}queryclick/${(p.t || "").toLowerCase()}?query=${p.query}&st=${p.st}&et=${p.et}&typekey=${p.typekey}&channel=${p.pageType}'
        // ,_history_ctr_sogoubaidu: SEARCHTOOLS_APIS_ROOT + '/wapsogourank/ctr?query=${p.query}&st=${p.st}&et=${p.et}'
        ,
        _history_pv: SEARCHTOOLS_APIS_ROOT + '/vs${p._pc_wap}query/chart?channel=${p.pageType}&terminal=${p._terminal}&query=${(p.query)}&st=${p.st}&et=${p.et}&vstype=${p[_cz]}'
        // ,_history_pv_sogoubaidu: SEARCHTOOLS_APIS_ROOT + '/wapsogourank/pv?query=${p.query}&st=${p.st}&et=${p.et}'
        ,
        _site_domain_url_detail_0: SEARCHTOOLS_APIS_ROOT + '/vs${p._pc_wap}_siteclick/detail?domain=${p.query}&st=${p.st}&et=${p.et}&type=${p.t}&pno=${p.pno||1}&psize=${p.psize||100}&terminal=${p._terminal}&vstype=${p[_cz]}',
        _site_domain_url_detail_1: SEARCHTOOLS_APIS_ROOT + '/vs${p._pc_wap}_siteclick/detail?domain=${p.query}&st=${p.st}&et=${p.et}&type=${p.t}&pno=${p.pno||1}&psize=${p.psize||100}&terminal=${p._terminal}&vstype=${p[_cz]}',
        _site_domain_url_detail_2: SEARCHTOOLS_APIS_ROOT + '/vs${p._pc_wap}_siteclick/detail?domain=${p.query}&st=${p.st}&et=${p.et}&type=${p.t}&pno=${p.pno||1}&psize=${p.psize||100}&terminal=${p._terminal}&vstype=${p[_cz]}',
        _site_domain_url_total_0: SEARCHTOOLS_APIS_ROOT + '/vs${p._pc_wap}_siteclick/total?domain=${p.query}&st=${p.st}&et=${p.et}&type=${p.t}&pno=${p.pno||1}&psize=${p.psize||100}&terminal=${p._terminal}&vstype=${p[_cz]}',
        _site_domain_url_total_1: SEARCHTOOLS_APIS_ROOT + '/vs${p._pc_wap}_siteclick/total?domain=${p.query}&st=${p.st}&et=${p.et}&type=${p.t}&pno=${p.pno||1}&psize=${p.psize||100}&terminal=${p._terminal}&vstype=${p[_cz]}',
        _site_domain_url_total_2: SEARCHTOOLS_APIS_ROOT + '/vs${p._pc_wap}_siteclick/total?domain=${p.query}&st=${p.st}&et=${p.et}&type=${p.t}&pno=${p.pno||1}&psize=${p.psize||100}&terminal=${p._terminal}&vstype=${p[_cz]}',
        _site_domain_url_export_0: SEARCHTOOLS_APIS_ROOT + '/pc_domainclick/export?domain=${p.query}&st=${p.st}&et=${p.et}&type=${p.t}',
        _site_domain_url_export_1: SEARCHTOOLS_APIS_ROOT + '/pc_domainclick/export?domain=${p.query}&st=${p.st}&et=${p.et}&type=${p.t}',
        _site_domain_url_export_2: SEARCHTOOLS_APIS_ROOT + '/pc_urlclick/export?url=${(p.query)}&st=${p.st}&et=${p.et}&type=${p.t}',
        _query: SEARCHTOOLS_APIS_ROOT_query_mehu_chuizhi + '/request?query=${p.query}&st=${p.st}&et=${p.et}&type=${p.type}&pno=${p.pno||1}&psize=${p.psize||10}&queryFrom=searchtool&channel1=${p[_cz]}&channel2=${p.pageType}'
        //,_query_realtime: SEARCHTOOLS_APIS_ROOT +"/vs${p._pc_wap}queryclick/total?&query=123&st=20161101&et=20161101"
        //等陈承统一垂直模糊查询
        ,
        _query_mehu_export: SEARCHTOOLS_APIS_ROOT_query_mehu_chuizhi + '/request?query=${p.query}&st=${p.st}&et=${p.et}&type=${p.type}&pno=${p.pno||1}&psize=${p.psize||10}&queryFrom=searchtool&channel1=${p[_cz]}&channel2=${p.pageType}&cmd=export'
        //,_query_mehu_export_realtime: SEARCHTOOLS_APIS_ROOT_query_mehu_chuizhi+'/request?query=${p.query}&st=${p.st}&et=${p.et}&type=${p.type}&pno=${p.pno||1}&psize=${p.psize||10}&cmd=export&queryFrom=searchtool&channel1=${p[_cz]}&channel2=${p.pageType}'
        ,
        _extract_export: SEARCHTOOLS_APIS_ROOT + '/vs${p._pc_wap}query/export?channel=${p.pageType}&terminal=${p._terminal}&st=${p.st}&num=${p.num}&type=${p.extract_type}&platform=${p.platform}&vstype=${p[_cz]}'
        // ,_hots: SEARCHTOOLS_APIS_ROOT_waphot+'/wapquery/hwdetail?st=${p.st}&et=${p.et}&channel=${p.source_type}'
        // ,_hots_export_week: SEARCHTOOLS_APIS_ROOT_waphot+'/wapquery/hwexport?st=${p.st}&et=${p.et}&channel=${p.source_type}'
        // ,_hots_gather: SEARCHTOOLS_APIS_ROOT_waphot+'/wapquery/hwtotal?st=${p.st}&et=${p.et}&channel=${p.source_type}'
        // ,_hots_export_gather: SEARCHTOOLS_APIS_ROOT_waphot+'/wapquery/hwexporttotal?st=${p.st}&et=${p.et}&channel=${p.source_type}'
        // ,_hots_realtime: SEARCHTOOLS_APIS_ROOT +'/wapquery/hwhour?st=${p.st}&channel=${p.source_type}'
        // ,_hots_export_realtime: SEARCHTOOLS_APIS_ROOT_waphot+'/wapquery/hourexport?st=${p.st}&channel=${p.source_type}'
        // ,_refer_detail: SEARCHTOOLS_APIS_ROOT_waphot+'/wapquery/hwrefer?st=${p.st}&et=${p.et}&channel=${p.source_type}&query=${p.query}'
        ,
        _hots_chanel: SEARCHTOOLS_APIS_ROOT + '/${p._pc_wap}query/channel?st=${p.st}&et=${p.et}&channel=${p.source_type}'
        // ,_refer_detail_export: SEARCHTOOLS_APIS_ROOT_waphot+'/wapquery/hwexportref?st=${p.st}&et=${p.et}&channel=${p.source_type}&query=${p.query}'
        // ,_hots_chanel: SEARCHTOOLS_APIS_ROOT+'/wapquery/channel?st=${p.st}&et=${p.et}&&channel=${p.source_type}'
        // ,_pid_channel: SEARCHTOOLS_APIS_ROOT_pid+"/pidchannel/channeldescpid?date=${p.st}&type=wap&firstchannel=${p.firstchannel}&secondchannel=${p.secondchannel}&thirdchannel=${p.thirdchannel}&query=${p.query}&pno=${p.pno}&psize=${p.psize}"
        // ,_pid_tree_channel: SEARCHTOOLS_APIS_ROOT_pid+"/pidchannel/channeldesc?type=wap&date=${p.st}"
        // ,_pid_relation: SEARCHTOOLS_APIS_ROOT_pid+"/pidchannel/pidrelation?type=wap&query=${p.query}"
        // ,_pid_relation_history: SEARCHTOOLS_APIS_ROOT_pid+"/pidchannel/pidrelationlog?type=wap&pno=${p.pno}&psize=${p.psize}"
    }
};
var searchtool_getWebWap = function (pcWap) {
    if (pcWap == "pc" || pcWap == "web") {
        return "web";
    }
    else {
        return "wap";
    }
};
function SEARCHTOOLS_API_SERVER(apiName, params) {
    var defaultChuizhi = "def";
    var chuizhi = store.get(_cz) || defaultChuizhi;
    var realUrl = "";
    var realChuizhi = "";
    var apiName = apiName || "";
    if (apiName != "") {
        var p = {};
        p[_cz] = chuizhi;
        p = $.extend(p, { "_pc_wap": params.pc_wap }, params);
        for (var key in p) {
            p[key] = encodeURIComponent($.trim(p[key] || ""));
        }
        try {
            var tplStr = "";
            tplStr = SEARCHTOOLS_APIS[chuizhi][apiName] || "";
            if (chuizhi != defaultChuizhi) {
                if ($.trim(tplStr) == "") {
                    realChuizhi = "_vsdef";
                    p._terminal = searchtool_getWebWap(p._pc_wap);
                    if (chuizhi == "zhihu" || chuizhi == "weixin") {
                        p._pc_wap = "pc";
                    }
                    apiName = apiName.replace(/^pc|^wap/, "");
                    tplStr = SEARCHTOOLS_APIS[realChuizhi][apiName] || "";
                }
            }
            if ($.trim(tplStr) != "") {
                realUrl = _.template(tplStr)({ p: p });
                console.log(realUrl + "  :" + apiName, chuizhi, realChuizhi, apiName);
            }
            else {
                console.warn("[warn] not config tplurl", chuizhi, apiName);
            }
        }
        catch (e) {
            console.warn("[warn] gen url by tplurl", chuizhi, apiName, e.toString());
        }
    }
    return realUrl;
}
var search_tool_iframe_tpl = _.template('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">\n<html>\n<head>\n    <meta charset="utf-8">\n    <title>${title}</title>\n    <meta name="description" content="">\n    <meta name="keywords" content="">\n    <link href="css/reset.css" rel="stylesheet">\n    <link href="css/layout.css" rel="stylesheet">\n    <link href="css/reset.css" rel="stylesheet">\n    <link href="css/layout.css" rel="stylesheet">\n    <link rel="stylesheet" href="js/kkpager/kkpager_orange.css">\n</head>\n<body style="overflow-y: hidden;">\n<div class="header">\n    <a href="javascript:void(0)" class="logo"><img src="images/logo.jpg"></a>\n    <div class="login"><span>欢迎进入Searchtool</span><a href="javascript:void(0)" class="suser"><i></i>Andrew\n        Lucas...</a><a href="javascript:void(0)">[退出]</a><a href="javascript:void(0)">意见反馈</a><a\n            href="javascript:void(0)" class="help">数据说明</a></div>\n</div>\n<div class="main">\n    <div class="nav" id="nav"></div>\n    <div class="operate" style="overflow:hidden;">\n        <a href="javascript:void(0)" class="leftnav-btn leftnav-btn-o" data-toggle="nav" onclick="$(\'#nav\').toggle()" style="top:30%"></a>\n        <iframe src="${iframeUrl}" marginwidth=0 marginheight=0 hspace=0 vspace=0 frameborder=0 scrolling=no id="test" width="100%"\n                height="100%"></iframe>\n    </div>\n</div>\n<style>html {\n    overflow-y: hidden;\n} </style>\n</body>\n</html>');
var SearchToolErrorUtil = (function () {
    function SearchToolErrorUtil(timeout) {
        this.msg = "";
        this.timeout = timeout || 2000;
        var jbody = $("body");
        if (parent) {
            jbody = parent.$("body");
        }
        var jerror = jbody.find("#___error__");
        if (jerror.size() == 0) {
            jerror = $("<div class=\"error-tip\" style=\"display: none\" id=\"___error__\"></div>");
            jbody.append(jerror);
        }
        var jinfo = jbody.find("#___info__");
        if (jinfo.size() == 0) {
            jinfo = $("<div class=\"info-tip\" style=\"display: none\" id=\"___info__\"></div>");
            jbody.append(jinfo);
        }
        this.jerror = jerror;
        this.jinfo = jinfo;
    }
    SearchToolErrorUtil.prototype.emsg = function (msg, timeout) {
        var v = this;
        var to = timeout || v.timeout;
        v.jerror.html(msg);
        v.jerror.stop(true, true).hide();
        v.jerror.fadeIn();
        v.jerror.delay(to).fadeOut();
    };
    SearchToolErrorUtil.prototype.info = function (msg, timeout) {
        var v = this;
        var to = timeout || v.timeout;
        v.jinfo.html(msg);
        v.jinfo.stop(true, true).hide();
        v.jinfo.fadeIn();
        v.jinfo.delay(to).fadeOut();
    };
    return SearchToolErrorUtil;
}());
var SEARCHTOOL_ERRORUTIL = new SearchToolErrorUtil(2000);
function searchtool_getKeywordUrl(query, pc_wap) {
    // var site = "http://m.sogou.com/web/searchList.jsp?w=1244&v=5&monitor=1&s_from=searchtool&keyword=";
    var site = "http://www.sogoucn.com/wap.html?dbg=off&query=";
    pc_wap = pc_wap || "wap";
    if (pc_wap == "pc") {
        site = " https://www.sogou.com/web?query=";
    }
    var queryUrl = site + encodeURIComponent(query);
    return queryUrl;
}
;
function searchtool_tabevent(rootSel, subSel, curClass, callback) {
    $(rootSel).on("click", subSel, function () {
        var jclicked = $(this);
        $(rootSel).find(subSel).removeClass(curClass);
        jclicked.addClass(curClass);
        if (_.isFunction(callback)) {
            try {
                callback(jclicked);
            }
            catch (e) {
            }
        }
    });
}
;
function searchtool_addInputById(eid) {
    var jinput = $(eid);
    if (jinput.size() == 0) {
        jinput = $("<input id='" + eid + "' style=\"display: none\" />");
        $("body").append(jinput);
    }
    return jinput;
}
;
function searchtool_getApiUrl(params, apiName) {
    var pc_wap = params.pc_wap || "wap";
    var realApiName = pc_wap + "_" + apiName;
    var apiUrl = SEARCHTOOLS_API_SERVER(realApiName, params);
    if (apiUrl == "") {
        console.log("检查 " + pc_wap + " 接口 " + apiName);
    }
    return apiUrl;
}
;
function searchtool_ReactSelectRender(eid, items, qcb, width) {
    var items = items || [];
    var prop = {
        rit: {},
        item: items[0] || {},
        items: items, qcb: qcb || function () {
        },
        width: width
    };
    ReactDOM.render(React.createElement(RSelect, __assign({}, prop)), document.getElementById(eid));
    return prop;
}
function searchtool_reinit_page(res, pageChangeF, eid) {
    var eid = eid || "kkpager";
    var res = res || {};
    var pno = res.pno || 1;
    var total = res.total || 0;
    var psize = res.psize || 10;
    var totalPage = (Math.floor(total / psize) + (total % psize == 0 ? 0 : 1));
    if (totalPage > 1) {
        new kkpager(eid, psize).generPageHtml({
            pno: pno,
            //总页码
            total: totalPage,
            //总数据条数
            totalRecords: total,
            mode: 'click',
            click: function (pno) {
                this.selectPage(pno);
                try {
                    if ($.isFunction(pageChangeF)) {
                        pageChangeF(pno);
                    }
                }
                catch (e) {
                    console.log("error in page change ", e);
                }
                return false;
            }
        });
        $("#" + eid).show();
    }
    else {
        $("#" + eid).hide();
    }
}
/**
 * 回车响应事件
 * @param callBack
 */
function searchtools_enter_event(callBack) {
    if (_.isFunction(callBack)) {
        $("body").on("keydown", function (e) {
            if (e.keyCode == 13) {
                callBack();
            }
        });
    }
}
function searchtools_isPassStEtDateCheck(params, callback) {
    var st = _.trim(params.st || "");
    var et = _.trim(params.et || "");
    var isPass = false;
    if (st != "" && et != "") {
        try {
            var mst = moment(st, "YYYYMMDD");
            var met = moment(et, "YYYYMMDD");
            isPass = met.isSame(mst) || met.isAfter(mst);
            //console.log(st,et,"------------------",isPass)
        }
        catch (e) {
            console.log(e);
        }
        if (isPass) {
            if (_.isFunction(callback)) {
                callback(isPass);
            }
        }
        else {
            SEARCHTOOL_ERRORUTIL.emsg("开始时间不能大于结束时间");
        }
    }
    return isPass;
}
function getEndDateFromParams(p) {
    var et = moment().add("day", -1);
    try {
        if ((p.et || "") != "") {
            et = moment(p.et, "YYYYMMDD");
        }
    }
    catch (e) {
    }
    return et;
}
;
function limitUrl(str, len, hasDot) {
    var len = len || 68;
    var hasDot = hasDot || true;
    var newLength = 0;
    var newStr = "";
    var chineseRegex = /[^\x00-\xff]/g;
    var singleChar = "";
    var strLength = str.replace(chineseRegex, "**").length;
    for (var i = 0; i < strLength; i++) {
        singleChar = str.charAt(i).toString();
        if (singleChar.match(chineseRegex) != null) {
            newLength += 2;
        }
        else {
            newLength++;
        }
        if (newLength > len) {
            break;
        }
        newStr += singleChar;
    }
    if (hasDot && strLength > len) {
        newStr += "...";
    }
    return newStr;
}
function limitArr(qArr, limit) {
    var qArr = qArr || [];
    var rQarr = [];
    if (qArr.length > limit) {
        _.map(qArr, function (it, index) {
            if (index < limit) {
                rQarr.push(it);
            }
        });
    }
    else {
        rQarr = qArr;
    }
    return rQarr;
}
function splitRemoveRepeat(querys) {
    var qArr = (querys || "").split(",");
    var a = {};
    var uQarr = [];
    _.map(qArr, function (it) {
        var it = _.trim(it);
        if (it != "" && a[it] != true) {
            a[it] == true;
            uQarr.push(it);
        }
    });
    return _.union(uQarr);
}
function limitArrFormString(querys, limitNum) {
    return limitArr(splitRemoveRepeat(querys), limitNum);
}
function sgDecodeURIComponent(items) {
    var newStr = items || "";
    try {
        newStr = decodeURIComponent(newStr);
    }
    catch (e) {
    }
    return newStr;
}
function num_average_click_position(value) {
    try {
        if (value == "NaN") {
            return "";
        }
        return (Math.ceil(value * 100) / 100).toFixed(2);
    }
    catch (e) {
        return "";
    }
}
function num_ctr(value) {
    try {
        if (value == "NaN" || value == "Infinity") {
            return "";
        }
        return Math.ceil(value * 10000) / 100 + "%";
    }
    catch (e) {
        return "";
    }
}
function fillHtmlOrInput(obj, kt, jroot) {
    var keyTypeObjs = _.map(_.split(kt || "", ","), function (val) {
        var key_type = _.split(val, ":");
        return { name: _.trim(key_type[0]), type: _.trim(key_type[1] || "") };
    }).filter(function (obj) {
        return _.trim(obj.name || "") != "";
    });
    var keys = _.map(keyTypeObjs, "name");
    _.each(obj, function (val, key) {
        var jit = jroot.find('[data-fill=' + key + ']');
        var foundIndex = _.findIndex(keys, function (nowKey) {
            return nowKey == key;
        });
        try {
            if (foundIndex > -1) {
                // console.log(keys, key, val, "1111")
                jit.val(val);
            }
            else {
                // console.log(keys, key, val, "2222")
                jit.html(val);
            }
        }
        catch (e) {
        }
    });
}
var SEARCHTOOLS_GET_CHUIZHI_NAME = function () {
    return (store.get(_cz) || "def");
};
function getCzUrlParams() {
    return "&" + _cz + "=" + SEARCHTOOLS_GET_CHUIZHI_NAME();
}
function SEARCHTOOLS_ISCHUIZHI() {
    return SEARCHTOOLS_GET_CHUIZHI_NAME() != "def";
}
function SEARCHTOOLS_ISCHUIZHI_params(params) {
    return ((params || {})[_cz] || "def") != "def";
}
var SEARCHTOOL_MONTIOR_TASK = function (type, p) {
    var urlParams = UrlUtil.getParams(function (p) {
        var p = $.extend(p, {
            st: $("#st").html(),
            et: $("#et").html()
        });
        return p;
    }, p || {});
    var taskid = null;
    var all = {
        query: {
            def: { pc: 1957, wap: 1959 }
        },
        hots: {
            def: { pc: 1957, wap: 1959 }
        },
        baidu_click_parse: {
            def: { pc: 1975, wap: 1974 }
        },
        query_extract: {
            cz: { pc: 2022, wap: 2024 },
            def: { pc: 1981, wap: 1971 }
        }, session: {
            cz: { pc: 2025, wap: 2026 },
            def: { pc: 1953, wap: 1951 }
        }, session_export: {
            cz: { pc: 2025, wap: 2026 },
            def: { pc: 1953, wap: 1951 }
        }, history_pv: {
            cz: { pc: 2025, wap: 2026 },
            def: { pc: 1953, wap: 1951 }
        }, query_click: {
            cz: { pc: 2025, wap: 2023 },
            def: { pc: 1970, wap: 1954 }
        }, site: {
            cz: { pc: 2027, wap: 2028 },
            def: { pc: 1952, wap: 1950 }
        }
    };
    var cz = SEARCHTOOLS_ISCHUIZHI() ? "cz" : "def";
    if (cz == "weixin") {
        cz = "def";
    }
    try {
        taskid = all[type][cz][urlParams.pc_wap];
    }
    catch (e) {
    }
    if (taskid) {
        $.ajax({
            url: "http://stservice.sogou/monitor?taskid=" + taskid + "&st=" + urlParams.st + "&et=" + urlParams.et,
            type: "GET",
            dataType: "jsonp",
            success: function (data) {
                $(".monitor").html(data[0]);
            },
            error: function (e) {
                console.log(e);
            }
        });
    }
    return taskid;
};
var iframeDialog = function (dialogId, url) {
    var jbatchIframe = $("#" + dialogId);
    if (jbatchIframe.size() == 0) {
        jbatchIframe = $(" <div id=\"" + dialogId + "\" style=\"width: 550px; height:300px; border: #999999 1px solid; display: none; position: fixed; top: 60%; left: 50%; margin-left: -400px; margin-top: -300px; z-index: 2999; filter: progid:DXImageTransform.Microsoft.Shadow(color=#909090,direction=120,strength=4); -moz-box-shadow: 2px 2px 10px #909090; -webkit-box-shadow: 2px 2px 10px #909090; box-shadow: 2px 2px 10px #909090;\">\n                                    <div\n                                        style=\"height: 30px; line-height: 30px; font-family: Microsoft Yahei; font-size: 20px;   padding-left: 20px; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAyCAYAAABlG0p9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABvSURBVEhL1cq5DcAwDENR7T+sL9lOOoUbkCoCwwKewOJbiGe+31BkwgeDM18YgrPhxuBs4CkS4cQQZMKFwd0R+gzFJaFjcD+EfXgoMuHA4O4Iew/FJWHD4BJhwxDoYcNTIKwY3NGwYggQFgxODEt8xO1/6P+HHxEAAAAASUVORK5CYII=); border-bottom: 1px solid #999999; position: relative;\">\n                                        <div id=\"popWinClose\"\n                                             style=\"width: 30px; height:30px; cursor: pointer; position: absolute; top:0px; right: -9px;color:#000 \" onclick=\"$(this).parent().parent() .hide()\">X\n                                        </div>\n                                    </div>\n                                    <iframe width=\"550\" height=\"280\" frameborder=\"0\" scrolling=\"no\" src=\"" + url + "\"></iframe>\n                                </div>");
        $("body").append(jbatchIframe);
    }
    jbatchIframe.mousedown(function () {
        $(this).css("cursor", "pointer");
    }).mouseup(function () {
        $(this).css("cursor", "default");
    });
    try {
        jbatchIframe.draggable();
    }
    catch (e) {
    }
    return jbatchIframe;
};
(function () {
    $(function () {
        if (SEARCHTOOLS_ISCHUIZHI()) {
            $('#d_page_type').show();
            if (SEARCHTOOLS_ISCHUIZHI()) {
                var chuizhi = SEARCHTOOLS_GET_CHUIZHI_NAME();
                var params = UrlUtil.getParams(function (p) {
                    return p;
                });
                var webWap = searchtool_getWebWap(params.pc_wap);
                $.ajax({
                    url: SEARCHTOOLS_APIS_ROOT + ("/vspcsession/getchannel?vstype=" + chuizhi + "&terminal=" + webWap),
                    dataType: "jsonp"
                }).then(function (res) {
                    if (res) {
                        var options = [];
                        var isNeedAddAll = false;
                        var navIdStr = ("" + params.navId);
                        if (navIdStr.length <= 6 && navIdStr.endsWith("0301")) {
                        }
                        else {
                            isNeedAddAll = true;
                        }
                        if (isNeedAddAll) {
                            options.push("<option value=\"all\">\u5168\u90E8</option>");
                        }
                        for (var key in res) {
                            var value = res[key];
                            options.push("<option value=\"" + key + "\">" + value + "</option>");
                        }
                        $("[name=pageType]").html(options.join("\n"));
                    }
                });
            }
        }
        else {
            $("#a_export_batch").show();
            $("#searchtool_source").show();
            $("#a_export").show();
        }
        var jbatchExport = $("#a_export_batch");
        if (jbatchExport.size() > 0) {
            var dialogId = "a_export_batch_togger";
            var url = 'query_betch_export.html';
            var jbatchIframe = iframeDialog(dialogId, url);
            jbatchExport.click(function () {
                jbatchIframe.show();
            });
        }
        //searchtool 通用事件
        $("body").on('click', '.st_m97dateyyyymmdd', function (e) {
            var id = $(this).attr("id");
            WdatePicker.call(e.target, {
                isShowClear: false, dateFmt: 'yyyyMMdd', maxDate: '%y-%M-%d',
                onpicking: function (dp) {
                    try {
                        date_picking(id, dp.cal.getDateStr(), dp.cal.getNewDateStr());
                    }
                    catch (e) {
                    }
                }, onpicked: function (dp) {
                    try {
                        date_picked(id, dp.cal.getDateStr(), dp.cal.getNewDateStr());
                    }
                    catch (e) {
                    }
                }
            });
        });
        //session的日期点击事件，session的maxDate是前一天
        $("body").on('click', '.seesion_dp', function (e) {
            var id = $(this).attr("id");
            console.log(e);
            WdatePicker.call(e.target, {
                isShowClear: false, dateFmt: 'yyyyMMdd', maxDate: '%y-%M-#{%d-1}',
                onpicking: function (dp) {
                    try {
                        date_picking(id, dp.cal.getDateStr(), dp.cal.getNewDateStr());
                    }
                    catch (e) {
                    }
                }, onpicked: function (dp) {
                    try {
                        date_picked(id, dp.cal.getDateStr(), dp.cal.getNewDateStr());
                    }
                    catch (e) {
                    }
                }
            });
        });
    });
})();
//# sourceMappingURL=searchtool_common.js.map