import vimJson from "./assets/vim-shortcuts.json";
import "./styles.css";
import "./assets/HC_LOGO_LIGHT_48x48.png";
import "./assets/HC_LOGO_LIGHT_128x128.png";

fetch(vimJson)
  .then((raw) => raw.json())
  .then((json) => console.log(json));
