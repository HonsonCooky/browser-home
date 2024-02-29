import "../../global/index";
import { addKeybinding, focusElement } from "../../global/keybinds";
import { implementSearchBox } from "../../global/searchbox";
import "./styles.css";

window.addEventListener("load", function() {
  const searchBox = document.getElementById("search");
  const searchElement = document.querySelector("main");
  implementSearchBox(searchBox, searchElement);
  addKeybinding({ keyPath: "i.1", name: ".JSON to HTML", action: () => focusElement("json-to-html") });

  const input = document.getElementById("input");
  const output = document.getElementById("output");
  const runBtn = document.getElementById("run");
  const copyBtn = document.getElementById("copy");

  function jsonObjToUl(obj, parent, depth) {
    const div = document.createElement("div");
    div.class = `base-${depth}`;
    for (const entry of Object.entries(obj)) {
      const spanKey = document.createElement("span");
      spanKey.innerText = entry[0];
      const i = document.createElement("span");
      i.innerText = ":";

      let spanValue = document.createElement("span");
      if (typeof entry[1] === "object") {
        jsonObjToUl(entry[1], div, depth + 1);
        continue;
      } else {
        spanValue.innerText = entry[1];
      }

      div.appendChild(spanKey);
      div.appendChild(i);
      div.appendChild(spanValue);
    }

    parent.appendChild(div);
  }

  runBtn.addEventListener("click", function() {
    try {
      const parent = document.createElement("div");
      parent.class = "base";
      const jsonObj = JSON.parse(input.value);
      jsonObjToUl(jsonObj, parent, 0);
      output.value = parent.outerHTML;
    } catch (e) {
      output.innerText = `Failed To Run: ${e.message}`;
    }
  });

  copyBtn.addEventListener("click", function() {
    navigator.clipboard
      .writeText(output.value)
      .then(() => {
        copyBtn.innerText = "Copied";
        setTimeout(() => (copyBtn.innerText = "Copy"), 2000);
      })
      .catch((e) => console.log(e));
  });
});
