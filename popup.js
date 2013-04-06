var LOGIN_URL = MEETINGS_BASE + "/meetings_raw/logged_in_user_email";

$(function () {
  $('a').attr('href', function () {
    return this.href.indexOf('http') ? MEETINGS_BASE +
      this.href.substr(this.href.indexOf('/', this.href.indexOf('//') + 2)) : this.href;
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
