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
const whichKeyStyle = new CSSStyleSheet();
whichKeyStyle.replace(`
  position: fixed;
  height: 100px;
  width: 100px;
  top: 100px;
  left: 100px;
  background: white;
`)
whichKeyDiv.adoptedStyleSheets = [whichKeyStyle]

document.body.appendChild(whichKeyDiv)

function showMapping() {
}

export function loadKeymap() {
  window.addEventListener("keydown", function() {

  })
}
