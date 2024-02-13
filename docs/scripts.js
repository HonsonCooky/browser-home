const vimShortcuts = document.getElementById("vim-shortcuts");
const edgeShortcuts = document.getElementById("edge-shortcuts");
const vimiumShortcuts = document.getElementById("vimium-shortcuts");
const keyboardLayout = document.getElementById("keyboard-layout");

// -----------------------------------------------------------------------------------------------------------------
// # FAVICON COLOR SCHEME SWITCHER
// -----------------------------------------------------------------------------------------------------------------
const setFavicon = () => {
  const favicon = document.querySelector('link[rel="icon"]');
  favicon.href = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "./assets/favicon_dark.png"
    : "./assets/favicon_light.png";
};

// -----------------------------------------------------------------------------------------------------------------
// # PAGE INDICATOR BUTTONS
// -----------------------------------------------------------------------------------------------------------------
const pages = [
  {
    page: document.getElementById("page1"),
    btn: document.getElementById("goto-page1"),
  },
  {
    page: document.getElementById("page2"),
    btn: document.getElementById("goto-page2"),
  },
];

function toPage(pageNum) {
  if (document.activeElement.tagName.toLowerCase() === "input") return;

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i].page;
    const btn = pages[i].btn;
    const highCol = "rgba(var(--mauve))";
    const normCol = "rgba(var(--overlay0))";

    if (pageNum === undefined) {
      const pageX = Math.floor(page.getBoundingClientRect().x);
      if (pageX === 0) {
        btn.style.background = highCol;
        page.scrollIntoView();
      } else {
        btn.style.background = normCol;
      }
      continue;
    }

    if (i != pageNum) {
      btn.style.background = normCol;
      continue;
    }

    page.scrollIntoView();
    btn.style.background = highCol;
  }
}

function currentPageIndex() {
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].btn.style.background.includes("mauve")) {
      return i;
    }
  }
}

// -----------------------------------------------------------------------------------------------------------------
// # KEYBOARD EVENTS
// -----------------------------------------------------------------------------------------------------------------

function scrollToCenter(element) {
  let elementRect = element.getBoundingClientRect();
  let absoluteElementTop = elementRect.top + window.scrollY;
  let middle = absoluteElementTop - window.innerHeight / 6;
  window.scroll({ top: middle });
}

function scrollWindowBy(scrollBy) {
  window.scrollBy(0, scrollBy);
}

function shortcutsPageKeyBindings(event) {
  const keybindActivate = generateKeybindActivation(event);
  switch (event.key) {
    case "V":
      keybindActivate(function() {
        vimShortcuts.tabIndex = -1;
        vimShortcuts.focus({ preventScroll: true });
        scrollToCenter(vimShortcuts);
      });
      break;
    case "E":
      keybindActivate(function() {
        edgeShortcuts.tabIndex = -1;
        edgeShortcuts.focus({ preventScroll: true });
        scrollToCenter(edgeShortcuts);
      });
      break;
    case "B":
      keybindActivate(function() {
        vimiumShortcuts.tabIndex = -1;
        vimiumShortcuts.focus({ preventScroll: true });
        scrollToCenter(vimiumShortcuts);
      });
      break;
    case "/":
    case "s":
      keybindActivate(function() {
        const input = document.activeElement.querySelector("input");
        if (input) {
          input.focus();
        }
      });
      break;
  }
}

let flatmapCache = [];

function keyboardTesting(event) {
  const keybindActivate = generateKeybindActivation(event);
  switch (event.key) {
    case "Escape":
      keybindActivate(() => document.activeElement.blur());
      break;
    default:
      console.log(event.key);
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
      let location = flatmapCache.indexOf(event.key.toLowerCase());
      if (event.location > 1) {
        location = flatmapCache.indexOf(event.key.toLowerCase(), location + 1);
      }
      if (location === -1) break;
      document.activeElement.children[location].classList.add("key-highlight");
      break;
  }
}

const activeKeyboard = () => document.activeElement.querySelector('.layout[style*="display: grid"]');

function toolsPageKeyBindings(event) {
  const keybindActivate = generateKeybindActivation(event);
  switch (event.key) {
    case "K":
      const isSection = document.activeElement != keyboardLayout;
      const element = isSection ? keyboardLayout : activeKeyboard();
      if (!element) break;
      keybindActivate(function() {
        element.tabIndex = -1;
        element.focus({ preventScroll: true });
        if (isSection) scrollToCenter(element);
      });
      break;
    case "B":
      if (document.activeElement === keyboardLayout) btnAllocation[0].click();
      break;
    case "L":
      if (document.activeElement === keyboardLayout) btnAllocation[1].click();
      break;
    case "R":
      if (document.activeElement === keyboardLayout) btnAllocation[2].click();
      break;
    case "A":
      if (document.activeElement === keyboardLayout) btnAllocation[3].click();
      break;
    case "M":
      if (document.activeElement === keyboardLayout) btnAllocation[4].click();
      break;
    case "T":
      if (document.activeElement === keyboardLayout) btnAllocation[5].click();
      break;
  }
}

