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
// # SHORTCUT LOADING
// -----------------------------------------------------------------------------------------------------------------
fetch("./assets/vim-shortcuts.json")
  .then((response) => response.json())
  .then((data) => console.log("FETCH", data));

const xhr = new XMLHttpRequest();
xhr.open("GET", "./assets/vim-shortcuts.json", true);
xhr.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    const data = JSON.parse(this.responseText);
    console.log("XML", data);
  }
};
xhr.send();

// -----------------------------------------------------------------------------------------------------------------
// # STARTUP
// -----------------------------------------------------------------------------------------------------------------
toPage();
