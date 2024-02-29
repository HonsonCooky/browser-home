import "../../global/index";
import "./styles.css";

window.addEventListener("load", function() {
  const todoSection = document.getElementById("to-do-list");
  const listItemHighlightClass = "list-highlight";

  function currentToDoList() {
    return document.activeElement.querySelector('.list[style*="display: flex"]');
  }

  function removeAllHighlights(listElement) {
    const items = Array.from(listElement.querySelectorAll(".list-item"));
    items.forEach((e) => e.classList.remove(listItemHighlightClass));
  }

  function selectAnotherItem(isDown) {
    let highlighted = -1;
    const items = Array.from(document.activeElement.querySelectorAll(".list-item")).map((e, i) => {
      if (e.classList.contains(listItemHighlightClass)) {
        highlighted = i;
      }
      e.classList.remove(listItemHighlightClass);
      return [i, e];
    });

    if (items.length === 0) return;

    let index = 0;
    if (highlighted != -1) index = isDown ? (highlighted + 1) % items.length : highlighted - 1;
    if (index < 0) index += items.length;
    const element = items[index][1];
    element.classList.add(listItemHighlightClass);
    element.scrollIntoView({ block: "center", inline: "nearest" });
  }

  const todoListIdSuffix = "-todo-list";
  const todoListSection = "To Do";
  const doneListSection = "Done";
  const todoMsgs = [
    "",
    "[T] Interact With List | [A-Z] Select List | [D] Delete List",
    "[Esc] Exit | [j,k,UP,DOWN] Select Item | <A-j,k,UP,DOWN> Move Item\n" +
    " [D] Toggle Done | [X] Delete | [s,/] Enter Input Field",
    "[Esc] Exit | [Enter] Add Item",
  ];
  const todoMsg = document.getElementById("todo-msg");

  function generateLI(listId, type, index, innerText) {
    const li = document.createElement("div");
    li.id = `${listId}-${type}-${index}`;
    li.className = "list-item";

    const indexor = document.createElement("span");
    indexor.innerText = "-";
    const text = document.createElement("span");
    text.innerText = innerText;

    if (type === doneListSection) {
      text.style.textDecoration = "line-through";
    }

    li.onclick = () => {
      if (type === todoListSection) {
        moveHighlightedToDoListItem(listId, index);
      } else if (type === doneListSection) {
      }
    };

    li.appendChild(indexor);
    li.appendChild(text);
    return li;
  }

  function loadLIs(listId, cacheItem) {
    const todos = [];
    const dones = [];

    for (let i = 0; i < cacheItem.todo.length; i++) {
      const li = generateLI(listId, todoListSection, i, cacheItem.todo[i]);
      todos.push(li);
    }
    for (let i = 0; i < cacheItem.done.length; i++) {
      const li = generateLI(listId, doneListSection, i, cacheItem.done[i]);
      dones.push(li);
    }

    return [todos, dones];
  }

  function getAllStorageLists() {
    return Object.entries(localStorage)
      .filter(([key, _]) => key.includes(todoListIdSuffix))
      .map(([key, value]) => [key, JSON.parse(value)]);
  }

  function reloadList(title) {
    const focusInput = document.activeElement.id.includes(`${title}-input`);
    const value = localStorage.getItem(title);

    // Reset the element
    const listElement = document.getElementById(`${title}-list`);
    listElement.innerHTML = "";
    listElement.innerText = "";

    const [todos, dones] = loadLIs(listElement.id, JSON.parse(value));
    const [todoDiv, doneDiv] = initToDoSubSections(title, todos, dones);
    if (todoDiv) listElement.appendChild(todoDiv);
    if (doneDiv) listElement.appendChild(doneDiv);
    const newEntryInput = createNewEntryInput(title);
    listElement.appendChild(newEntryInput);

    if (focusInput) {
      newEntryInput.focus();
    } else {
      listElement.tabIndex = -1;
      listElement.focus({ preventScroll: true });
      todoMsg.innerText = todoMsgs[2];
    }
  }

  function createNewEntryInput(title) {
    const newEntryInput = document.createElement("input");
    newEntryInput.id = `${title}-input`;
    newEntryInput.type = "text";
    newEntryInput.placeholder = "Add";
    newEntryInput.className = "new-item";
    newEntryInput.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        const parent = document.activeElement.closest("section, .layout, .list");
        addToDoListItem(parent.id.replace("-list-list", "-list"), newEntryInput.value);
      }
    });
    return newEntryInput;
  }

  function initToDoSubSections(title, todos, dones) {
    let todoDiv, doneDiv;

    // TODO Section
    if (todos.length > 0) {
      todoDiv = document.createElement("div");
      todoDiv.id = `${title}-${todoListSection}`;
      todoDiv.className = "sub-section";
      const todoTitle = document.createElement("h5");
      todoTitle.id = `${title}-todo-title`;
      todoTitle.innerText = `${todoListSection}:`;
      todoTitle.style.color = "rgba(var(--green))";
      todoDiv.appendChild(todoTitle);
      todos.forEach((e) => todoDiv.appendChild(e));
    }

    // DONE Section
    if (dones.length > 0) {
      doneDiv = document.createElement("div");
      doneDiv.id = `${title}-${doneListSection}`;
      doneDiv.className = "sub-section";
      const doneTitle = document.createElement("h5");
      doneTitle.id = `${title}-done-title`;
      doneTitle.innerText = `${doneListSection}:`;
      doneTitle.style.color = "rgba(var(--mauve))";
      doneDiv.appendChild(doneTitle);
      dones.forEach((e) => doneDiv.appendChild(e));
    }

    return [todoDiv, doneDiv];
  }

  function initListFromEntry(index, title, content) {
    const btnDefault = "rgba(var(--text))";
    const btnHighlight = "rgba(var(--teal))";

    // List button (title)
    let prettyTitle = `[${String.fromCharCode(index + 65)}] ${title.replace("-todo-list", "")}`;
    const btn = document.createElement("button");
    btn.id = `${prettyTitle}-btn`;
    btn.title = `${prettyTitle} button`;
    btn.innerText = prettyTitle;
    btn.type = "button";
    btn.style.color = index === 0 ? btnHighlight : btnDefault;

    // List contents
    const list = document.createElement("div");
    list.id = `${title}-list`;
    list.className = "list";
    list.style.display = index === 0 ? "flex" : "none";

    const [todos, dones] = loadLIs(list.id, content);
    const [todoDiv, doneDiv] = initToDoSubSections(title, todos, dones);
    if (todoDiv) list.appendChild(todoDiv);
    if (doneDiv) list.appendChild(doneDiv);

    const newEntryInput = createNewEntryInput(title);
    list.appendChild(newEntryInput);

    btn.onclick = () => {
      document.getElementById("new-list").style.color = btnDefault;
      todoLists.forEach((b) => (b.style.color = btnDefault));
      listViews.forEach((d) => (d.style.display = "none"));
      btn.style.color = btnHighlight;
      list.style.display = "flex";
    };

    return [btn, list];
  }

  function initNewListButton() {
    const btnDefault = "rgba(var(--text))";
    const btnHighlight = "rgba(var(--teal))";

    // NEW LIST BUTTON
    const btn = document.getElementById("new-list");

    const list = document.getElementById("new-list-view");
    list.style.display = "none";

    const newListInput = document.getElementById("new-list-title");
    newListInput.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        createToDoList(newListInput.value);

        // Highlight new list
        const newListBtn = document.querySelector(`[id*="${newListInput.value}-btn"]`);
        const listView = document.getElementById(`${newListInput.value}${todoListIdSuffix}-list`);
        if (newListBtn && listView) {
          newListBtn.click();
          listView.tabIndex = -1;
          listView.focus({ preventScroll: true });
        }
        newListInput.value = "";
      }
    });

    btn.onclick = () => {
      todoLists.forEach((b) => (b.style.color = btnDefault));
      listViews.forEach((d) => (d.style.display = "none"));
      btn.style.color = btnHighlight;
      list.style.display = "flex";
    };

    return list;
  }

  let todoLists,
    listViews = [];

  function initToDoLists() {
    todoLists = [];
    listViews = [];

    const header = "To Dos";
    const div = document.getElementById(`${header}-0`);
    Array.from(div.children)
      .filter(
        (item) =>
          !(
            item.classList.contains("header-container") ||
            item.classList.contains("btn-row") ||
            item.id === "new-list-view"
          ),
      )
      .forEach((child) => div.removeChild(child));

    const btnRow = document.getElementById(`${header}-btn-row`);
    Array.from(btnRow.children)
      .filter((item) => item.id != "new-list")
      .forEach((child) => {
        btnRow.removeChild(child);
      });

    const cacheLists = getAllStorageLists();
    for (let e = 0; e < cacheLists.length; e++) {
      const [title, content] = cacheLists[e];
      const [btn, list] = initListFromEntry(e, title, content);
      todoLists.push(btn);
      listViews.push(list);
    }

    const newListView = initNewListButton();
    listViews.push(newListView);

    todoLists.forEach((btn) => btnRow.insertBefore(btn, document.getElementById("new-list")));
    listViews.forEach((d) => div.appendChild(d));
    todoSection.appendChild(div);
  }

  function createToDoList(uniqueTitle) {
    if (uniqueTitle.length === 0) return;
    const title = `${uniqueTitle}${todoListIdSuffix}`;
    let check = localStorage.getItem(title);
    if (check) return;
    localStorage.setItem(
      title,
      JSON.stringify({
        todo: [],
        done: [],
      }),
    );
    initToDoLists();
  }

  function deleteToDoList(uniqueTitle) {
    localStorage.removeItem(uniqueTitle);
    initToDoLists();
  }

  function addToDoListItem(listId, text) {
    let cacheItem = localStorage.getItem(listId);
    if (!cacheItem) return;
    cacheItem = JSON.parse(cacheItem);
    localStorage.setItem(
      listId,
      JSON.stringify({
        todo: [...cacheItem.todo, text],
        done: [...cacheItem.done],
      }),
    );
    reloadList(listId);
  }

  function getHighlightedElementInfo() {
    const highlighted = document.activeElement.querySelector(".list-item.list-highlight");
    if (!highlighted) throw Error("No Highlighted List Item");

    const info = highlighted.id.split("-");
    const listId = `${info[0]}-${info[1]}-${info[2]}`;
    const section = info[info.length - 2];
    const index = parseInt(info[info.length - 1]);

    let cacheItem = localStorage.getItem(listId);
    if (!cacheItem) throw Error(`Can't find cache element with id ${listId}`);
    cacheItem = JSON.parse(cacheItem);

    const concernedArr = section === todoListSection ? cacheItem.todo : cacheItem.done;
    const otherArr = section === todoListSection ? cacheItem.done : cacheItem.todo;
    return { highlighted, info, listId, section, index, cacheItem, concernedArr, otherArr };
  }

  function deleteHighlightedToDoItem() {
    try {
      let { info, listId, index, cacheItem, concernedArr } = getHighlightedElementInfo();
      concernedArr = concernedArr.splice(index, 1);
      localStorage.setItem(listId, JSON.stringify(cacheItem));
      reloadList(listId);
      const listItem = document.getElementById(`${info.slice(0, info.length - 1).join("-")}-${index}`);
      if (listItem) {
        listItem.classList.add(listItemHighlightClass);
        listItem.scrollIntoView({ block: "center", inline: "nearest" });
      }
    } catch (e) {
      console.error(e);
      return;
    }
  }

  function shiftElement(arr, oldIndex, newIndex) {
    const item = arr.splice(oldIndex, 1)[0];
    arr.splice(newIndex, 0, item);
  }

  function moveHighlightedToDoListItem(isDown) {
    try {
      const { info, listId, index, cacheItem, concernedArr } = getHighlightedElementInfo();
      let newIndex = isDown ? (index + 1) % concernedArr.length : index - 1;
      if (newIndex < 0) newIndex += concernedArr.length;
      shiftElement(concernedArr, index, newIndex);

      localStorage.setItem(listId, JSON.stringify(cacheItem));
      reloadList(listId);
      const listItem = document.getElementById(`${info.slice(0, info.length - 1).join("-")}-${newIndex}`);
      if (listItem) {
        listItem.classList.add(listItemHighlightClass);
        listItem.scrollIntoView({ block: "center", inline: "nearest" });
      }
    } catch (e) {
      console.error(e);
      return;
    }
  }

  function toggleDoneHighlightedToDoListItem() {
    try {
      let { listId, section, index, cacheItem, concernedArr, otherArr } = getHighlightedElementInfo();
      otherArr.push(concernedArr[index]);
      concernedArr = concernedArr.splice(index, 1);
      localStorage.setItem(listId, JSON.stringify(cacheItem));
      reloadList(listId);
      const otherSection = section === todoListSection ? doneListSection : todoListSection;
      const listItem = document.getElementById(`${listId}-list-${otherSection}-${otherArr.length - 1}`);
      if (listItem) {
        listItem.classList.add(listItemHighlightClass);
        listItem.scrollIntoView({ block: "center", inline: "nearest" });
      }
    } catch (e) {
      console.error(e);
      return;
    }
  }

  initToDoLists();
});
