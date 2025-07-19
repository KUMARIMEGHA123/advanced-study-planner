const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const priority = document.getElementById("priority");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const search = document.getElementById("search");
const filters = document.querySelectorAll("[data-filter]");
const clearAllBtn = document.getElementById("clearAllBtn");
const toast = document.getElementById("toast");
const toggleTheme = document.getElementById("toggleTheme");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filterStatus = "all";

// Show toast
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

// Save tasks
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render tasks
function renderTasks() {
  taskList.innerHTML = "";
  const filtered = tasks.filter(task =>
    filterStatus === "all" ? true :
    filterStatus === "active" ? !task.completed :
    task.completed
  ).filter(task => task.text.toLowerCase().includes(search.value.toLowerCase()));

  filtered.forEach((task, i) => {
    const li = document.createElement("li");
    li.className = `${task.priority} ${task.completed ? "completed" : ""}`;
    li.innerHTML = `
      <div onclick="toggleComplete(${i})">
        <strong>${task.text}</strong><br/>
        <small>📅 ${task.date || "No date"}</small>
      </div>
      <button onclick="deleteTask(${i})">🗑</button>
    `;
    taskList.appendChild(li);
  });
}

// Add task
addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({
    text,
    date: taskDate.value,
    priority: priority.value,
    completed: false
  });

  taskInput.value = "";
  taskDate.value = "";
  priority.value = "low";
  saveTasks();
  renderTasks();
  showToast("Task added ✅");
});

// Toggle complete
window.toggleComplete = function (i) {
  tasks[i].completed = !tasks[i].completed;
  saveTasks();
  renderTasks();
}

// Delete task
window.deleteTask = function (i) {
  tasks.splice(i, 1);
  saveTasks();
  renderTasks();
  showToast("Task deleted ❌");
}

// Filter buttons
filters.forEach(btn => {
  btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filterStatus = btn.dataset.filter;
    renderTasks();
  });
});

// Search
search.addEventListener("input", renderTasks);

// Clear All
clearAllBtn.addEventListener("click", () => {
  if (confirm("Clear all tasks?")) {
    tasks = [];
    saveTasks();
    renderTasks();
    showToast("All tasks cleared 🧹");
  }
});

// Dark mode toggle
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  showToast("Theme toggled 🌗");
});

// Init
renderTasks();
