ajaj({
  // The request method (get, post, put, delete etc.)
  method: "POST",
  // The request url
  url: "/test/test.php",
  // The data to send
  data: {
    name: "this",
    age: "10",
  },
  // Username for authentication (if required)
  username: "user",
  // Password for authentication (if required)
  password: "password",
  // Request asynchronous
  async: true,
  // Content type of the data
  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
  // Data type of response data
  responseType: "json",
  // Object of http headers to send
  headers: {
    Accept: "application/json",
    Pragma: "no-cache",
  },
  // Overwrite mime type
  mimeType: "text/plain",
  // Callback function to run just before starting the request
  before: function () {
    console.log("before");
  },
  // Callback function to run when the request starts
  start: function () {
    console.log("started");
  },
  // Callback function to run on upload progress
  uploadProgress: function (event) {
    console.log("Uploaded " + event.loaded + " bytes of " + event.total);
  },
  // Callback function to run on download progress
  downloadProgress: function (event) {
    console.log("Downloaded " + event.loaded + " bytes of " + event.total);
  },
  // Callback function to run on request success
  success: function (data, headers) {
    console.log(data);
    console.log(headers);
  },
  // Callback function to run on request fail
  fail: function (error) {
    console.log(error);
  },
  // Callback function to run on request complete
  complete: function (event) {
    console.log(event);
  },
});

ajaj({
  method: "GET",
  url: "/test/test.php",
  data: {
    name: "AJAJ",
    version: "1.0.0",
  },
  success: function (data) {
    console.log(data);
  },
  fail: function (data) {
    console.log(data);
  },
});

ajaj({
  method: "POST",
  url: "/test/test.php",
  data: {
    name: "AJAJ",
    version: "1.0.0",
  },
  success: function (data) {
    console.log(data);
  },
  fail: function (data) {
    console.log(data);
  },
});
