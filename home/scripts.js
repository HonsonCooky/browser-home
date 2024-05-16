import { loadKeymap } from "../assets/global.js";
loadKeymap();

(function clock() {
  document.getElementById("date").innerHTML = new Date().toISOString();
  setTimeout(clock, 80);
})();
