"use strict";

const fs = require("fs");

function createLogMessage(params) {
  const timestamp = (new Date()).toLocaleString();

  if (params.err) {
    return `${timestamp}, ${params.err}`;
  }

  return `${timestamp}, ` +
         `${params.url}, ` +
         `${params.resCode}, ` +
         `${params.resTime} ms, ` +
         `${params.resSize} bytes`;
}

function logMessage(message) {
  const logFile = process.argv[1] + ".log";

  fs.appendFile(logFile, message + "\n", err => {
    if (err) {
      console.error(`Error writing to log: ${err.message}`);
    }
  });
}

function parseUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (err) {
    err.message = `Error parsing url: ${err.message}`;
    throw err;
  }

  return url;
}

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const http = url.protocol === "http:" ? require("http") : require("https");

    const timeStart = Date.now();

    const req = http.request(url, res => {
      const resTime = Date.now() - timeStart;
      const resCode = res.statusCode;

      let body = "";
      res.on("data", chunk => {
        body += chunk;
      });

      res.on("end", () => {
        const resSize = body.length;
        resolve({ resTime, resCode, resSize, url: url.toString() });
      });
    });

    req.on("error", err => {
      err.message = `Error with request: ${err.message}`;
      reject(err);
    });

    req.end();
  });
}

(async () => {
  let message;

  try {
    const url = parseUrl(process.argv[2]);
    const results = await makeRequest(url);
    message = createLogMessage(results);
  } catch (err) {
    message = createLogMessage({ err: err.message });
  } finally {
    logMessage(message);
  }
})();


