/*
* Избавимся от глобальных переменных с помощью анонимной самовызываюзейся функции 
*/
const init = (function(document) {
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

  function createElement(tag, properties, ...children) {
      const element = document.createElement(tag);
      
      //Нужно пройтис по все свойствам объекта и НЕ учитывать унаследованные св-ва (так как for in учитывает и унаследованные св-ва)
      for (let prop in properties) {
        if (properties.hasOwnProperty(prop)) {
          element[prop] = properties[prop];
        }
      }

      //Добавляем детей к родителю
      for (let i = 0; i < children.length; i++) {
        element.appendChild(children[i]);
      }

     return element;
  }

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

    const checkbox = createElement("input", {type: "checkbox", className: "list__item__checkbox", id: "checkbox_" + idCheckbox});
    const label = createElement("label", {htmlFor: "checkbox_" + idCheckbox, className: "list__item__title", textContent: title});
    const editInput = createElement("input", {type: "text", className: "list__item__textfield"});
    const editButton = createElement("button", {className: "list__item__edit button", textContent: "Edit"});
    const deleteButton = createElement("button", {className: "list__item__delete button", textContent: "Delete"});
    const  listItem = createElement("li", {className: "todo__list__item"}, checkbox, label, editInput, editButton, deleteButton);

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

  // document.addEventListener("DOMContentLoaded", init);
  return init
}(document));

init();

