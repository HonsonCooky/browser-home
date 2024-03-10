import "./styles.css";
import "../../global/index";

window.addEventListener("load", function () {
  // Mutable State
  let currentIndex = undefined;
  let shiftLocked = false;
  let currentColor = "--text";

  // Storage
  const cacheTitle = "canvas-drawing";
  const localCache = localStorage.getItem(cacheTitle);
  const memCache = localCache ? Array.from(JSON.parse(localCache)) : [];
  const fontSize = 20;

  // Load Buttons
  const sidePanel = document.getElementById("canvas-side-panel");
  const textStyle = "rgba(var(--text))";
  const highlightStyle = "rgba(var(--teal))";

  Array.from(sidePanel.children).forEach((e, i) => {
    e.addEventListener("click", function () {
      Array.from(sidePanel.children).forEach((e) => {
        if (e.id != "color-select-btn") e.querySelector("i").style.color = textStyle;
        else e.querySelector("i").style.color = `rgba(var(${currentColor}))`;
      });
      e.querySelector("i").style.color = highlightStyle;
    });

    if (i === 0) e.click();
  });

  // Color Swatch
  const colorSelectPanel = document.getElementById("color-selection");
  Array.from(colorSelectPanel.children).forEach((btn) => {
    btn.style.background = `rgba(var(--${btn.id}))`;
    btn.addEventListener("click", () => {
      currentColor = `--${btn.id}`;
      document.getElementById("color-select-btn").querySelector("i").style.color = `rgba(var(${currentColor}))`;

      if (currentIndex != undefined) {
        memCache[currentIndex] = {
          ...memCache[currentIndex],
          color: currentColor,
        };
        localStorage.setItem(cacheTitle, JSON.stringify(memCache));
        render();
      }

      colorSelectPanel.style.display = "none";
    });
  });

  function currentTool() {
    return Array.from(sidePanel.children)
      .filter((e) => e.querySelector("i").style.color === highlightStyle)[0]
      ?.id.split("-")[0];
  }

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
    if (shape.type === "rect" || shape.type === "circle") {
      const { from, to } = shape;
      if (!from || !to) return {};
      return { x1: from.x, y1: from.y, x2: to.x, y2: to.y };
    }
    if (shape.type === "text") {
      const x2 = shape.from.x + context.measureText(shape.text).width;
      const y1 = shape.from.y - (fontSize + 2);
      const y2 = y1 + fontSize + 10;
      return { x1: shape.from.x, y1, x2, y2 };
    }
    if (shape.type === "draw") {
      if (!shape.path || shape.path.length < 1) return {};
      let [x1, y1, x2, y2] = [undefined, undefined, undefined, undefined];
      for (const path of shape.path) {
        if (!x1 || path.x < x1) x1 = path.x;
        if (!y1 || path.y < y1) y1 = path.y;
        if (!x2 || path.x > x2) x2 = path.x;
        if (!y2 || path.y > y2) y2 = path.y;
      }
      return { x1, y1, x2, y2 };
    }
    return {};
  }

  function findClickedShape(e) {
    const { x, y } = getMouseLocation(e);
    const [mouseX, mouseY] = [x, y];
    let clicked = undefined;
    for (const [shape, index] of memCache.map((s, i) => [s, i])) {
      const { x1, y1, x2, y2 } = getShapeBoundary(shape);
      if (!x1 || !y1 || !x2 || !y2) return;
      const xBetween = isBetween(mouseX, x1, x2);
      const yBetween = isBetween(mouseY, y1, y2);
      if (xBetween && yBetween) {
        clicked = index;
      }
    }
    return clicked;
  }

  function getColorHex(color) {
    const rgb = getComputedStyle(document.documentElement).getPropertyValue(color);
    const [r, g, b] = rgb.split(",").map((s) => Number(s));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  function getWidthHeight(shape) {
    if (!shape.to) return [];
    let width = shape.to.x - shape.from.x;
    let height = shape.to.y - shape.from.y;

    if (shape.shiftLocked) {
      const [oriX, oriY] = [width > 0, height > 0];
      const value = Math.max(Math.abs(width), Math.abs(height));

      width = oriX ? value : -value;
      height = oriY ? value : -value;
    }

    return [width, height];
  }

  function drawRect(shape) {
    context.beginPath();
    const [width, height] = getWidthHeight(shape);
    if (!width || !height) return;
    context.roundRect(shape.from.x, shape.from.y, width, height, window.innerHeight / (100 / 2));
    context.stroke();
  }

  const toRads = (degrees) => degrees * (Math.PI / 180);
  function drawEllipse(shape) {
    const [width, height] = getWidthHeight(shape);
    if (!width || !height) return;
    const radiiX = width / 2;
    const radiiY = height / 2;
    const centerX = shape.from.x + radiiX;
    const centerY = shape.from.y + radiiY;
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
    context.fillText(shape.text, shape.from.x, shape.from.y);
  }

  function highlightSelected() {
    if (currentIndex === undefined) return;
    const shape = memCache[currentIndex];
    if (!shape) return;

    const { x1, y1, x2, y2 } = getShapeBoundary(shape);
    if (!x1 || !y1 || !x2 || !y2) return;
    context.strokeStyle = getColorHex("--red");
    context.setLineDash([5, 5]);
    context.strokeRect(x1, y1, x2 - x1, y2 - y1);
  }

  function render() {
    clearCanvas();
    context.lineWidth = 4;
    for (const shape of memCache) {
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

  function moveShape(e) {
    const location = getMouseLocation(e);
    const shape = memCache[currentIndex];

    if (!location || !shape) return;

    const [diffX, diffY] = [location.x - mouseDownLocation.x, location.y - mouseDownLocation.y];

    if (shape.type === "rect" || shape.type === "circle") {
      memCache[currentIndex] = {
        ...shape,
        from: {
          x: shape.from.x + diffX,
          y: shape.from.y + diffY,
        },
        to: {
          x: shape.to.x + diffX,
          y: shape.to.y + diffY,
        },
      };
    } else if (shape.type === "draw") {
      const newPath = shape.path.map((p) => {
        return {
          x: p.x + diffX,
          y: p.y + diffY,
        };
      });
      memCache[currentIndex] = {
        ...shape,
        from: {
          x: shape.from.x + diffX,
          y: shape.from.y + diffY,
        },
        path: newPath,
      };
    } else if (shape.type === "text") {
      memCache[currentIndex] = {
        ...shape,
        from: {
          x: shape.from.x + diffX,
          y: shape.from.y + diffY,
        },
      };
    }

    mouseDownLocation = location;
  }

  function updateShape(e) {
    let location = getMouseLocation(e);
    const tool = currentTool();

    if (!tool || currentIndex === undefined) return;

    // Move Drawing
    if (tool === "mouse" && mouseDownLocation) {
      moveShape(e);
      return;
    }

    // Update Object Values
    let shape = memCache[currentIndex];
    if (tool === "rect" || tool === "circle") {
      memCache[currentIndex] = {
        ...shape,
        to: location,
        shiftLocked,
      };
      return;
    }

    if (tool === "draw") {
      let path;
      if (shape.path) {
        path = shape.path;
        let last = shape.path[shape.path.length - 1];
        if (Math.hypot(location.x - last.x, location.y - last.y) < 10) {
          return;
        }
      } else {
        path = [location];
      }

      if (shiftLocked) path[path.length - 1] = location;
      else path.push(location);

      memCache[currentIndex] = {
        ...shape,
        path,
      };
    }
  }

  function endShape(e) {
    updateShape(e);
    const tool = currentTool();
    if (tool != "text") {
      if (tool != "mouse") currentIndex = undefined;
      localStorage.setItem(cacheTitle, JSON.stringify(memCache));
    }
  }

  function startShape(e) {
    const location = getMouseLocation(e);
    const tool = currentTool();

    if (["rect", "circle", "draw", "text"].includes(tool)) {
      memCache.push({
        type: tool,
        color: currentColor,
        from: location,
      });
      currentIndex = memCache.length - 1;
    } else if (tool === "mouse") {
      mouseDownLocation = location;
      currentIndex = findClickedShape(e);
    }
    render();
  }

  let mouseDownLocation = undefined;

  canvas.addEventListener("mousedown", function (e) {
    startShape(e);
  });

  canvas.addEventListener("mouseup", function (e) {
    mouseDownLocation = undefined;
    endShape(e);
  });

  canvas.addEventListener("mousemove", function (e) {
    updateShape(e);
    render();
  });

  document.getElementById("color-select-btn").addEventListener("click", function () {
    colorSelectPanel.style.display = "flex";
  });

  document.getElementById("erase-select-btn").addEventListener("click", function () {
    memCache.splice(0, memCache.length);
    localStorage.removeItem(cacheTitle);
    render();
  });

  window.addEventListener("keyup", function (event) {
    if (event.key === "Shift") {
      shiftLocked = false;
    }
  });

  window.addEventListener("keydown", function (event) {
    let shape = memCache[currentIndex];
    const tool = currentTool();

    if (tool === "mouse" && currentIndex != undefined && event.key === "Delete") {
      memCache.splice(currentIndex, 1);
      currentIndex = undefined;
      localStorage.setItem(cacheTitle, JSON.stringify(memCache));
      render();
      return;
    }

    if (tool === "text" || (shape && shape.type === "text")) {
      if (event.key === "Enter") {
        currentIndex = undefined;
        localStorage.setItem(cacheTitle, JSON.stringify(memCache));
        render();
        return;
      }

      const oldIndex = currentIndex;

      if (!shape) {
        currentIndex = memCache.length - 1;
        shape = memCache[currentIndex];
        if (shape.type != "text") return;
      }

      let text = shape.text ?? "";
      if (event.key === "Backspace" && text.length > 0) text = text.slice(0, -1);
      else if (event.key.length === 1) text += event.key;

      memCache[currentIndex] = {
        ...shape,
        text,
      };

      render();
      currentIndex = oldIndex;
      return;
    }

    if (event.key === "Shift") {
      shiftLocked = true;
    }
  });

  render();
});
