import { loadKeymap } from "../assets/global.js";

const todoInput = document.querySelector("input");
const submitBtn = document.querySelector("button");
const todoContainer = document.getElementById("todos");
const doneContainer = document.getElementById("dones");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");
const cacheKey = "honsoncooky-todos";
let selectedItemIndex = undefined;

loadKeymap({
  name: "ToDo Actions",
  i: {
    name: "Focus Input",
    action: () => focusInput(),
  },
  Escape: {
    name: "Unfocus Input",
    action: () => unfocusInput(),
  },
  Enter: {
    name: "Submit",
    action: () => submitBtn.click(),
  },
  u: {
    name: "Select Item Up",
    action: () => selectAnotherItem(false),
  },
  d: {
    name: "Select Item Down",
    action: () => selectAnotherItem(true),
  },
  t: {
    name: "Toggle Item Done",
    action: () => toggleSelectedItem(),
  },
  x: {
    name: "Delete Item",
    action: () => removeItem(),
  },
});

function getItemHtmlId(item) {
  return `todos-${item.id}-${item.isDone}`;
}

function firstDoneIndex() {
  const firstDone = cache.findIndex((i) => i.isDone);
  if (firstDone > -1) return firstDone;
  return cache.length;
}

function focusInput() {
  todoInput.focus();

  if (selectedItemIndex != undefined) {
    const item = cache[selectedItemIndex];
    const itemHtmlId = getItemHtmlId(item);
    const htmlElement = document.getElementById(itemHtmlId);
    if (htmlElement) htmlElement.classList.remove("selected");
    selectedItemIndex = undefined;
  }
}

function unfocusInput() {
  todoInput.value = "";
  todoInput.blur();
}

function selectAnotherItem(isDown) {
  const oldSelectedIndex = selectedItemIndex;

  if (selectedItemIndex === undefined) selectedItemIndex = isDown ? 0 : cache.length - 1;
  else if (isDown) selectedItemIndex = (selectedItemIndex + 1) % cache.length;
  else selectedItemIndex = (selectedItemIndex - 1 + cache.length) % cache.length;

  if (oldSelectedIndex != undefined) {
    const oldItem = cache[oldSelectedIndex];
    const oldItemHtmlId = getItemHtmlId(oldItem);
    const oldHtmlElement = document.getElementById(oldItemHtmlId);
    if (oldHtmlElement) oldHtmlElement.classList.remove("selected");
  }

  const item = cache[selectedItemIndex];
  const itemHtmlId = getItemHtmlId(item);
  const htmlElement = document.getElementById(itemHtmlId);
  if (htmlElement) htmlElement.classList.add("selected");
}

function renderLists() {
  todoList.innerHTML = "";
  doneList.innerHTML = "";

  for (let i = 0; i < cache.length; i++) {
    const item = cache[i];
    const li = document.createElement("li");
    li.id = getItemHtmlId(item);
    li.innerText = item.value;
    if (i === selectedItemIndex) li.classList.add("selected");
    if (item.isDone) doneList.appendChild(li);
    else todoList.appendChild(li);
  }

  if (todoList.children.length) todoContainer.style.display = "flex";
  else todoContainer.style.display = "none";

  if (doneList.children.length) doneContainer.style.display = "flex";
  else doneContainer.style.display = "none";
}

function updateCache() {
  const jsonCache = JSON.stringify(cache);
  localStorage.setItem(cacheKey, jsonCache);
  renderLists();
}

function addItem(item) {
  cache.splice(firstDoneIndex(), 0, item);
  updateCache();
}

function toggleSelectedItem() {
  if (selectedItemIndex != undefined) {
    const item = cache[selectedItemIndex];
    item.isDone = !item.isDone;

    cache.splice(selectedItemIndex, 1);
    if (item.isDone) {
      // Add to end of cache
      cache.push(item);
    } else {
      // Add item to end of "todo"
      cache.splice(firstDoneIndex(), 0, item);
    }

    updateCache();
  }
}

function removeItem() {
  if (selectedItemIndex === undefined) return;
  const item = cache[selectedItemIndex];
  cache = cache.filter((i) => i.id != item.id);

  if (cache.length > 0) {
    selectedItemIndex = selectedItemIndex % cache.length;
    const item = cache[selectedItemIndex];
    const itemHtmlId = getItemHtmlId(item);
    const htmlElement = document.getElementById(itemHtmlId);
    if (htmlElement) htmlElement.classList.add("selected");
  } else selectedItemIndex = undefined;

  updateCache();
}

submitBtn.addEventListener("click", function() {
  const value = todoInput.value;
  if (!value || value.length === 0) return;
  const item = {
    id: crypto.randomUUID(),
    value,
    isDone: false,
  };
  addItem(item);
  todoInput.value = "";
});

let cache = JSON.parse(localStorage.getItem(cacheKey) ?? "[]");
renderLists();
