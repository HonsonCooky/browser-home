const vimShortcuts = document.getElementById("vim-shortcuts");
const edgeShortcuts = document.getElementById("edge-shortcuts");
const vimiumShortcuts = document.getElementById("vimium-shortcuts");
const keyboardSection = document.getElementById("keyboard-layout");
const todoSection = document.getElementById("to-do-list");
const canvasSection = document.getElementById("canvas");

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

function toPage(pageNum, instant) {
  if (document.activeElement.tagName.toLowerCase() === "input") return;
  if (pageNum < 0 || pageNum >= pages.length) return;
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

    const header = page.querySelector(".page-header");
    header.classList.remove(stickyClass);
    header.classList.add(fullscreenClass);
    header.classList.add(noTransitionClass);
    window.scrollTo({ top: 0, behavior: "instant" });
    page.scrollIntoView({ behavior: instant ? "instant" : "smooth" });
    setTimeout(() => header.classList.remove(noTransitionClass), 100);
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
const noTransitionClass = "no-transition";
const currentPageHeader = () => pages[currentPageIndex()].page.querySelector(".page-header");

function scrollToCenter(element) {
  let elementRect = element.getBoundingClientRect();
  let absoluteElementTop = elementRect.top + window.scrollY;
  let middle = absoluteElementTop - 100;
  let header = currentPageHeader();
  if (header.classList.contains(fullscreenClass)) {
    header.classList.add(stickyClass);
    header.classList.remove(fullscreenClass);
    middle -= window.innerHeight - 100;
  }
  window.scrollTo({ top: middle });
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
// # KEYBOARD EVENTS: SHORTCUTS
// -----------------------------------------------------------------------------------------------------------------

function keybindingsShortcutsPage(event) {
  const controlledActivate = preventDefaultAction(event);
  switch (event.key) {
    case "V":
      controlledActivate(function () {
        vimShortcuts.tabIndex = -1;
        vimShortcuts.focus({ preventScroll: true });
        scrollToCenter(vimShortcuts);
      });
      break;
    case "E":
      controlledActivate(function () {
        edgeShortcuts.tabIndex = -1;
        edgeShortcuts.focus({ preventScroll: true });
        scrollToCenter(edgeShortcuts);
      });
      break;
    case "B":
      controlledActivate(function () {
        vimiumShortcuts.tabIndex = -1;
        vimiumShortcuts.focus({ preventScroll: true });
        scrollToCenter(vimiumShortcuts);
      });
      break;
    case "/":
    case "s":
      controlledActivate(function () {
        if (document.activeElement.id === "") return;
        const input = document.activeElement.querySelector("input");
        if (input) {
          input.focus();
        }
      });
      break;
  }
}

// -----------------------------------------------------------------------------------------------------------------
// # KEYBOARD EVENTS: TOOLS - KEYBOARD LAYOUT
// -----------------------------------------------------------------------------------------------------------------

let flatmapCache = [];
const keyHighlightClass = "key-highlight";

function preventDefaultAction(event) {
  return function (action, ...params) {
    event.preventDefault();
    action(...params);
  };
}

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
      keyboardMsg.innerText = keyboardMsgs[1];
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
        keybindingsKeyboardHighlightSingle(event, true);
      } else {
        keybindingsKeyboardHighlightAll(event, true);
      }

      break;
  }
}

document.addEventListener("keyup", (event) => {
  if (document.activeElement.classList.contains("layout")) {
    const key = event.key.toLowerCase();
    if (key != " ") {
      keybindingsKeyboardHighlightSingle(event, false);
    } else {
      keybindingsKeyboardHighlightAll(event, false);
    }
  }
});

function currentKeyboardLayout() {
  return document.activeElement.querySelector('.layout[style*="display: grid"]');
}

