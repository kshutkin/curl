var n=true,r=null,v=false;
(function(d,h,l){var k,m;function f(a,b){return U.call(a).indexOf("[object "+b)==0}function L(a){function b(b){if(b in a)return b=a[b].charAt(0)!="."?(!a.path||t(a.path)?a.path:a.path+"/")+a[b]:C(a[b],a.path),w(b)}f(a,"String")&&(a=w(a),a={name:a,path:a,main:k,lib:m});a.path=a.path||"";a.h=b("lib");a.i=b("main");return a}function p(a){var b,c,e,g=[];D=a.baseUrl||"";if(a.debug)H=n,u.cache=o,u.cfg=a,u.undefine=function(a){delete o[a]};var i=a.paths;for(b in i)c=w(b.replace("!","!/")),e=E[c]={path:w(i[b])},
e.f=(c.match(M)||[]).length,g.push(c);i=a.packages;for(b in i)c=w(i[b].name||b),e=E[c]=L(i[b]),e.f=(c.match(M)||[]).length,g.push(c);N=RegExp("^("+g.sort(function(a,b){return E[a].f<E[b].f}).join("|").replace(/\//g,"\\/")+")(?=\\/|$)");y=a.pluginPath||y}function x(){}function j(a){function b(a,b){return V(a,b||x,g)}function c(a){return I(q(C(a,e)),D)}var e=a.substr(0,a.lastIndexOf("/")),g={baseName:e},i={};g.d={exports:i,module:{id:C(a,e),uri:c(a),exports:i}};H&&(b.curl=u);g.e=g.d.require=b;b.toUrl=
c;return g}function z(){}function A(a){z.prototype=a;a=new z;z.prototype=J;return a}function B(){function a(a,b){i.push([a,b])}function b(a){e(n,a)}function c(a){e(v,a)}function e(e,g){a=e?function(a){a&&a(g)}:function(a,b){b&&b(g)};b=c=function(){throw Error("Promise already completed.");};for(var f,m=0;f=i[m++];)(f=f[e?0:1])&&f(g)}var g=this,i=[];this.c=function(b,e){a(b,e)};this.b=function(a){g.l=a;b(a)};this.a=function(a){g.n=a;c(a)}}function s(a){B.apply(this);this.name=a}function t(a){return a.charAt(a.length-
1)=="/"}function w(a){return t(a)?a.substr(0,a.length-1):a}function q(a,b){function c(a){g=a.replace(N,function(b){e=E[b]||{};i=n;return e.i&&b==a?e.i:e.h?e.h:e.path||""})}var e,g,i;b&&c(b+"!/"+a);i||c(a);return g}function I(a,b,c){return(b&&!W.test(a)?(!b||t(b)?b:b+"/")+a:a)+(c&&!X.test(a)?".js":"")}function Y(a,b,c){var e=h.createElement("script");e.type="text/javascript";e.onload=e[O]=function(c){c=c||d.event;if(c.type==="load"||Z[this.readyState])delete K[a.name],this.onload=this[O]=this.onerror=
r,b(e)};e.onerror=function(){c(Error("Syntax error or http error: "+a.url))};e.charset=a.charset||"utf-8";e.async=n;e.src=a.url;K[a.name]=e;P.insertBefore(e,P.firstChild)}function $(a){var b,c,e,g,i=a.length;e=a[i-1];g=f(e,"Function");i==2?f(a[0],"Array")?c=a[0]:b=a[0]:i==3&&(b=a[0],c=a[1]);!c&&g&&e.length>0&&(c=["require","exports","module"]);return{name:b,j:c||[],k:g?e:function(){return e}}}function Q(a,b){H&&console&&console.log("curl: resolving",a.name);var c=j(a.baseName||a.name);R(b.j,c,function(e){try{var g=
b.k.apply(c.d.exports,e)||c.d.exports;H&&console&&console.log("curl: defined",a.name,g.toString().substr(0,50).replace(/\n/," "))}catch(i){a.a(i)}a.b(g)},a.a)}function S(a){Y(a,function(){var b=F;F=J;a.m!==v&&(b?b.g?a.a(Error(b.g.replace("${url}",a.url))):Q(a,b):a.a(Error("define() not found or duplicates found: "+a.url)))},a.a)}function C(a,b){return a.replace(aa,function(a,e,g){return(g?b.substr(0,b.lastIndexOf("/")):b)+"/"})}function ba(a,b){var c,e,g,i,f,m;e=a.indexOf("!");if(e>=0){g=a.substr(0,
e);i=a.substr(e+1);var h=q(g);h.indexOf("/")<0&&(h=q((!y||t(y)?y:y+"/")+h));var d=o[g];if(!d)d=o[g]=new s(g),d.url=I(h,D,n),d.baseName=h,S(d);b=j(b.baseName);b.e.toUrl=function(a){a=q(a,g);return I(a,D)};m=A(g?l.plugins&&l.plugins[g]:l)||{};var k=function(a){return C(a,b.baseName)};f=new s(a);d.c(function(d){var h;i=a.substr(e+1);i="normalize"in d?d.normalize(i,k,m):k(i);c=g+"!"+i;h=o[c];if(!h){h=new s(c);i&&!d.dynamic&&(o[c]=h);var j=h.b;j.resolve=j;j.reject=h.a;d.load(i,b.e,j,m)}h.c(f.b,f.a)},f.a)}else if(i=
c=C(a,b.baseName),f=o[i],!f)f=o[i]=new s(i),f.url=I(q(i),D,n),S(f);return f}function R(a,b,c,e){for(var g=[],i=a.length,f=i,h=v,d=0;d<f&&!h;d++)(function(a,f){f in b.d?(g[a]=b.d[f],i--):ba(f,b).c(function(b){g[a]=b;--i==0&&(h=n,c(g))},function(a){h=n;e(a)})})(d,a[d]);i==0&&!h&&c(g)}function V(a,b,c){if(f(a,"String")){c=(c=o[a])&&c.l;if(c===J)throw Error("Module is not already resolved: "+a);return c}R(a,c,function(a){b.b?b.b(a):b.apply(r,a)},function(a){if(b.a)b.a(a);else throw a;})}function u(){var a=
ca.call(arguments),b,c;f(a[0],"Object")&&(l=a.shift(),p(l));b=[].concat(a[0]);a=a[1];c=j("");var e=new B,g={};g.then=function(a,b){e.c(function(b){a&&a.apply(r,b)},function(a){if(b)b(a);else throw a;});return g};g.next=function(a,b){var f=e;e=new B;f.c(function(){c.e(a,e,c)},function(a){e.a(a)});b&&e.c(function(a){b.apply(this,a)});return g};a&&g.then(a);c.e(b,e,c);return g}function T(){var a=$(arguments),b=a.name;if(b==r)if(F!==J)F={g:"Multiple anonymous defines found in ${url}."};else{var c;if(!f(d.opera,
"Opera"))for(var e in K)if(K[e].readyState=="interactive"){c=e;break}if(!(b=c))F=a}if(b!=r)(c=o[b])||(c=o[b]=new s(b)),c.m=v,"resolved"in c||Q(c,a,j(b))}var P=h.head||h.getElementsByTagName("head")[0],D,y="curl/plugin",E={},o={},F,K={},U={}.toString,J,ca=[].slice,W=/^\/|^[^:]+:\/\//,aa=/^(\.)(\.)?(\/|$)/,M=/\//g,X=/\?/,N,Z={loaded:1,interactive:1,complete:1},O="onreadystatechange";k="./lib/main";m="./lib";var H;f(l,"Function")||p(l);var G;G=l.apiName||"curl";(l.apiContext||d)[G]=u;o[G]=new s(G);o[G].b(u);
d.define=u.define=T;u.version="0.5.3";T.amd={plugins:n}})(this,document,this.curl||{});
(function(d,h){function l(){if(!h.body)return v;q||(q=h.createTextNode(""));try{return h.body.removeChild(h.body.appendChild(q)),q=w,n}catch(f){return v}}function k(){var d;d=L[h[f]]&&l();if(!j&&d){j=n;for(clearTimeout(t);B=s.pop();)B();x&&(h[f]="complete");for(var m;m=p.shift();)m()}return d}function m(){k();j||(t=setTimeout(m,z))}var f="readyState",L={loaded:1,interactive:1,complete:1},p=[],x=typeof h[f]!="string",j=v,z=10,A,B,s=[],t,w,q;A="addEventListener"in d?function(f,d){f.addEventListener(d,
k,v);return function(){f.removeEventListener(d,k,v)}}:function(f,d){f.attachEvent("on"+d,k);return function(){f.detachEvent(d,k)}};h&&!k()&&(s=[A(d,"load"),A(h,"readystatechange"),A(d,"DOMContentLoaded")],t=setTimeout(m,z));define("curl/domReady",function(){function f(d){j?d():p.push(d)}f.then=f;f.amd=n;return f})})(this,document);
(function(d){define("curl/dojo16Compat",["./domReady"],function(h){function l(d){d.ready||(d.ready=function(f){h(f)});d.nameToUrl||(d.nameToUrl=function(f,h){return d.toUrl(f+(h||""))});return d}var k=d.define;l(d.curl||d.require);d.define=function(){var d,f,h,p=[],x,j;d=[].slice.call(arguments);f=d.length;h=d[f-2];x=typeof d[f-1]=="function"?d[f-1]:r;if(h&&x){for(j=h.length-1;j>=0;j--)h[j]=="require"&&p.push(j);p.length>0&&(d[f-1]=function(){var d=[].slice.call(arguments);for(j=0;j<p.length;j++)d[p[j]]=
l(d[p[j]]);return x.apply(this,d)})}return k.apply(r,d)};return n})})(this);define("domReady",["curl/domReady"],function(d){return{load:function(h,l,k){d(k)}}});
