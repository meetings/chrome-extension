function get(url) {
  try {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
  } catch(e) {

  }
}

// extract the base URL from manifest
var MEETINGS_BASE = (function getBase() {
  var manifest = JSON.parse(get(chrome.extension.getURL('manifest.json')));
  var permission = manifest.permissions[0];
  return permission.substr(0, permission.length - 2);
})();

eval(get('//localhost:8000/integrations.js') || get(chrome.extension.getURL('integrations.js')))