function keybindingsKeyboard(event) {
  switch (event.key) {
    case "K":
      const activeKeyb = currentKeyboardLayout();
      activeKeyb.tabIndex = -1;
      activeKeyb.focus({ preventScroll: true });
      keyboardMsg.innerText = keyboardMsgs[2];
      break;
    case "0":
    case "B":
      document.getElementById(`keyboard-layout-btn-0`).click();
      break;
    case "1":
    case "L":
      document.getElementById(`keyboard-layout-btn-1`).click();
      break;
    case "2":
    case "R":
      document.getElementById(`keyboard-layout-btn-2`).click();
      break;
    case "3":
    case "A":
      document.getElementById(`keyboard-layout-btn-3`).click();
      break;
    case "4":
    case "M":
      document.getElementById(`keyboard-layout-btn-4`).click();
      break;
    case "5":
    case "T":
      document.getElementById(`keyboard-layout-btn-5`).click();
      break;
  }
}

// -----------------------------------------------------------------------------------------------------------------
// # KEYBOARD EVENTS: TOOLS - TODO LIST
// -----------------------------------------------------------------------------------------------------------------

const listItemHighlightClass = "list-highlight";

function currentToDoList() {
  return document.activeElement.querySelector('.list[style*="display: flex"]');
}

function removeAllHighlights(listElement) {
  const items = Array.from(listElement.querySelectorAll(".list-item"));
  items.forEach((e) => e.classList.remove(listItemHighlightClass));
}

function selectAnotherItem(isDown) {
  let highlighted = -1;
  const items = Array.from(document.activeElement.querySelectorAll(".list-item")).map((e, i) => {
    if (e.classList.contains(listItemHighlightClass)) {
      highlighted = i;
    }
    e.classList.remove(listItemHighlightClass);
    return [i, e];
  });

  if (items.length === 0) return;

  let index = 0;
  if (highlighted != -1) index = isDown ? (highlighted + 1) % items.length : highlighted - 1;
  if (index < 0) index += items.length;
  const element = items[index][1];
  element.classList.add(listItemHighlightClass);
  element.scrollIntoView({ block: "center", inline: "nearest" });
}

function keybindingsToDoList(event) {
  const controlledActivate = preventDefaultAction(event);
  switch (event.key) {
    case "Escape":
      controlledActivate(function () {
        todoMsg.innerText = todoMsgs[1];
        todoSection.tabIndex = -1;
        todoSection.focus({ preventScroll: true });
        scrollToCenter(todoSection);
      });
      break;
    case "ArrowDown":
    case "j":
      controlledActivate(function () {
        if (event.altKey) {
          moveHighlightedToDoListItem(true);
        } else {
          selectAnotherItem(true);
        }
      });
      break;
    case "ArrowUp":
    case "k":
      controlledActivate(function () {
        if (event.altKey) {
          moveHighlightedToDoListItem(false);
        } else {
          selectAnotherItem(false);
        }
      });
      break;
    case "d":
    case "D":
      controlledActivate(function () {
        toggleDoneHighlightedToDoListItem();
      });
      break;
    case "X":
      controlledActivate(function () {
        deleteHighlightedToDoItem();
      });
      break;
    case "/":
    case "s":
      controlledActivate(function () {
        removeAllHighlights(document.activeElement);
        const input = document.activeElement.querySelector("input");
        input.focus();
        todoMsg.innerText = todoMsgs[3];
      });
      break;
  }
}

function keybindingsToDo(event) {
  const controlledActivate = preventDefaultAction(event);
  switch (event.key) {
    case "T":
      controlledActivate(function () {
        const activeList = currentToDoList();
        activeList.tabIndex = -1;
        activeList.focus({ preventScroll: true });
        todoMsg.innerText = todoMsgs[2];
      });
      break;
    case "X":
      controlledActivate(function () {
        const activeList = currentToDoList();
        deleteToDoList(activeList.id.replace("-list-list", "-list"));
      });
      break;
    case "/":
    case "s":
      controlledActivate(function () {
        removeAllHighlights(document.activeElement);
        const currentList = currentToDoList();
        const input = currentList.querySelector("input");
        input.focus();
        todoMsg.innerText = todoMsgs[3];
      });
      break;
    case "+":
      controlledActivate(function () {
        document.getElementById("new-list").click();
        document.getElementById("new-list").scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
      });
      break;
    default:
      controlledActivate(function () {
        const element = document.activeElement.querySelector(`[id^="[${event.key}]"]`);
        if (!element) return;
        element.click();
        element.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
      });
      break;
  }
}

