var pull = require('pull-stream');
var through = require('pull-through');
var Abortable = require('pull-abortable');


function timeout(ms) {
  var timer, last = 0;
  var abortable = Abortable();
  var watchdog = function() {
    var now = Date.now();
    if ((now - last) >= ms) {
      abortable.abort();
    } else {
      timer = setTimeout(watchdog, (last + ms) - now);
    }
  }

  timer = setTimeout(watchdog, ms);

  var peek = through(function (elem) {
    last = Date.now();
    this.queue(elem);
  }, function (end) {
    clearTimeout(timer);
    this.queue(null);
  })

  return pull(abortable, peek);
}


module.exports = timeout;
