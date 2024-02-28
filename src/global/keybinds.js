export function loadGlobalKeybindings() {
  const leader = " ";
  const whichKeyId = "which-key";
  let currentKeySequence = [];
  const keymaps = {
    i: {
      name: "Internal Links",
      h: { name: "Home", action: () => internalPageJump("/") },
      c: { name: "Canvas", action: () => internalPageJump("/canvas/") },
      d: { name: "Dev Tools", action: () => internalPageJump("/dev-tools/") },
      e: { name: "Edge Shortcuts", action: () => internalPageJump("/edge/") },
      l: { name: "Keyboard Layout", action: () => internalPageJump("/layout/") },
      t: { name: "Todo Lists", action: () => internalPageJump("/todo/") },
      v: { name: "Vim Shortcuts", action: () => internalPageJump("/vim/") },
      w: { name: "Vimium Shortcuts", action: () => internalPageJump("/vimium/") },
    },
    e: {
      name: "External Links",
      a: { name: "Advent of Code", action: () => externalPageJump("https://adventofcode.com") },
      c: { name: "Calendar", action: () => externalPageJump("https://calendar.google.com") },
      d: { name: "Disney+", action: () => externalPageJump("https://www.disneyplus.com/search") },
      e: { name: "Exercism", action: () => externalPageJump("https://exercism.org") },
      g: { name: "GitHub", action: () => externalPageJump("https://github.com/HonsonCooky") },
      h: { name: "Gmail", action: () => externalPageJump("https://mail.google.com") },
      m: { name: "Messenger", action: () => externalPageJump("https://www.messenger.com") },
      n: { name: "Netflix", action: () => externalPageJump("https://www.netflix.com/browse") },
      o: { name: "Neon", action: () => externalPageJump("https://www.neontv.co.nz") },
      r: { name: "Reddit", action: () => externalPageJump("https://www.reddit.com") },
      s: { name: "Stack Overflow", action: () => externalPageJump("https://stackoverflow.com") },
      t: { name: "Snapchat", action: () => externalPageJump("https://web.snapchat.com") },
      y: { name: "Youtube", action: () => externalPageJump("https://www.youtube.com/") },
    },
  };

  function showKeyBindings(currentKeyMap) {
    let whichKey = document.getElementById(whichKeyId);
    if (!whichKey) {
      whichKey = document.createElement("div");
      whichKey.id = whichKeyId;
      document.body.appendChild(whichKey);
    } else {
      whichKey.innerHTML = "";
    }

    for (const [key, value] of Object.entries(currentKeyMap)) {
      if (!value.name) continue;
      const div = document.createElement("div");
      if (!value.action) {
        div.classList.add("folder");
      }
      div.id = key;
      div.innerHTML = `<span>${key} <i class="nf nf-oct-arrow_right"></i> </span>${value.name}`;
      whichKey.appendChild(div);
    }
  }

  function clearKeySequence() {
    currentKeySequence = [];
    const whichKey = document.getElementById(whichKeyId);
    if (whichKey) {
      document.body.removeChild(whichKey);
    }
  }

  function internalPageJump(url) {
    if (window.origin.includes("extension")) {
      const scripts = document.getElementsByTagName("script");
      const currentScriptSrc = scripts[scripts.length - 1].src;
      window.location.href = currentScriptSrc.replace(/docs.*/, `docs${url}index.html`);
    } else {
      window.location.href = `${window.location.origin}${url}`;
    }
  }

  function externalPageJump(url) {
    window.location.href = url;
  }

  function keySequence(event) {
    event.preventDefault();

    if (event.key === "Backspace") {
      currentKeySequence.pop();
    } else {
      currentKeySequence.push(event.key.toLowerCase());
    }

    let currentKeyMap = keymaps;
    for (const c of currentKeySequence.slice(1)) {
      currentKeyMap = currentKeyMap[c];
    }

    if (!currentKeyMap) {
      clearKeySequence();
      return;
    }

    if (currentKeyMap.action) {
      currentKeyMap.action();
      clearKeySequence();
      return;
    } else {
      showKeyBindings(currentKeyMap);
    }
  }

  window.addEventListener("keydown", function(event) {
    if (document.activeElement.tagName === "INPUT") {
      return;
    }

    if (event.key === leader || currentKeySequence[0] === leader) {
      keySequence(event);
      return;
    }

    // BASIC ACTIONS
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
      case "J":
        window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
        break;
      case "K":
        window.scrollBy({ top: -window.innerHeight, behavior: "smooth" });
        break;
      case "/":
        const input = document.body.querySelector("input");
        if (input) {
          event.preventDefault();
          input.focus({ preventScroll: true });
        }
        break;
      case "?":
        break;
      case "Escape":
      default:
        clearKeySequence();
        break;
    }
  });
}
