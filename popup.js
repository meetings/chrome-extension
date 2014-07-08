var LOGIN_URL = MEETINGS_BASE + "/meetings_raw/logged_in_user_email";
var NAME_INTEGRATIONS = {
    "gmail": "*://www.linkedin.com/profile/view*"
};

$(function () {
  var disabled = localStorage.disabled ? JSON.parse(localStorage.disabled) : {};
  for(var key in NAME_INTEGRATIONS) {
    $('#' + key).prop('checked', disabled);
  }
  $('a').attr('href', function () {
    return this.href.indexOf('http') ? MEETINGS_BASE +
      this.href.substr(this.href.indexOf('/', this.href.indexOf('//') + 2)) : this.href;
  });
  $('#link-settings').click(function() {
     $('#menu-loggedin').hide();
     $('#menu-settings').show();
     $('#logo-main').hide();
     $('#logo-submenu').show();
  });
  $('#back-link').click(function() {
     $('#menu-settings').hide();
     $('#menu-loggedin').show();
     $('#logo-submenu').hide();
     $('#logo-main').show();
  });
  $('#menu-settings input').change(function(event) {
     var disabled = localStorage.disabled ? JSON.parse(localStorage.disabled) : {};
     disabled[event.target.id] = !$(this).is(":checked");
     localStorage.disabled = JSON.stringify(disabled);
  });
  $.ajax({
    type:'GET',
    url:LOGIN_URL,
    success:function (data) {
      if (data) {
        $('#email').text(data);
        $('#menu-loggedin').show();
      } else {
        $('#menu-loggedout').show();
      }
    }
  });
});
