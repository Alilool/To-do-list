let taskInput = document.getElementById("input");
let todoList = document.getElementById("todoList");
let finishedList = document.getElementById("finishedTasks");

// Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
    loadFinishedTasks();
});

function loadTasks() {
    // Retrieve tasks from local storage
    let storedTasks = localStorage.getItem("tasks");

    // If there are tasks, parse and display them
    if (storedTasks) {
        todoList.innerHTML = storedTasks;
    }
}

function saveTasks() {
    // Save tasks to local storage
    localStorage.setItem("tasks", todoList.innerHTML);
}

function loadFinishedTasks() {
    // Retrieve finished tasks from local storage
    let storedFinishedTasks = localStorage.getItem("finishedTasks");

    // If there are finished tasks, parse and display them
    if (storedFinishedTasks) {
        finishedList.innerHTML = storedFinishedTasks;
    }
}

function saveFinishedTasks() {
    // Save finished tasks to local storage
    localStorage.setItem("finishedTasks", finishedList.innerHTML);
}

function addTask() {
    // Adding task
    if (taskInput.value.trim() !== "") {
        let newTask = document.createElement("li");
        newTask.innerHTML =
            '<div class="li-content">' +
            taskInput.value +
            '</div>' +
            '<div class="buttons">' +
            '<button onclick="doneTask(this)" id="done">Done</button>' +
            '<button onclick="removeTask(this)" id="delete">Delete</button>' +
            '</div>';
        todoList.appendChild(newTask);
        taskInput.value = "";

        // Save tasks after adding a new task
        saveTasks();
    }
}

function removeTask(taskElement) {
    // Removing a task
    taskElement.parentNode.parentNode.remove();
    // Save tasks after removing a task
    saveTasks();
}

function doneTask(taskElement) {
    // Move task from to-do list to finished tasks
    let newTask = document.createElement("li");
    newTask.innerHTML =
        '<div class="li-content">' +
        taskElement.parentNode.parentNode.querySelector('.li-content').textContent +
        '</div>' +
        '<div class="buttons">' +
        '<button onclick="restore(this)" class="buttons-hover" id="restore">Restore</button>' +
        '<button onclick="removeFinishedTask(this)" class="buttons-hover" id="delete-finished">Delete</button>'
    '</div>';
    finishedList.appendChild(newTask);
    removeTask(taskElement);

    // Save tasks and finished tasks after moving a task to finished list
    saveTasks();
    saveFinishedTasks();
}

function removeFinishedTask(taskElement) {
    // Removing a task from finished list
    taskElement.parentNode.parentNode.remove();
    // Save finished tasks after removing a task from finished list
    saveFinishedTasks();
}

function restore(taskElement) {
    // Move task from finished tasks to to-do list
    taskElement.parentNode.parentNode.remove()
    let newTask = document.createElement("li");
    newTask.innerHTML =
        '<div class="li-content">' +
        taskElement.parentNode.parentNode.querySelector(".li-content").textContent +
        '</div>' +
        '<div class="buttons">' +
        '<button onclick="doneTask(this)" class="buttons-hover" id="done">Done</button>' +
        '<button onclick="removeTask(this)" class="buttons-hover" id="delete">Delete</button>' +
        '</div>';
    todoList.appendChild(newTask);
    removeTask(taskElement);

    // Save tasks and finished tasks after restoring a task
    saveTasks();
    saveFinishedTasks();
}
