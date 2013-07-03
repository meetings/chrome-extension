var INTEGRATIONS = {
  "*://www.linkedin.com/profile/view*":function (callback) {
    callback({
      contacts:[
        {
          name:$('.full-name').text(),
          email:$('#email-view li a').first().attr('href').substr('mailto:'.length)
        }
      ],
      selector:'div.profile-card',
      style:'margin: 0 8px 8px 14px; display: inline-block',
      button:'linkedin'
    });
  },
  "*://*.highrisehq.com/people/*":function (callback) {
    var email = $('div.email_address.data_group .value a').first().attr('href').substr('mailto:'.length);
    callback({
      contacts:[
        {
          name:$('h1.name').text(),
          email:email.substr(0, email.indexOf('?')) // remove Highrise CC email
        }
      ],
      selector:'div.party_header',
      style:'float: right'
    });
  },
  "*://mail.google.com/mail/u/*":function (callback) {
    document.body.addEventListener('DOMSubtreeModified', function (e) {
      var r = e.target.querySelectorAll ? e.target.querySelectorAll('div.iH') : {length:0};
      if (r.length && $(e.target).attr('class').trim() == 'aeH') {
        var contacts = [];
        ['.gD', '.g2'].forEach(function (selector) {
          $(selector).each(function(index) {
            contacts.push({
              name:$(this).attr('name'),
              email:$(this).attr('email')
            });
          });
        });
        var title = $('.hP').text();
        if (title) {
          // remove RE, FW etc.
          title = title.substr(title.indexOf(':') + 1).trim();
        }
        callback({
          contacts:contacts,
          title:title,
          selector:'div.adF',
          place:'prepend',
          style:'margin-right: 16px; vertical-align: bottom'
        });
      }
      
     var r = e.target.querySelectorAll ? e.target.querySelectorAll('table.IZ') : {length:0};
     if(r.length && ((e.target.className == 'nH' && $(e.target).attr('role')) || e.target.className == 'aaZ' || e.target.className == 'ip adB')) {
	var parent = $('.aDh').last();
	  parent.css('height', '84px').append( '<a href="#" style="margin-left: 6px"><img src="' + chrome.extension.getURL('images/button-meetme.png') + '"/></a>').click(function() {

  $.getJSON('https://meetin.gs/meetings_json/meet_me_urls', function(data) {
    if(data.result && data.result[0]) {
        parent.closest('.nH').find('.editable').append(data.result[0] + '<br/>');
    } else {
	window.open('https://meetin.gs/meetings/my_meet_me/');	
    }
  });

});

     }	
    });
  },
  "*://www.google.com/calendar/*":function (callback) {
    document.body.addEventListener('DOMSubtreeModified', function (e) {
      var r = e.target.querySelectorAll ? e.target.querySelectorAll('div.ep-ea-print-btn') : {length:0};
      if (r.length && $(e.target).attr('id') == 'coverinner') {
        // need to have a timeout, since there isn't a single element being added to the dom we can detect
        setTimeout(function () {
          var contacts = [];
          $('div.ep-gl-guest').each(function (index, element) {
            var email = $(element).attr('id').substr(':lc'.length), name = $(element).attr('title');
            contacts.push({
              email:email,
              name:name != email ? name : undefined
            })
          });
          var start = $('.dr-date').val() + ' ' + $('.dr-time').val(),
            end = $('.dr-date:nth-child(2)').val() + ' ' + $('.dr-time:nth-child(2)').val();
          callback({
            title:$('div.ep-title input').val(),
            location:$('div.ep-dp-input input').val(),
            contacts:contacts,
            start:new Date(start).getTime(),
            end:new Date(end).getTime(),
            selector:'div.ep-ea-print-btn',
            style:'margin-right: 8px',
            place:'prepend',
            button: 'calendar'
          });
        }, 500);
      }

      r = e.target.querySelectorAll ? e.target.querySelectorAll('#topRightNavigation') : {length:0};
      if (r.length) {
        if (!$('#meetings').length) {
          $('#topRightNavigation').append(
            '<a id="meetings" href="' + MEETINGS_BASE + '/meetings/create" target="_blank"><img style="vertical-align: bottom" src="' + chrome.extension.getURL('images/button.png') + '"/></a>'
          );
        }
      }
    });
  }
};
