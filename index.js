let myInput = document.querySelector('input');
let myList = document.querySelector('ul');
let button = document.querySelector('button');
let tasks = []; // Array to store the tasks

// Load tasks from local storage
function loadTasksFromLocalStorage() {
  let storedTasks = localStorage.getItem('tasks');
  if (storedTasks !== null) {
    tasks = JSON.parse(storedTasks);
    tasks.forEach(function (task) {
      addTaskToList(task);
    });
  }
}

// Add task to the list
function addTaskToList(task) {
  let listItem = document.createElement('li');
  let taskText = document.createElement('span');
  taskText.innerText = task;
  listItem.appendChild(taskText);

  let editButton = document.createElement('button');
  editButton.innerText = 'Edit';
  editButton.addEventListener('click', function () {
    let newText = prompt('Enter new task:', task);
    if (newText !== null && newText.trim() !== '') {
      taskText.innerText = newText;
      updateTaskInArray(task, newText);
      saveTasksToLocalStorage();
    }
  });
  listItem.appendChild(editButton);

  let deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.addEventListener('click', function () {
    listItem.remove();
    deleteTaskFromArray(task);
    saveTasksToLocalStorage();
  });
  listItem.appendChild(deleteButton);

  myList.appendChild(listItem);
}

// Update task in the array
function updateTaskInArray(oldTask, newTask) {
  let index = tasks.indexOf(oldTask);
  if (index !== -1) {
    tasks[index] = newTask;
  }
}

// Delete task from the array
function deleteTaskFromArray(task) {
  let index = tasks.indexOf(task);
  if (index !== -1) {
    tasks.splice(index, 1);
  }
}

// Save tasks to local storage
function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add task to the list and save to local storage
function addTask() {
  let task = myInput.value.trim();
  if (task !== '') {
    addTaskToList(task);
    tasks.push(task);
    saveTasksToLocalStorage();
    myInput.value = '';
  }
}

// Event listener for button click
button.addEventListener('click', addTask);

// Load tasks from local storage on page load
window.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);











 