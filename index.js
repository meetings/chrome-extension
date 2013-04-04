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
  var participants = r.contacts/*.filter(function (contact) {
    return contact.name != 'me';
  })*/.map(function (contact) {
      return fill('"{{0}}" <{{1}}>', [contact.name, contact.email]);
    }).join(', ');

  console.log(participants);

 /* var title = r.title;
  if(!title) {
    var names = r.contacts.map(function(contact) {
      return contact.name;
    }), last = names.pop();
    title = "Meeting between " + names.join(', ') + ' & ' + last;
  }*/

  var params = {
    title:undefined,
    location:undefined,
    initial_agenda:undefined,
    begin_epoch:undefined,
    end_epoch:undefined,
    /*
     title:"TestTitle",
     location:"TestLocation",
     initial_agenda:"Initial Agenda",
     begin_epoch:1362600000,
     end_epoch:1362603600,*/
    initial_participants:participants
  };


  $(r.selector).append($(fill('<a href="{{0}}" target="_blank" class="meetings-button">Schedule Meeting</a>', [BASE_URL + parametrize(params)])).attr("style", r.style || ""));

});

