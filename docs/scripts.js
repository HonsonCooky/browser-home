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

// -----------------------------------------------------------------------------------------------------------------
// PAGE INDICATOR BUTTONS
// -----------------------------------------------------------------------------------------------------------------

function toPage(pageNum) {
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i].page;
    const btn = pages[i].btn;

    if (pageNum === undefined) {
      const pageX = page.getBoundingClientRect().x;
      if (pageX === 0) {
        btn.style.background = "var(--lavender)";
      } else {
        btn.style.background = "var(--overlay0)";
      }
      continue;
    }

    if (i != pageNum) {
      btn.style.background = "var(--overlay0)";
      continue;
    }

    page.scrollIntoView({ behavior: "smooth" });
    btn.style.background = "var(--lavender)";
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
// KEYBOARD EVENTS
// -----------------------------------------------------------------------------------------------------------------
document.addEventListener("keydown", (event) => {
  console.log(event.key, currentPageIndex());
  switch (event.key) {
    case "1":
      toPage(0);
      break;
    case "2":
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
// STARTUP
// -----------------------------------------------------------------------------------------------------------------
toPage();
