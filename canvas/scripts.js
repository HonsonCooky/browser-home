import { loadKeymap } from "../assets/global.js";
loadKeymap();

// Cache
const cacheTitle = "canvas-drawing";
const localCache = localStorage.getItem(cacheTitle);
const memCache = localCache ? Array.from(JSON.parse(localCache)) : [];

// Side Panel
const sidePanel = document.getElementById("canvas-side-panel");
let selectedTool = "mouse";

for (const panelBtn of sidePanel.children) {
  panelBtn.addEventListener("click", function () {
    Array.from(sidePanel.children).forEach((c) => {
      if (c.id === "color") return;
      c.style.color = "var(--text)";
    });
    panelBtn.style.color = "var(--gold)";
  });
}

// Color Picker
const colorSwatchBtn = document.getElementById("color");
const colorSelection = document.getElementById("color-selection");
let selectedColor = "text";

colorSwatchBtn.addEventListener("click", function () {
  if (colorSelection.classList.contains("show")) colorSelection.classList.remove("show");
  else colorSelection.classList.add("show");
});

for (const colorPatch of colorSelection.children) {
  colorPatch.addEventListener("click", function () {
    selectedColor = colorPatch.id;
    colorSelection.classList.remove("show");
    colorSwatchBtn.style.color = `var(--${colorPatch.id})`;
  });
}

// Canvas
const canvas = document.getElementById("draw-canvas");
const context = canvas.getContext("2d");

function loadCanvas() {
  const container = canvas.parentElement;
  canvas.width = container.clientWidth - 10;
  canvas.height = container.clientHeight;
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener("resize", loadCanvas);
loadCanvas();
