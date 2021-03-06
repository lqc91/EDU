// 关闭消息通知条
var notify = document.getElementById("notify");
var nClose = document.getElementById("notify_close");
if (getCookie().notify) {
	document.body.removeChild(notify);
}
addEvent(nClose,'click',function () {
	setCookie('notify',1);
	document.body.removeChild(notify);
});
// 关闭消息通知条

// 点击关注按钮，判断登录cookie是否已设置为loginSuc；
// 若是，按钮变为已关注；若否，弹出登录弹窗
var follow = document.getElementById("follow");
addEvent(follow,'click',function(){
	if (getCookie().loginSuc) {
		follow.style.backgroundPosition='-70px 0';
		follow.style.width='106px';
		gz.innerHTML='已关注';
		unfollow.style.display='block';
		setCookie('followSuc',1);
	} else {
		login_modal.style.display='block';
		password.type='text';
	}
});
// 点击关注按钮，判断登录cookie是否已设置为loginSuc；
// 若是，按钮变为已关注；若否，弹出登录弹窗

// 点击账号、密码输入框，提示文字消失，并改变文字颜色
var userName = document.getElementById('userName');
var password = document.getElementById('password');
addEvent(userName,'click',function(){
	userName.value='';
	userName.style.color='#444';
})
addEvent(password,'click',function(){
	password.value='';
	password.type='password';
	password.style.color='#444';
})
// 点击账号、密码输入框，提示文字消失，并改变文字颜色

// var xhr = null;
// if (window.XMLHttpRequest) {
// 	xhr = new XMLHttpRequest();
// } else {
// 	xhr = new ActiveXObject("Microsoft.XMLHTTP");
// }
// xhr.onreadystatechange = function(){
// 	if (this.readyState == 4) {
// 		if (this.status == 200){
// 			this.responseText;
// 		} else {
// 			console.log('Request was unsuccessful:' + this.status);
// 		}
// 	}
// }

var login = document.getElementById('login');
addEvent(login,'click',function(){
	xhr.open('get','http://study.163.com/webDev/login.htm' + '?userName=' + MD5(userName.value) + '?password=' + MD5(password.value),true);
	xhr.send(null);
})

// 点击右上角，关闭登录弹窗
var closeLogin =document.getElementById('close_login');
addEvent(closeLogin,'click',function(){
	login_modal.style.display='none';
});
// 点击右上角，关闭登录弹窗

// 点击“机构介绍”下图片，弹出视频弹窗
var playVideo = document.getElementById('play_video');
addEvent(playVideo,'click',function(){
	video_modal.style.display='block';
});
// 点击“机构介绍”下图片，弹出视频弹窗

// 点击右上角，关闭视频弹窗
var closeVideo = document.getElementById('close_video');
var video =document.getElementsByTagName('video')[0];
addEvent(closeVideo,'click',function(){
	video_modal.style.display='none';
	video.pause();
});
// 点击右上角，关闭视频弹窗

// slide
(function(){
  var bannerWrap = document.getElementById('banner');
  var banner = {
    pic: bannerWrap.getElementsByClassName('pic'),
    picNum: bannerWrap.getElementsByClassName('pic').length,
    dot: bannerWrap.getElementsByClassName('dot'),
    idx: 0,
    play: null,
    delay: null
  };

  var slide = {
    change: function(){
      for(var i = 0; i < banner.picNum; i++){
        banner.dot[i].style.backgroundColor = '#fff';
        banner.pic[i].style.display = 'none';
      }
      banner.dot[banner.idx].style.backgroundColor = '#333';
      banner.pic[banner.idx].style.opacity = '0';
      banner.pic[banner.idx].style.display = 'inline-block';
      slide.fade(banner.pic[banner.idx], 500);
      banner.idx++;
      banner.idx === banner.picNum ? banner.idx = 0 : banner.idx;
    },
    start: function(){
      play = setInterval(slide.change, 5000);
    },
    pause: function(){
      clearInterval(play);
    },
    fade: function(ele, time){
      var alpha = parseFloat(ele.style.opacity),
        range = 1 - alpha,
        speed = range/time*10, // /10ms
        addAlpha;
        addAlpha = setInterval(function(){
          ele.style.opacity = parseFloat(ele.style.opacity) + speed;
          if(parseFloat(ele.style.opacity) >= 1){
            clearInterval(addAlpha);
            ele.style.opacity = 1;
          }
        }, 50);
    }
  };

  for(var i = 0; i < banner.picNum; i++){
    banner.dot[i].id = 'dot' + i;
    banner.dot[i].onclick = function(){
      banner.idx = this.id.slice(3);
      slide.change();
    };
  }

  bannerWrap.onmouseout = slide.start;
  bannerWrap.onmouseover = slide.pause;
  bannerWrap.onmouseout();
})();
// slide

// 左侧内容区tab切换
function switchTab (tab, target, cls) {
  const curTab = getUtil.byCls(cls, tab);
  classUtil.remove(curTab, cls);
  classUtil.add(target, cls);
}
const tab = getUtil.byCls('tab')[0];
addEvent(tab, 'click', () => { switchTab(tab, event.target, 'selected') });

