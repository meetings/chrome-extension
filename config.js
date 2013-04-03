var INTEGRATIONS = {
  "*://*.highrisehq.com/people/*":function (callback) {
    var email = $('div.email_address.data_group .value a').first().attr('href').substr('mailto:'.length);
    callback({
      name:$('h1.name').text(),
      email:email.substr(0, email.indexOf('?')), // remove Highrise CC email
      selector:'div.party_header',
      style:'float: right'
    });
  },
  "*://www.linkedin.com/profile/view*":function (callback) {
    callback({
      name:$('.full-name').text(),
      email:$('#email-view li a').first().attr('href').substr('mailto:'.length),
      selector:'div.profile-card',
      style:'margin-top: 0'
    });
  },
  "*://mail.google.com/mail/u/*":function (callback) {
    document.body.addEventListener('DOMSubtreeModified', function (e) {
      var r = e.target.querySelectorAll('div.iH');
      if(r.length && $(e.target).attr('class').trim() == 'aeH') {
        callback({
          name:'',
          email:'',
          selector:'div.iH',
          style:''
        });
      }
    });
  }
};