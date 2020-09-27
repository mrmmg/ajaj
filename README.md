# AJAJ (Asynchronous JavaScript And JSON)

[![npm version](https://img.shields.io/npm/v/@broadbrander/ajaj.svg?style=flat-square)](https://www.npmjs.org/package/@broadbrander/ajaj)  
[![](https://data.jsdelivr.com/v1/package/npm/@broadbrander/ajaj/badge)](https://www.jsdelivr.com/package/npm/@broadbrander/ajaj)
[![build status](https://img.shields.io/travis/broadbrander/ajaj/master.svg?style=flat-square)](https://travis-ci.org/broadbrander/ajaj)
[![npm downloads](https://img.shields.io/npm/dm/@broadbrander/ajaj.svg?style=flat-square)](http://npm-stat.com/charts.html?package=@broadbrander/ajaj)

A new tiny 1.2KB (657B gzipped) HTTP client for browser.

## Installation

#### Using npm:

Install the package from npm.

```sh
$ npm install @broadbrander/ajaj
```

Import it in your project.

```js
import ajaj from "@broadbrander/ajaj";
```

#### Using jsDelivr CDN:

Add this script tag in your html document.

```html
<script src="https://cdn.jsdelivr.net/npm/@broadbrander/ajaj@0.2.1/dist/ajaj.min.js"></script>
```

#### Using unpkg CDN:

Add this script tag in your html document.

```html
<script src="https://unpkg.com/@broadbrander/ajaj@0.2.1/dist/ajaj.min.js"></script>
```

## Usage

Using AJAJ is easy! You can perform any types of HTTP requests with the same syntax (similar to jQuery).

### GET request

```js
ajaj({
  method: "GET",
  url: "/path/to/request",
  data: {
    name: "AJAJ",
    version: "1.0.0",
  },
  success: function (data) {
    console.log(data);
  },
  fail: function (error) {
    console.log(error);
  },
});
```

### POST request

```js
ajaj({
  method: "POST",
  url: "/path/to/request",
  data: {
    name: "AJAJ",
    version: "1.0.0",
  },
  success: function (data) {
    console.log(data);
  },
  fail: function (error) {
    console.log(error);
  },
});
```

#### All available options:

There are a lot of options you can use when performing an HTTP request

```js
import ajaj from "@broadbrander/ajaj";

ajaj({
  // The request method (get, post, put, delete etc.)
  method: "POST",
  // The request url
  url: "/path/to/request",
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
```

Congrats, you are an AJAJ expert now! 😊

## License

MIT
