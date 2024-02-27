import logoImg from "../assets/HC_LOGO_LIGHT_128x128.png";
window.addEventListener("load", function () {
  //-----------------------------
  // LOAD LOGOS
  //-----------------------------
  Array.from(document.querySelectorAll(".logo")).forEach((i) => (i.src = logoImg));

  //-----------------------------
  // GLOBAL KEY BINDINGS
  //-----------------------------
  const internalPages = new Map([
    ["Home", ""],
    [("c", "canvas/")],
    ["e", "edge/"],
    ["l", "keyboard/"],
    ["t", "todo/"],
    ["v", "vim/"],
    ["w", "vimium/"],
  ]);

  window.addEventListener("keydown", function (event) {
    if (document.activeElement.tagName === "INPUT") {
      return;
    }

    // JUMP TO PAGE
    if (internalPages.has(event.key)) {
      if (window.origin.includes("extension")) {
        const scripts = document.getElementsByTagName("script");
        const currentScriptSrc = scripts[scripts.length - 1].src;
        window.location.href = currentScriptSrc.replace(/docs.*/, `docs/${internalPages.get(event.key)}index.html`);
      } else {
        window.location.href = `${window.location.origin}/${internalPages.get(event.key)}`;
      }
      return;
    }

    switch (event.key) {
      case "H":
        window.history.back();
        break;
      case "L":
        window.history.forward();
        break;
      case "j":
        window.scrollBy({ top: 50, behavior: "smooth" });
        break;
      case "k":
        window.scrollBy({ top: -50, behavior: "smooth" });
        break;
      case "d":
        window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
        break;
      case "u":
        window.scrollBy({ top: -window.innerHeight, behavior: "smooth" });
        break;
      case "/":
        const input = document.body.querySelector("input");
        if (input) {
          event.preventDefault();
          input.focus({ preventScroll: true });
        }
    }
  });
});

export function implementSearchBox(searchBox, searchElement) {
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

    if (event.key === "Escape") {
      event.preventDefault();
      document.activeElement.blur();
    }
  });
  return searchBox;
}
