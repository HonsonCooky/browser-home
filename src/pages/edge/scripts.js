import "../../global/index";
import { implementSearchBox } from "../../global/searchbox";
import "./styles.css";

window.addEventListener("load", function() {
  const searchBox = document.getElementById("search");
  const searchElement = document.querySelector("main");
  implementSearchBox(searchBox, searchElement);
});
