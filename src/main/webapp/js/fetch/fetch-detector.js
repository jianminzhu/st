// ���������汾�������� window.__disableNativeFetch �������Ƿ��� fetch
var userAgent = navigator.userAgent || "";
var appVersion = navigator.appVersion || "";
var vendor = navigator.vendor || "";

var ua = (userAgent + ' ' + appVersion + ' ' + vendor).toLowerCase();

var match = /(chrome)[ \/]([\w.]+)/.exec(ua)
      || /(webkit)[ \/]([\w.]+)/.exec(ua)
      || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua)
      || /(msie) ([\w.]+)/.exec(ua)
      || /(trident)(?:.*? rv:([\w.]+)|)/.exec(ua)
      || ua.indexOf("compatible") < 0
      && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];

var engine = match[0];
var mainVersion = match[2].split('.')[0];

// chrome �ں˰汾���� 46�� firefox �汾����39 �ſ��� fetch
if (engine.indexOf('chrome') === 0 && mainVersion >= 46) {
  window.__disableNativeFetch = false;
} else if (engine.indexOf('mozilla') === 0 && mainVersion >= 39) {
  window.__disableNativeFetch = false;
} else {
  window.__disableNativeFetch = true;
}