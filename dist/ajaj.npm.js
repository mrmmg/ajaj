module.exports = function ajaj({
  method: j = "GET",
  url: a,
  async: k = !0,
  data: b,
  contentType: l = "application/x-www-form-urlencoded; charset=UTF-8",
  responseType: m = null,
  headers: n = {},
  mimeType: o = null,
  username: p = null,
  password: q = null,
  before: c,
  start: d,
  uploadProgress: e,
  downloadProgress: f,
  success: g,
  complete: h,
  fail: i,
}) {
  "function" == typeof c && c();
  var r;
  try {
    r = new XMLHttpRequest();
  } catch (a) {
    try {
      r = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (a) {
      return console.error(a), !1;
    }
  }
  "function" == typeof d && (r.onloadstart = d),
    "function" == typeof f && (r.onprogress = f),
    "function" == typeof e && (r.upload.onprogress = e),
    (r.onload = function () {
      var a =
        "json" === m || "JSON" === m ? JSON.parse(r.response) : r.response;
      var b = r.getAllResponseHeaders();
      200 <= r.status && 300 > r.status
        ? "function" == typeof g && g(a, b)
        : "function" == typeof i && i(a, b);
    }),
    "function" == typeof i && (r.onerror = i),
    "function" == typeof h && (r.onloadend = h),
    (j = j.toLowerCase());
  var s = "";
  for (var t in b)
    "object" == typeof b &&
      ("" != s && (s += "&"), (s += t + "=" + encodeURIComponent(b[t])));
  for (var u in ("get" == j && (a = a + "?" + s),
  "post" === j &&
    "application/x-www-form-urlencoded; charset=UTF-8" === l &&
    (b = s),
  r.open(j, a, k, p, q),
  r.setRequestHeader("Content-type", l),
  null !== o && r.overrideMimeType(o),
  n))
    ({} !== n && r.setRequestHeader(u, n[u]));
  return r.send(b);
};