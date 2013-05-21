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
  if (request.method == "getVersion")
    sendResponse({version: localStorage['version'], installed: localStorage['installed']});
  else
    sendResponse({});
});