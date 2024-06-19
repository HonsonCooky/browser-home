import { loadKeymap } from "../assets/global.js";

const todoInput = document.querySelector("input");
const submitBtn = document.querySelector("button");
const keymaps = {
  name: "ToDo Actions",
  i: {
    name: "Insert",
    action: () => todoInput.focus(),
  },
  Escape: {
    name: "Delete",
    action: () => {
      todoInput.value = "";
      todoInput.blur();
    },
  },
  Enter: {
    name: "Submit",
    action: () => submitBtn.click(),
  },
};

loadKeymap(keymaps);

const cache = JSON.parse(localStorage.getItem("honsoncooky-todos") ?? "[]");
