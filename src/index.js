/**
 * Do http request with XMLHttpRequest();
 */
window.ajson = function ({
  method: method = "GET", // HTTP request method (GET, POST, DELETE, PUT etc.)
  url: url, // URL to request
  async: async = true, // Boolean to set the http request async
  data: data = {}, // Data to to send
  contentType: contentType = "application/x-www-form-urlencoded; charset=UTF-8", // content type of data
  dataType: dataType = null, // response datatype
  headers: headers = null, // Object of headers
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

  if (typeof downloadProgress === "function") {
    http.onprogress = downloadProgress;
  }

  if (typeof uploadProgress === "function") {
    http.upload.onprogress = uploadProgress;
  }

  // Process the data on load
  http.onload = function (event) {
    // The result
    var result;
    if (dataType === "json" || dataType === "JSON") {
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

  // error callback function
  if (typeof failCallback === "function") {
    http.onerror = failCallback;
  }

  if (typeof endCallback === "function") {
    http.onloadend = endCallback;
  }

  method = method.toLowerCase();

  var finalData = "";
  for (var key in data) {
    if (data !== null) {
      if (finalData != "") {
        finalData += "&";
      }
      finalData += key + "=" + encodeURIComponent(data[key]);
    }
  }
  // process the data to send
  if (method == "get") {
    url = url + "?" + finalData;
  } else {
    data = finalData;
  }

  http.open(method, url, async, username, password);

  if (mimeType !== null) {
    http.overrideMimeType(mimeType);
  }

  if (method == "post") {
    http.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded; charset=UTF-8"
    );
  } else {
    http.setRequestHeader("Content-type", contentType);
  }

  for (var hdr in headers) {
    if (headers !== null) {
      http.setRequestHeader(hdr, headers[hdr]);
    }
  }

  return http.send(data);
};
