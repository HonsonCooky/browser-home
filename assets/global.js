//-----------------------------------------------------------------------------
// THEME
//-----------------------------------------------------------------------------
const themeAttr = "theme";
const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const theme = isDark ? "dark" : "light";
document.documentElement.setAttribute(themeAttr, theme);

//-----------------------------------------------------------------------------
// WHICH-KEY
//-----------------------------------------------------------------------------
const whichKeyDiv = document.createElement("div");
whichKeyDiv.className = "which-key";
document.body.appendChild(whichKeyDiv);

const defaultKeymaps = {
  name: "HonsonCooky",
  j: {
    name: "Internal Links",
    h: { name: "Home", action: () => internalPageJump("/home/") },
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

export function internalPageJump(url) {
  if (window.origin.includes("extension")) {
    const scripts = document.getElementsByTagName("script");
    const currentScriptSrc = scripts[scripts.length - 1].src;
    window.location.href = currentScriptSrc.replace(/docs.*/, `docs${url}index.html`);
  } else {
    window.location.href = `${window.location.origin}${url}`;
  }
}

export function externalPageJump(url) {
  window.location.href = url;
}

Object.prototype.stringAccess = function (s) {
  s = s.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
  s = s.replace(/^\./, ""); // strip a leading dot
  const a = s.split(".");
  let o = this;
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return undefined;
    }
  }
  return o;
};

function showSubMap(subMap) {
  whichKeyDiv.innerHTML = "";

  const name = document.createElement("h3");
  name.innerHTML = subMap.name;
  whichKeyDiv.appendChild(name);

  for (const [k, v] of Object.entries(subMap)) {
    if (k === "name") continue;
    const key = document.createElement("span");
    key.innerHTML = `[${k}] ${v.name}`;
    whichKeyDiv.appendChild(key);
  }
}

export function loadKeymap(map) {
  let currentSequence = [];
  map = {
    ...defaultKeymaps,
    ...map,
  };
  window.addEventListener("keydown", function (evt) {
    console.log(this.document.activeElement.tagName);
    if (
      document.activeElement.tagName === "INPUT" ||
      document.activeElement.tagName === "TEXTAREA" ||
      document.activeElement.classList.contains("layout") ||
      document.activeElement.classList.contains("list") ||
      document.activeElement.tagName === "CANVAS"
    ) {
      return;
    }

    evt.preventDefault();

    currentSequence.push(evt.key);
    let subMap = map.stringAccess(currentSequence.filter((s) => s != " ").join("."));
    if (!subMap && evt.key === " " && currentSequence.length === 1) subMap = map;

    if (!subMap) {
      currentSequence = [];
      whichKeyDiv.classList.remove("show");
      return;
    }

    if (!whichKeyDiv.classList.contains("show")) whichKeyDiv.classList.add("show");
    if (subMap.action != undefined) {
      currentSequence = [];
      whichKeyDiv.classList.remove("show");
      subMap.action();
    } else showSubMap(subMap);
  });
}
