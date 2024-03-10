(()=>{"use strict";var n={878:(n,e,t)=>{t.d(e,{A:()=>c});var o=t(620),a=t.n(o),r=t(69),i=t.n(r)()(a());i.push([n.id,"/*THEME: Catppuccin Latte*/\n@media (prefers-color-scheme: light) {\n  :root {\n    --rosewater: 220, 138, 120;\n    --flamingo: 221, 120, 120;\n    --pink: 234, 118, 203;\n    --mauve: 136, 57, 239;\n    --red: 210, 15, 57;\n    --maroon: 230, 69, 83;\n    --peach: 254, 100, 11;\n    --yellow: 223, 142, 29;\n    --green: 64, 160, 43;\n    --teal: 23, 146, 153;\n    --sky: 4, 165, 229;\n    --sapphire: 32, 159, 181;\n    --blue: 30, 102, 245;\n    --lavender: 114, 135, 253;\n    --text: 76, 79, 105;\n    --subtext1: 92, 95, 119;\n    --subtext0: 108, 111, 133;\n    --overlay2: 124, 127, 147;\n    --overlay1: 140, 143, 161;\n    --overlay0: 156, 160, 176;\n    --surface2: 172, 176, 190;\n    --surface1: 188, 192, 204;\n    --surface0: 204, 208, 218;\n    --base: 239, 241, 245;\n    --mantle: 230, 233, 239;\n    --crust: 220, 224, 232;\n  }\n}\n\n/*THEME: Catppuccin Mocha*/\n@media (prefers-color-scheme: dark) {\n  :root {\n    --rosewater: 245, 224, 220;\n    --flamingo: 242, 205, 205;\n    --pink: 245, 194, 231;\n    --mauve: 203, 166, 247;\n    --red: 243, 139, 168;\n    --maroon: 235, 160, 172;\n    --peach: 250, 179, 135;\n    --yellow: 249, 226, 175;\n    --green: 166, 227, 161;\n    --teal: 148, 226, 213;\n    --sky: 137, 220, 235;\n    --sapphire: 116, 199, 236;\n    --blue: 137, 180, 250;\n    --lavender: 180, 190, 254;\n    --text: 205, 214, 244;\n    --subtext1: 186, 194, 222;\n    --subtext0: 166, 173, 200;\n    --overlay2: 147, 153, 178;\n    --overlay1: 127, 132, 156;\n    --overlay0: 108, 112, 134;\n    --surface2: 88, 91, 112;\n    --surface1: 69, 71, 90;\n    --surface0: 49, 50, 68;\n    --base: 30, 30, 46;\n    --mantle: 24, 24, 37;\n    --crust: 17, 17, 27;\n  }\n}\n\n/*Smartphones (Portrait):*/\n@media (min-width: 0px) {}\n\n/*Smartphones (Landscape):*/\n@media (min-width: 400px) {}\n\n/*Tablets (Portrait):*/\n@media (min-width: 600px) {}\n\n/*Tablets (Landscape):*/\n@media (min-width: 800px) {}\n\n/*Big Landscape Tablets, Laptops, and Desktops:*/\n@media (min-width: 1000px) {}\n\n/*Hi-Res Laptops and Desktops:*/\n@media (min-width: 1200px) {}\n",""]);const c=i},814:(n,e,t)=>{t.d(e,{A:()=>l});var o=t(620),a=t.n(o),r=t(69),i=t.n(r),c=t(878),s=i()(a());s.push([n.id,"@import url(https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap);"]),s.push([n.id,"@import url(https://www.nerdfonts.com/assets/css/webfont.css);"]),s.i(c.A),s.push([n.id,'/*FONT: JetBrainsMono*/\n\n/* Default Values */\n* {\n  outline: none;\n  color: rgba(var(--text));\n  font-family: "JetBrains Mono", monospace;\n}\n\n*::-webkit-scrollbar {\n  width: 1vw;\n}\n\n*::-webkit-scrollbar-track {\n  background: rgba(var(--surface0));\n}\n\n*::-webkit-scrollbar-thumb {\n  background: rgba(var(--crust));\n}\n\n*:focus {\n  outline: 2px dotted rgba(var(--lavender)) !important;\n}\n\nhtml,\nbody {\n  display: flex;\n  flex-direction: column;\n  margin: 0;\n  background: rgba(var(--base));\n}\n\nbody {\n  min-height: 100vh;\n}\n\nheader {\n  display: flex;\n  position: sticky;\n  top: 0;\n  flex-direction: column;\n  gap: 2vh;\n  background: rgba(var(--base));\n  padding: 1vh 2vw;\n}\n\nh1 {\n  margin: 1vh 2vw;\n  font-weight: 800;\n  font-size: 60px;\n}\n\nh4 {\n  margin: 0 0 2vh 0;\n  font-style: italic;\n  font-weight: 100;\n  font-size: 20px;\n}\n\nimg {\n  width: auto;\n  height: 100px;\n}\n\ninput {\n  border: 2px solid rgba(var(--crust));\n  border-radius: 100vh;\n  background: rgba(var(--mantle));\n  padding: 0.5vh 2vw;\n  height: 16px;\n  color: rgba(var(--text));\n  font-weight: 200;\n  font-size: 14px;\n}\n\ninput::-webkit-input-placeholder {\n  color: rgba(var(--text), 0.8);\n  font-size: 14px;\n}\n\n.row {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n\n#which-key {\n  display: grid;\n  position: fixed;\n  bottom: 2vh;\n  left: 50%;\n  grid-template-columns: auto auto auto;\n  transform: translate(-50%, 0);\n  border-radius: 2vh;\n  background: rgba(var(--crust));\n  padding: 1vh 2vw;\n  width: 80%;\n  font-weight: 300;\n  font-size: 16px;\n}\n\n#which-key span {\n  color: rgba(var(--blue));\n}\n\n#which-key i {\n  color: rgba(var(--surface2));\n}\n\n#which-key div {\n  color: rgba(var(--mauve));\n}\n\n#which-key .folder {\n  color: rgba(var(--peach));\n}\n\n.code-key {\n  color: rgba(var(--mauve));\n}\n\n.code-fn {\n  color: rgba(var(--blue));\n}\n\n.code-import {\n  color: rgba(var(--lavender));\n}\n\n.code-str {\n  color: rgba(var(--green));\n}\n\n.code-builtin {\n  color: rgba(var(--peach));\n}\n\n.marked {\n  background: rgba(var(--yellow), 0.2) !important;\n}\n\n.marked-highlight {\n  color: rgba(var(--yellow)) !important;\n  font-weight: 800;\n}\n\n.btn-row {\n  display: flex;\n  flex-direction: row;\n  gap: 0.2vw;\n  padding: 2vh 0;\n}\n\n.btn-row>button {\n  flex: 1;\n  border: none;\n  border-bottom: 4px solid rgba(var(--crust));\n  border-radius: 1vh;\n  background: rgba(var(--surface0));\n  min-width: 10%;\n  height: 30px;\n  overflow: hidden;\n  font-size: 20px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.btn-row>.trailing-btn {\n  min-width: 30px;\n  max-width: 50px;\n  font-size: 16px;\n}\n',""]);const l=s},96:(n,e,t)=>{t.d(e,{A:()=>l});var o=t(620),a=t.n(o),r=t(69),i=t.n(r),c=t(814),s=i()(a());s.i(c.A),s.push([n.id,".base {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  gap: 2vh;\n}\n\n.section-1 {\n  display: grid;\n  grid-template-columns: auto auto 1fr;\n  column-gap: 1vw;\n  row-gap: 1vh;\n  padding: 1vh 4vw;\n  font-size: 16px;\n}\n\n.section-2 {\n  display: grid;\n  grid-template-columns: auto auto 1fr;\n  column-gap: 0.8vw;\n  row-gap: 0.8vh;\n  grid-column: span 3;\n  padding: 1vh 2vw;\n  font-size: 14px;\n}\n\n.title-1 {\n  grid-column: span 3;\n  padding: 4vh 0 1vh 0;\n  color: rgba(var(--lavender));\n  font-weight: 800;\n  font-size: 24px;\n}\n\n.title-2 {\n  grid-column: span 3;\n  color: rgba(var(--mauve));\n  font-weight: 300;\n  font-size: 20px;\n}\n",""]);const l=s},69:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",o=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),o&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),o&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,o,a,r){"string"==typeof n&&(n=[[null,n,void 0]]);var i={};if(o)for(var c=0;c<this.length;c++){var s=this[c][0];null!=s&&(i[s]=!0)}for(var l=0;l<n.length;l++){var d=[].concat(n[l]);o&&i[d[0]]||(void 0!==r&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=r),t&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=t):d[2]=t),a&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=a):d[4]="".concat(a)),e.push(d))}},e}},620:n=>{n.exports=function(n){return n[1]}},646:n=>{var e=[];function t(n){for(var t=-1,o=0;o<e.length;o++)if(e[o].identifier===n){t=o;break}return t}function o(n,o){for(var r={},i=[],c=0;c<n.length;c++){var s=n[c],l=o.base?s[0]+o.base:s[0],d=r[l]||0,u="".concat(l," ").concat(d);r[l]=d+1;var p=t(u),m={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==p)e[p].references++,e[p].updater(m);else{var h=a(m,o);o.byIndex=c,e.splice(c,0,{identifier:u,updater:h,references:1})}i.push(u)}return i}function a(n,e){var t=e.domAPI(e);return t.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,a){var r=o(n=n||[],a=a||{});return function(n){n=n||[];for(var i=0;i<r.length;i++){var c=t(r[i]);e[c].references--}for(var s=o(n,a),l=0;l<r.length;l++){var d=t(r[l]);0===e[d].references&&(e[d].updater(),e.splice(d,1))}r=s}}},13:n=>{var e={};n.exports=function(n,t){var o=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(t)}},506:n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},942:(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},959:n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var o="";t.supports&&(o+="@supports (".concat(t.supports,") {")),t.media&&(o+="@media ".concat(t.media," {"));var a=void 0!==t.layer;a&&(o+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),o+=t.css,a&&(o+="}"),t.media&&(o+="}"),t.supports&&(o+="}");var r=t.sourceMap;r&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleTagTransform(o,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},215:n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}},e={};function t(o){var a=e[o];if(void 0!==a)return a.exports;var r=e[o]={id:o,exports:{}};return n[o](r,r.exports,t),r.exports}t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var o in e)t.o(e,o)&&!t.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:e[o]})},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"==typeof window)return window}}(),t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),(()=>{var n;t.g.importScripts&&(n=t.g.location+"");var e=t.g.document;if(!n&&e&&(e.currentScript&&(n=e.currentScript.src),!n)){var o=e.getElementsByTagName("script");if(o.length)for(var a=o.length-1;a>-1&&(!n||!/^http(s?):/.test(n));)n=o[a--].src}if(!n)throw new Error("Automatic publicPath is not supported in this browser");n=n.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=n+"../"})(),t.nc=void 0,(()=>{const n=["Alt","Control","Shift"];let e={j:{name:"Internal Links",h:{name:"Home",action:()=>o("/")},c:{name:"Canvas",action:()=>o("/canvas/")},d:{name:"Dev Tools",action:()=>o("/dev-tools/")},e:{name:"Edge Shortcuts",action:()=>o("/edge/")},k:{name:"Keyboard Layout",action:()=>o("/layout/")},t:{name:"Todo Lists",action:()=>o("/todo/")},v:{name:"Vim Shortcuts",action:()=>o("/vim/")},w:{name:"Vimium Shortcuts",action:()=>o("/vimium/")}},f:{name:"External Links",j:{name:"Programming",a:{name:"Advent of Code",action:()=>a("https://adventofcode.com")},e:{name:"Exercism",action:()=>a("https://exercism.org")},g:{name:"GitHub",action:()=>a("https://github.com/HonsonCooky")},s:{name:"Stack Overflow",action:()=>a("https://stackoverflow.com")}},k:{name:"Management",c:{name:"GCalendar",action:()=>a("https://calendar.google.com")},d:{name:"GDrive",action:()=>a("https://drive.google.com")},g:{name:"Gmail",action:()=>a("https://mail.google.com")}},l:{name:"Socials",d:{name:"Disney+",action:()=>a("https://www.disneyplus.com/search")},i:{name:"Instagram",action:()=>a("https://www.instagram.com")},m:{name:"Messenger",action:()=>a("https://www.messenger.com")},n:{name:"Netflix",action:()=>a("https://www.netflix.com/browse")},o:{name:"Neon",action:()=>a("https://www.neontv.co.nz")},r:{name:"Reddit",action:()=>a("https://www.reddit.com")},s:{name:"Snapchat",action:()=>a("https://web.snapchat.com")},y:{name:"Youtube",action:()=>a("https://www.youtube.com/")}},";":{name:"Work",a:{name:"Azure Portal",action:()=>a("https://portal.azure.com/#home")},b:{name:"Betterworks",action:()=>a("https://app.betterworks.com")},c:{name:"Confluence",action:()=>a("https://zenergy.atlassian.net/wiki/home")},d:{name:"DevOps",action:()=>a("https://dev.azure.com/zenergy")},g:{name:"GitHub",action:()=>a("https://github.com/zenergy")},j:{name:"Jira",action:()=>a("https://zenergy.atlassian.net/jira/projects")},s:{name:"School",action:()=>a("https://zacademyelearning.litmos.com")}}}};function o(n){if(window.origin.includes("extension")){const e=document.getElementsByTagName("script"),t=e[e.length-1].src;window.location.href=t.replace(/docs.*/,`docs${n}index.html`)}else window.location.href=`${window.location.origin}${n}`}function a(n){window.location.href=n}function r(){const t="which-key";let o=[];function a(e){if(n.includes(e.key))return;o=[];const a=document.getElementById(t);a&&document.body.removeChild(a)}window.addEventListener("keydown",(function(r){if("INPUT"!==document.activeElement.tagName&&!document.activeElement.classList.contains("layout")&&!document.activeElement.classList.contains("list")&&"CANVAS"!==document.activeElement.tagName)if(" "!==r.key&&" "!==o[0])switch(r.key){case"<":window.history.back();break;case">":window.history.forward();break;case"j":window.scrollBy({top:50,behavior:"smooth"});break;case"k":window.scrollBy({top:-50,behavior:"smooth"});break;case"J":window.scrollBy({top:window.innerHeight,behavior:"smooth"});break;case"K":window.scrollBy({top:-window.innerHeight,behavior:"smooth"});break;case"/":const n=Array.from(document.activeElement.querySelectorAll("input"));if(0===n.length)return;let t;if(1===n.length)t=n[0];else for(const e of n)if("none"!==e.closest("div").style.display){t=e;break}t&&(r.preventDefault(),t.focus({preventScroll:!0}));break;case"?":break;default:a(r),document.activeElement!=document.body&&document.activeElement.blur(),e[r.key]?.action&&e[r.key].action()}else!function(r){if(n.includes(r.key))return;r.preventDefault(),"Backspace"===r.key?o.pop():o.push(r.key);let i=e;for(const n of o.slice(1))i=i[n];if(i)return i.action?(i.action(),void a(r)):void function(n){let e=document.getElementById(t);e?e.innerHTML="":(e=document.createElement("div"),e.id=t,document.body.appendChild(e));const o=Object.entries(n);o.sort(((n,e)=>n[0].localeCompare(e[0])));for(const[n,t]of o){if(!t.name)continue;const o=document.createElement("div");t.action||o.classList.add("folder"),o.id=n,o.innerHTML=`<span>${n} <i class="nf nf-oct-arrow_right"></i> </span>${t.name}`,e.appendChild(o)}}(i);a(r)}(r)}))}const i=t.p+"dda3a79d4e13788f4507.png";function c(n,e){let t=-1,o=[],a="";const r="marked",i="marked-highlight",c="error";function s(n){n.classList.add(i),n.scrollIntoView({block:"center",inline:"nearest"})}function l(n,e,s){0===s&&e!=a&&(o=[],t=-1,a=e),n.classList&&(n.classList.remove(r),n.classList.remove(i),n.classList.remove(c)),e.length>0&&function(n,e){const t=[...e.childNodes].filter((n=>n.nodeType===Node.TEXT_NODE));if(0===t.length)return!1;const o=t[0].nodeValue;let a=0;const r=n.toLowerCase().split(""),i=o.toLowerCase().split("");for(let n=0;n<r.length;n++){const e=i.indexOf(r[n],a);if(-1===e||0!=a&&e-a>2)return!1;a=e}return!0}(e,n)&&(n.classList.add(r),o.push(n));for(let t=0;t<n.childNodes.length;t++)l(n.childNodes[t],e,s+1)}return n.addEventListener("keydown",(function(r){var d;"Enter"===r.key&&(r.preventDefault(),this.value!=a&&l(e,this.value,0),r.shiftKey?o.length>0&&(-1!=t&&o[t].classList.remove(i),t=(t-1+o.length)%o.length,s(o[t])):(d=this.value,o.length>0?(-1!=t&&o[t].classList.remove(i),t=(t+1)%o.length,s(o[t])):d.length>0&&n.classList.add(c))),"Escape"===r.key&&(r.preventDefault(),document.activeElement.blur())})),n}window.addEventListener("load",(function(){Array.from(document.querySelectorAll(".logo")).forEach((n=>n.src=i)),r()}));var s=t(646),l=t.n(s),d=t(959),u=t.n(d),p=t(13),m=t.n(p),h=t(942),f=t.n(h),v=t(506),g=t.n(v),w=t(215),b=t.n(w),y=t(96),x={};x.styleTagTransform=b(),x.setAttributes=f(),x.insert=m().bind(null,"head"),x.domAPI=u(),x.insertStyleElement=g(),l()(y.A,x),y.A&&y.A.locals&&y.A.locals,window.addEventListener("load",(function(){c(document.getElementById("search"),document.querySelector("main"))}))})()})();