function pageBasedEvents(event) {
  switch (currentPageIndex()) {
    case 0:
      shortcutsPageKeyBindings(event);
      break;
    case 1:
      toolsPageKeyBindings(event);
      break;
  }
}

function generateKeybindActivation(event) {
  return function(action, ...params) {
    event.preventDefault();
    action(...params);
  };
}

document.addEventListener("keyup", (event) => {
  if (document.activeElement.classList.contains("layout")) {
    const children = document.activeElement.children;
    if (flatmapCache.length === 0) return;
    let location = flatmapCache.indexOf(event.key.toLowerCase());
    if (event.location > 1) {
      location = flatmapCache.indexOf(event.key.toLowerCase(), location + 1);
    }
    if (location === -1) return;
    children[location].classList.remove("key-highlight");
  }
});

document.addEventListener("keydown", (event) => {
  if (document.activeElement.id.includes("input")) return;
  if (document.activeElement.classList.contains("layout")) {
    keyboardTesting(event);
    return;
  }

  const keybindActivate = generateKeybindActivation(event);

  switch (event.key) {
    case "j":
      keybindActivate(scrollWindowBy, 50);
      break;
    case "k":
      keybindActivate(scrollWindowBy, -50);
      break;
    case "d":
      keybindActivate(scrollWindowBy, window.innerHeight - 300);
      break;
    case "u":
      keybindActivate(scrollWindowBy, -(window.innerHeight - 300));
      break;
    case "ArrowRight":
    case "l":
      document.activeElement.blur();
      const pageNumRight = Math.min(pages.length - 1, currentPageIndex() + 1);
      keybindActivate(toPage, pageNumRight);
      break;
    case "ArrowLeft":
    case "h":
      document.activeElement.blur();
      const pageNumLeft = Math.max(0, currentPageIndex() - 1);
      keybindActivate(toPage, pageNumLeft);
      break;
    case "Escape":
      keybindActivate(() => document.activeElement.blur());
      break;
    default:
      pageBasedEvents(event);
      break;
  }
});

// -----------------------------------------------------------------------------------------------------------------
// # SEARCH BOX FUNCTIONALITY
// -----------------------------------------------------------------------------------------------------------------

function createSearchBox(searchElement) {
  let currentIndex = -1;
  let matches = [];
  let prevQuery = "";
  const mark = "marked";
  const highlight = "marked-highlight";
  const error = "error";

  function scrollIntoViewIfNeeded(element) {
    element.classList.add(highlight);
    element.scrollIntoView({ block: "center", inline: "nearest" });
  }

  function isSubsequence(query, element) {
    const children = [...element.childNodes].filter((child) => child.nodeType === Node.TEXT_NODE);
    if (children.length === 0) return false;
    const child = children[0].nodeValue;
    let lastIndex = 0;
    const queryChars = query.toLowerCase().split("");
    const childChars = child.toLowerCase().split("");
    for (let i = 0; i < queryChars.length; i++) {
      const nextIndex = childChars.indexOf(queryChars[i], lastIndex);
      const diff = nextIndex - lastIndex;
      if (nextIndex === -1 || (lastIndex != 0 && diff > 2)) return false;
      lastIndex = nextIndex;
    }
    return true;
  }

  function searchChildren(element, query, depth) {
    if (depth === 0 && query != prevQuery) {
      matches = [];
      currentIndex = -1;
      prevQuery = query;
    }

    if (element.classList) {
      element.classList.remove(mark);
      element.classList.remove(highlight);
      element.classList.remove(error);
    }

    if (query.length > 0 && isSubsequence(query, element)) {
      element.classList.add(mark);
      matches.push(element);
    }

    for (let i = 0; i < element.childNodes.length; i++) {
      searchChildren(element.childNodes[i], query, depth + 1);
    }
  }

  function findNext(query) {
    if (matches.length > 0) {
      if (currentIndex != -1) matches[currentIndex].classList.remove(highlight);
      currentIndex = (currentIndex + 1) % matches.length;
      scrollIntoViewIfNeeded(matches[currentIndex]);
    } else if (query.length > 0) {
      searchBox.classList.add(error);
    }
  }

  function findPrevious() {
    if (matches.length > 0) {
      if (currentIndex != -1) matches[currentIndex].classList.remove(highlight);
      currentIndex = (currentIndex - 1 + matches.length) % matches.length;
      scrollIntoViewIfNeeded(matches[currentIndex]);
    }
  }

  const searchBox = document.createElement("input");
  searchBox.id = searchElement.id + "-input";
  searchBox.type = "text";
  searchBox.placeholder = `Search`;

  searchBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      if (this.value != prevQuery) searchChildren(searchElement, this.value, 0);
      if (event.shiftKey) {
        findPrevious();
      } else {
        findNext(this.value);
      }
    } else if (event.key === "Escape") {
      searchBox.blur();
    }
  });
  return searchBox;
}

