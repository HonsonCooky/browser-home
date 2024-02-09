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
  switch (event.key) {
    case "v":
      vimShortcuts.tabIndex = -1;
      vimShortcuts.focus({ preventScroll: true });
      scrollToCenter(vimShortcuts);
      break;
    case "e":
      edgeShortcuts.tabIndex = -1;
      edgeShortcuts.focus({ preventScroll: true });
      scrollToCenter(edgeShortcuts);
      break;
    case "b":
      vimiumShortcuts.tabIndex = -1;
      vimiumShortcuts.focus({ preventScroll: true });
      scrollToCenter(vimiumShortcuts);
      break;
    case "/":
    case "s":
      const input = document.activeElement.querySelector("input");
      if (input) {
        input.focus();
      }
      break;
  }
}

function toolsPageKeyBindings(event) {
  //TODO
  switch (event.key) {
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

document.addEventListener("keydown", (event) => {
  if (document.activeElement.id.includes("input")) return;
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
      const pageNumRight = Math.min(pages.length - 1, currentPageIndex() + 1);
      keybindActivate(toPage, pageNumRight);
      break;
    case "ArrowLeft":
    case "h":
      const pageNumLeft = Math.max(0, currentPageIndex() - 1);
      keybindActivate(toPage, pageNumLeft);
      break;
    case "Escape":
      keybindActivate(document.activeElement.blur);
      break;
    default:
      keybindActivate(pageBasedEvents, event);
      break;
  }

  // Context based events
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
const vimShortcuts = document.getElementById("vim-shortcuts");
const edgeShortcuts = document.getElementById("edge-shortcuts");
const vimiumShortcuts = document.getElementById("vimium-shortcuts");

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

const vimTitle = "Vim";
const edgeTitle = "Edge";
const vimiumTitle = "Vimium";

fetch("./assets/vim-shortcuts.json")
  .then((response) => response.json())
  .then((data) => vimShortcuts.appendChild(createShortcut(vimTitle, data, 0)));

fetch("./assets/edge-shortcuts.json")
  .then((response) => response.json())
  .then((data) => edgeShortcuts.appendChild(createShortcut(edgeTitle, data, 0)));

fetch("./assets/vimium-shortcuts.json")
  .then((response) => response.json())
  .then((data) => vimiumShortcuts.appendChild(createShortcut(vimiumTitle, data, 0)));

// -----------------------------------------------------------------------------------------------------------------
// # STARTUP
// -----------------------------------------------------------------------------------------------------------------
setFavicon();
toPage();
