import { implementSearchBox } from "../../global/global.js";
import "./styles.css";

window.addEventListener("load", function () {
  const searchBox = document.getElementById("search");
  const searchElement = document.body;
  implementSearchBox(searchBox, searchElement);
});
