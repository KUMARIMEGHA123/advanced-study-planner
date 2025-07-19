// app.js

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const dueDate = document.getElementById("dueDate");
const priority = document.getElementById("priority");
const category = document.getElementById("category");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateProgress() {
  const completed = tasks.filter(t => t.completed).length;
  const percent = tasks.length ? (completed / tasks.length) * 100 : 0;
  progressBar.value = percent;
  progressText.innerText = `${Math.round(percent)}% Completed`;
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task ${task.completed ? "completed" : ""} ${task.priority}`;
    li.innerHTML = `
      <span contenteditable="true" onblur="editTask(${index}, this)">${task.text}</span>
      <small>📅 ${task.date || "No Due Date"} | 🏷 ${task.category}</small>
      <div>
        <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleComplete(${index})">
        <button onclick="deleteTask(${index})">❌</button>
      </div>
    `;
    taskList.appendChild(li);
  });
  updateProgress();
}

function addTask() {
  if (taskInput.value.trim() === "") return;
  tasks.push({
    text: taskInput.value,
    date: dueDate.value,
    priority: priority.value,
    category: category.value,
    completed: false,
    createdAt: Date.now()
  });
  saveTasks();
  renderTasks();
  taskInput.value = "";
  dueDate.value = "";
  priority.value = "low";
  category.value = "";
  showToast("Task added");
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
  showToast("Task deleted");
}

function filterTasks(type) {
  if (type === "all") renderTasks();
  else {
    const filtered = tasks.filter(t => type === "completed" ? t.completed : !t.completed);
    taskList.innerHTML = "";
    filtered.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = `task ${task.completed ? "completed" : ""} ${task.priority}`;
      li.innerHTML = `<span>${task.text}</span><small>${task.date}</small>`;
      taskList.appendChild(li);
    });
  }
}

function searchTasks() {
  const term = document.getElementById("searchInput").value.toLowerCase();
  const filtered = tasks.filter(t => t.text.toLowerCase().includes(term));
  taskList.innerHTML = "";
  filtered.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task ${task.completed ? "completed" : ""} ${task.priority}`;
    li.innerHTML = `<span>${task.text}</span><small>${task.date}</small>`;
    taskList.appendChild(li);
  });
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.className = "toast";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

function editTask(index, element) {
  tasks[index].text = element.innerText;
  saveTasks();
  showToast("Task updated");
}

document.getElementById("addTaskBtn").addEventListener("click", addTask);
document.getElementById("searchInput").addEventListener("input", searchTasks);

renderTasks();