// ajax
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4) {
    console.log(typeof xhr.readyState);
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      console.log(xhr.responseText);
    } else {
      console.log(xhr.status === 0);
    }
  }
};
xhr.open('get', 'http://study.163.com/webDev/cousesByCategory.htm', false);
// xhr.setRequestHeader()
xhr.send();

// 浏览器事件兼容
function addEvent(element,type,listener){
	if(element.addEventListener){
	  element.addEventListener(type,listener,false);
	} else if(element.attachEvent){
		element.attachEvent('on'+type,listener);
	} else{
		element['on'+type]=listener;
	}
}
function delEvent(element,type,listener){
	if (element.removeEventListener) {
		element.removeEventListener(type,listener,false);
	} else if(element.detachEvent){
		element.detachEvent('on'+type,listener);
	} else{
		element['on'+type]=null;
	}
}
function getEvent(event){
	return event?event:window.event;
}
function getTarget(event){
	return event.target || event.srcElement;
}
function preventDefault(event){
	if (event.preventDefault) {
		event.preventDefault();
	} else {
		event.returnValue=false;
	}
}
function stopPropagation(event){
	if(event.stopPropagation){
		event.stopPropagation();
	}else{
		event.cancelBubble=true;
	}
}
// 浏览器事件兼容

// cookie相关
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
// cookie相关

/**
*
*  MD5 (Message-Digest Algorithm)
*  http://www.webtoolkit.info/
*
**/
var MD5 = function (string) {
  function RotateLeft(lValue, iShiftBits) {
    return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
  }
  function AddUnsigned(lX,lY) {
    var lX4,lY4,lX8,lY8,lResult;
    lX8 = (lX & 0x80000000);
    lY8 = (lY & 0x80000000);
    lX4 = (lX & 0x40000000);
    lY4 = (lY & 0x40000000);
    lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
    if (lX4 & lY4) {
      return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
    }
    if (lX4 | lY4) {
      if (lResult & 0x40000000) {
        return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
      } else {
        return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
      }
    } else {
      return (lResult ^ lX8 ^ lY8);
    }
  }
  function F(x,y,z) { return (x & y) | ((~x) & z); }
  function G(x,y,z) { return (x & z) | (y & (~z)); }
  function H(x,y,z) { return (x ^ y ^ z); }
  function I(x,y,z) { return (y ^ (x | (~z))); }
  function FF(a,b,c,d,x,s,ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  };
  function GG(a,b,c,d,x,s,ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  };
  function HH(a,b,c,d,x,s,ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  };
  function II(a,b,c,d,x,s,ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  };
  function ConvertToWordArray(string) {
    var lWordCount;
    var lMessageLength = string.length;
    var lNumberOfWords_temp1=lMessageLength + 8;
    var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
    var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
    var lWordArray=Array(lNumberOfWords-1);
    var lBytePosition = 0;
    var lByteCount = 0;
    while ( lByteCount < lMessageLength ) {
      lWordCount = (lByteCount-(lByteCount % 4))/4;
      lBytePosition = (lByteCount % 4)*8;
      lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
      lByteCount++;
    }
    lWordCount = (lByteCount-(lByteCount % 4))/4;
    lBytePosition = (lByteCount % 4)*8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
    lWordArray[lNumberOfWords-2] = lMessageLength<<3;
    lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
    return lWordArray;
  };
  function WordToHex(lValue) {
    var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
    for (lCount = 0;lCount<=3;lCount++) {
      lByte = (lValue>>>(lCount*8)) & 255;
      WordToHexValue_temp = "0" + lByte.toString(16);
      WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
    }
    return WordToHexValue;
  };
  function Utf8Encode(string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  };
  var x=Array();
  var k,AA,BB,CC,DD,a,b,c,d;
  var S11=7, S12=12, S13=17, S14=22;
  var S21=5, S22=9 , S23=14, S24=20;
  var S31=4, S32=11, S33=16, S34=23;
  var S41=6, S42=10, S43=15, S44=21;
  string = Utf8Encode(string);
  x = ConvertToWordArray(string);
  a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
  for (k=0;k<x.length;k+=16) {
      AA=a; BB=b; CC=c; DD=d;
      a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
      d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
      c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
      b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
      a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
      d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
      c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
      b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
      a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
      d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
      c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
      b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
      a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
      d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
      c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
      b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
      a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
      d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
      c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
      b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
      a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
      d=GG(d,a,b,c,x[k+10],S22,0x2441453);
      c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
      b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
      a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
      d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
      c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
      b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
      a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
      d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
      c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
      b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
      a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
      d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
      c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
      b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
      a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
      d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
      c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
      b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
      a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
      d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
      c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
      b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
      a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
      d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
      c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
      b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
      a=II(a,b,c,d,x[k+0], S41,0xF4292244);
      d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
      c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
      b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
      a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
      d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
      c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
      b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
      a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
      d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
      c=II(c,d,a,b,x[k+6], S43,0xA3014314);
      b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
      a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
      d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
      c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
      b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
      a=AddUnsigned(a,AA);
      b=AddUnsigned(b,BB);
      c=AddUnsigned(c,CC);
      d=AddUnsigned(d,DD);
  }
  var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
  return temp.toLowerCase();
}
