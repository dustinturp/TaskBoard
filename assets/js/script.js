let taskIdCounter = 0;

const formEl = document.querySelector("#task-form");
const tasksToDoEl = document.querySelector("#tasks-to-do");
const tasksInProgressEl = document.querySelector("#tasks-in-progress");
const tasksCompletedEl = document.querySelector("#tasks-completed");
const pageContentEl = document.querySelector("#page-content");

let tasks = [];
let updatedTaskArr = [];

const taskFormHandler = function(event) {
  event.preventDefault();
  const taskNameInput = document.querySelector("input[name='task-name']").value;
  const taskTypeInput = document.querySelector("select[name='task-type']").value;

  // check if inputs are empty (validate)
  if (taskNameInput === "" || taskTypeInput === "") {
    alert("You need to fill out the task form!");
    return false;
  }

  // reset form fields for next task to be entered
  document.querySelector("input[name='task-name']").value = "";
  document.querySelector("select[name='task-type']").selectedIndex = 0;
  for (let i = 0; i < tasks.length; i ++) {
      if (tasks[i].id === parseInt.length, i++) {
          tasks[i].name = taskName;
          tasks[i].type = taskType;
      }
  };

  // check if task is new or one being edited by seeing if it has a data-task-id attribute
  const isEdit = formEl.hasAttribute("data-task-id");

  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  } else {
    const taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      status:"to do"
    };
    createTaskEl(taskDataObj);
  }
};

const createTaskEl = function(taskDataObj) {
    const listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  const taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl);
  taskDataObj.id = taskIdCounter;
  tasks.push(taskDataObj);

  // create task actions (buttons and select) for task
  const taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);
  tasksToDoEl.appendChild(listItemEl);

  // increase task counter for next unique id
  taskIdCounter++;
  saveTasks();
};

const createTaskActions = function(taskId) {
  // create container to hold elements
  const actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // create edit button
  const editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(editButtonEl);
  // create delete button
  const deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(deleteButtonEl);
  // create change status dropdown
  const statusSelectEl = document.createElement("select");
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);
  statusSelectEl.className = "select-status";
  actionContainerEl.appendChild(statusSelectEl);
  // create status options
  const statusChoices = ["To Do", "In Progress", "Completed"];

  for (var i = 0; i < statusChoices.length; i++) {
    // create option element
    const statusOptionEl = document.createElement("option");
    statusOptionEl.setAttribute("value", statusChoices[i]);
    statusOptionEl.textContent = statusChoices[i];

    // append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionContainerEl;
};

const completeEditTask = function(taskName, taskType, taskId) {
  // find task list item with taskId value
  const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  alert("Task Updated!");

  // remove data attribute from form
  formEl.removeAttribute("data-task-id");
  // update formEl button to go back to saying "Add Task" instead of "Edit Task"
  formEl.querySelector("#save-task").textContent = "Add Task";
  for (let i = 0; i < tasks.length; i ++) {
      if (tasks[i].id === parseInt(taskId)) {
          tasks[i].name = typeName;
          tasks[i].type = taskType;
      }
  }
  saveTasks();
};

const taskButtonHandler = function(event) {
  // get target element from event
  const targetEl = event.target;

  if (targetEl.matches(".edit-btn")) {
    console.log("edit", targetEl);
    const taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  } else if (targetEl.matches(".delete-btn")) {
    console.log("delete", targetEl);
    const taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

const taskStatusChangeHandler = function(event) {
  

  // find task list item based on event.target's data-task-id attribute
  const taskId = event.target.getAttribute("data-task-id");
  const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  // convert value to lower case
  const statusValue = event.target.value.toLowerCase();

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }
  for (let i = 0; i < tasks.length; i ++){
      if (tasks[i].id === parseInt(taskId)) {
          tasks[i].status = statusValue;
      }
  }
  saveTasks();
};

const editTask = function(taskId) {
  console.log(taskId);

  // get task list item element
  const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // get content from task name and type
  let taskName = taskSelected.querySelector("h3.task-name").textContent;
  console.log(taskName);

  const taskType = taskSelected.querySelector("span.task-type").textContent;
  console.log(taskType);

  // write values of taskname and taskType to form to be edited
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;

  // set data attribute to the form with a value of the task's id so it knows which one is being edited
  formEl.setAttribute("data-task-id", taskId);
  // update form's button to reflect editing a task rather than creating a new one
  formEl.querySelector("#save-task").textContent = "Save Task";
};

const deleteTask = function(taskId) {
  console.log(taskId);
  // find task list element with taskId value and remove it
  const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
  for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id  !== parseInt(taskId)) {
          updatedTaskArr.push(task[i]);
      }
  }
  tasks = updatedTaskArr;
  saveTasks();
};

const saveTasks = function() {
    localStorage.setItem("tasks",JSON.stringify(tasks));

}

const loadTasks = function() {
    //compare with createTaskEl
    // load tasks
    listItemEl = document.createElement("li");
    taskInfoEl = document.createElement("div");
    // append task actins el to list itemEl
    //taskActionsEl added to 
   tasks = localStorage.getItem("tasks");
   console.log(tasks)
    for (let i = 0; i < tasks.length; i ++){
        console.log(tasks[i])
        //if varableName === null or !variableName
        if (tasks[i].taskIdCounter === parseInt(taskId)) {
            tasks[i].status = statusValue;
            tasks = JSON.parse(tasks)
        }
        else if (tasks[i].status === "in progress") { 
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 1;
            //append list item to TaskInProgress
            taskIdCounter ++;

        }
        else if (tasks[i].status === "complete") {
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 2;
            //append listItemEl to task CompletedEl
            taskIdCounter ++;
        }
    }
    for (let i = 0; i < tasks.length; i ++) {
        // create li  store to listitem el 
    }
    taskInfoEl.innerHTML = "h3 class='task-name'>" + tasks[i].name + "</h3><span class='task-type'>" + tasks[i].type + "</span>";
    saveTasks();
};

// Create a new task
formEl.addEventListener("submit", taskFormHandler);
// for edit and delete buttons
pageContentEl.addEventListener("click", taskButtonHandler);
// for changing the status
pageContentEl.addEventListener("change", taskStatusChangeHandler);

loadTasks();