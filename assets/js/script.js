// console.dir(window.document);
var formEl = document.querySelector("#task-form")
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function(event) {
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    // create list item

    // package data as obj
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
    
    createTaskEl(taskDataObj)
};
const createTaskEl = function(taskDataObj){
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    //create Div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give class name
    taskInfoEl.className = "task-info";
    // add HTM content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);
    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", taskFormHandler);
