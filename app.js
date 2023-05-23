"use strict"
// -----consts-----
const ITEMS_CONTAINER = document.getElementById("items");
const ADD_BUTTON = document.getElementById("add");
const ITEM = document.querySelector(".item");
const ADD_ITEM = document.getElementById("add-item");
const ITEM_DESCRIPTION = document.querySelector(".item-description");
const ITEM_COMPLITED = document.querySelector(".item-complited");

const tasks = JSON.parse(localStorage.getItem("todo")) || [];

function getTasks() {
    let task;
    let complited;
    let div;
    ITEMS_CONTAINER.innerHTML = "";
    
    tasks.forEach((value, i) => {
        div = document.createElement("div");
        task = document.createElement("input");
        task.value = value.description;
        task.classList.add("item-description");
        complited = document.createElement("input");
        complited.type = "checkbox";
        complited.classList.add("item-complited");
        complited.checked = value.complited;
        div.appendChild(complited);
        div.appendChild(task);
        ITEMS_CONTAINER.appendChild(div);
        task.addEventListener("change", e => {
            updateTask(value.id, "description", e.target.value);
        });
        complited.addEventListener("change", e => {
            updateTask(value.id, "completed", e.target.checked);
        });
    })
    return tasks;
}

getTasks();

function updateTask(id, key, value) {
    let index = tasks.findIndex((i) => i.id === id);
    if(index != -1) {
        tasks[index][key] = value;
        setTasks(tasks);
    }
}

function setTasks(tasks) {
    const newTasks = JSON.stringify(tasks);
    localStorage.setItem("todo", newTasks)
}

function addTask(description, completed) {
    tasks.push({
        description: description,
        completed: completed,
        data: Date.now(),
    });
    setTasks(tasks);
    getTasks();
}

ADD_BUTTON.addEventListener("click", e => {
    ITEM.style.display = "block";
})

ADD_ITEM.addEventListener("click", e => {
    const description = ITEM_DESCRIPTION.value;
    const checked = ITEM_COMPLITED.checked;
    addTask(description, checked);
    ITEM.style.display = "none";
})