// -----------------------------------------------------------------------------------------------------------------
// # KEYBOARD EVENTS: TOOLS
// -----------------------------------------------------------------------------------------------------------------

function keybindingsToolsPage(event) {
  const controlledActivate = preventDefaultAction(event);

  if (document.activeElement === keyboardSection) {
    keybindingsKeyboard(event);
    return;
  }

  if (document.activeElement === todoSection) {
    keybindingsToDo(event);
    return;
  }

  switch (event.key) {
    case "K":
      controlledActivate(function () {
        keyboardMsg.innerText = keyboardMsgs[1];
        keyboardSection.tabIndex = -1;
        keyboardSection.focus({ preventScroll: true });
        scrollToCenter(keyboardSection);
      });
      break;
    case "T":
      controlledActivate(function () {
        todoMsg.innerText = todoMsgs[1];
        todoSection.tabIndex = -1;
        todoSection.focus({ preventScroll: true });
        scrollToCenter(todoSection);
      });
      break;
    case "C":
      controlledActivate(function () {
        canvasSection.tabIndex = -1;
        canvasSection.focus({ preventScroll: true });
        scrollToCenter(canvasSection);
      });
      break;
    default:
      if (document.activeElement === keyboardSection) keybindingsKeyboard(event);
  }
}

// -----------------------------------------------------------------------------------------------------------------
// # KEYBOARD EVENTS: GLOBAL
// -----------------------------------------------------------------------------------------------------------------

function moveVert() {
  if (window.scrollY === 0) {
    document.activeElement.blur();
    const header = currentPageHeader();
    if (header.getAnimations().length > 0) return;
    header.classList.add(fullscreenClass);
    header.classList.remove(stickyClass);
  }
}

function moveHori(goLeft, controlledActivate) {
  document.activeElement.blur();
  const curPageIndex = currentPageIndex();
  const nextPageNum = goLeft ? curPageIndex - 1 : curPageIndex + 1;
  controlledActivate(toPage, nextPageNum);
}

function pageBasedKey(event) {
  switch (currentPageIndex()) {
    case 0:
      keybindingsShortcutsPage(event);
      break;
    case 1:
      keybindingsToolsPage(event);
      break;
  }
}

document.addEventListener("keydown", (event) => {
  // Input Box
  if (document.activeElement.tagName.toLowerCase() === "input") {
    if (event.key === "Escape") {
      const parent = document.activeElement.closest("section, .layout, .list");
      if (parent) {
        parent.tabIndex = -1;
        parent.focus({ preventScroll: true });

        if (parent.id.includes("list")) {
          todoMsg.innerText = todoMsgs[2];
        }
      }
    }
    return;
  }

  // Keyboard Testing
  if (document.activeElement.classList.contains("layout")) {
    keybindingsKeyboardLayout(event);
    return;
  }

  // To Do List Editing
  if (document.activeElement.classList.contains("list")) {
    keybindingsToDoList(event);
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
      moveVert();
      break;
    case "PageDown":
    case "d":
      controlledActivate(window.scrollBy, 0, window.innerHeight - 300);
      break;
    case "PageUp":
    case "u":
      controlledActivate(window.scrollBy, 0, -(window.innerHeight - 300));
      moveVert();
      break;
    case "ArrowRight":
    case "l":
      moveHori(false, controlledActivate);
      break;
    case "ArrowLeft":
    case "h":
      moveHori(true, controlledActivate);
      break;
    case "Escape":
      keyboardMsg.innerText = keyboardMsgs[0];
      todoMsgs.innerText = todoMsgs[0];
      controlledActivate(() => document.activeElement.blur());
      break;
    default:
      pageBasedKey(event);
      break;
  }
});

