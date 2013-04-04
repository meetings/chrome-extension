var BASE_URL = 'https://dev.meetin.gs/meetings/create/?';

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
  console.log(r);
  var participants = r.contacts.map(function (contact) {
      return fill('"{{0}}" <{{1}}>', [contact.name, contact.email]);
    }).join(', ');

  var params = {
    title:r.title,
    location:r.location,
    //initial_agenda:undefined,
    begin_epoch:r.start ? Math.floor(r.start / 1000) : undefined,
    end_epoch:r.end ? Math.floor(r.end / 1000) :undefined,
    initial_participants:participants
  };


  $(r.selector).append($(fill('<a href="{{0}}" target="_blank" class="meetings-button">Schedule Meeting</a>', [BASE_URL + parametrize(params)])).attr("style", r.style || ""));

});

