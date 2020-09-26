/**
 * @package AJSON
 * @author BroadBrander <info@broadbrander.com>
 * @license MIT
 * @description A tiny HTTP client for the browser.
 */
window.ajson = function ({
  method: method = "GET", // HTTP request method (GET, POST, DELETE, PUT etc.)
  url: url, // URL to request
  async: async = true, // Boolean to set the http request async
  data: data, // Data to to send
  contentType: contentType = "application/x-www-form-urlencoded; charset=UTF-8", // content type of data
  responseType: responseType = null, // response data type (example: JSON)
  headers: headers = {}, // Object of http request headers
  mimeType: mimeType = null, // Overwrite MimeType
  username: username = null, // User name for authentication
  password: password = null, // Password for authentication
  before: beforeCallback, // Callback function to run before http request start
  start: startCallback, // Callback function to run on http request start
  uploadProgress: uploadProgress, // Callback function on upload progress
  downloadProgress: downloadProgress, // Callback function on download progress
  success: successCallback, // Callback function to run on http request success
  complete: endCallback, // Callback function to run on http request complete
  fail: failCallback, // Callback function to run on http request fail
}) {
  // Callback function before starting http request
  if (typeof beforeCallback === "function") {
    beforeCallback();
  }

  // define http variable
  var http;
  try {
    // for modern browser
    http = new XMLHttpRequest();
  } catch (e) {
    try {
      http = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  // Callback funtion to run on request start
  if (typeof startCallback === "function") {
    http.onloadstart = startCallback;
  }

  // Callback funtion to run on download progress
  if (typeof downloadProgress === "function") {
    http.onprogress = downloadProgress;
  }

  // Callback funtion to run on upload progress
  if (typeof uploadProgress === "function") {
    http.upload.onprogress = uploadProgress;
  }

  // Process the data on load
  http.onload = function (event) {
    // The result
    var result;
    // if responseType is json, parse json
    if (responseType === "json" || responseType === "JSON") {
      result = JSON.parse(http.response);
    } else {
      result = http.response;
    }
    // All response header
    var headers = http.getAllResponseHeaders();

    // Return data depending on status code
    if (http.status >= 200 && http.status < 300) {
      // Success callback function
      if (typeof successCallback === "function") {
        successCallback(result, headers);
      }
    } else {
      // Error callback function
      if (typeof failCallback === "function") {
        failCallback(result, headers);
      }
    }
  };

  // Callback function to run on request fail
  if (typeof failCallback === "function") {
    http.onerror = failCallback;
  }

  // Callback function to run on end of the request
  if (typeof endCallback === "function") {
    http.onloadend = endCallback;
  }

  // make the request method name lowercase
  method = method.toLowerCase();

  // url encode data
  var finalData = "";
  for (var key in data) {
    if (typeof data === "object") {
      if (finalData != "") {
        finalData += "&";
      }
      finalData += key + "=" + encodeURIComponent(data[key]);
    }
  }
  // process the data to send
  if (method == "get") {
    url = url + "?" + finalData;
  }

  // url encode on post request with default content type header
  if (
    method === "post" &&
    contentType === "application/x-www-form-urlencoded; charset=UTF-8"
  ) {
    data = finalData;
  }

  // open http request
  http.open(method, url, async, username, password);

  // overwrite content-type header
  http.setRequestHeader("Content-type", contentType);

  // overwrite mime type
  if (mimeType !== null) {
    http.overrideMimeType(mimeType);
  }

  // set http headers
  for (var hdr in headers) {
    if (headers !== {}) {
      http.setRequestHeader(hdr, headers[hdr]);
    }
  }

  // finally send the data
  return http.send(data);
};