// -----------------------------------------------------------------------------------------------------------------
// # SEARCH BOX FUNCTIONALITY
// -----------------------------------------------------------------------------------------------------------------

function implementSearchBox(searchBox, searchElement) {
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

  searchBox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      if (this.value != prevQuery) searchChildren(searchElement, this.value, 0);
      if (event.shiftKey) {
        findPrevious();
      } else {
        findNext(this.value);
      }
    }
  });
  return searchBox;
}

// -----------------------------------------------------------------------------------------------------------------
// # SHORTCUT LOADING
// -----------------------------------------------------------------------------------------------------------------

function loadSection(key, level) {
  const div = document.getElementById(`${key}-${level}`);
  const headerDiv = div.querySelector(".header-container");
  const searchBox = headerDiv.querySelector("input");
  implementSearchBox(searchBox, div);
  return div;
}

function createSubSection(key, level) {
  const div = document.createElement("div");
  div.id = `${key}-${level}`;
  div.className = "sub-section";

  const header = document.createElement(`h${level + 2}`);
  header.innerText = key;
  div.appendChild(header);

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
  const section = level === 0 ? loadSection(key, level) : createSubSection(key, level);

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
// # TOOLS LOADING: KEYBOARD LAYOUT
// -----------------------------------------------------------------------------------------------------------------

const keyboardMsgs = ["", "[K] Test Keyboard", "[Esc] Exit | Press key (without modifiers) to highlight location"];
const keyboardMsg = document.getElementById("keyboard-msg");

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

function createKeyboardLayout(header, data) {
  const div = document.getElementById(`${header}-0`);
  keyboardMsg.innerText = keyboardMsgs[0];

  const { layers, titles } = data;
  const { meta, ...content } = layers;
  const [rows, cols] = meta.size.split("x").map(Number);

  // Title Buttons
  for (let t = 0; t < titles.length; t++) {
    const btnDefault = "rgba(var(--text))";
    const btnHighlight = "rgba(var(--teal))";

    let title = titles[t];
    title = `[${title.slice(0, 1)}]${title.slice(1)}`;
    const btn = document.getElementById(`keyboard-layout-btn-${t}`);
    btn.style.color = t === 0 ? btnHighlight : btnDefault;

    const layout = document.createElement("div");
    layout.id = `keyboard-layout-${t}`;
    layout.className = "layout";
    layout.style.display = t === 0 ? "grid" : "none";
    layout.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    layout.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    loadKeyboardKeys(layout, t, rows, cols, titles, content);

    div.appendChild(layout);

    btn.onclick = () => {
      document.querySelectorAll('[id^="keyboard-layout-btn-"]').forEach((b) => {
        b.style.color = btnDefault;
      });
      document.querySelectorAll(".layout").forEach((d) => {
        d.style.display = "none";
      });
      btn.style.color = btnHighlight;
      layout.style.display = "grid";
    };
  }

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
const todoListSection = "To Do";
const doneListSection = "Done";
const todoMsgs = [
  "",
  "[T] Interact With List | [A-Z] Select List | [D] Delete List",
  "[Esc] Exit | [j,k,UP,DOWN] Select Item | <A-j,k,UP,DOWN> Move Item\n" +
    " [D] Toggle Done | [X] Delete | [s,/] Enter Input Field",
  "[Esc] Exit | [Enter] Add Item",
];
const todoMsg = document.getElementById("todo-msg");

function generateLI(listId, type, index, innerText) {
  const li = document.createElement("div");
  li.id = `${listId}-${type}-${index}`;
  li.className = "list-item";

  const indexor = document.createElement("span");
  indexor.innerText = "-";
  const text = document.createElement("span");
  text.innerText = innerText;

  if (type === doneListSection) {
    text.style.textDecoration = "line-through";
  }

  li.onclick = () => {
    if (type === todoListSection) {
      moveHighlightedToDoListItem(listId, index);
    } else if (type === doneListSection) {
    }
  };

  li.appendChild(indexor);
  li.appendChild(text);
  return li;
}

function loadLIs(listId, cacheItem) {
  const todos = [];
  const dones = [];

  for (let i = 0; i < cacheItem.todo.length; i++) {
    const li = generateLI(listId, todoListSection, i, cacheItem.todo[i]);
    todos.push(li);
  }
  for (let i = 0; i < cacheItem.done.length; i++) {
    const li = generateLI(listId, doneListSection, i, cacheItem.done[i]);
    dones.push(li);
  }

  return [todos, dones];
}

function getAllStorageLists() {
  return Object.entries(localStorage)
    .filter(([key, _]) => key.includes(todoListIdSuffix))
    .map(([key, value]) => [key, JSON.parse(value)]);
}

function reloadList(title) {
  const focusInput = document.activeElement.id.includes(`${title}-input`);
  const value = localStorage.getItem(title);

  // Reset the element
  const listElement = document.getElementById(`${title}-list`);
  listElement.innerHTML = "";
  listElement.innerText = "";

  const [todos, dones] = loadLIs(listElement.id, JSON.parse(value));
  const [todoDiv, doneDiv] = initToDoSubSections(title, todos, dones);
  if (todoDiv) listElement.appendChild(todoDiv);
  if (doneDiv) listElement.appendChild(doneDiv);
  const newEntryInput = createNewEntryInput(title);
  listElement.appendChild(newEntryInput);

  if (focusInput) {
    newEntryInput.focus();
  } else {
    listElement.tabIndex = -1;
    listElement.focus({ preventScroll: true });
    todoMsg.innerText = todoMsgs[2];
  }
}

function createNewEntryInput(title) {
  const newEntryInput = document.createElement("input");
  newEntryInput.id = `${title}-input`;
  newEntryInput.type = "text";
  newEntryInput.placeholder = "Add";
  newEntryInput.className = "new-item";
  newEntryInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const parent = document.activeElement.closest("section, .layout, .list");
      addToDoListItem(parent.id.replace("-list-list", "-list"), newEntryInput.value);
    }
  });
  return newEntryInput;
}

