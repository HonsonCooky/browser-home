(()=>{"use strict";var n={878:(n,e,t)=>{t.d(e,{A:()=>c});var o=t(620),a=t.n(o),r=t(69),i=t.n(r)()(a());i.push([n.id,"/*THEME: Catppuccin Latte*/\n@media (prefers-color-scheme: light) {\n  :root {\n    --rosewater: 220, 138, 120;\n    --flamingo: 221, 120, 120;\n    --pink: 234, 118, 203;\n    --mauve: 136, 57, 239;\n    --red: 210, 15, 57;\n    --maroon: 230, 69, 83;\n    --peach: 254, 100, 11;\n    --yellow: 223, 142, 29;\n    --green: 64, 160, 43;\n    --teal: 23, 146, 153;\n    --sky: 4, 165, 229;\n    --sapphire: 32, 159, 181;\n    --blue: 30, 102, 245;\n    --lavender: 114, 135, 253;\n    --text: 76, 79, 105;\n    --subtext1: 92, 95, 119;\n    --subtext0: 108, 111, 133;\n    --overlay2: 124, 127, 147;\n    --overlay1: 140, 143, 161;\n    --overlay0: 156, 160, 176;\n    --surface2: 172, 176, 190;\n    --surface1: 188, 192, 204;\n    --surface0: 204, 208, 218;\n    --base: 239, 241, 245;\n    --mantle: 230, 233, 239;\n    --crust: 220, 224, 232;\n  }\n}\n\n/*THEME: Catppuccin Mocha*/\n@media (prefers-color-scheme: dark) {\n  :root {\n    --rosewater: 245, 224, 220;\n    --flamingo: 242, 205, 205;\n    --pink: 245, 194, 231;\n    --mauve: 203, 166, 247;\n    --red: 243, 139, 168;\n    --maroon: 235, 160, 172;\n    --peach: 250, 179, 135;\n    --yellow: 249, 226, 175;\n    --green: 166, 227, 161;\n    --teal: 148, 226, 213;\n    --sky: 137, 220, 235;\n    --sapphire: 116, 199, 236;\n    --blue: 137, 180, 250;\n    --lavender: 180, 190, 254;\n    --text: 205, 214, 244;\n    --subtext1: 186, 194, 222;\n    --subtext0: 166, 173, 200;\n    --overlay2: 147, 153, 178;\n    --overlay1: 127, 132, 156;\n    --overlay0: 108, 112, 134;\n    --surface2: 88, 91, 112;\n    --surface1: 69, 71, 90;\n    --surface0: 49, 50, 68;\n    --base: 30, 30, 46;\n    --mantle: 24, 24, 37;\n    --crust: 17, 17, 27;\n  }\n}\n\n/*Smartphones (Portrait):*/\n@media (min-width: 0px) {}\n\n/*Smartphones (Landscape):*/\n@media (min-width: 400px) {}\n\n/*Tablets (Portrait):*/\n@media (min-width: 600px) {}\n\n/*Tablets (Landscape):*/\n@media (min-width: 800px) {}\n\n/*Big Landscape Tablets, Laptops, and Desktops:*/\n@media (min-width: 1000px) {}\n\n/*Hi-Res Laptops and Desktops:*/\n@media (min-width: 1200px) {}\n",""]);const c=i},814:(n,e,t)=>{t.d(e,{A:()=>l});var o=t(620),a=t.n(o),r=t(69),i=t.n(r),c=t(878),s=i()(a());s.push([n.id,"@import url(https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap);"]),s.push([n.id,"@import url(https://www.nerdfonts.com/assets/css/webfont.css);"]),s.i(c.A),s.push([n.id,'/*FONT: JetBrainsMono*/\n\n/* Default Values */\n* {\n  outline: none;\n  color: rgba(var(--text));\n  font-family: "JetBrains Mono", monospace;\n}\n\n*::-webkit-scrollbar {\n  width: 1vw;\n}\n\n*::-webkit-scrollbar-track {\n  background: rgba(var(--surface0));\n}\n\n*::-webkit-scrollbar-thumb {\n  background: rgba(var(--crust));\n}\n\n*:focus {\n  outline: 2px dotted rgba(var(--lavender)) !important;\n}\n\nhtml,\nbody {\n  display: flex;\n  flex-direction: column;\n  margin: 0;\n  background: rgba(var(--base));\n}\n\nbody {\n  min-height: 100vh;\n}\n\nheader {\n  display: flex;\n  position: sticky;\n  top: 0;\n  flex-direction: column;\n  gap: 2vh;\n  background: rgba(var(--base));\n  padding: 1vh 2vw;\n}\n\nh1 {\n  margin: 1vh 2vw;\n  font-weight: 800;\n  font-size: 60px;\n}\n\nh4 {\n  margin: 0 0 2vh 0;\n  font-style: italic;\n  font-weight: 100;\n  font-size: 20px;\n}\n\nimg {\n  width: auto;\n  height: 100px;\n}\n\ninput {\n  border: 2px solid rgba(var(--crust));\n  border-radius: 100vh;\n  background: rgba(var(--mantle));\n  padding: 0.5vh 2vw;\n  height: 16px;\n  color: rgba(var(--text));\n  font-weight: 200;\n  font-size: 14px;\n}\n\ninput::-webkit-input-placeholder {\n  color: rgba(var(--text), 0.8);\n  font-size: 14px;\n}\n\n.row {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n\n#which-key {\n  display: grid;\n  position: fixed;\n  bottom: 2vh;\n  left: 50%;\n  grid-template-columns: auto auto auto;\n  transform: translate(-50%, 0);\n  border-radius: 2vh;\n  background: rgba(var(--crust));\n  padding: 1vh 2vw;\n  width: 80%;\n  font-weight: 300;\n  font-size: 16px;\n}\n\n#which-key span {\n  color: rgba(var(--blue));\n}\n\n#which-key i {\n  color: rgba(var(--surface2));\n}\n\n#which-key div {\n  color: rgba(var(--mauve));\n}\n\n#which-key .folder {\n  color: rgba(var(--peach));\n}\n\n.code-key {\n  color: rgba(var(--mauve));\n}\n\n.code-fn {\n  color: rgba(var(--blue));\n}\n\n.code-import {\n  color: rgba(var(--lavender));\n}\n\n.code-str {\n  color: rgba(var(--green));\n}\n\n.code-builtin {\n  color: rgba(var(--peach));\n}\n\n.marked {\n  background: rgba(var(--yellow), 0.2) !important;\n}\n\n.marked-highlight {\n  color: rgba(var(--yellow)) !important;\n  font-weight: 800;\n}\n\n.btn-row {\n  display: flex;\n  flex-direction: row;\n  gap: 0.2vw;\n  padding: 2vh 0;\n}\n\n.btn-row>button {\n  flex: 1;\n  border: none;\n  border-bottom: 4px solid rgba(var(--crust));\n  border-radius: 1vh;\n  background: rgba(var(--surface0));\n  min-width: 10%;\n  height: 30px;\n  overflow: hidden;\n  font-size: 20px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.btn-row>.trailing-btn {\n  min-width: 30px;\n  max-width: 50px;\n  font-size: 16px;\n}\n',""]);const l=s},885:(n,e,t)=>{t.d(e,{A:()=>l});var o=t(620),a=t.n(o),r=t(69),i=t.n(r),c=t(814),s=i()(a());s.i(c.A),s.push([n.id,".base {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  gap: 2vh;\n}\n\n.section-1 {\n  display: grid;\n  grid-template-columns: auto auto 1fr;\n  column-gap: 1vw;\n  row-gap: 1vh;\n  padding: 1vh 4vw;\n  font-size: 16px;\n}\n\n.section-2 {\n  display: grid;\n  grid-template-columns: auto auto 1fr;\n  column-gap: 0.8vw;\n  row-gap: 0.8vh;\n  grid-column: span 3;\n  padding: 1vh 2vw;\n  font-size: 14px;\n}\n\n.title-1 {\n  grid-column: span 3;\n  padding: 4vh 0 1vh 0;\n  color: rgba(var(--lavender));\n  font-weight: 800;\n  font-size: 24px;\n}\n\n.title-2 {\n  grid-column: span 3;\n  color: rgba(var(--mauve));\n  font-weight: 300;\n  font-size: 20px;\n}\n",""]);const l=s},69:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",o=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),o&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),o&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,o,a,r){"string"==typeof n&&(n=[[null,n,void 0]]);var i={};if(o)for(var c=0;c<this.length;c++){var s=this[c][0];null!=s&&(i[s]=!0)}for(var l=0;l<n.length;l++){var d=[].concat(n[l]);o&&i[d[0]]||(void 0!==r&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=r),t&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=t):d[2]=t),a&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=a):d[4]="".concat(a)),e.push(d))}},e}},620:n=>{n.exports=function(n){return n[1]}},646:n=>{var e=[];function t(n){for(var t=-1,o=0;o<e.length;o++)if(e[o].identifier===n){t=o;break}return t}function o(n,o){for(var r={},i=[],c=0;c<n.length;c++){var s=n[c],l=o.base?s[0]+o.base:s[0],d=r[l]||0,p="".concat(l," ").concat(d);r[l]=d+1;var u=t(p),m={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==u)e[u].references++,e[u].updater(m);else{var f=a(m,o);o.byIndex=c,e.splice(c,0,{identifier:p,updater:f,references:1})}i.push(p)}return i}function a(n,e){var t=e.domAPI(e);return t.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,a){var r=o(n=n||[],a=a||{});return function(n){n=n||[];for(var i=0;i<r.length;i++){var c=t(r[i]);e[c].references--}for(var s=o(n,a),l=0;l<r.length;l++){var d=t(r[l]);0===e[d].references&&(e[d].updater(),e.splice(d,1))}r=s}}},13:n=>{var e={};n.exports=function(n,t){var o=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(t)}},506:n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},942:(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},959:n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var o="";t.supports&&(o+="@supports (".concat(t.supports,") {")),t.media&&(o+="@media ".concat(t.media," {"));var a=void 0!==t.layer;a&&(o+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),o+=t.css,a&&(o+="}"),t.media&&(o+="}"),t.supports&&(o+="}");var r=t.sourceMap;r&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleTagTransform(o,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},215:n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}},e={};function t(o){var a=e[o];if(void 0!==a)return a.exports;var r=e[o]={id:o,exports:{}};return n[o](r,r.exports,t),r.exports}t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var o in e)t.o(e,o)&&!t.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:e[o]})},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"==typeof window)return window}}(),t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),(()=>{var n;t.g.importScripts&&(n=t.g.location+"");var e=t.g.document;if(!n&&e&&(e.currentScript&&(n=e.currentScript.src),!n)){var o=e.getElementsByTagName("script");if(o.length)for(var a=o.length-1;a>-1&&(!n||!/^http(s?):/.test(n));)n=o[a--].src}if(!n)throw new Error("Automatic publicPath is not supported in this browser");n=n.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=n+"../"})(),t.nc=void 0,(()=>{var n=t(646),e=t.n(n),o=t(959),a=t.n(o),r=t(13),i=t.n(r),c=t(942),s=t.n(c),l=t(506),d=t.n(l),p=t(215),u=t.n(p),m=t(885),f={};f.styleTagTransform=u(),f.setAttributes=s(),f.insert=i().bind(null,"head"),f.domAPI=a(),f.insertStyleElement=d(),e()(m.A,f),m.A&&m.A.locals&&m.A.locals;const h=["Alt","Control","Shift"];let v={i:{name:"Internal Links",h:{name:"Home",action:()=>g("/")},c:{name:"Canvas",action:()=>g("/canvas/")},d:{name:"Dev Tools",action:()=>g("/dev-tools/")},e:{name:"Edge Shortcuts",action:()=>g("/edge/")},k:{name:"Keyboard Layout",action:()=>g("/layout/")},t:{name:"Todo Lists",action:()=>g("/todo/")},v:{name:"Vim Shortcuts",action:()=>g("/vim/")},w:{name:"Vimium Shortcuts",action:()=>g("/vimium/")}},e:{name:"External Links",a:{name:"Advent of Code",action:()=>w("https://adventofcode.com")},c:{name:"Calendar",action:()=>w("https://calendar.google.com")},d:{name:"Disney+",action:()=>w("https://www.disneyplus.com/search")},e:{name:"Exercism",action:()=>w("https://exercism.org")},g:{name:"GitHub",action:()=>w("https://github.com/HonsonCooky")},h:{name:"Gmail",action:()=>w("https://mail.google.com")},m:{name:"Messenger",action:()=>w("https://www.messenger.com")},n:{name:"Netflix",action:()=>w("https://www.netflix.com/browse")},o:{name:"Neon",action:()=>w("https://www.neontv.co.nz")},r:{name:"Reddit",action:()=>w("https://www.reddit.com")},s:{name:"Stack Overflow",action:()=>w("https://stackoverflow.com")},t:{name:"Snapchat",action:()=>w("https://web.snapchat.com")},y:{name:"Youtube",action:()=>w("https://www.youtube.com/")}}};function g(n){if(window.origin.includes("extension")){const e=document.getElementsByTagName("script"),t=e[e.length-1].src;window.location.href=t.replace(/docs.*/,`docs${n}index.html`)}else window.location.href=`${window.location.origin}${n}`}function w(n){window.location.href=n}function b(){const n="which-key";let e=[];function t(t){if(h.includes(t.key))return;e=[];const o=document.getElementById(n);o&&document.body.removeChild(o)}window.addEventListener("keydown",(function(o){if("INPUT"!==document.activeElement.tagName&&!document.activeElement.classList.contains("layout")&&!document.activeElement.classList.contains("list")&&"CANVAS"!==document.activeElement.tagName)if(console.log(document.activeElement.tagName)," "!==o.key&&" "!==e[0])switch(o.key){case"<":window.history.back();break;case">":window.history.forward();break;case"j":window.scrollBy({top:50,behavior:"smooth"});break;case"k":window.scrollBy({top:-50,behavior:"smooth"});break;case"J":window.scrollBy({top:window.innerHeight,behavior:"smooth"});break;case"K":window.scrollBy({top:-window.innerHeight,behavior:"smooth"});break;case"/":const n=Array.from(document.activeElement.querySelectorAll("input"));if(0===n.length)return;let e;if(1===n.length)e=n[0];else for(const t of n)if("none"!==t.closest("div").style.display){e=t;break}e&&(o.preventDefault(),e.focus({preventScroll:!0}));break;case"?":break;default:t(o),document.activeElement!=document.body&&document.activeElement.blur(),v[o.key]?.action&&v[o.key].action()}else!function(o){if(h.includes(o.key))return;o.preventDefault(),"Backspace"===o.key?e.pop():e.push(o.key);let a=v;for(const n of e.slice(1))a=a[n];if(a)return a.action?(a.action(),void t(o)):void function(e){let t=document.getElementById(n);t?t.innerHTML="":(t=document.createElement("div"),t.id=n,document.body.appendChild(t));const o=Object.entries(e);o.sort(((n,e)=>n[0].localeCompare(e[0])));for(const[n,e]of o){if(!e.name)continue;const o=document.createElement("div");e.action||o.classList.add("folder"),o.id=n,o.innerHTML=`<span>${n} <i class="nf nf-oct-arrow_right"></i> </span>${e.name}`,t.appendChild(o)}}(a);t(o)}(o)}))}const y=t.p+"dda3a79d4e13788f4507.png";window.addEventListener("load",(function(){Array.from(document.querySelectorAll(".logo")).forEach((n=>n.src=y)),b()}))})()})();