// console.dir(window.document);
let formEl = document.querySelector("#task-form")
let tasksToDoEl = document.querySelector("#tasks-to-do");
let taskIdCounter = 0;

var taskFormHandler = function(event) {
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    // create list item
    // check if inputs are empty. 
    // if(!taskNameInput || !taskTypeInput); {
    //     alert(" You need to fill out the task form!");
    //     return false;
    // }
    formEl.reset();
    
    document.querySelector("input[name='task-name']").value = "";
    document.querySelector("select[name='task-type']").selectIndex = 0;
    // package data as obj
    let taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
    createTaskEl(taskDataObj);

};




const createTaskEl = function(taskDataObj){
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    //
    listItemEl.setAttribute("data-task-id", taskIdCounter)
    //create Div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give class name
    taskInfoEl.className = "task-info";
    // add HTM content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    // increase task ID counter 
    taskIdCounter++;
    // add entire list item to list
    const taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    tasksToDoEl.appendChild(listItemEl);

};

 // pass in different ID each time
const createTaskActions = function(taskId) {
    const actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
    // create edit button
    let editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    //create delete button 
    let deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    const statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(statusSelectEl);

    const statusChoices = ["To Do", "Tasks In Progress", "tasks Completed"];
    for (let i = 0; i < statusChoices.length; i++) {
        // create opt element
        const statusOptionEl = document.createElement("option");
        statusOptionEl.textContent =statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        statusSelectEl.appendChild(statusOptionEl);
    }
    
    return actionContainerEl;
};

formEl.addEventListener("submit", taskFormHandler);
