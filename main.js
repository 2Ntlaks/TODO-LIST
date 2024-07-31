const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");
const clearCompletedButton = document.getElementById("clearCompleted");
const toggleDarkModeButton = document.getElementById("toggleDarkMode");

const todos = JSON.parse(localStorage.getItem("todos"));
if (todos) {
  todos.forEach((todo) => addToDo(todo));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    alert("Please enter a to-do item.");
  } else {
    addToDo();
  }
});

function addToDo(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }
  if (todoText) {
    const todoElement = document.createElement("li");
    if (todo && todo.completed) {
      todoElement.classList.add("completed");
    }

    todoElement.innerText = todoText;

    todoElement.addEventListener("click", () => {
      todoElement.classList.toggle("completed");
      updateLS();
    });

    let touchTimer;
    todoElement.addEventListener("touchstart", (e) => {
      touchTimer = setTimeout(() => {
        todoElement.remove();
        updateLS();
      }, 800); // 800ms for long press
    });

    todoElement.addEventListener("touchend", (e) => {
      if (touchTimer) {
        clearTimeout(touchTimer);
        if (!todoElement.classList.contains("completed")) {
          todoElement.classList.toggle("completed");
          updateLS();
        }
      }
    });

    todosUL.appendChild(todoElement);
    input.value = "";

    updateLS();
  }
}

function updateLS() {
  const todoElements = document.querySelectorAll("li");

  const todos = [];

  todoElements.forEach((todoElement) => {
    todos.push({
      text: todoElement.innerText,
      completed: todoElement.classList.contains("completed"),
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

clearCompletedButton.addEventListener("click", () => {
  const completedTodos = document.querySelectorAll(".todos li.completed");
  completedTodos.forEach((todo) => todo.remove());
  updateLS();
});

toggleDarkModeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);
});

// Load dark mode preference
document.addEventListener("DOMContentLoaded", () => {
  const darkMode = JSON.parse(localStorage.getItem("darkMode"));
  if (darkMode) {
    document.body.classList.add("dark-mode");
  }
});
