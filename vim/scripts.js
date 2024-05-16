import { loadKeymap } from "../assets/global.js";

(function clock() {
  document.getElementById("date").innerHTML = new Date().toISOString();
  setTimeout(clock, 80);
})();

loadKeymap();