function initToDoSubSections(title, todos, dones) {
  let todoDiv, doneDiv;

  // TODO Section
  if (todos.length > 0) {
    todoDiv = document.createElement("div");
    todoDiv.id = `${title}-${todoListSection}`;
    todoDiv.className = "sub-section";
    const todoTitle = document.createElement("h5");
    todoTitle.id = `${title}-todo-title`;
    todoTitle.innerText = `${todoListSection}:`;
    todoTitle.style.color = "rgba(var(--green))";
    todoDiv.appendChild(todoTitle);
    todos.forEach((e) => todoDiv.appendChild(e));
  }

  // DONE Section
  if (dones.length > 0) {
    doneDiv = document.createElement("div");
    doneDiv.id = `${title}-${doneListSection}`;
    doneDiv.className = "sub-section";
    const doneTitle = document.createElement("h5");
    doneTitle.id = `${title}-done-title`;
    doneTitle.innerText = `${doneListSection}:`;
    doneTitle.style.color = "rgba(var(--mauve))";
    doneDiv.appendChild(doneTitle);
    dones.forEach((e) => doneDiv.appendChild(e));
  }

  return [todoDiv, doneDiv];
}

function initListFromEntry(index, title, content) {
  const btnDefault = "rgba(var(--text))";
  const btnHighlight = "rgba(var(--teal))";

  // List button (title)
  let prettyTitle = `[${String.fromCharCode(index + 65)}] ${title.replace("-todo-list", "")}`;
  const btn = document.createElement("button");
  btn.id = `${prettyTitle}-btn`;
  btn.title = `${prettyTitle} button`;
  btn.innerText = prettyTitle;
  btn.type = "button";
  btn.style.color = index === 0 ? btnHighlight : btnDefault;

  // List contents
  const list = document.createElement("div");
  list.id = `${title}-list`;
  list.className = "list";
  list.style.display = index === 0 ? "flex" : "none";

  const [todos, dones] = loadLIs(list.id, content);
  const [todoDiv, doneDiv] = initToDoSubSections(title, todos, dones);
  if (todoDiv) list.appendChild(todoDiv);
  if (doneDiv) list.appendChild(doneDiv);

  const newEntryInput = createNewEntryInput(title);
  list.appendChild(newEntryInput);

  btn.onclick = () => {
    document.getElementById("new-list").style.color = btnDefault;
    todoLists.forEach((b) => (b.style.color = btnDefault));
    listViews.forEach((d) => (d.style.display = "none"));
    btn.style.color = btnHighlight;
    list.style.display = "flex";
  };

  return [btn, list];
}

