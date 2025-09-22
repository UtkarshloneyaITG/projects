console.log("task manager running");

let task_form = document.querySelector(".add-task-body");
let taskTitle = document.getElementById("task");
let taskDiscription = document.getElementById("task-info");
let taskDue = document.getElementById("dueData");
let priroty = document.getElementById("priroty");
let all_task_container = document.querySelector(".all-task-container");
let note_container = document.querySelector(".note-container");
let note_form = document.getElementById("note-form");
let note_text_area = document.getElementById("note-textarea");
let notes_page = document.querySelector(".notes-page");

let task_manager_grid = document.querySelector(".task-manager-grid");
let add_task_box = document.querySelector(".add-task-box");
let all_task_viewer = document.querySelector(".all-task-viewer");

let localTask = localStorage.getItem("task");
let localNotes = localStorage.getItem("notes");

let arrayOfTasks = [];
let arrayOfNotes = [];
let tasks = JSON.parse(localTask);
let note = JSON.parse(localNotes);
if (tasks) {
  arrayOfTasks = tasks;
}
if (note) {
  arrayOfNotes = note;
}
task_form.addEventListener("submit", (e) => {
  e.preventDefault();
  let obj = {
    task: taskTitle.value,
    description: taskDiscription.value,
    date: taskDue.value,
    priroty: priroty.value,
    pending: true,
  };
  taskTitle.value = "";
  taskDiscription.value = "";
  taskDue.value = "";
  priroty.value.value = "";
  console.log(obj);
  arrayOfTasks.push(obj);
  localStorage.setItem("task", JSON.stringify(arrayOfTasks));
  task_manager_grid.style.display = "block";
  add_task_box.style.display = "none";
});
note_form.addEventListener("submit", (e) => {
  e.preventDefault();
  arrayOfNotes.push(note_text_area.value);
  note_text_area.value = "";
  localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
  renderNotes();
  console.log(arrayOfNotes);
});
function renderTask() {
  task_manager_grid.style.display = "none";
  all_task_viewer.style.display = "block";
  all_task_container.innerHTML = "";
  arrayOfTasks.forEach((value, index) => {
    let taskCompleted = value.pending ? "none" : "line-through";
    let color =
      value.priroty == "high"
        ? "red"
        : value.priroty == "medium"
        ? "yellow"
        : "green";
    let div = document.createElement("div");
    div.setAttribute("class", "task-info-contain");
    div.setAttribute("style", `text-decoration:${taskCompleted}`);
    div.innerHTML = `
    <div class="task-left">
                <div><div class="priroty-bar" style="background-color:${color}"></div></div>
                <div>
                  <h3>${value.task}</h3>
                  <p>Due : ${value.date} - priroty - ${value.priroty}</p>
                  <span>${value.description}</span>
                </div>
              </div>
              <div class="task-right">
                <button onclick="taskCompleted(this,${index})">✔️</button>
                <button onclick="deleteTask(this,${index})">🗑️</button>
              </div>
    `;
    all_task_container.appendChild(div);
  });
}

function taskCompleted(ele, num) {
  if (ele.parentElement.parentElement.style.textDecoration == "line-through") {
    ele.parentElement.parentElement.style.textDecoration = "none";
    console.log(ele.parentElement);
    arrayOfTasks[num].pending = true;
  } else {
    ele.parentElement.parentElement.style.textDecoration = "line-through";
    arrayOfTasks[num].pending = false;
    ele.parentElement.style.textDecoration = "none";
  }
  localStorage.setItem("task", JSON.stringify(arrayOfTasks));
}

function deleteTask(ele, num) {
  ele.parentElement.parentElement.remove();
  arrayOfTasks.splice(num, 1);
  localStorage.setItem("task", JSON.stringify(arrayOfTasks));
}

function addTaskPopUp() {
  task_manager_grid.style.display = "none";
  add_task_box.style.display = "block";
}
function returnToMainMenu() {
  task_manager_grid.style.display = "block";
  add_task_box.style.display = "none";
}

function close_all_task() {
  task_manager_grid.style.display = "block";
  all_task_viewer.style.display = "none";
}

function renderNotes() {
  note_container.innerHTML = "";
  arrayOfNotes.reverse().forEach((value, index) => {
    let div = document.createElement("div");
    div.innerHTML = `
              <p>${value}</p>
              <button onclick='delete_notes(${index})'>❌</button>
    `;
    note_container.appendChild(div);
  });
}
function delete_notes(ind) {
  arrayOfNotes.splice(ind, 1);
  localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
  renderNotes();
}
function returnToMainMenu_notes() {
  notes_page.style.display = "none";
  task_manager_grid.style.display = "block";
}
function open_notes() {
  renderNotes();
  notes_page.style.display = "block";
  task_manager_grid.style.display = "none";
}
