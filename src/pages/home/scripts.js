import "./styles.css";
import logoImg from "../../assets/HC_LOGO_LIGHT_128x128.png";

// LOAD LOGO
Array.from(document.querySelectorAll(".logo")).forEach((i) => (i.src = logoImg));
