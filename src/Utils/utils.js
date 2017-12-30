export  const throttle = (func, wait, options) => {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

export const httpRequest = (url) => {
  return new Promise( (resolve, reject) => {
    var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {                        
              resolve( JSON.parse(xhttp.responseText))
          }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
  })
}