const contOfTasks = document.querySelector(".tasks__count"),
      contOfCompleteTask = document.querySelector(".coplete__count"),
      
      todoList = document.querySelector(".todo__list"),
      todoListItem = document.querySelectorAll(".todo__list__item"),
      
      todoForm = document.querySelector(".todo__form"),
      addInput = document.querySelector(".add__input"),
      addButton = document.querySelector(".add__button");

let idCheckbox = 1,
    allTaskcount = 1,
    allCompleteTaslCount = 0;

todoForm.addEventListener("submit", addTodoItem);

function addTodoItem(e) {
  e.preventDefault();

  if (addInput.value === "") return alert("You can't enter an empty string");

  const todoItem = createTodoItem(addInput.value);

  todoList.appendChild(todoItem);

  contOfTasks.textContent = allTaskcount;

  addInput.value = "";
}

function createTodoItem(title) {
  idCheckbox += 1;
  allTaskcount += 1;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "list__item__checkbox";
  checkbox.id = "checkbox_" + idCheckbox;

  const label = document.createElement("label")
  label.htmlFor = "checkbox_" + idCheckbox;
  label.className = "list__item__title";
  label.textContent = title;

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "list__item__textfield";

  const editButton = document.createElement("button");
  editButton.className = "list__item__edit button";
  editButton.textContent = "Edit"

  const deleteButton = document.createElement("button");
  deleteButton.className = "list__item__delete button";
  deleteButton.textContent = "Delete";


  const  listItem = document.createElement("li");
  listItem.className = "todo__list__item";

  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  bindEvents(listItem);

  return listItem;
}

function bindEvents(todoItem) {
  const checkbox = todoItem.querySelector(".list__item__checkbox");
  const editButton = todoItem.querySelector(".list__item__edit");
  const deleteButton = todoItem.querySelector(".list__item__delete");

  checkbox.addEventListener("change", toggleTodoItem);
  editButton.addEventListener("click", editTodoItem);
  deleteButton.addEventListener("click", deleteTodoItem);
}

function toggleTodoItem(e) {
  const listItem = this.parentElement;
  listItem.classList.toggle("complete");

  allCompleteTaslCount = this.checked ? allCompleteTaslCount + 1 : allCompleteTaslCount - 1 > 0 ? allCompleteTaslCount - 1 : 0;
  
  contOfCompleteTask.textContent = allCompleteTaslCount;
}

function editTodoItem(e) {
  const listItem = this.parentElement;
  const title = listItem.querySelector(".list__item__title");
  const editInput = listItem.querySelector(".list__item__textfield");
  const isEditing = editInput.classList.toggle("editing"); 

  if (isEditing) {
    editInput.value = title.textContent;
    this.textContent = "Save"
  } else {
    title.textContent = editInput.value;
    console.log(editInput.value);
    this.textContent = "Edit";
  }
}

function deleteTodoItem(e) {
   const listItem = this.parentElement;
   const checkbox = listItem.querySelector(".list__item__checkbox");

   allCompleteTaslCount = checkbox.checked && allCompleteTaslCount - 1 >= 0 ? allCompleteTaslCount - 1 : allCompleteTaslCount;
   contOfCompleteTask.textContent = allCompleteTaslCount;

   allTaskcount = allTaskcount > 0 ? allTaskcount - 1 : 0;
   contOfTasks.textContent = allTaskcount;
   
   listItem.remove();
}

function init() {
  todoListItem.forEach(bindEvents);
}

document.addEventListener("DOMContentLoaded", init);