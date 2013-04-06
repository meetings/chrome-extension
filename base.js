var MEETINGS_BASE = (function getBase() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', chrome.extension.getURL('manifest.json'), false);
  xhr.send(null);
  var manifest = JSON.parse(xhr.responseText);
  var permission = manifest.permissions[0];
  return permission.substr(0, permission.length - 2);
})();