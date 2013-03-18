var LOGIN_URL = "https://dev.meetin.gs/meetings_raw/logged_in_user_email";

$(function() {
  $.ajax(LOGIN_URL).done(function(data) {
    if(data) {
      $('#email').text(data);
      $('#menu-loggedin').show();
    } else {
      $('#menu-loggedout').show();
    }
  });
});
