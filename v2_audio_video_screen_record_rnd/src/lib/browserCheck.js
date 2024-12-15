export default function browserCheck() {
    var ua = navigator.userAgent;
    var re = /^(?:.*(?:chrome|android-webkit|crios)\/)(\d+(?:\.\d+)+)$/
        || /^(?:.*(?:firefox|mozilla)\/)(\d+(?:\.\d+)+)$/
        || /^(?:.*safari\/)(\d+(?:\.\d+)+)$/
        || /^(?:.*opr\/)(\d+(?:\.\d+)+)$/
        || /^(?:.*msie|trident\/)(\d+(?:\.\d+)+)$/;
    var match = ua.match(re);
    return match && {
      browser: match[1].replace(/_/g, ' ').trim(),
      version: parseFloat(match[1])
    };
  }
