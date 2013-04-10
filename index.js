  var CREATE_URL = MEETINGS_BASE + '/meetings/create/?';
  var BUTTON_TEMPLATE = '<a href="{{0}}" target="_blank" class="meetings-button"><img style="vertical-align: bottom" src="' + chrome.extension.getURL('images/button{{1}}.png') + '"></a>';

  function fill(string, args) {
    return string.replace(/\{\{([^\}]+)\}\}/g, function (match, key) {
      return args[key] === undefined ? '' : args[key];
    });
  }

  function parametrize(params) {
    var r = [];
    for (var key in params) {
      if (params[key]) {
        r.push(key + '=' + encodeURIComponent(params[key]));
      }
    }
    return r.join('&');
  }

  (function (callback) {
    for (var pattern in INTEGRATIONS) {
      if (new RegExp(pattern.replace(/\*/g, "[^ ]*")).exec(document.location.toString())) {
        return INTEGRATIONS[pattern](callback);
      }
    }
  })(function (r) {
    var participants = r.contacts.map(function (contact) {
      return fill('"{{0}}" <{{1}}>', [contact.name, contact.email]);
    }).join(', ');

    var params = {
      title:r.title,
      location:r.location,
      begin_epoch:r.start ? Math.floor(r.start / 1000) : undefined,
      end_epoch:r.end ? Math.floor(r.end / 1000) : undefined,
      initial_participants:participants
    };

    $(r.selector)[r.place || 'append']($(
      fill(BUTTON_TEMPLATE,
        [CREATE_URL + parametrize(params), r.button ? '-' + r.button : '']
      )).attr("style", r.style || ""));
  });


