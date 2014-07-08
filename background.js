function onInstall() {
  localStorage['installed'] = new Date().getTime();
  chrome.tabs.create({
    url:  "http://chrome.meetin.gs/#tutorial"
  });
}

function onUpdate() {
  localStorage['installed'] = localStorage['installed'] || new Date().getTime();
}

function getVersion() {
  var details = chrome.app.getDetails();
  return details.version;
}

var currVersion = getVersion();
var prevVersion = localStorage['version'];
if (currVersion != prevVersion) {
  if (typeof prevVersion == 'undefined') {
    onInstall();
  } else {
    onUpdate();
  }
  localStorage['version'] = currVersion;
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.method == "getInfo")
    sendResponse({version: localStorage['version'], installed: localStorage['installed'], rated: localStorage['rated']});
  else if(request.method == "setRated") {
    localStorage['rated'] = true;
    sendResponse({});
  } else
    sendResponse({});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getDisabled")
        sendResponse({disabled: localStorage.disabled ? JSON.parse(localStorage.disabled) : {}});
    else
        sendResponse({});
});
