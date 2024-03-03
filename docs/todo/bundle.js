(()=>{"use strict";var e={878:(e,n,t)=>{t.d(n,{A:()=>c});var o=t(620),r=t.n(o),a=t(69),i=t.n(a)()(r());i.push([e.id,"/*THEME: Catppuccin Latte*/\n@media (prefers-color-scheme: light) {\n  :root {\n    --rosewater: 220, 138, 120;\n    --flamingo: 221, 120, 120;\n    --pink: 234, 118, 203;\n    --mauve: 136, 57, 239;\n    --red: 210, 15, 57;\n    --maroon: 230, 69, 83;\n    --peach: 254, 100, 11;\n    --yellow: 223, 142, 29;\n    --green: 64, 160, 43;\n    --teal: 23, 146, 153;\n    --sky: 4, 165, 229;\n    --sapphire: 32, 159, 181;\n    --blue: 30, 102, 245;\n    --lavender: 114, 135, 253;\n    --text: 76, 79, 105;\n    --subtext1: 92, 95, 119;\n    --subtext0: 108, 111, 133;\n    --overlay2: 124, 127, 147;\n    --overlay1: 140, 143, 161;\n    --overlay0: 156, 160, 176;\n    --surface2: 172, 176, 190;\n    --surface1: 188, 192, 204;\n    --surface0: 204, 208, 218;\n    --base: 239, 241, 245;\n    --mantle: 230, 233, 239;\n    --crust: 220, 224, 232;\n  }\n}\n\n/*THEME: Catppuccin Mocha*/\n@media (prefers-color-scheme: dark) {\n  :root {\n    --rosewater: 245, 224, 220;\n    --flamingo: 242, 205, 205;\n    --pink: 245, 194, 231;\n    --mauve: 203, 166, 247;\n    --red: 243, 139, 168;\n    --maroon: 235, 160, 172;\n    --peach: 250, 179, 135;\n    --yellow: 249, 226, 175;\n    --green: 166, 227, 161;\n    --teal: 148, 226, 213;\n    --sky: 137, 220, 235;\n    --sapphire: 116, 199, 236;\n    --blue: 137, 180, 250;\n    --lavender: 180, 190, 254;\n    --text: 205, 214, 244;\n    --subtext1: 186, 194, 222;\n    --subtext0: 166, 173, 200;\n    --overlay2: 147, 153, 178;\n    --overlay1: 127, 132, 156;\n    --overlay0: 108, 112, 134;\n    --surface2: 88, 91, 112;\n    --surface1: 69, 71, 90;\n    --surface0: 49, 50, 68;\n    --base: 30, 30, 46;\n    --mantle: 24, 24, 37;\n    --crust: 17, 17, 27;\n  }\n}\n\n/*Smartphones (Portrait):*/\n@media (min-width: 0px) {}\n\n/*Smartphones (Landscape):*/\n@media (min-width: 400px) {}\n\n/*Tablets (Portrait):*/\n@media (min-width: 600px) {}\n\n/*Tablets (Landscape):*/\n@media (min-width: 800px) {}\n\n/*Big Landscape Tablets, Laptops, and Desktops:*/\n@media (min-width: 1000px) {}\n\n/*Hi-Res Laptops and Desktops:*/\n@media (min-width: 1200px) {}\n",""]);const c=i},814:(e,n,t)=>{t.d(n,{A:()=>s});var o=t(620),r=t.n(o),a=t(69),i=t.n(a),c=t(878),l=i()(r());l.push([e.id,"@import url(https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap);"]),l.push([e.id,"@import url(https://www.nerdfonts.com/assets/css/webfont.css);"]),l.i(c.A),l.push([e.id,'/*FONT: JetBrainsMono*/\n\n/* Default Values */\n* {\n  outline: none;\n  color: rgba(var(--text));\n  font-family: "JetBrains Mono", monospace;\n}\n\n*::-webkit-scrollbar {\n  width: 1vw;\n}\n\n*::-webkit-scrollbar-track {\n  background: rgba(var(--surface0));\n}\n\n*::-webkit-scrollbar-thumb {\n  background: rgba(var(--crust));\n}\n\n*:focus {\n  outline: 2px dotted rgba(var(--lavender)) !important;\n}\n\nhtml,\nbody {\n  display: flex;\n  flex-direction: column;\n  margin: 0;\n  background: rgba(var(--base));\n}\n\nbody {\n  min-height: 100vh;\n}\n\nheader {\n  display: flex;\n  position: sticky;\n  top: 0;\n  flex-direction: column;\n  gap: 2vh;\n  background: rgba(var(--base));\n  padding: 1vh 2vw;\n}\n\nh1 {\n  margin: 1vh 2vw;\n  font-weight: 800;\n  font-size: 80px;\n}\n\nh4 {\n  margin: 0 0 2vh 0;\n  font-style: italic;\n  font-weight: 100;\n  font-size: 20px;\n}\n\nimg {\n  width: auto;\n  height: 100px;\n}\n\ninput {\n  border: 2px solid rgba(var(--crust));\n  border-radius: 100vh;\n  background: rgba(var(--mantle));\n  padding: 0.5vh 2vw;\n  height: 16px;\n  color: rgba(var(--text));\n  font-weight: 200;\n  font-size: 14px;\n}\n\ninput::-webkit-input-placeholder {\n  color: rgba(var(--text), 0.8);\n  font-size: 14px;\n}\n\n.row {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n\n#which-key {\n  display: grid;\n  position: fixed;\n  bottom: 2vh;\n  left: 50%;\n  grid-template-columns: auto auto auto;\n  transform: translate(-50%, 0);\n  border-radius: 2vh;\n  background: rgba(var(--crust));\n  padding: 1vh 2vw;\n  width: 80%;\n}\n\n#which-key span {\n  color: rgba(var(--blue));\n}\n\n#which-key i {\n  color: rgba(var(--surface2));\n}\n\n#which-key div {\n  color: rgba(var(--mauve));\n}\n\n#which-key .folder {\n  color: rgba(var(--peach));\n}\n\n.code-key {\n  color: rgba(var(--mauve));\n}\n\n.code-fn {\n  color: rgba(var(--blue));\n}\n\n.code-import {\n  color: rgba(var(--lavender));\n}\n\n.code-str {\n  color: rgba(var(--green));\n}\n\n.code-builtin {\n  color: rgba(var(--peach));\n}\n\n.marked {\n  background: rgba(var(--yellow), 0.2) !important;\n}\n\n.marked-highlight {\n  color: rgba(var(--yellow)) !important;\n  font-weight: 800;\n}\n\n.btn-row {\n  display: flex;\n  flex-direction: row;\n  gap: 0.2vw;\n  padding: 2vh 0;\n}\n\n.btn-row>button {\n  flex: 1;\n  border: none;\n  border-bottom: 4px solid rgba(var(--crust));\n  border-radius: 1vh;\n  background: rgba(var(--surface0));\n  min-width: 10%;\n  height: 30px;\n  overflow: hidden;\n  font-size: 20px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.btn-row>.trailing-btn {\n  min-width: 30px;\n  max-width: 50px;\n  font-size: 16px;\n}\n',""]);const s=l},364:(e,n,t)=>{t.d(n,{A:()=>s});var o=t(620),r=t.n(o),a=t(69),i=t.n(a),c=t(814),l=i()(r());l.i(c.A),l.push([e.id,"main {\n  padding: 1vh 2vw;\n}\n\n.list {\n  display: flex;\n  flex-direction: column;\n  border-radius: 1vh;\n  padding: 1vh 2vw;\n}\n\n.list-item {\n  display: flex;\n  flex: 1;\n  flex-direction: row;\n  align-items: center;\n  padding: 0.2vh 4vw;\n  font-weight: 300;\n  font-size: 16px;\n}\n\n.list-highlight {\n  background: rgba(var(--surface0)) !important;\n}\n\n.list-item>span {\n  margin: 0 2vw;\n}\n\nli {\n  border-radius: 2vh;\n  padding: 0.2vh 2vw;\n}\n",""]);const s=l},69:e=>{e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t="",o=void 0!==n[5];return n[4]&&(t+="@supports (".concat(n[4],") {")),n[2]&&(t+="@media ".concat(n[2]," {")),o&&(t+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),t+=e(n),o&&(t+="}"),n[2]&&(t+="}"),n[4]&&(t+="}"),t})).join("")},n.i=function(e,t,o,r,a){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(o)for(var c=0;c<this.length;c++){var l=this[c][0];null!=l&&(i[l]=!0)}for(var s=0;s<e.length;s++){var d=[].concat(e[s]);o&&i[d[0]]||(void 0!==a&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=a),t&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=t):d[2]=t),r&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=r):d[4]="".concat(r)),n.push(d))}},n}},620:e=>{e.exports=function(e){return e[1]}},646:e=>{var n=[];function t(e){for(var t=-1,o=0;o<n.length;o++)if(n[o].identifier===e){t=o;break}return t}function o(e,o){for(var a={},i=[],c=0;c<e.length;c++){var l=e[c],s=o.base?l[0]+o.base:l[0],d=a[s]||0,u="".concat(s," ").concat(d);a[s]=d+1;var m=t(u),p={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==m)n[m].references++,n[m].updater(p);else{var f=r(p,o);o.byIndex=c,n.splice(c,0,{identifier:u,updater:f,references:1})}i.push(u)}return i}function r(e,n){var t=n.domAPI(n);return t.update(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap&&n.supports===e.supports&&n.layer===e.layer)return;t.update(e=n)}else t.remove()}}e.exports=function(e,r){var a=o(e=e||[],r=r||{});return function(e){e=e||[];for(var i=0;i<a.length;i++){var c=t(a[i]);n[c].references--}for(var l=o(e,r),s=0;s<a.length;s++){var d=t(a[s]);0===n[d].references&&(n[d].updater(),n.splice(d,1))}a=l}}},13:e=>{var n={};e.exports=function(e,t){var o=function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}n[e]=t}return n[e]}(e);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(t)}},506:e=>{e.exports=function(e){var n=document.createElement("style");return e.setAttributes(n,e.attributes),e.insert(n,e.options),n}},942:(e,n,t)=>{e.exports=function(e){var n=t.nc;n&&e.setAttribute("nonce",n)}},959:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var n=e.insertStyleElement(e);return{update:function(t){!function(e,n,t){var o="";t.supports&&(o+="@supports (".concat(t.supports,") {")),t.media&&(o+="@media ".concat(t.media," {"));var r=void 0!==t.layer;r&&(o+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),o+=t.css,r&&(o+="}"),t.media&&(o+="}"),t.supports&&(o+="}");var a=t.sourceMap;a&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),n.styleTagTransform(o,e,n.options)}(n,e,t)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)}}}},215:e=>{e.exports=function(e,n){if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}}},n={};function t(o){var r=n[o];if(void 0!==r)return r.exports;var a=n[o]={id:o,exports:{}};return e[o](a,a.exports,t),a.exports}t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e;t.g.importScripts&&(e=t.g.location+"");var n=t.g.document;if(!e&&n&&(n.currentScript&&(e=n.currentScript.src),!e)){var o=n.getElementsByTagName("script");if(o.length)for(var r=o.length-1;r>-1&&(!e||!/^http(s?):/.test(e));)e=o[r--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e+"../"})(),t.nc=void 0,(()=>{const e=["Alt","Control","Shift"];let n={i:{name:"Internal Links",h:{name:"Home",action:()=>a("/")},c:{name:"Canvas",action:()=>a("/canvas/")},d:{name:"Dev Tools",action:()=>a("/dev-tools/")},e:{name:"Edge Shortcuts",action:()=>a("/edge/")},k:{name:"Keyboard Layout",action:()=>a("/layout/")},t:{name:"Todo Lists",action:()=>a("/todo/")},v:{name:"Vim Shortcuts",action:()=>a("/vim/")},w:{name:"Vimium Shortcuts",action:()=>a("/vimium/")}},e:{name:"External Links",a:{name:"Advent of Code",action:()=>i("https://adventofcode.com")},c:{name:"Calendar",action:()=>i("https://calendar.google.com")},d:{name:"Disney+",action:()=>i("https://www.disneyplus.com/search")},e:{name:"Exercism",action:()=>i("https://exercism.org")},g:{name:"GitHub",action:()=>i("https://github.com/HonsonCooky")},h:{name:"Gmail",action:()=>i("https://mail.google.com")},m:{name:"Messenger",action:()=>i("https://www.messenger.com")},n:{name:"Netflix",action:()=>i("https://www.netflix.com/browse")},o:{name:"Neon",action:()=>i("https://www.neontv.co.nz")},r:{name:"Reddit",action:()=>i("https://www.reddit.com")},s:{name:"Stack Overflow",action:()=>i("https://stackoverflow.com")},t:{name:"Snapchat",action:()=>i("https://web.snapchat.com")},y:{name:"Youtube",action:()=>i("https://www.youtube.com/")}}};function o({keyPath:e,name:t,action:o}){if(!e||!t)return;const r=e.split("."),a=t.split(".");let i=n;for(const[e,n]of r.map(((e,n)=>[e,n])))i[e]||(i[e]={name:a[n]?a[n]:a[a.length-1]},n===r.length-1&&(i[e].action=o)),i=i[e]}function r(){delete n.i.f}function a(e){if(window.origin.includes("extension")){const n=document.getElementsByTagName("script"),t=n[n.length-1].src;window.location.href=t.replace(/docs.*/,`docs${e}index.html`)}else window.location.href=`${window.location.origin}${e}`}function i(e){window.location.href=e}function c(){const t="which-key";let o=[];function r(n){if(e.includes(n.key))return;o=[];const r=document.getElementById(t);r&&document.body.removeChild(r)}window.addEventListener("keydown",(function(a){if("INPUT"!==document.activeElement.tagName&&!document.activeElement.classList.contains("layout")&&!document.activeElement.classList.contains("list")&&"CANVAS"!==document.activeElement.tagName)if(console.log(document.activeElement.tagName)," "!==a.key&&" "!==o[0])switch(a.key){case"<":window.history.back();break;case">":window.history.forward();break;case"j":window.scrollBy({top:50,behavior:"smooth"});break;case"k":window.scrollBy({top:-50,behavior:"smooth"});break;case"J":window.scrollBy({top:window.innerHeight,behavior:"smooth"});break;case"K":window.scrollBy({top:-window.innerHeight,behavior:"smooth"});break;case"/":const e=Array.from(document.activeElement.querySelectorAll("input"));if(0===e.length)return;let t;if(1===e.length)t=e[0];else for(const n of e)if("none"!==n.closest("div").style.display){t=n;break}t&&(a.preventDefault(),t.focus({preventScroll:!0}));break;case"?":break;default:r(a),document.activeElement!=document.body&&document.activeElement.blur(),n[a.key]?.action&&n[a.key].action()}else!function(a){if(e.includes(a.key))return;a.preventDefault(),"Backspace"===a.key?o.pop():o.push(a.key);let i=n;for(const e of o.slice(1))i=i[e];if(i)return i.action?(i.action(),void r(a)):void function(e){let n=document.getElementById(t);n?n.innerHTML="":(n=document.createElement("div"),n.id=t,document.body.appendChild(n));const o=Object.entries(e);o.sort(((e,n)=>e[0].localeCompare(n[0])));for(const[e,t]of o){if(!t.name)continue;const o=document.createElement("div");t.action||o.classList.add("folder"),o.id=e,o.innerHTML=`<span>${e} <i class="nf nf-oct-arrow_right"></i> </span>${t.name}`,n.appendChild(o)}}(i);r(a)}(a)}))}const l=t.p+"dda3a79d4e13788f4507.png";window.addEventListener("load",(function(){Array.from(document.querySelectorAll(".logo")).forEach((e=>e.src=l)),c()}));var s=t(646),d=t.n(s),u=t(959),m=t.n(u),p=t(13),f=t.n(p),h=t(942),v=t.n(h),g=t(506),y=t.n(g),w=t(215),b=t.n(w),x=t(364),k={};k.styleTagTransform=b(),k.setAttributes=v(),k.insert=f().bind(null,"head"),k.domAPI=m(),k.insertStyleElement=y(),d()(x.A,k),x.A&&x.A.locals&&x.A.locals,window.addEventListener("load",(function(){const e=document.getElementById("to-do-lists"),n=document.getElementById("to-do-list-btn-row"),t=document.getElementById("new-list-btn"),a=document.getElementById("new-list-view"),i="to-do-list",c="to-do-btn",l="to-do-section",s="done-section",d="list-highlight";function u(){return Object.entries(localStorage).filter((([e,n])=>e.includes(i))).map((([e,n])=>[e,JSON.parse(n)]))}function m(){const e=v();if(!e)return;const t=e.id,o=document.getElementById(`${t.replace(i,c)}`),r=Array.from(n.children).indexOf(o);localStorage.removeItem(t),E();const a=Array.from(n.children);if(a.length>0){let e=r;e>=a.length&&(e-=1),a[e].click()}}function p(e){const n=Array.from(document.activeElement.querySelectorAll("ul")).map((e=>Array.from(e.children))).flat(),t=document.activeElement.querySelector(`.${d}`);let o=-1;t&&(o=n.indexOf(t));let r=o;r+="DOWN"===e?1:-1,r%=n.length,r<0&&(r=n.length-1),n.forEach((e=>e.classList.remove(d))),n[r].classList.add(d)}function f(){const e=document.activeElement.querySelector(`.${d}`);if(!e)return{};const n=e.id.includes(l)?l:s,t=RegExp(`-${n}.*`),o=e.id.replace(t,""),r=document.activeElement.querySelector(`ul[id*="${n}"]`),a=Array.from(r.children),i=a.indexOf(e);return{currentlySelected:e,section:n,listId:o,ul:r,items:a,curIndex:i}}function h(e){const{currentlySelected:n,section:t,listId:o,items:r,curIndex:a}=f();if(!n)return;let i=a;i+="DOWN"===e?1:-1,i%=r.length,i<0&&(i=r.length-1);let c=localStorage.getItem(o);if(!c)return;c=JSON.parse(c);const s=t===l?c.todo:c.done,u=s.splice(a,1)[0];s.splice(i,0,u),localStorage.setItem(o,JSON.stringify(c)),b(o),document.getElementById(n.id.replace(/.$/,i)).classList.add(d)}function v(){return document.activeElement.querySelector('.list[style*="display: flex"]')}function g(e,n){for(const[t,o]of n.map(((e,n)=>[e,n]))){const n=document.createElement("li");n.id=`${e.id}-li-${o}`,n.innerText=t,e.appendChild(n)}}function y(e,t){Array.from(n.children).forEach((e=>e.style.color="rgba(var(--text))")),e.style.color="rgba(var(--sky))",Array.from(document.querySelectorAll(".list")).forEach((e=>e.style.display="none")),t.style.display="flex",t.tabIndex=-1,t.focus({preventScroll:!0})}function w(e,o,r){const{todo:a,done:d}=r;if(e.innerHTML="",e.style.display="none",a.length>0){const n=document.createElement("div");n.id=`${o}-${l}`;const t=document.createElement("h4");t.innerText="To Do:";const r=document.createElement("ul");r.id=`${o}-${l}-ul`,g(r,a),n.appendChild(t),n.appendChild(r),e.appendChild(n)}if(d.length>0){const n=document.createElement("div");n.id=`${o}-${s}`;const t=document.createElement("h4");t.innerText="Done:";const r=document.createElement("ul");r.id=`${o}-${s}-ul`,g(r,d),n.appendChild(t),n.appendChild(r),e.appendChild(n)}const u=document.createElement("input");u.id=`${o} -input`,u.placeholder="[/] Add Item",u.addEventListener("keydown",(function(e){return"Enter"===e.key?(e.preventDefault(),function(e,n){let t=localStorage.getItem(e);if(!t)return;t=JSON.parse(t),localStorage.setItem(e,JSON.stringify({todo:[...t.todo,n],done:t.done})),b(e);const o=v().querySelector("input");o.focus(),o.scrollIntoView({block:"center",inline:"nearest"})}(o,u.value),void(u.value="")):"Escape"===e.key?(e.preventDefault(),void setTimeout((()=>{const e=document.activeElement.closest("div");e.tabIndex=-1,e.focus()}),0)):void 0})),e.appendChild(u),function(e,o){const r=o.replaceAll(i,c);let a=document.getElementById(r);a||(a=document.createElement("button"),a.id=r,a.title=`${o.replace(i,"")} Button`,a.type="button",a.innerText=o.replaceAll(`-${i}`,""),n.insertBefore(a,t)),a.addEventListener("click",(()=>y(a,e)))}(e,o)}function b(e){const n=JSON.parse(localStorage.getItem(e));if(!n)return;const t=document.getElementById(e);t&&(w(t,e,n),t.style.display="flex")}function x(e){const t=document.getElementById(e.replace(i,c)),r=(Array.from(n.children).indexOf(t)+64)%94+33;o({keyPath:`i.f.${String.fromCharCode(r)}`,name:`.ToDo Lists.${t.id.replace(`-${c}`,"")}`,action:()=>t.click()})}function k(){o({keyPath:"i.f.+",name:".ToDo Lists.Create New List",action:()=>t.click()}),o({keyPath:"i.f.D",name:".ToDo Lists.Delete Current List",action:m})}function E(){let t=u();const o=t.map((e=>e[0])),a=Array.from(n.children).map((e=>e.id)).filter((e=>"new-list-btn"!=e));for(const r of a){const a=r.replace(c,i);o.includes(a)?t=t.filter((([e,n])=>e!=a)):(n.removeChild(document.getElementById(r)),e.removeChild(document.getElementById(a)))}let l=0;for(const[e,o]of t)S(e,o),0===l&&n.children.item(0).click(),l++;r(),k();for(const[e,n]of u())x(e)}function S(n,t){const o=document.createElement("div");o.id=n,o.className="list",w(o,n,t),e.appendChild(o)}document.getElementById("new-list-title-input").addEventListener("keydown",(function(e){return"Enter"===e.key?(e.preventDefault(),function(e){const n=`${e}-${i}`;localStorage.getItem(n)||(localStorage.setItem(n,JSON.stringify({todo:[],done:[]})),E(),document.getElementById(n.replace(i,c)).click())}(this.value),void(this.value="")):"Escape"===e.key?(e.preventDefault(),void setTimeout((()=>{const e=document.activeElement.closest("div");e.tabIndex=-1,e.focus()}),0)):void 0})),t.addEventListener("click",(()=>y(t,a))),t.click();const I=u();let A=0;r(),k();for(const[e,t]of I)S(e,t),x(e),0===A&&(n.children.item(0).click(),document.activeElement.blur()),A+=1;window.addEventListener("keydown",(function(e){if(document.activeElement.classList.contains("list"))switch(e.key){case"j":e.altKey?h("DOWN"):p("DOWN");break;case"k":e.altKey?h("UP"):p("UP");break;case"d":!function(){const{currentlySelected:e,section:n,listId:t,curIndex:o}=f();if(!e)return;let r=localStorage.getItem(t);if(!r)return;r=JSON.parse(r);const a=n===l?r.todo:r.done,i=n===l?r.done:r.todo,c=a.splice(o,1)[0];i.push(c),localStorage.setItem(t,JSON.stringify(r)),b(t);const u=n===l?s:l,m=document.getElementById(`${t}-${u}-ul`).children.length-1;document.getElementById(e.id.replace(n,u).replace(/.$/,m)).classList.add(d)}();break;case"X":!function(){const{currentlySelected:e,section:n,listId:t,curIndex:o}=f();if(!e)return;let r=localStorage.getItem(t);if(!r)return;r=JSON.parse(r);const a=n===l?r.todo:r.done;if(a.splice(o,1),localStorage.setItem(t,JSON.stringify(r)),b(t),a.length>0){let n=o;n>=a.length&&(n-=1),document.getElementById(e.id.replace(/.$/,n)).classList.add(d)}}();break;case"/":e.preventDefault(),document.activeElement.querySelector("input").focus();break;case"Escape":Array.from(document.activeElement.querySelectorAll("ul")).map((e=>Array.from(e.children))).flat().forEach((e=>e.classList.remove(d))),document.activeElement.blur()}}))}))})()})();