function initNewListButton() {
  const btnDefault = "rgba(var(--text))";
  const btnHighlight = "rgba(var(--teal))";

  // NEW LIST BUTTON
  const btn = document.getElementById("new-list");

  const list = document.getElementById("new-list-view");
  list.style.display = "none";

  const newListInput = document.getElementById("new-list-title");
  newListInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      createToDoList(newListInput.value);

      // Highlight new list
      const newListBtn = document.querySelector(`[id*="${newListInput.value}-btn"]`);
      const listView = document.getElementById(`${newListInput.value}${todoListIdSuffix}-list`);
      if (newListBtn && listView) {
        newListBtn.click();
        listView.tabIndex = -1;
        listView.focus({ preventScroll: true });
      }
      newListInput.value = "";
    }
  });

  btn.onclick = () => {
    todoLists.forEach((b) => (b.style.color = btnDefault));
    listViews.forEach((d) => (d.style.display = "none"));
    btn.style.color = btnHighlight;
    list.style.display = "flex";
  };

  return list;
}

let todoLists,
  listViews = [];

function initToDoLists() {
  todoLists = [];
  listViews = [];

  const header = "To Dos";
  const div = document.getElementById(`${header}-0`);
  Array.from(div.children)
    .filter(
      (item) =>
        !(
          item.classList.contains("header-container") ||
          item.classList.contains("btn-row") ||
          item.id === "new-list-view"
        ),
    )
    .forEach((child) => div.removeChild(child));

  const btnRow = document.getElementById(`${header}-btn-row`);
  Array.from(btnRow.children)
    .filter((item) => item.id != "new-list")
    .forEach((child) => {
      btnRow.removeChild(child);
    });

  const cacheLists = getAllStorageLists();
  for (let e = 0; e < cacheLists.length; e++) {
    const [title, content] = cacheLists[e];
    const [btn, list] = initListFromEntry(e, title, content);
    todoLists.push(btn);
    listViews.push(list);
  }

  const newListView = initNewListButton();
  listViews.push(newListView);

  todoLists.forEach((btn) => btnRow.insertBefore(btn, document.getElementById("new-list")));
  listViews.forEach((d) => div.appendChild(d));
  todoSection.appendChild(div);
}

function createToDoList(uniqueTitle) {
  if (uniqueTitle.length === 0) return;
  const title = `${uniqueTitle}${todoListIdSuffix}`;
  let check = localStorage.getItem(title);
  if (check) return;
  localStorage.setItem(
    title,
    JSON.stringify({
      todo: [],
      done: [],
    }),
  );
  initToDoLists();
}

function deleteToDoList(uniqueTitle) {
  localStorage.removeItem(uniqueTitle);
  initToDoLists();
}

