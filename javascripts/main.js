// var docCookie = {
// 	getCookieValue: function(key){
//     var cookieKey = encodeURIComponent(key);
//     var cookies = document.cookie;
//     var keyIndex = cookies.indexOf(cookieKey);
//     if (keyIndex > -1) {
//         var valueIndex = cookies.indexOf(';',cookieKey);
//         var cookieValue = decodeURIComponent(cookies.substring(keyIndex,valueIndex));
//         return cookieValue;
//     } else {
//         return null;
//     }
// 	},
// 	setCookie: function(key,value,end,path,domain,secure){
// 		var cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value);
// 		if (end) {
// 			switch (end.constructor) {
// 				case Number:
// 					cookie += end === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + end;
// 					break;
// 				case String:
// 					cookie += '; expires=' + end;
// 					break;
// 				case Date:
// 					cookie += '; expires='+ end.toUTCString();
// 					break;
// 			}
// 		}
// 		if (path) {
// 			cookie += '; path=' + path;
// 		}
// 		if (domain) {
// 			cookie += '; domain' + domain;
// 		}
// 		if (secure) {
// 			cookie += '; secure' + secure;
// 		}
// 		document.cookie = cookie;
// 		return true;
// 	}
// }

// var notify = document.getElementById("notify");
// var nClose = document.getElementById("n-close");
// if (docCookie.getCookieValue('notify') == 'close') {
// 	document.body.removeChild(notify);
// }
// nClose.addEventListener('click',function () {
//   docCookie.setCookie('notify','close',Infinity);
//   document.body.removeChild(notify);
// },false);

function setCookie (name, value, expires, path, domain, secure) {
	var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
	if (expires)
		cookie += '; expires=' + expires.toGMTString();
	if (path)
		cookie += '; path=' + path;
	if (domain)
		cookie += '; domain=' + domain;
	if (secure)
		cookie += '; secure=' + secure;
	document.cookie = cookie;
}
function getCookie () {
	var cookie = {};
	var all = document.cookie;
	if (all === '')
		return cookie;
	var list = all.split('; ');
	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var p = item.indexOf('=');
		var name = item.substring(0, p);
		name = decodeURIComponent(name);
		var value = item.substring(p + 1);
		value = decodeURIComponent(value);
		cookie[name] = value;
	}
	return cookie;
}

function removeCookie (name, path, domain) {
	document.cookie = name + '='
	+ '; path=' + path
	+ '; domain=' + domain
	+ '; max-age=0';
}

var notify = document.getElementById("notify");
var nClose = document.getElementById("n-close");
if (getCookie().notify) {
	document.body.removeChild(notify);
}
nClose.addEventListener('click',function () {
	setCookie('notify',1);
	document.body.removeChild(notify);
},false);
