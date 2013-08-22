var INTEGRATIONS = {
  "*://www.linkedin.com/profile/view*": function (callback) {
    callback({
      contacts: [
        {
          name: $('.full-name').text(),
          email: $('#email-view li a').first().attr('href').substr('mailto:'.length)
        }
      ],
      selector: 'div.profile-card',
      style: 'margin: 0 8px 8px 14px; display: inline-block',
      button: 'linkedin'
    });
  },
  "*://*.highrisehq.com/people/*": function (callback) {
    var email = $('div.email_address.data_group .value a').first().attr('href').substr('mailto:'.length);
    callback({
      contacts: [
        {
          name: $('h1.name').text(),
          email: email.substr(0, email.indexOf('?')) // remove Highrise CC email
        }
      ],
      selector: 'div.party_header',
      style: 'float: right'
    });
  },
  "*://mail.google.com/mail/u/*": function (callback) {
    document.body.addEventListener('DOMSubtreeModified', function (e) {
      var r = e.target.querySelectorAll ? e.target.querySelectorAll('div.iH') : {length: 0};
      if (r.length && $(e.target).attr('class').trim() == 'aeH') {
        var contacts = [];
        ['.gD', '.g2'].forEach(function (selector) {
          $(selector).each(function (index) {
            contacts.push({
              name: $(this).attr('name'),
              email: $(this).attr('email')
            });
          });
        });
        var title = $('.hP').text();
        if (title) {
          // remove RE, FW etc.
          title = title.substr(title.indexOf(':') + 1).trim();
        }
        callback({
          contacts: contacts,
          title: title,
          selector: 'div.adF',
          place: 'prepend',
          style: 'margin-right: 16px; vertical-align: bottom'
        });
      }

      var r = e.target.querySelectorAll ? e.target.querySelectorAll('table.IZ') : {length: 0};
      if (r.length && ((e.target.className == 'nH' && $(e.target).attr('role')) || e.target.className == 'aaZ' || e.target.className == 'ip adB')) {
        if (!$('#meetings-meetme').length) {
          var parent = $('.aDh').last();
          parent.css('height', '84px').append('<a id="meetings-meetme" href="#" style="margin-left: 6px"><img src="' + chrome.extension.getURL('images/button-meetme.png') + '"/></a>').click(function () {
            $.getJSON('https://meetin.gs/meetings_json/meet_me_urls', function (data) {
              if (data.result && data.result[0]) {
                parent.closest('.nH').find('.editable').append(data.result[0] + '<br/>');
              } else {
                window.open('https://meetin.gs/meetings/my_meet_me/');
              }
            });

          });
        }

      }
    });
  },
  "*://www.google.com/calendar/*": function (callback) {
    document.body.addEventListener('DOMSubtreeModified', function (e) {
      var r = e.target.querySelectorAll ? e.target.querySelectorAll('div.ep-ea-print-btn') : {length: 0};
      if (r.length && $(e.target).attr('id') == 'coverinner') {
        // need to have a timeout, since there isn't a single element being added to the dom we can detect
        setTimeout(function () {
          var contacts = [];
          $('div.ep-gl-guest').each(function (index, element) {
            var email = $(element).attr('id').substr(':lc'.length), name = $(element).attr('title');
            contacts.push({
              email: email,
              name: name != email ? name : undefined
            })
          });
          var start = $('.dr-date').val() + ' ' + $('.dr-time').val(),
            end = $('.dr-date:nth-child(2)').val() + ' ' + $('.dr-time:nth-child(2)').val();
          callback({
            title: $('div.ep-title input').val(),
            location: $('div.ep-dp-input input').val(),
            contacts: contacts,
            start: new Date(start).getTime(),
            end: new Date(end).getTime(),
            selector: 'div.ep-ea-print-btn',
            style: 'margin-right: 8px',
            place: 'prepend',
            button: 'calendar'
          });
        }, 500);
      }

      r = e.target.querySelectorAll ? e.target.querySelectorAll('#topRightNavigation') : {length: 0};
      if (r.length) {
        if (!$('#meetings').length) {
          $('#topRightNavigation').append(
            '<a id="meetings" href="' + MEETINGS_BASE + '/meetings/create" target="_blank"><img style="vertical-align: bottom" src="' + chrome.extension.getURL('images/button.png') + '"/></a>'
          );
        }
      }
    });
  },
  "*://*.salesforce.com/*": function (callback) {
    var name = $('.topName').text().trim(), email = $('#con15_ileinner').text().trim();
    if (email) {
      callback({
        contacts: [
          {
            name: name,
            email: email
          }
        ],
        selector: '#contactHeaderRow',
        style: 'float: left; margin-left: 20px'
      });
    }
  },
  "*://outlook.office365.com/owa/*": function (callback) {
    document.body.addEventListener('DOMSubtreeModified', function (e) {

      var r = e.target.querySelectorAll ? e.target.querySelectorAll('.allowTextSelection._f_ny') : {length: 0};
      if (r.length && $(e.target).attr('class') == 'conductorContent') {
        setTimeout(function () {
          var contacts = $('.allowTextSelection._f_ny').text().split(';').map(function (contact) {
            var i = contact.indexOf('<');
            if (i != -1) {
              return {name: contact.substr(0, i).trim(), email: contact.substr(i + 1).replace('>', '').trim()};
            } else {
              return {name: '', email: contact.trim()};
            }
          });

          callback({
            contacts: contacts,
            selector: 'div._f_wj',
            style: 'margin-left: 10px'
          });
        }, 1000);

         $('div._f_wj').append( '<a href="#"><img src="' + chrome.extension.getURL('images/button-meetme.png') + '" style="vertical-align: bottom" /></a>').click(function() {
           $.getJSON('https://meetin.gs/meetings_json/meet_me_urls', function(data) {
             if(data.result && data.result[0]) {
               $('textarea').val(data.result[0] + '\n' + $('textarea').val());
             } else {
               window.open('https://meetin.gs/meetings/my_meet_me/');
             }
           });
         });
      }

      r = e.target.querySelectorAll ? e.target.querySelectorAll('._k_d') : {length: 0};
      if (r.length && $(e.target).attr('class') == 'conductorContent') {
        if (!$('#meetings').length) {
          $('._k_d').append(
            '<a id="meetings" href="' + MEETINGS_BASE + '/meetings/create" target="_blank"><img style="vertical-align: bottom" src="' + chrome.extension.getURL('images/button.png') + '"/></a>'
          );
        }
      }

      r = e.target.querySelectorAll ? e.target.querySelectorAll('._f_V3') : {length: 0};
      if (r.length && $(e.target).attr('class') == 'fadeIn') {
        var contacts = $('._f_f3').text().split(';').map(function (contact) {
          contact = contact.trim();
          if (contact) {
            return {name: "", email: contact};
          }
        }).filter(function (contact) {
            return contact;
          });
        var start = $('._f_Fc').text() + ' ' + $('._f_oe').find('input').attr('aria-label').substr("start time ".length);
        callback({
          title: $("input[autoid='_f_v']").val(),
          location: $("input[autoid='_f_V1']").val(),
          contacts: contacts,
          start: new Date(start).getTime(),
          selector: 'div._f_V3',
          button: 'calendar'
        });
      }
    });
  },
  "*://www.facebook.com/messages/*": function(callback) {
    document.body.addEventListener('DOMSubtreeModified', function (e) {
      var r = e.target.querySelectorAll ? e.target.querySelectorAll('._2ak') : {length: 0};
      if (r.length) {
        if (!$('#meetings-meetme').length) {
          var parent = $('._2ak');
          parent.append('<a id="meetings-meetme" href="#" style="position: relative; left: 20px; top: -20px"><img src="' + chrome.extension.getURL('images/button-meetme.png') + '"/></a>')
          $('#meetings-meetme').click(function () {
            $.getJSON('https://meetin.gs/meetings_json/meet_me_urls', function (data) {
              if (data.result && data.result[0]) {
                var existing = $("._1rv").focus().val();
                if(existing.length) existing = existing + ' ';
                $("._1rv").val(existing + data.result[0]);
              } else {
                window.open('https://meetin.gs/meetings/my_meet_me/');
              }
            });

          });
        }
      }
    });
  }
};
