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

const vimTitle = "Vim [v]";
const edgeTitle = "Edge [e]";
const vimiumTitle = "Vimium [b]";

function shortcutsPageKeyBindings(event) {
  const vimSubSection = document.getElementById(`${vimTitle}-0`);
  const edgeSubSection = document.getElementById(`${edgeTitle}-0`);
  const vimiumSubSection = document.getElementById(`${vimiumTitle}-0`);
  switch (event.key) {
    case "v":
      vimSubSection.tabIndex = -1;
      vimSubSection.focus();
      break;
    case "e":
      edgeSubSection.tabIndex = -1;
      edgeSubSection.focus();
      break;
    case "b":
      vimiumSubSection.tabIndex = -1;
      vimiumSubSection.focus();
      break;
    case "/":
    case "s":
      const input = document.activeElement.querySelector("input");
      if (input) {
        event.preventDefault();
        input.focus();
      }
      break;
  }
}

function toolsPageKeyBindings(event) {
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

function scrollActiveElementBy(scrollBy) {
  document.activeElement.scroll({
    top: document.activeElement.scrollTop + scrollBy,
    left: 0,
    behavior: "smooth",
  });
}

function getRem() {
  return parseFloat(getComputedStyle(document.documentElement).fontSize);
}

document.addEventListener("keydown", (event) => {
  if (document.activeElement.id.includes("input")) return;

  switch (event.key) {
    case "j":
      scrollActiveElementBy(50);
      return;
    case "k":
      scrollActiveElementBy(-50);
      return;
    case "d":
      scrollActiveElementBy(document.activeElement.getBoundingClientRect().height - getRem() * 8);
      return;
    case "u":
      scrollActiveElementBy(-(document.activeElement.getBoundingClientRect().height - getRem() * 8));
      return;
    case "l":
      toPage(Math.min(pages.length - 1, currentPageIndex() + 1));
      return;
    case "h":
      toPage(Math.max(0, currentPageIndex() - 1));
      return;
  }
  pageBasedEvents(event);
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

  function scrollIntoViewIfNeeded(element) {
    element.classList.add(highlight);
    element.scrollIntoView({ block: "center", inline: "nearest", behavior: "smooth" });
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
    }

    if (query.length > 0 && isSubsequence(query, element)) {
      element.classList.add(mark);
      matches.push(element);
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

  const searchBox = document.createElement("input");
  searchBox.id = searchElement.id + "-input";
  searchBox.type = "text";
  searchBox.placeholder = `Search`;

  searchBox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      if (this.value != prevQuery) searchChildren(searchElement, this.value, 0);
      if (event.shiftKey) {
        findPrevious();
      } else {
        findNext();
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
toPage();
