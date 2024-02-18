const vimShortcuts = document.getElementById("vim-shortcuts");
const edgeShortcuts = document.getElementById("edge-shortcuts");
const vimiumShortcuts = document.getElementById("vimium-shortcuts");
const keyboardSection = document.getElementById("keyboard-layout");

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
  if (!pageNum) pageNum = 0;

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i].page;
    const btn = pages[i].btn;
    const highCol = "rgba(var(--mauve))";
    const normCol = "rgba(var(--overlay0))";

    if (i != pageNum) {
      btn.style.background = normCol;
      continue;
    }

    window.scrollTo({ top: 0 });
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
  return 0;
}

// -----------------------------------------------------------------------------------------------------------------
// # SCROLLING ACTIONS
// -----------------------------------------------------------------------------------------------------------------
const stickyClass = "sticky";
const fullscreenClass = "full";
const currentPageHeader = () => pages[currentPageIndex()].page.querySelector(".page-header");

function scrollToCenter(element) {
  let elementRect = element.getBoundingClientRect();
  let absoluteElementTop = elementRect.top + window.scrollY;
  let middle = absoluteElementTop - window.innerHeight / 5;
  let header = currentPageHeader();
  if (header.classList.contains(fullscreenClass)) {
    window.scrollTo({ top: 1 });
    setTimeout(() => scrollToCenter(element), 600);
  } else {
    window.scrollTo({ top: middle });
  }
}

let scrollXPosition = 0;
let scrollYPosition = 0;
let isScrollDown;
window.onscroll = () => {
  const rect = document.body.getBoundingClientRect();
  isScrollHorizontal = rect.x != scrollXPosition;
  scrollXPosition = rect.x;

  if (isScrollHorizontal) return;

  isScrollDown = rect.top > scrollYPosition ? false : true;
  scrollYPosition = rect.top;

  const header = currentPageHeader();
  if (header.getAnimations().length > 0) return;

  const toSticky = isScrollDown && header.classList.contains(fullscreenClass);
  const toFull = !toSticky && window.scrollY === 0 && document.activeElement.id === "";

  if (toSticky) {
    setTimeout(() => {
      header.classList.add(stickyClass);
      header.classList.remove(fullscreenClass);
    }, 0);
    return;
  }

  if (toFull) {
    setTimeout(() => {
      header.classList.add(fullscreenClass);
      header.classList.remove(stickyClass);
    }, 0);
  }
};

// -----------------------------------------------------------------------------------------------------------------
// # KEYBOARD EVENTS
// -----------------------------------------------------------------------------------------------------------------

function shortcutsPageKeyBindings(event) {
  const controlledActivate = preventDefaultAction(event);
  switch (event.key) {
    case "V":
      controlledActivate(function() {
        vimShortcuts.tabIndex = -1;
        vimShortcuts.focus({ preventScroll: true });
        scrollToCenter(vimShortcuts);
      });
      break;
    case "E":
      controlledActivate(function() {
        edgeShortcuts.tabIndex = -1;
        edgeShortcuts.focus({ preventScroll: true });
        scrollToCenter(edgeShortcuts);
      });
      break;
    case "B":
      controlledActivate(function() {
        vimiumShortcuts.tabIndex = -1;
        vimiumShortcuts.focus({ preventScroll: true });
        scrollToCenter(vimiumShortcuts);
      });
      break;
    case "/":
    case "s":
      controlledActivate(function() {
        const input = document.activeElement.querySelector("input");
        if (input) {
          input.focus();
        }
      });
      break;
  }
}

let flatmapCache = [];
const keyHighlightClass = "key-highlight";

