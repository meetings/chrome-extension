var BASE_URL = 'https://dev.meetin.gs/meetings/create/?';

function fill(string, args) {
  return string.replace(/\{\{([^\}]+)\}\}/g, function (match, key) {
    return args[key] === undefined ? '' : args[key];
  });
}

function parametrize(params) {
  var r = [];
  for (var key in params) {
    if(params[key]) {
      r.push(key + '=' + encodeURIComponent(params[key]));
    }
  }
  return r.join('&');
}

//TODO decide if we want to use this
function getSelection() {
  var t = '';
  if (window.getSelection) {
    t = window.getSelection();
  } else if (document.getSelection) {
    t = document.getSelection();
  } else if (document.selection) {
    t = document.selection.createRange().text;
  }
  return t;
}

var name = $('h1.name').text();
var email = $('div.email_address.data_group .value a').first().text();

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
  initial_participants:fill('"{{0}}" <{{1}}>', [name, email])
};

$('div.party_header').append(fill('<a href="{{0}}" target="_blank" class="meetings-button">Schedule Meeting</a>', [BASE_URL + parametrize(params)]));
