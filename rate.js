chrome.extension.sendRequest({method: "getInfo"}, function(response) {
  if(new Date().getTime() - response.installed > 1000 * 60 * 60 * 24 * 7 && !response.rated) {
    $('body').append('<div id="rate-extension">Are you finding the Meetin.gs browser extension useful? - <a id="rate-yes" href="#">Yes</a> | <a id="rate-no" href="#">No</a> <a id="rate-close" href="#">&times;</a></div>');
    $('#rate-close').click(function() {
      $('#rate-extension').hide();
      chrome.extension.sendRequest({method: "setRated"}, function() {});
    });
    $('#rate-yes').click(function() {
      $('#rate-extension').html('Great! Please <a href="https://chrome.google.com/webstore/detail/meetings/ldffgpimdekofmdnmejbpmhlepmpnoff">rate it in the store</a>.');
    });
    $('#rate-no').click(function() {
      $('#rate-extension').html('OK, please <a href="https://getsatisfaction.com/meetings/">do let us know how to improve it</a>.');
    });
  }
});
