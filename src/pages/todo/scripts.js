import "../../global/index";
import { addKeybinding, removeKeybindingFGroup } from "../../global/keybinds";
import "./styles.css";

window.addEventListener("load", function () {
  const todoSection = document.getElementById("to-do-lists");
  const todoBtnRow = document.getElementById("to-do-list-btn-row");
  const newListBtn = document.getElementById("new-list-btn");
  const newListView = document.getElementById("new-list-view");

  const listIdSuffix = "to-do-list";
  const listBtnSuffix = "to-do-btn";
  const todoDivSuffix = "to-do-section";
  const doneDivSuffix = "done-section";

  const listItemHighlightClass = "list-highlight";

  document.getElementById("new-list-title-input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addList(this.value);
      this.value = "";
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setTimeout(() => {
        const parent = document.activeElement.closest("div");
        parent.tabIndex = -1;
        parent.focus();
      }, 0);
      return;
    }
  });

  function getAllLists() {
    return Object.entries(localStorage)
      .filter(([key, _]) => key.includes(listIdSuffix))
      .map(([key, value]) => [key, JSON.parse(value)]);
  }

  function addList(title) {
    const listId = `${title}-${listIdSuffix}`;

    if (localStorage.getItem(listId)) return;

    localStorage.setItem(
      listId,
      JSON.stringify({
        todo: [],
        done: [],
      }),
    );

    refreshLists();
    document.getElementById(listId.replace(listIdSuffix, listBtnSuffix)).click();
  }

  function deleteList() {
    const list = getActiveList();
    if (!list) return;

    const listId = list.id;
    const btn = document.getElementById(`${listId.replace(listIdSuffix, listBtnSuffix)}`);
    const index = Array.from(todoBtnRow.children).indexOf(btn);

    localStorage.removeItem(listId);
    refreshLists();

    const arr = Array.from(todoBtnRow.children);
    if (arr.length > 0) {
      let newIndex = index;
      if (newIndex >= arr.length) newIndex -= 1;
      const nextListBtn = arr[newIndex];
      nextListBtn.click();
    }
  }

  function addItem(listId, text) {
    let cache = localStorage.getItem(listId);
    if (!cache) return;
    cache = JSON.parse(cache);
    localStorage.setItem(
      listId,
      JSON.stringify({
        todo: [...cache.todo, text],
        done: cache.done,
      }),
    );

    reloadList(listId);
    const input = getActiveList().querySelector("input");
    input.focus();
    input.scrollIntoView({ block: "center", inline: "nearest" });
  }

  function selectItem(direction) {
    const items = Array.from(document.activeElement.querySelectorAll("ul"))
      .map((e) => Array.from(e.children))
      .flat();
    const currentlySelected = document.activeElement.querySelector(`.${listItemHighlightClass}`);
    let curIndex = -1;
    if (currentlySelected) curIndex = items.indexOf(currentlySelected);

    let newIndex = curIndex;
    newIndex += direction === "DOWN" ? 1 : -1;
    newIndex = newIndex % items.length;
    if (newIndex < 0) newIndex = items.length - 1;

    items.forEach((e) => e.classList.remove(listItemHighlightClass));
    items[newIndex].classList.add(listItemHighlightClass);
  }

  function getCurrentlySelectedItemInfo() {
    const currentlySelected = document.activeElement.querySelector(`.${listItemHighlightClass}`);
    if (!currentlySelected) {
      return {};
    }
    const section = currentlySelected.id.includes(todoDivSuffix) ? todoDivSuffix : doneDivSuffix;

    const replaceMe = RegExp(`-${section}.*`);
    const listId = currentlySelected.id.replace(replaceMe, "");

    const ul = document.activeElement.querySelector(`ul[id*="${section}"]`);
    const items = Array.from(ul.children);

    const curIndex = items.indexOf(currentlySelected);

    return { currentlySelected, section, listId, ul, items, curIndex };
  }

  function toggleItem() {
    const { currentlySelected, section, listId, curIndex } = getCurrentlySelectedItemInfo();
    if (!currentlySelected) return;

    let cache = localStorage.getItem(listId);
    if (!cache) return;

    cache = JSON.parse(cache);
    const arr = section === todoDivSuffix ? cache.todo : cache.done;
    const oppArr = section === todoDivSuffix ? cache.done : cache.todo;
    const item = arr.splice(curIndex, 1)[0];
    oppArr.push(item);
    localStorage.setItem(listId, JSON.stringify(cache));
    reloadList(listId);

    const oppSection = section === todoDivSuffix ? doneDivSuffix : todoDivSuffix;
    const newSection = document.getElementById(`${listId}-${oppSection}-ul`);
    const newIndex = newSection.children.length - 1;
    const newLi = document.getElementById(currentlySelected.id.replace(section, oppSection).replace(/.$/, newIndex));
    newLi.classList.add(listItemHighlightClass);
  }

  function moveItem(direction) {
    const { currentlySelected, section, listId, items, curIndex } = getCurrentlySelectedItemInfo();
    if (!currentlySelected) return;

    let newIndex = curIndex;
    newIndex += direction === "DOWN" ? 1 : -1;
    newIndex = newIndex % items.length;
    if (newIndex < 0) newIndex = items.length - 1;

    let cache = localStorage.getItem(listId);
    if (!cache) return;

    cache = JSON.parse(cache);
    const arr = section === todoDivSuffix ? cache.todo : cache.done;
    const item = arr.splice(curIndex, 1)[0];
    arr.splice(newIndex, 0, item);
    localStorage.setItem(listId, JSON.stringify(cache));
    reloadList(listId);

    const newLi = document.getElementById(currentlySelected.id.replace(/.$/, newIndex));
    newLi.classList.add(listItemHighlightClass);
  }

  function deleteItem() {
    const { currentlySelected, section, listId, curIndex } = getCurrentlySelectedItemInfo();
    if (!currentlySelected) return;

    let cache = localStorage.getItem(listId);
    if (!cache) return;

    cache = JSON.parse(cache);
    const arr = section === todoDivSuffix ? cache.todo : cache.done;
    arr.splice(curIndex, 1);

    localStorage.setItem(listId, JSON.stringify(cache));
    reloadList(listId);

    if (arr.length > 0) {
      let newIndex = curIndex;
      if (newIndex >= arr.length) newIndex -= 1;
      const newLi = document.getElementById(currentlySelected.id.replace(/.$/, newIndex));
      newLi.classList.add(listItemHighlightClass);
    }
  }

  function getActiveList() {
    return document.activeElement.querySelector('.list[style*="display: flex"]');
  }

  function loadUL(ulElement, content) {
    for (const [item, index] of content.map((t, i) => [t, i])) {
      const li = document.createElement("li");
      li.id = `${ulElement.id}-li-${index}`;
      li.innerText = item;
      ulElement.appendChild(li);
    }
  }

  function btnClick(btn, listElement) {
    // Btn Highlighting
    Array.from(todoBtnRow.children).forEach((e) => (e.style.color = "rgba(var(--text))"));
    btn.style.color = "rgba(var(--sky))";

    // List Display management
    Array.from(document.querySelectorAll(".list")).forEach((e) => (e.style.display = "none"));
    listElement.style.display = "flex";

    // Focus Management
    listElement.tabIndex = -1;
    listElement.focus({ preventScroll: true });
  }

  function loadBtn(listElement, listId) {
    const btnId = listId.replaceAll(listIdSuffix, listBtnSuffix);
    let btn = document.getElementById(btnId);
    if (!btn) {
      btn = document.createElement("button");
      btn.id = btnId;
      btn.title = `${listId.replace(listIdSuffix, "")} Button`;
      btn.type = "button";
      btn.innerText = listId.replaceAll(`-${listIdSuffix}`, "");

      todoBtnRow.insertBefore(btn, newListBtn);
    }

    btn.addEventListener("click", () => btnClick(btn, listElement));
  }

  function loadList(listElement, listId, content) {
    const { todo, done } = content;
    listElement.innerHTML = "";
    listElement.style.display = "none";

    if (todo.length > 0) {
      const todoDiv = document.createElement("div");
      todoDiv.id = `${listId}-${todoDivSuffix}`;
      const todoDivH4 = document.createElement("h4");
      todoDivH4.innerText = "To Do:";
      const todoUL = document.createElement("ul");
      todoUL.id = `${listId}-${todoDivSuffix}-ul`;
      loadUL(todoUL, todo);

      todoDiv.appendChild(todoDivH4);
      todoDiv.appendChild(todoUL);
      listElement.appendChild(todoDiv);
    }

    if (done.length > 0) {
      const doneDiv = document.createElement("div");
      doneDiv.id = `${listId}-${doneDivSuffix}`;
      const doneDivH4 = document.createElement("h4");
      doneDivH4.innerText = "Done:";
      const doneUL = document.createElement("ul");
      doneUL.id = `${listId}-${doneDivSuffix}-ul`;
      loadUL(doneUL, done);

      doneDiv.appendChild(doneDivH4);
      doneDiv.appendChild(doneUL);
      listElement.appendChild(doneDiv);
    }

    const newEntryInput = document.createElement("input");
    newEntryInput.id = `${listId} -input`;
    newEntryInput.placeholder = "[/] Add Item";
    newEntryInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        addItem(listId, newEntryInput.value);
        newEntryInput.value = "";
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        setTimeout(() => {
          const parent = document.activeElement.closest("div");
          parent.tabIndex = -1;
          parent.focus();
        }, 0);
        return;
      }
    });

    listElement.appendChild(newEntryInput);

    loadBtn(listElement, listId);
  }

  function reloadList(listId) {
    const list = JSON.parse(localStorage.getItem(listId));
    if (!list) return;

    const listElement = document.getElementById(listId);
    if (!listElement) return;

    loadList(listElement, listId, list);
    listElement.style.display = "flex";
  }

  function setListKeybinding(listId) {
    const btn = document.getElementById(listId.replace(listIdSuffix, listBtnSuffix));
    const btnIndex = Array.from(todoBtnRow.children).indexOf(btn);
    const charIndex = ((btnIndex + 64) % 94) + 33;
    const keybindingChar = String.fromCharCode(charIndex);
    const keybindingName = btn.id.replace(`-${listBtnSuffix}`, "");
    addKeybinding({
      keyPath: `j.f.${keybindingChar}`,
      name: `.ToDo Lists.${keybindingName}`,
      action: () => btn.click(),
    });
  }

  function setDefaultListKeybinds() {
    addKeybinding({
      keyPath: `j.f.+`,
      name: `.ToDo Lists.Create New List`,
      action: () => newListBtn.click(),
    });

    addKeybinding({
      keyPath: `j.f.D`,
      name: `.ToDo Lists.Delete Current List`,
      action: deleteList,
    });
  }

  function refreshLists() {
    let lists = getAllLists();
    const listIds = lists.map((e) => e[0]);
    const existingLists = Array.from(todoBtnRow.children)
      .map((e) => e.id)
      .filter((id) => id != "new-list-btn");

    // Remove lists that don't exist
    for (const btnId of existingLists) {
      const listId = btnId.replace(listBtnSuffix, listIdSuffix);

      // List still exists, remove from lists to avoid recreating
      if (listIds.includes(listId)) {
        lists = lists.filter(([id, _]) => id != listId);
        continue;
      }

      // List no longer exists, remove
      todoBtnRow.removeChild(document.getElementById(btnId));
      todoSection.removeChild(document.getElementById(listId));
    }

    // Add remaining lists to be added
    let index = 0;
    for (const [id, contents] of lists) {
      initList(id, contents);
      if (index === 0) todoBtnRow.children.item(0).click();
      index++;
    }

    removeKeybindingFGroup();
    setDefaultListKeybinds();
    for (const [id, _] of getAllLists()) {
      setListKeybinding(id);
    }
  }

  function initList(listId, content) {
    const newList = document.createElement("div");
    newList.id = listId;
    newList.className = "list";

    loadList(newList, listId, content);
    todoSection.appendChild(newList);
  }

  // Init Create List Elements
  newListBtn.addEventListener("click", () => btnClick(newListBtn, newListView));
  newListBtn.click();

  // Init All Lists
  const lists = getAllLists();
  let index = 0;
  removeKeybindingFGroup();
  setDefaultListKeybinds();
  for (const [id, contents] of lists) {
    initList(id, contents);
    setListKeybinding(id);
    if (index === 0) {
      todoBtnRow.children.item(0).click();
      document.activeElement.blur();
    }
    index += 1;
  }

  window.addEventListener("keydown", function (event) {
    if (document.activeElement.classList.contains("list")) {
      switch (event.key) {
        case "j":
          if (event.altKey) moveItem("DOWN");
          else selectItem("DOWN");
          break;
        case "k":
          if (event.altKey) moveItem("UP");
          else selectItem("UP");
          break;
        case "d":
          toggleItem();
          break;
        case "X":
          deleteItem();
          break;
        case "/":
          event.preventDefault();
          document.activeElement.querySelector("input").focus();
          break;
        case "Escape":
          Array.from(document.activeElement.querySelectorAll("ul"))
            .map((e) => Array.from(e.children))
            .flat()
            .forEach((e) => e.classList.remove(listItemHighlightClass));
          document.activeElement.blur();
          break;
      }
    }
  });
});
