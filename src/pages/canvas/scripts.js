import styles from "./styles.css";
import "../../global/index";

window.addEventListener("load", function() {
  // Mutable State
  let startLoc = undefined;
  let lastLoc = undefined;
  let currentShape = undefined;
  let currentWidth = undefined;
  let currentHeight = undefined;
  let currentPath = undefined;
  let currentText = undefined;
  let currentIndex = undefined;
  let locked = false;
  let currentColor = "--text";

  const drawingShapes = ["rect", "circle", "draw", "text"];
  const cacheTitle = "canvas-drawing";
  const storedCache = localStorage.getItem(cacheTitle);
  const stored = storedCache ? Array.from(JSON.parse(storedCache)) : [];

  // Load Buttons
  const sidePanel = document.getElementById("canvas-side-panel");
  Array.from(sidePanel.children).forEach((e, i) => {
    e.addEventListener("click", function() {
      Array.from(sidePanel.children).forEach((e) => (e.querySelector("i").style.color = "rgba(var(--text))"));
      e.querySelector("i").style.color = "rgba(var(--teal))";
      currentShape = e.id.split("-")[0];
    });

    if (i === 0) e.click();
  });

  // Load Canvas
  const canvas = document.getElementById("draw-canvas");
  const container = canvas.parentElement;
  canvas.width = container.clientWidth - 10;
  canvas.height = container.clientHeight - 10;
  const context = canvas.getContext("2d");

  // -----------------------------------------------------------------------------------
  // CANVAS FUNCTIONALITY
  // -----------------------------------------------------------------------------------

  function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  function getMouseLocation(e) {
    const x = e.clientX - e.target.offsetLeft;
    const y = e.clientY - e.target.offsetTop;
    return { x, y };
  }

  function getColorHex(color) {
    const rgb = getComputedStyle(document.documentElement).getPropertyValue(color ?? currentColor);
    const [r, g, b] = rgb.split(",").map((s) => Number(s));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  function drawRect(shape) {
    context.beginPath();
    context.roundRect(shape.x, shape.y, shape.width, shape.height, window.innerHeight / (100 / 2));
    context.stroke();
  }

  const toRads = (degrees) => degrees * (Math.PI / 180);
  function drawEllipse(shape) {
    const radiiX = shape.width / 2;
    const radiiY = shape.height / 2;
    const centerX = shape.x + radiiX;
    const centerY = shape.y + radiiY;
    context.beginPath();
    context.ellipse(centerX, centerY, Math.abs(radiiX), Math.abs(radiiY), 0, toRads(0), toRads(360));
    context.stroke();
  }

  function drawPath(shape) {
    if (!shape.path || shape.path.length < 1) return;
    context.beginPath();
    context.moveTo(shape.path[0].x, shape.path[0].y);
    for (const path of shape.path.slice(1)) {
      context.lineTo(path.x, path.y);
    }
    context.stroke();
  }

  function drawText(shape) {
    if (!shape.text) return;

    context.font = "20px JetBrains Mono";
    context.fill = getColorHex();
    context.fillText(shape.text, shape.x, shape.y);
  }

  function drawAll() {
    clearCanvas();
    context.lineWidth = 4;
    for (const shape of stored) {
      context.strokeStyle = getColorHex(shape.color);
      switch (shape.type) {
        case "rect":
          drawRect(shape);
          continue;
        case "circle":
          drawEllipse(shape);
          continue;
        case "draw":
          drawPath(shape);
          continue;
        case "text":
          drawText(shape);
          continue;
      }
    }
  }

  function store() {
    const obj = {
      type: currentShape,
      color: currentColor,
      x: startLoc.x,
      y: startLoc.y,
      width: currentWidth,
      height: currentHeight,
      path: currentPath,
      text: currentText,
    };

    if (currentIndex >= 0 && currentIndex < stored.length) {
      stored.splice(currentIndex, 1, obj);
    } else {
      stored.push(obj);
    }
  }

  function manageShape(e) {
    const curLoc = getMouseLocation(e);
    currentWidth = curLoc.x - startLoc.x;
    currentHeight = curLoc.y - startLoc.y;
    if (locked) {
      const squareRad = Math.max(Math.abs(currentWidth), Math.abs(currentHeight));
      currentWidth = currentWidth < 0 ? -squareRad : squareRad;
      currentHeight = currentHeight < 0 ? -squareRad : squareRad;
    }
    store();
  }

  function manageDraw(e) {
    const curLoc = getMouseLocation(e);
    if (!lastLoc) {
      lastLoc = startLoc;
      currentPath = [];
    }
    const newPath = { x: curLoc.x, y: curLoc.y };
    if ((!locked && Math.hypot(curLoc.x - lastLoc.x, curLoc.y - lastLoc.y) > 10) || currentPath.length < 2) {
      currentPath.push(newPath);
      lastLoc = curLoc;
    } else {
      currentPath.splice(currentPath.length - 1, 1, newPath);
    }
    store();
  }

  function editShape(e) {
    switch (currentShape) {
      case "rect":
      case "circle":
        manageShape(e);
        break;
      case "draw":
        manageDraw(e);
        break;
    }
  }

  function reset() {
    startLoc = undefined;
    lastLoc = undefined;
    currentPath = undefined;
    currentText = undefined;
    currentIndex = undefined;
  }

  canvas.addEventListener("mousedown", function(e) {
    if (!drawingShapes.includes(currentShape)) return;

    startLoc = getMouseLocation(e);

    if (currentShape === "text") {
      currentText = "";
      store();
      return;
    }

    editShape(e);
  });

  canvas.addEventListener("mouseup", function(e) {
    if (!startLoc || currentShape === "text") return;
    currentIndex = stored.length - 1;
    editShape(e);
    drawAll();
    localStorage.setItem(cacheTitle, JSON.stringify(stored));
    reset();
  });

  canvas.addEventListener("mousemove", function(e) {
    if (!startLoc || currentShape === "text") return;
    currentIndex = stored.length - 1;
    editShape(e);
    drawAll();
  });

  document.getElementById("erase-select-btn").addEventListener("click", function() {
    stored.splice(0, stored.length);
    drawAll();
    localStorage.removeItem(cacheTitle);
    sidePanel.children.item(0).click();
  });

  window.addEventListener("keyup", function(event) {
    if (event.key === "Shift") {
      locked = false;
    }
  });

  window.addEventListener("keydown", function(event) {
    if (event.key === "Shift" && currentShape != "text") {
      locked = true;
    }
    if (currentShape === "text") {
      if (event.key === "Enter") {
        currentText = undefined;
      } else {
        currentText += event.key;
        store();
        drawAll();
      }
    }
  });

  drawAll();
});
