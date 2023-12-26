document.addEventListener("DOMContentLoaded", function () {
  var newTaskInput = document.getElementById("new-task");
  var addTaskButton = document.getElementById("add-task-button");
  var taskList = document.getElementById("task-list");
  var modal = document.getElementById("modal");
  var closeButton = document.getElementById("close-button");

  function addTask() {
    var taskText = newTaskInput.value;
    var taskDiv = document.createElement("div");
    taskDiv.style.border = "1px solid #000";
    taskDiv.style.margin = "10px 0";
    taskDiv.style.padding = "10px";

    var listItem = document.createElement("div");
    listItem.style.display = "flex";
    listItem.style.justifyContent = "space-between";
    listItem.style.alignItems = "center";

    var taskTextDiv = document.createElement("div");
    taskTextDiv.textContent = taskText;

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      taskList.removeChild(taskDiv);
      saveTasks();
    });

    listItem.appendChild(taskTextDiv);
    listItem.appendChild(deleteButton);
    taskDiv.appendChild(listItem);
    taskList.insertBefore(taskDiv, taskList.firstChild);
    newTaskInput.value = "";
    saveTasks();
  }

  function saveTasks() {
    var tasks = [];
    for (var i = 0; i < taskList.children.length; i++) {
      var task = taskList.children[i];
      var text = task.firstChild.firstChild.textContent;
      tasks.push(text);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
      tasks.reverse();
      for (var i = 0; i < tasks.length; i++) {
        newTaskInput.value = tasks[i];
        addTask();
      }
    }
  }

  addTaskButton.addEventListener("click", addTask);

  closeButton.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });

  loadTasks();
});