function addToDoListItem(listId, text) {
  let cacheItem = localStorage.getItem(listId);
  if (!cacheItem) return;
  cacheItem = JSON.parse(cacheItem);
  localStorage.setItem(
    listId,
    JSON.stringify({
      todo: [...cacheItem.todo, text],
      done: [...cacheItem.done],
    }),
  );
  reloadList(listId);
}

function getHighlightedElementInfo() {
  const highlighted = document.activeElement.querySelector(".list-item.list-highlight");
  if (!highlighted) throw Error("No Highlighted List Item");

  const info = highlighted.id.split("-");
  const listId = `${info[0]}-${info[1]}-${info[2]}`;
  const section = info[info.length - 2];
  const index = parseInt(info[info.length - 1]);

  let cacheItem = localStorage.getItem(listId);
  if (!cacheItem) throw Error(`Can't find cache element with id ${listId}`);
  cacheItem = JSON.parse(cacheItem);

  const concernedArr = section === todoListSection ? cacheItem.todo : cacheItem.done;
  const otherArr = section === todoListSection ? cacheItem.done : cacheItem.todo;
  return { highlighted, info, listId, section, index, cacheItem, concernedArr, otherArr };
}

function deleteHighlightedToDoItem() {
  try {
    let { info, listId, index, cacheItem, concernedArr } = getHighlightedElementInfo();
    concernedArr = concernedArr.splice(index, 1);
    localStorage.setItem(listId, JSON.stringify(cacheItem));
    reloadList(listId);
    const listItem = document.getElementById(`${info.slice(0, info.length - 1).join("-")}-${index}`);
    if (listItem) {
      listItem.classList.add(listItemHighlightClass);
      listItem.scrollIntoView({ block: "center", inline: "nearest" });
    }
  } catch (e) {
    console.error(e);
    return;
  }
}

function shiftElement(arr, oldIndex, newIndex) {
  const item = arr.splice(oldIndex, 1)[0];
  arr.splice(newIndex, 0, item);
}

function moveHighlightedToDoListItem(isDown) {
  try {
    const { info, listId, index, cacheItem, concernedArr } = getHighlightedElementInfo();
    let newIndex = isDown ? (index + 1) % concernedArr.length : index - 1;
    if (newIndex < 0) newIndex += concernedArr.length;
    shiftElement(concernedArr, index, newIndex);

    localStorage.setItem(listId, JSON.stringify(cacheItem));
    reloadList(listId);
    const listItem = document.getElementById(`${info.slice(0, info.length - 1).join("-")}-${newIndex}`);
    if (listItem) {
      listItem.classList.add(listItemHighlightClass);
      listItem.scrollIntoView({ block: "center", inline: "nearest" });
    }
  } catch (e) {
    console.error(e);
    return;
  }
}

function toggleDoneHighlightedToDoListItem() {
  try {
    let { listId, section, index, cacheItem, concernedArr, otherArr } = getHighlightedElementInfo();
    otherArr.push(concernedArr[index]);
    concernedArr = concernedArr.splice(index, 1);
    localStorage.setItem(listId, JSON.stringify(cacheItem));
    reloadList(listId);
    const otherSection = section === todoListSection ? doneListSection : todoListSection;
    const listItem = document.getElementById(`${listId}-list-${otherSection}-${otherArr.length - 1}`);
    if (listItem) {
      listItem.classList.add(listItemHighlightClass);
      listItem.scrollIntoView({ block: "center", inline: "nearest" });
    }
  } catch (e) {
    console.error(e);
    return;
  }
}

// -----------------------------------------------------------------------------------------------------------------
// # STARTUP
// -----------------------------------------------------------------------------------------------------------------
window.scrollTo(0, 0);
window.addEventListener("resize", function () {
  toPage(currentPageIndex(), true);
});

// try {
//   createToDoList("Another List", ["Hello", "World"], ["This", "And", "That"]);
// } catch (e) {
//   console.error(e);
// }

initToDoLists();
toPage(0);
