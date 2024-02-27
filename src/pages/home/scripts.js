import "../../global/global.js";
import "./styles.css";
import logoImg from "../../assets/HC_LOGO_LIGHT_128x128.png";

// LOAD LOGO
Array.from(document.querySelectorAll(".logo")).forEach((i) => (i.src = logoImg));

const internalPages = new Map([
  ["c", "canvas"],
  ["e", "edge"],
  ["l", "keyboard"],
  ["t", "todo"],
  ["v", "vim"],
  ["w", "vimium"],
]);

const externalPages = new Map([
  ["A", "https://adventofcode.com"],
  ["C", "https://calendar.google.com"],
  ["D", "https://www.disneyplus.com/search"],
  ["E", "https://exercism.org"],
  ["G", "https://github.com/HonsonCooky"],
  ["H", "https://mail.google.com"],
  ["M", "https://www.messenger.com"],
  ["N", "https://www.netflix.com/browse"],
  ["O", "https://www.neontv.co.nz"],
  ["S", "https://stackoverflow.com"],
  ["T", "https://web.snapchat.com"],
  ["Y", "https://www.youtube.com/"],
]);

document.addEventListener("keydown", function(event) {
  if (internalPages.has(event.key)) {
    window.location.href = `${window.location.origin}/${internalPages.get(event.key)}`;
    return;
  }
  if (externalPages.has(event.key)) {
    window.location.href = externalPages.get(event.key);
    return;
  }
});
