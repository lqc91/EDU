var docCookie = {
    getCookieValue: function(key){
        var cookieKey = encodeURIComponent(key);
        var cookies = document.cookie;
        var keyIndex = cookies.indexOf(cookieKey);
        if (keyIndex > -1) {
            var valueIndex = cookies.indexOf(';',cookieKey);
            var cookieValue = decodeURIComponent(cookies.substring(keyIndex,valueIndex));
            return cookieValue;
        } else {
            return null;
        }
    },
    setCookie: function(key,value,end,path,domain,secure){
        var cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value);
        if (end) {
            switch (end.constructor) {
                case Number:
                    cookie += end === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + end;
                    break;
                case String:
                    cookie += '; expires=' + end;
                    break;
                case Date:
                    cookie += '; expires='+ end.toUTCString();
                    break;
            }
        }
        if (path) {
            cookie += '; path=' + path;
        }
        if (domain) {
            cookie += '; domain' + domain;
        }
        if (secure) {
            cookie += '; secure' + secure;
        }
        document.cookie = cookie;
        return true;
    }
}

var notify = document.getElementById("notify");
var nClose = document.getElementById("n-close");
if (docCookie.getCookieValue('notify') == 'close') {
	notify.parentNode.removeChild(notify);
}
nClose.addEventListener('click',function () {
  docCookie.setCookie('notify','close',Infinity);
  notify.parentNode.removeChild(notify);
},false)
