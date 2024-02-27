import "../../global/global.js";
import "./styles.css";

window.addEventListener("load", function () {
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

  document.addEventListener("keydown", function (event) {
    if (externalPages.has(event.key)) {
      window.location.href = externalPages.get(event.key);
      return;
    }
  });
});
