let taskInput = document.getElementById("input");
let todoList = document.getElementById("todoList");
let finishedList = document.getElementById("finishedTasks");

function addTask() {
    if (taskInput.value.trim() !== "") {
        let newTask = document.createElement("li");
        newTask.innerHTML = '<div class="li-content">' + taskInput.value + '</div>' +
            '<div class="buttons">' +
            '<button onclick="doneTask(this)" id="done">Done</button>' +
            '<button onclick="removeTask(this)" id="delete">Delete</button>' +
            '</div>';
        todoList.appendChild(newTask);
        taskInput.value = "";
    }
}

function removeTask(taskElement) {
    taskElement.parentNode.parentNode.remove();
}

function doneTask(taskElement) {
    let newTask = document.createElement("li");
    newTask.innerHTML = '<div class="li-content">' + taskElement.parentNode.parentNode.querySelector('.li-content').textContent + '</div>' +
        '<div class="buttons">' +
        '<button onclick="restore(this)" class="buttons-hover" id="restore">Restore</button>' +
        '<button onclick="removeFinishedTask(this)" class="buttons-hover" id="delete-finished">Delete</button>'
    '</div>';
    finishedList.appendChild(newTask);
    removeTask(taskElement);
}

function removeFinishedTask(taskElement) {
    taskElement.parentNode.parentNode.remove();
}

function restore(taskElement) {
    taskElement.parentNode.parentNode.remove()
    let newTask = document.createElement("li");
    newTask.innerHTML = '<div class="li-content">' + taskElement.parentNode.parentNode.querySelector(".li-content").textContent + '</div>' +
        '<div class="buttons">' +
        '<button onclick="doneTask(this)" class="buttons-hover" id="done">Done</button>' +
        '<button onclick="removeTask(this)" class="buttons-hover" id="delete">Delete</button>' +
        '</div>';
    todoList.appendChild(newTask);
    removeTask(taskElement);
}