// -----------------------------------------------------------------------------------------------------------------
// # SHORTCUT LOADING
// -----------------------------------------------------------------------------------------------------------------

function createSubSection(key, level) {
  const div = document.createElement("div");
  div.id = `${key}-${level}`;
  div.className = "sub-section";

  const header = document.createElement(`h${level + 2}`);
  header.innerText = key;
  if (level != 0) {
    div.appendChild(header);
  } else {
    const searchBox = createSearchBox(div);
    const headerDiv = document.createElement("div");
    headerDiv.className = "header-container";
    headerDiv.appendChild(header);
    headerDiv.appendChild(searchBox);
    div.appendChild(headerDiv);
  }

  return div;
}

function createListElement(key, value, level) {
  const div = document.createElement("div");
  div.id = `${key}-${level}`;
  div.className = "list-element";

  const keyTxt = document.createElement("span");
  keyTxt.innerText = key;
  const valueTxt = document.createElement("span");
  valueTxt.innerText = value;

  div.appendChild(keyTxt);
  div.appendChild(valueTxt);

  return div;
}

function createShortcut(key, value, level) {
  const section = createSubSection(key, level);

  Object.entries(value)
    .map(([key, value]) => {
      const nextLevel = level + 1;
      if (value != null && typeof value === "object") return createShortcut(key, value, nextLevel);
      return createListElement(key, value, nextLevel);
    })
    .forEach((child) => section.appendChild(child));
  return section;
}

fetch("./assets/vim-shortcuts.json")
  .then((response) => response.json())
  .then((data) => vimShortcuts.appendChild(createShortcut("Vim", data, 0)));

fetch("./assets/edge-shortcuts.json")
  .then((response) => response.json())
  .then((data) => edgeShortcuts.appendChild(createShortcut("Edge", data, 0)));

fetch("./assets/vimium-shortcuts.json")
  .then((response) => response.json())
  .then((data) => vimiumShortcuts.appendChild(createShortcut("Vimium", data, 0)));

// -----------------------------------------------------------------------------------------------------------------
// # TOOLS LOADING
// -----------------------------------------------------------------------------------------------------------------

const btnAllocation = [];
function createKeyboardLayout(header, data) {
  const div = document.createElement("div");
  div.id = `${header}-0`;
  div.className = "sub-section";

  const headerContainer = document.createElement("div");
  headerContainer.className = "header-container";
  const h2 = document.createElement("h2");
  h2.innerText = header;
  headerContainer.appendChild(h2);

  const { layers, titles } = data;
  const { meta, ...content } = layers;
  const [rows, cols] = meta.size.split("x").map(Number);

  // Title Buttons
  const btnRow = document.createElement("div");
  btnRow.id = `${header}-btn-row`;
  btnRow.className = "btn-row";
  const divAllocation = [];
  for (let t = 0; t < titles.length; t++) {
    const btnDefault = "rgba(var(--text))";
    const btnHighlight = "rgba(var(--green))";

    let title = titles[t];
    title = `[${title.slice(0, 1)}]${title.slice(1)}`;
    const btn = document.createElement("button");
    btn.id = `${title}-btn`;
    btn.innerText = title;
    btn.style.color = t === 0 ? btnHighlight : btnDefault;
    btnRow.appendChild(btn);

    const layout = document.createElement("div");
    layout.id = `${title}-layout`;
    layout.className = "layout";
    layout.style.display = t === 0 ? "grid" : "none";
    layout.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    layout.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    btn.onclick = () => {
      btnAllocation.forEach((b) => (b.style.color = btnDefault));
      divAllocation.forEach((d) => (d.style.display = "none"));
      btn.style.color = btnHighlight;
      layout.style.display = "grid";
    };

    btnAllocation.push(btn);
    divAllocation.push(layout);
  }

  const layouts = document.createElement("div");
  layouts.id = "keyboard-layouts";
  layouts.className = "sub-section";
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      for (let t = 0; t < titles.length; t++) {
        const layoutDiv = divAllocation[t];
        const keyboardBtn = document.createElement("div");
        let value = content[i][j][t];
        let color = "rgba(var(--text))";
        if (value.length === 0) {
          value = content[i][j][0];
          color = "rgba(var(--peach), 0.5)";
        }
        keyboardBtn.id = `${titles[t]}-${value}`;
        keyboardBtn.className = "keyboard-btn";

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

        keyboardBtn.innerHTML = value;
        keyboardBtn.style.color = color;
        layoutDiv.appendChild(keyboardBtn);
      }
    }
  }

  div.appendChild(headerContainer);
  div.appendChild(btnRow);
  divAllocation.forEach((d) => div.appendChild(d));
  return div;
}

let keyboardData = {};
fetch("./assets/keyboard-layout.json")
  .then((response) => response.json())
  .then((data) => {
    keyboardData = data;
    keyboardLayout.appendChild(createKeyboardLayout("Keyboard Layout", data));
  });

// -----------------------------------------------------------------------------------------------------------------
// # STARTUP
// -----------------------------------------------------------------------------------------------------------------
setFavicon();
toPage();
