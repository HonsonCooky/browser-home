const specialKeys = ["Alt", "Control", "Shift"];

let keymaps = {
  j: {
    name: "Internal Links",
    h: { name: "Home", action: () => internalPageJump("/") },
    c: { name: "Canvas", action: () => internalPageJump("/canvas/") },
    d: { name: "Dev Tools", action: () => internalPageJump("/dev-tools/") },
    e: { name: "Edge Shortcuts", action: () => internalPageJump("/edge/") },
    k: { name: "Keyboard Layout", action: () => internalPageJump("/layout/") },
    t: { name: "Todo Lists", action: () => internalPageJump("/todo/") },
    v: { name: "Vim Shortcuts", action: () => internalPageJump("/vim/") },
    w: { name: "Vimium Shortcuts", action: () => internalPageJump("/vimium/") },
  },
  f: {
    name: "External Links",
    j: {
      name: "Programming",
      a: { name: "Advent of Code", action: () => externalPageJump("https://adventofcode.com") },
      e: { name: "Exercism", action: () => externalPageJump("https://exercism.org") },
      g: { name: "GitHub", action: () => externalPageJump("https://github.com/HonsonCooky") },
      s: { name: "Stack Overflow", action: () => externalPageJump("https://stackoverflow.com") },
    },
    k: {
      name: "Management",
      c: { name: "GCalendar", action: () => externalPageJump("https://calendar.google.com") },
      d: { name: "GDrive", action: () => externalPageJump("https://drive.google.com") },
      g: { name: "Gmail", action: () => externalPageJump("https://mail.google.com") },
    },
    l: {
      name: "Socials",
      d: { name: "Disney+", action: () => externalPageJump("https://www.disneyplus.com/search") },
      i: { name: "Instagram", action: () => externalPageJump("https://www.instagram.com") },
      m: { name: "Messenger", action: () => externalPageJump("https://www.messenger.com") },
      n: { name: "Netflix", action: () => externalPageJump("https://www.netflix.com/browse") },
      o: { name: "Neon", action: () => externalPageJump("https://www.neontv.co.nz") },
      r: { name: "Reddit", action: () => externalPageJump("https://www.reddit.com") },
      s: { name: "Snapchat", action: () => externalPageJump("https://web.snapchat.com") },
      y: { name: "Youtube", action: () => externalPageJump("https://www.youtube.com/") },
    },
    ";": {
      name: "Work",
      a: { name: "Azure Portal", action: () => externalPageJump("https://portal.azure.com/#home") },
      b: { name: "Betterworks", action: () => externalPageJump("https://app.betterworks.com") },
      c: { name: "Confluence", action: () => externalPageJump("https://zenergy.atlassian.net/wiki/home") },
      d: { name: "DevOps", action: () => externalPageJump("https://dev.azure.com/zenergy") },
      g: { name: "GitHub", action: () => externalPageJump("https://github.com/zenergy") },
      j: { name: "Jira", action: () => externalPageJump("https://zenergy.atlassian.net/jira/projects") },
      s: { name: "School", action: () => externalPageJump("https://zacademyelearning.litmos.com") },
    },
  },
};

export function addKeybinding({ keyPath, name, action }) {
  if (!keyPath || !name) return;
  const keyPathSplit = keyPath.split(".");
  const nameSplit = name.split(".");
  let keybinding = keymaps;
  for (const [k, i] of keyPathSplit.map((item, i) => [item, i])) {
    if (!keybinding[k]) {
      keybinding[k] = { name: nameSplit[i] ? nameSplit[i] : nameSplit[nameSplit.length - 1] };
      if (i === keyPathSplit.length - 1) keybinding[k].action = action;
    }
    keybinding = keybinding[k];
  }
}

export function removeKeybindingFGroup() {
  delete keymaps.j.f;
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

export function loadGlobalKeybindings() {
  const leader = " ";
  const whichKeyId = "which-key";
  let currentKeySequence = [];

  function showKeyBindings(currentKeyMap) {
    let whichKey = document.getElementById(whichKeyId);
    if (!whichKey) {
      whichKey = document.createElement("div");
      whichKey.id = whichKeyId;
      document.body.appendChild(whichKey);
    } else {
      whichKey.innerHTML = "";
    }

    const entires = Object.entries(currentKeyMap);
    entires.sort((a, b) => a[0].localeCompare(b[0]));
    for (const [key, value] of entires) {
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

  function clearKeySequence(event) {
    if (specialKeys.includes(event.key)) return;
    currentKeySequence = [];
    const whichKey = document.getElementById(whichKeyId);
    if (whichKey) {
      document.body.removeChild(whichKey);
    }
  }

  function keySequence(event) {
    if (specialKeys.includes(event.key)) return;
    event.preventDefault();

    if (event.key === "Backspace") {
      currentKeySequence.pop();
    } else {
      currentKeySequence.push(event.key);
    }

    let currentKeyMap = keymaps;
    for (const c of currentKeySequence.slice(1)) {
      currentKeyMap = currentKeyMap[c];
    }

    if (!currentKeyMap) {
      clearKeySequence(event);
      return;
    }

    if (currentKeyMap.action) {
      currentKeyMap.action();
      clearKeySequence(event);
      return;
    } else {
      showKeyBindings(currentKeyMap);
    }
  }

  window.addEventListener("keydown", function (event) {
    if (
      document.activeElement.tagName === "INPUT" ||
      document.activeElement.classList.contains("layout") ||
      document.activeElement.classList.contains("list") ||
      document.activeElement.tagName === "CANVAS"
    ) {
      return;
    }
    console.log(document.activeElement.tagName);

    if (event.key === leader || currentKeySequence[0] === leader) {
      keySequence(event);
      return;
    }

    // BASIC ACTIONS
    switch (event.key) {
      case "<":
        window.history.back();
        break;
      case ">":
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
        const inputs = Array.from(document.activeElement.querySelectorAll("input"));

        if (inputs.length === 0) return;

        let input;
        if (inputs.length === 1) input = inputs[0];
        else {
          for (const i of inputs) {
            if (i.closest("div").style.display === "none") continue;
            input = i;
            break;
          }
        }

        if (input) {
          event.preventDefault();
          input.focus({ preventScroll: true });
        }
        break;
      case "?":
        break;
      case "Escape":
      default:
        clearKeySequence(event);

        if (document.activeElement != document.body) {
          document.activeElement.blur();
        }

        if (keymaps[event.key]?.action) {
          keymaps[event.key].action();
        }
        break;
    }
  });
}
