interface ToDos {
  id: number;
  title: string;
  status: boolean;
}

let todos: ToDos[] = [];
const taskList = document.querySelector(".taskList") as HTMLDivElement;
const inputField = document.querySelector("input") as HTMLInputElement;
const addBtn = document.querySelector("button") as HTMLButtonElement;

const todosLocal = localStorage.getItem("todos");
if (todosLocal) {
  todos = JSON.parse(todosLocal);
  renderTasks();
}

addBtn.onclick = () => {
  const id = Math.floor(Math.random() * 100);
  todos.push({ id: id, title: inputField.value, status: false });
  localStorage.setItem("todos", JSON.stringify(todos));
  inputField.value = "";
  renderTasks();
};

function renderTasks() {
  taskList.innerHTML = "";
  todos.forEach((value) => {
    const div = document.createElement("div");
    div.classList.add("task");
    const para = document.createElement("p");
    para.textContent = value.title;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = value.status; 
    checkbox.onclick = () => updateTask(value.id);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";
    deleteBtn.classList.add("delete-button");
    deleteBtn.onclick = () => deleteTask(value.id);

    div.appendChild(checkbox);
    div.appendChild(para);
    div.appendChild(deleteBtn);
    taskList.appendChild(div);
  });
}

function deleteTask(id: number) {
  console.log(id);
  todos = todos.filter((value) => value.id !== id);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTasks();
}

function updateTask(id: number) {
  todos.forEach((value) => {
    if (value.id === id) {
      value.status = !value.status; 
      localStorage.setItem("todos", JSON.stringify(todos)); 
      renderTasks();
    }
  });
}
