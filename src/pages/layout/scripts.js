import "../../global/index";
import "./styles.css";
import layoutJson from "../../assets/keyboard-layout.json";
import { addKeybinding } from "../../global/keybinds";

window.addEventListener("load", function () {
  const keyboardSection = document.getElementById("keyboard-layouts");
  const keyboardBtnRow = document.getElementById("keyboard-layout-btn-row");

  function loadKeyboardKeys(keyboardLayout, tIndex, rows, cols, titles, content) {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const keyBtn = document.createElement("div");
        let value = content[i][j][tIndex];
        let color = "rgba(var(--text))";
        if (value.length === 0) {
          value = content[i][j][0];
          color = "rgba(var(--peach), 0.5)";
        }
        keyBtn.id = `${titles[tIndex]}-${value}`;
        keyBtn.className = "keyboard-btn";

        // Special buttons (shift, control, alt)
        value = value.replaceAll("<A>", `<span class="special">Alt</span>`);
        value = value.replaceAll("A-", `<span class="special">A-</span>`);
        value = value.replaceAll("<C>", `<span class="special">Ctrl</span>`);
        value = value.replaceAll("C-", `<span class="special">C-</span>`);
        value = value.replaceAll("<S>", `<span class="special">Shift</span>`);
        value = value.replaceAll("S-", `<span class="special">S-</span>`);

        // Icons
        value = value
          .split("||")
          .filter((str) => str.length > 0)
          .map((str) => {
            if (str.startsWith("nf-")) {
              return `<i class="nf ${str}" style="color: ${color}"></i>`;
            }
            return str;
          })
          .join("");

        keyBtn.innerHTML = value;
        keyBtn.style.color = color;
        keyboardLayout.appendChild(keyBtn);
      }
    }
  }

  function createKeyboardLayout(data) {
    const { layers, titles } = data;
    const { meta, ...content } = layers;
    const [rows, cols] = meta.size.split("x").map(Number);

    // Title Buttons
    for (let t = 0; t < titles.length; t++) {
      const btnDefault = "rgba(var(--text))";
      const btnHighlight = "rgba(var(--teal))";

      let title = titles[t];
      title = `[${title.slice(0, 1)}]${title.slice(1)}`;
      const btn = document.getElementById(`keyboard-select-btn-${t}`);
      btn.style.color = t === 0 ? btnHighlight : btnDefault;

      const layout = document.createElement("div");
      layout.id = `keyboard-layout-${t}`;
      layout.className = "layout";
      layout.style.display = t === 0 ? "grid" : "none";
      layout.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
      layout.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

      loadKeyboardKeys(layout, t, rows, cols, titles, content);

      keyboardSection.appendChild(layout);

      btn.onclick = () => {
        document.querySelectorAll('[id^="keyboard-select-btn-"]').forEach((b) => {
          b.style.color = btnDefault;
        });
        document.querySelectorAll(".layout").forEach((d) => {
          d.style.display = "none";
        });
        btn.style.color = btnHighlight;
        layout.style.display = "grid";
      };
    }
  }

  let keyboardData = {};
  fetch(layoutJson)
    .then((response) => response.json())
    .then((data) => {
      keyboardData = data;
      createKeyboardLayout(data);
    });

  for (const child of keyboardBtnRow.children) {
    const btnIndex = Array.from(keyboardBtnRow.children).indexOf(child);
    const charIndex = ((btnIndex + 64) % 94) + 33;
    const keybindingChar = String.fromCharCode(charIndex);
    const keybindingName = child.title.replace(" layer button", "");
    addKeybinding({
      keyPath: `i.f.${keybindingChar}`,
      name: `.Keyboard Layout.${keybindingName}`,
      action: () => child.click(),
    });
  }

  addKeybinding({
    keyPath: "i.f.k",
    name: "Highlight Key Tool",
    action: () => {
      const curLayout = keyboardSection.querySelector('.layout[style*="display: grid"]');
      if (curLayout) {
        curLayout.tabIndex = -1;
        curLayout.focus({ preventScroll: true });
      }
    },
  });

  let flatmapCache = [];
  const keyHighlightClass = "key-highlight";

  function keybindingsKeyboardHighlightSingle(event, highlight) {
    const key = event.key.toLowerCase();
    let location = flatmapCache.indexOf(key);
    if (event.location > 1) location = flatmapCache.indexOf(key, location + 1);
    if (location === -1) return;
    const element = document.activeElement.children[location];
    if (highlight) {
      element.classList.add(keyHighlightClass);
    } else {
      element.classList.remove(keyHighlightClass);
    }
  }

  function keybindingsKeyboardHighlightAll(event, highlight) {
    const key = event.key.toLowerCase();
    let locations = flatmapCache.map((k, i) => [k, i]).filter((a) => a[0] === key);
    locations.forEach((a) => {
      const element = document.activeElement.children[a[1]];
      if (highlight) {
        element.classList.add(keyHighlightClass);
      } else {
        element.classList.remove(keyHighlightClass);
      }
    });
  }

  function keybindingsKeyboardLayout(event) {
    switch (event.key) {
      case "Escape":
        document.activeElement.blur();
        break;
      default:
        event.preventDefault();
        const { meta, ...content } = keyboardData.layers;
        const [rows, cols] = meta.size.split("x").map(Number);
        if (flatmapCache.length === 0) {
          const baseLayer = [];
          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
              baseLayer.push(content[i][j][0]);
            }
          }

          flatmapCache = baseLayer.map((e) => {
            switch (e.toLowerCase()) {
              case "space":
                return " ";
              case "||nf-md-backspace||":
                return "backspace";
              case "<a>":
                return "alt";
              case "<c>":
                return "control";
              case "<s>":
                return "shift";
              case "||nf-md-arrow_down||":
                return "arrowdown";
              case "||nf-md-arrow_up||":
                return "arrowup";
              case "os":
                return "meta";
              default:
                return e.toLowerCase();
            }
          });
        }

        const key = event.key.toLowerCase();
        if (key != " ") {
          keybindingsKeyboardHighlightSingle(event, true);
        } else {
          keybindingsKeyboardHighlightAll(event, true);
        }

        break;
    }
  }

  window.addEventListener("keyup", (event) => {
    if (document.activeElement.classList.contains("layout")) {
      const key = event.key.toLowerCase();
      if (key != " ") {
        keybindingsKeyboardHighlightSingle(event, false);
      } else {
        keybindingsKeyboardHighlightAll(event, false);
      }
    }
  });

  window.addEventListener("keydown", function (event) {
    if (this.document.activeElement.classList.contains("layout")) {
      keybindingsKeyboardLayout(event);
    }
  });
});