function keyboardHighlightSingle(event, highlight) {
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

function keyboardHighlightAll(event, highlight) {
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

function keyboardTesting(event) {
  switch (event.key) {
    case "Escape":
      keyboardMessage.innerText = keyboardMsgs[1];
      keyboardSection.tabIndex = -1;
      keyboardSection.focus({ preventScroll: true });
      scrollToCenter(keyboardSection);
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
        keyboardHighlightSingle(event, true);
      } else {
        keyboardHighlightAll(event, true);
      }

      break;
  }
}

const activeKeyboard = () => document.activeElement.querySelector('.layout[style*="display: grid"]');

function keyboardToolKeyBindings(event) {
  switch (event.key) {
    case "0":
    case "B":
      btnAllocation[0].click();
      break;
    case "1":
    case "L":
      btnAllocation[1].click();
      break;
    case "2":
    case "R":
      btnAllocation[2].click();
      break;
    case "3":
    case "A":
      btnAllocation[3].click();
      break;
    case "4":
    case "M":
      btnAllocation[4].click();
      break;
    case "5":
    case "T":
      btnAllocation[5].click();
      break;
  }
}

function toolsPageKeyBindings(event) {
  const controlledActivate = preventDefaultAction(event);
  switch (event.key) {
    case "K":
      const isSection = document.activeElement != keyboardSection;
      const element = isSection ? keyboardSection : activeKeyboard();
      keyboardMessage.innerText = isSection ? keyboardMsgs[1] : keyboardMsgs[2];
      if (!element) break;
      controlledActivate(function() {
        element.tabIndex = -1;
        element.focus({ preventScroll: true });
        if (isSection) scrollToCenter(element);
      });
      break;
    default:
      if (document.activeElement === keyboardSection) keyboardToolKeyBindings(event);
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

function preventDefaultAction(event) {
  return function(action, ...params) {
    event.preventDefault();
    action(...params);
  };
}

document.addEventListener("keyup", (event) => {
  if (document.activeElement.classList.contains("layout")) {
    const key = event.key.toLowerCase();
    if (key != " ") {
      keyboardHighlightSingle(event, false);
    } else {
      keyboardHighlightAll(event, false);
    }
  }
});

function forceUp() {
  if (window.scrollY === 0) {
    document.activeElement.blur();
    const header = currentPageHeader();
    if (header.getAnimations().length > 0) return;
    header.classList.add(fullscreenClass);
    header.classList.remove(stickyClass);
  }
}

function horizontalMove(goLeft, controlledActivate) {
  document.activeElement.blur();
  const pageIndex = currentPageIndex();
  const pageNum = goLeft ? pageIndex - 1 : pageIndex + 1;
  if (pageNum < 0 || pageNum >= pages.length) {
    window.scrollTo({ top: 0 });
    return;
  }
  controlledActivate(toPage, pageNum);
}

document.addEventListener("keydown", (event) => {
  // Search Box
  if (document.activeElement.id.includes("input")) return;

  // Keyboard Testing
  if (document.activeElement.classList.contains("layout")) {
    keyboardTesting(event);
    return;
  }

  if (event.ctrlKey) return;

  const controlledActivate = preventDefaultAction(event);

  switch (event.key) {
    case "ArrowDown":
    case "j":
      controlledActivate(window.scrollBy, 0, 50);
      break;
    case "ArrowUp":
    case "k":
      controlledActivate(window.scrollBy, 0, -50);
      forceUp();
      break;
    case "PageDown":
    case "d":
      controlledActivate(window.scrollBy, 0, window.innerHeight - 300);
      break;
    case "PageUp":
    case "u":
      controlledActivate(window.scrollBy, 0, -(window.innerHeight - 300));
      forceUp();
      break;
    case "ArrowRight":
    case "l":
      horizontalMove(false, controlledActivate);
      break;
    case "ArrowLeft":
    case "h":
      horizontalMove(true, controlledActivate);
      break;
    case "Escape":
      keyboardMessage.innerText = keyboardMsgs[0];
      controlledActivate(() => document.activeElement.blur());
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

fetch("./assets/edge-shortcuts.json")
  .then((response) => response.json())
  .then((data) => edgeShortcuts.appendChild(createShortcut("Edge", data, 0)));

fetch("./assets/vim-shortcuts.json")
  .then((response) => response.json())
  .then((data) => vimShortcuts.appendChild(createShortcut("Vim", data, 0)));

fetch("./assets/vimium-shortcuts.json")
  .then((response) => response.json())
  .then((data) => vimiumShortcuts.appendChild(createShortcut("Vimium", data, 0)));

// -----------------------------------------------------------------------------------------------------------------
// # TOOLS LOADING: Keyboard Layout
// -----------------------------------------------------------------------------------------------------------------

const btnAllocation = [];
const keyboardMsgs = ["", "[K] Test Keyboard", "[Esc] Exit | Press key (without modifiers) to highlight location"];
const keyboardMessage = document.createElement("span");
function createKeyboardLayout(header, data) {
  const div = document.createElement("div");
  div.id = `${header}-0`;
  div.className = "sub-section";

  const headerContainer = document.createElement("div");
  headerContainer.className = "header-container";
  const h2 = document.createElement("h2");
  h2.innerText = header;
  keyboardMessage.innerText = keyboardMsgs[0];
  headerContainer.appendChild(h2);
  headerContainer.appendChild(keyboardMessage);

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
    keyboardSection.appendChild(createKeyboardLayout("Keyboard Layout", data));
  });

// -----------------------------------------------------------------------------------------------------------------
// # TOOLS LOADING : TODO LIST
// -----------------------------------------------------------------------------------------------------------------

const todoListIdSuffix = "-todo-list";

function loadToDoLists() {
  Object.entries(localStorage).filter(([key, value]) => key.includes(todoListIdSuffix));
}

function createToDoList(uniqueTitle) {
  let check = localStorage.getItem(uniqueTitle);
  if (check) throw Error("This list already exists");
  localStorage.setItem(`${uniqueTitle}${todoListIdSuffix}`, { hello: "world" });
}

// -----------------------------------------------------------------------------------------------------------------
// # STARTUP
// -----------------------------------------------------------------------------------------------------------------
window.scrollTo(0, 0);
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", ({ matches }) => {
  setFavicon();
  setHomeIcon();
});

createToDoList("b");
loadToDoLists();

toPage(0);
