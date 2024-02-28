export function loadGlobalKeybindings() {
  const leader = " ";
  const whichKeyId = "which-key";
  let currentKeySequence = [];
  const keymaps = {
    i: {
      name: "[I]nternal Links",
      h: { name: "[Home]", url: "/" },
      c: { name: "[C]anvas", url: "/canvas/" },
      d: { name: "[D]ev tools", url: "/dev-tools/" },
      l: { name: "[K]eyboard Layout", url: "/layout/" },
      t: { name: "[T]odo", url: "/todo/" },
      e: { name: "[E]dge Shortcuts", url: "/edge/" },
      v: { name: "[v]im Shortcuts", url: "/vim/" },
      w: { name: "[W] Vimium Shortcuts", url: "/vimium/" },
    },
    e: {
      name: "[E]xternal Links",
      a: { name: "[A]dvent of Code", url: "https://adventofcode.com" },
      c: { name: "[C]alendar", url: "https://calendar.google.com" },
      d: { name: "[D]isney+", url: "https://www.disneyplus.com/search" },
      e: { name: "[E]xercism", url: "https://exercism.org" },
      g: { name: "[G]itHub", url: "https://github.com/HonsonCooky" },
      h: { name: "[H] Gmail", url: "https://mail.google.com" },
      m: { name: "[M]essenger", url: "https://www.messenger.com" },
      n: { name: "[N]etflix", url: "https://www.netflix.com/browse" },
      o: { name: "[O] Neon", url: "https://www.neontv.co.nz" },
      r: { name: "[R]eddit", url: "https://www.reddit.com" },
      s: { name: "[S]tack Overflow", url: "https://stackoverflow.com" },
      t: { name: "[T] Snapchat", url: "https://web.snapchat.com" },
      y: { name: "[Y]outube", url: "https://www.youtube.com/" },
    },
  };

  function showKeyBindings(currentKeyMap) {
    let whichKey = document.getElementById(whichKeyId);
    if (!whichKey) {
      whichKey = document.createElement("div");
      whichKey.id = whichKeyId;
    }
  }

  function clearKeySequence() {
    currentKeySequence = [];
    const whichKey = document.getElementById(whichKeyId);
    if (whichKey) {
      document.removeChild(whichKey);
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

  function evaluateKeymap(keymap) {
    if (typeof keymap.url === "string") {
      keymap.url.startsWith("https://") ? externalPageJump(keymap.url) : internalPageJump(keymap.url);
    }
  }

  function keySequence(event) {
    event.preventDefault();
    currentKeySequence.push(event.key.toLowerCase());
    if (currentKeySequence < 2) return;

    let currentKeyMap = keymaps;
    for (const c of currentKeySequence.slice(1)) {
      currentKeyMap = currentKeyMap[c];

      if (!currentKeyMap) {
        clearKeySequence();
        return;
      }

      if (currentKeyMap.url) {
        evaluateKeymap(currentKeyMap);
        clearKeySequence();
        return;
      } else {
        showKeyBindings(currentKeyMap);
      }
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
