import "./styles.css";
import "../../global/index";

window.addEventListener("load", function () {
  // Mutable State
  let startLocation = undefined;
  let lastLocation = undefined;
  let currentTool = undefined;
  let currentWidth = undefined;
  let currentHeight = undefined;
  let currentPath = undefined;
  let currentText = undefined;
  let currentIndex = undefined;
  let locked = false;
  let currentColor = "--text";

  const cacheTitle = "canvas-drawing";
  const localCache = localStorage.getItem(cacheTitle);
  const ramCache = localCache ? Array.from(JSON.parse(localCache)) : [];
  const fontSize = 20;

  // Load Buttons
  const sidePanel = document.getElementById("canvas-side-panel");
  Array.from(sidePanel.children).forEach((e, i) => {
    e.addEventListener("click", function () {
      Array.from(sidePanel.children).forEach((e) => (e.querySelector("i").style.color = "rgba(var(--text))"));
      e.querySelector("i").style.color = "rgba(var(--teal))";
      currentTool = e.id.split("-")[0];
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

  function isBetween(num, a, b) {
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    return num >= min && num <= max;
  }

  function getShapeBoundary(shape) {
    const { x, y, width, height } = shape;
    let [x1, y1, x2, y2] = [x, y, x + width, y + height];
    if (shape.type === "text") {
      x2 = x1 + context.measureText(shape.text).width;
      y1 -= fontSize + 2;
      y2 = y1 + fontSize + 10;
    }
    if (shape.type === "draw") {
      for (const path of shape.path) {
        if (!x1 || path.x < x1) x1 = path.x;
        if (!y1 || path.y < y1) y1 = path.y;
        if (!x2 || path.x > x2) x2 = path.x;
        if (!y2 || path.y > y2) y2 = path.y;
      }
    }
    return { x1, y1, x2, y2 };
  }

  function findClickedShape(e) {
    const { x, y } = getMouseLocation(e);
    const [mouseX, mouseY] = [x, y];
    let clicked = undefined;
    for (const shape of ramCache) {
      const { x1, y1, x2, y2 } = getShapeBoundary(shape);
      const xBetween = isBetween(mouseX, x1, x2);
      const yBetween = isBetween(mouseY, y1, y2);
      if (xBetween && yBetween) {
        clicked = shape;
      }
    }
    return clicked;
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

    context.font = `${fontSize}px JetBrains Mono`;
    context.fillText(shape.text, shape.x, shape.y);
  }

  function highlightSelected() {
    if (currentIndex === undefined) return;
    const shape = ramCache[currentIndex];
    if (!shape) return;

    const { x1, y1, x2, y2 } = getShapeBoundary(shape);
    context.strokeStyle = getColorHex("--red");
    context.setLineDash([5, 5]);
    context.strokeRect(x1, y1, x2 - x1, y2 - y1);
  }

  function render() {
    clearCanvas();
    context.lineWidth = 4;
    for (const shape of ramCache) {
      context.strokeStyle = getColorHex(shape.color);
      context.fillStyle = getColorHex(shape.color);
      context.setLineDash([]);
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

    highlightSelected();
  }

  function storeShape() {
    const existing = ramCache[currentIndex];

    const obj = {
      type: existing?.type ?? currentTool,
      color: currentColor,
      x: startLocation?.x ?? existing.x,
      y: startLocation?.y ?? existing.y,
      width: existing?.width ?? currentWidth,
      height: existing?.height ?? currentHeight,
      path: existing?.path ?? currentPath,
      text: currentText ?? existing?.text,
    };

    if (currentIndex >= 0 && currentIndex < ramCache.length) {
      ramCache.splice(currentIndex, 1, obj);
    } else {
      ramCache.push(obj);
    }
  }

  function updateShape(e) {
    const curLocation = getMouseLocation(e);
    currentWidth = curLocation.x - startLocation.x;
    currentHeight = curLocation.y - startLocation.y;
    if (locked) {
      const squareRad = Math.max(Math.abs(currentWidth), Math.abs(currentHeight));
      currentWidth = currentWidth < 0 ? -squareRad : squareRad;
      currentHeight = currentHeight < 0 ? -squareRad : squareRad;
    }
    storeShape();
  }

  function updateDraw(e) {
    const curLocation = getMouseLocation(e);

    if (!lastLocation) {
      lastLocation = startLocation;
      currentPath = [];
    }

    const newPath = { x: curLocation.x, y: curLocation.y };
    const isLargeDistance = Math.hypot(curLocation.x - lastLocation.x, curLocation.y - lastLocation.y) > 10;
    const isFreeFlow = (!locked && isLargeDistance) || currentPath.length < 2;
    if (isFreeFlow) {
      currentPath.push(newPath);
      lastLocation = curLocation;
    } else if (locked) {
      currentPath.splice(currentPath.length - 1, 1, newPath);
    }
    storeShape();
  }

  function updateText(e) {
    if (!e.key) {
      storeShape();
      return;
    }

    const key = e.key;
    if (key.length > 1) {
      switch (key) {
        case "Enter":
          localStorage.setItem(cacheTitle, JSON.stringify(ramCache));
          reset();
          break;
        case "Backspace":
          currentText = currentText.slice(0, -1);
          storeShape();
          break;
      }
      return;
    }

    if (!currentText) currentText = ramCache[currentIndex]?.text ?? "";
    currentText += key;

    if (currentIndex === undefined) currentIndex = ramCache.length - 1;
    storeShape();
  }

  function update(e) {
    switch (ramCache[currentIndex]?.type ?? currentTool) {
      case "rect":
      case "circle":
        updateShape(e);
        break;
      case "draw":
        updateDraw(e);
        break;
      case "text":
        updateText(e);
        break;
    }
  }

  function reset() {
    startLocation = undefined;
    lastLocation = undefined;
    currentWidth = undefined;
    currentHeight = undefined;
    currentPath = undefined;
    currentText = undefined;
    currentIndex = undefined;
    locked = false;
  }

  function startDrawing(e) {
    if (["rect", "circle", "draw", "text"].includes(currentTool)) {
      startLocation = getMouseLocation(e);
      update(e);
      render();
    }
  }

  function endDrawing(e) {
    if (startLocation) {
      localStorage.setItem(cacheTitle, JSON.stringify(ramCache));
      reset();
      render();
    }
  }

  function updateDrawing(e) {
    if (currentIndex === undefined) currentIndex = ramCache.length - 1;
    update(e);
    render();
  }

  canvas.addEventListener("mousedown", function (e) {
    startDrawing(e);
  });

  canvas.addEventListener("mouseup", function (e) {
    if (currentTool === "mouse") {
      let clicked = findClickedShape(e);
      if (clicked) {
        currentIndex = ramCache.indexOf(clicked);
        render();
      }
      return;
    }
    if (startLocation && currentTool != "text") endDrawing(e);
  });

  canvas.addEventListener("mousemove", function (e) {
    if (startLocation && currentTool != "text") updateDrawing(e);
  });

  document.getElementById("erase-select-btn").addEventListener("click", function () {
    ramCache.splice(0, ramCache.length);
    localStorage.removeItem(cacheTitle);
    reset();
    render();
    sidePanel.children.item(0).click();
  });

  window.addEventListener("keyup", function (event) {
    if (event.key === "Shift" && currentTool != "text") {
      locked = false;
    }
  });

  window.addEventListener("keydown", function (event) {
    if (currentTool === "text" || (currentTool === "mouse" && ramCache[currentIndex]?.type === "text")) {
      update(event);
      console.log(ramCache);
      render();
      return;
    }

    if (event.key === "Shift") {
      locked = true;
    }
  });

  render();
});
