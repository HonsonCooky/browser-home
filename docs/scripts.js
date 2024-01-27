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
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i].page;
    const btn = pages[i].btn;
    const highCol = "rgba(var(--lavender), 0.5)";
    const normCol = "rgba(var(--overlay0), 0.5)";

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

    page.scrollIntoView({ behavior: "smooth" });
    btn.style.background = highCol;
  }
}

function currentPageIndex() {
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].btn.style.background.includes("lavender")) {
      return i;
    }
  }
}

// -----------------------------------------------------------------------------------------------------------------
// # KEYBOARD EVENTS
// -----------------------------------------------------------------------------------------------------------------
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "1":
    case "S":
      toPage(0);
      break;
    case "2":
    case "T":
      toPage(1);
      break;
    case "k":
    case "ArrowUp":
      toPage(Math.min(pages.length - 1, currentPageIndex() + 1));
      break;
    case "j":
    case "ArrowDown":
      toPage(Math.max(0, currentPageIndex() - 1));
      break;
  }
});

// -----------------------------------------------------------------------------------------------------------------
// # SEARCH BOX FUNCTIONALITY
// -----------------------------------------------------------------------------------------------------------------

let currentIndex = -1;
let matches = [];
let prevQuery = "";
const mark = "marked";
const highlight = "marked-highlight";

function scrollIntoViewIfNeeded(element) {
  element.classList.add(highlight);
  element.scrollIntoView({ block: "center", inline: "nearest" });
}

function searchChildren(element, query, depth) {
  if (depth === 0 && query != prevQuery) {
    matches = [];
    currentIndex = -1;
    prevQuery = query;
  }

  const parent = element.parentNode;
  parent.classList.remove(mark);
  parent.classList.remove(highlight);
  if (element.nodeType === Node.TEXT_NODE && query.length > 0 && element.nodeValue.includes(query)) {
    parent.classList.add(mark);
    matches.push(parent);
  }

  for (let i = 0; i < element.childNodes.length; i++) {
    searchChildren(element.childNodes[i], query, depth + 1);
  }
}

function findNext() {
  if (matches.length > 0) {
    if (currentIndex != -1) matches[currentIndex].classList.remove(highlight);
    currentIndex = (currentIndex + 1) % matches.length;
    scrollIntoViewIfNeeded(matches[currentIndex]);
  }
}

function findPrevious() {
  if (matches.length > 0) {
    if (currentIndex != -1) matches[currentIndex].classList.remove(highlight);
    currentIndex = (currentIndex - 1 + matches.length) % matches.length;
    scrollIntoViewIfNeeded(matches[currentIndex]);
  }
}

function createSearchBox(searchElement) {
  const searchBox = document.createElement("input");
  searchBox.type = "text";
  searchBox.placeholder = "Search";

  searchBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      if (this.value != prevQuery) searchChildren(searchElement, this.value, 0);
      if (event.shiftKey) {
        findPrevious();
      } else {
        findNext();
      }
    }
  });
  return searchBox;
}

// -----------------------------------------------------------------------------------------------------------------
// # SHORTCUT LOADING
// -----------------------------------------------------------------------------------------------------------------
const vimShortcuts = document.getElementById("vim-shortcuts");
const edgeShortcuts = document.getElementById("edge-shortcuts");

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
  .then((data) => vimShortcuts.appendChild(createShortcut("Vim Shortcuts", data, 0)));

fetch("./assets/edge-shortcuts.json")
  .then((response) => response.json())
  .then((data) => edgeShortcuts.appendChild(createShortcut("Edge Shortcuts", data, 0)));

// -----------------------------------------------------------------------------------------------------------------
// # STARTUP
// -----------------------------------------------------------------------------------------------------------------
toPage();
