Campfire.LibratoExpander = Class.create({
  initialize: function(chat) {
    this.chat = chat;
    var messages = this.chat.transcript.messages;
    for (var i = 0; i < messages.length; i++) {
      this.detectLibratoURL(messages[i]);
    }
    this.chat.windowmanager.scrollToBottom();
  },

  detectLibratoURL: function(message) {
    if (!message.pending() && message.kind === 'text') {
      var height = 400;

      //var logs = message.bodyElement().select('a[href*="0.0.0.0:3000"]');
      var logs = message.bodyElement().select('a[href*="metrics.librato.com"]');

      // Bail unless there are logs
      if (logs.length != 1) {
        return;
      }

      // determine if this is a librato URL and parse out necessary
      var elem = logs[0];
      var href = elem.getAttribute('href');

      //var regex = /^http:\/\/0.0.0.0:3000\/instruments\/(\d+)(\?.*)?$/;
      var regex = /^https:\/\/metrics.librato.com\/instruments\/(\d+)(\?.*)?$/;
      var match = href.match(regex);

      // Bail unless there is a match
      if (!match) {
        return;
      }

      elem.onclick = (function(ev){
        //debugger
        ev.preventDefault();

        // Create the embed URL
        var append_char = '?';
        if (ev.target.href.match(/\?/) != null){
          append_char = '&';
        }

        var embed_url = ev.target.href + append_char + "iframe=1";

        var iframes = message.bodyElement().select('iframe');
        if (iframes.length == 1) {
          iframes[0].remove();
        } else {
          message.bodyElement().insert({bottom:"<iframe name='librato' style='border:0; margin-top: 5px;' height='"+height+"' width='98%' src='"+embed_url+"'></iframe>"});
          setTimeout((function(message) {
            return function() {
              var iframes = message.bodyElement().select('iframe');
              if (iframes.length == 1) {
                iframes[0].remove();
                message.bodyElement().insert({bottom:"<span> ... embed timed out.</span>"});
              }
            }
          })(message), 1800000);
        }
      });
    }
  },

  onMessagesInsertedBeforeDisplay: function(messages) {
    var scrolledToBottom = this.chat.windowmanager.isScrolledToBottom();
    for (var i = 0; i < messages.length; i++) {
      this.detectLibratoURL(messages[i]);
    }
    if (scrolledToBottom) {
      this.chat.windowmanager.scrollToBottom();
    }
  },

  onMessageAccepted: function(message, messageID) {
    this.detectLibratoURL(message);
  }
});

Campfire.Responders.push("LibratoExpander");
window.chat.installPropaneResponder("LibratoExpander", "LibratoExpander");
