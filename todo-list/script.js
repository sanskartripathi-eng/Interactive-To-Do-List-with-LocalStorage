const STORAGE_KEY = "todo-tasks-v1";
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list");
const count = document.getElementById("count");
const clearDone = document.getElementById("clearDone");
const filters = document.getElementById("filters");

let tasks = load();
let filter = "all";

// ---- Storage (wrapped in try/catch: it can fail or come back empty) ----
function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? data : [];
  } catch (e) {
    return [];
  }
}
function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); } catch (e) {}
}

// ---- State changes ----
function addTask(text) {
  text = text.trim();
  if (!text) return;
  tasks.push({ id: Date.now() + Math.random(), text, done: false });
  save(); render();
}
function toggleTask(id) {
  const t = tasks.find(t => t.id === id);
  if (t) { t.done = !t.done; save(); render(); }
}
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  save(); render();
}

// ---- Rendering (DOM manipulation) ----
function render() {
  list.innerHTML = "";
  const visible = tasks.filter(t =>
    filter === "all" ? true : filter === "done" ? t.done : !t.done);

  if (!visible.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = tasks.length ? "Nothing here." : "No tasks yet. Add one above!";
    list.appendChild(empty);
  }

  visible.forEach(t => {
    const li = document.createElement("li");
    if (t.done) li.classList.add("done");

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = t.done;
    cb.setAttribute("aria-label", "Mark complete");
    cb.addEventListener("change", () => toggleTask(t.id));

    const span = document.createElement("span");
    span.textContent = t.text; // textContent avoids HTML injection
    span.addEventListener("click", () => toggleTask(t.id));

    const del = document.createElement("button");
    del.className = "del";
    del.textContent = "×";
    del.setAttribute("aria-label", "Delete task");
    del.addEventListener("click", () => deleteTask(t.id));

    li.append(cb, span, del);
    list.appendChild(li);
  });

  const left = tasks.filter(t => !t.done).length;
  count.textContent = left + (left === 1 ? " task left" : " tasks left");
  clearDone.style.visibility = tasks.some(t => t.done) ? "visible" : "hidden";
}

// ---- Event listeners ----
addBtn.addEventListener("click", () => {
  addTask(input.value);
  input.value = "";
  input.focus();
});
input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    addTask(input.value);
    input.value = "";
  }
});
filters.addEventListener("click", e => {
  const btn = e.target.closest("button[data-filter]");
  if (!btn) return;
  filter = btn.dataset.filter;
  filters.querySelectorAll("button").forEach(b => b.classList.toggle("active", b === btn));
  render();
});
clearDone.addEventListener("click", () => {
  tasks = tasks.filter(t => !t.done);
  save(); render();
});

render();
