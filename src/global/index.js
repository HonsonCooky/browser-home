import { loadGlobalKeybindings } from "./keybinds";
import { loadImgs } from "./logos";

window.addEventListener("load", function() {
  loadImgs();
  loadGlobalKeybindings();
});
