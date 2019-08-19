var timeago = require("timeago.js");

const readableTime = (time : Date) => {
    return timeago.format(time);
}
function timeToWords(time : any, lang : any = '') {
    lang = lang || {
      postfixes: {
        '<': ' ago',
        '>': ' from now'
      },
      1000: {
        singular: 'a few moments',
        plural: 'a few moments'
      },
      60000: {
        singular: 'about a minute',
        plural: '# minutes'
      },
      3600000: {
        singular: 'about an hour',
        plural: '# hours'
      },
      86400000: {
        singular: 'a day',
        plural: '# days'
      },
      31540000000: {
        singular: 'a year',
        plural: '# years'
      }
    };
  
    var timespans = [1000, 60000, 3600000, 86400000, 31540000000];
    var parsedTime = Date.parse(time.replace(/\-00:?00$/, ''));
  
    if (parsedTime && Date.now) {
      var timeAgo = parsedTime - Date.now();
      var diff = Math.abs(timeAgo);
      var postfix = lang.postfixes[(timeAgo < 0) ? '<' : '>'];
      var timespan = timespans[0];
  
      for (var i = 1; i < timespans.length; i++) {
        if (diff > timespans[i]) {
          timespan = timespans[i];
        }
      }
  
      var n = Math.round(diff / timespan);
  
      return lang[timespan][n > 1 ? 'plural' : 'singular']
        .replace('#', n) + postfix;
    }
  }
export {readableTime, timeToWords}