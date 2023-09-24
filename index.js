let taskList = []
let completedTaskList = []
let taskId = 1;

const taskFormElement = document.getElementById('task-form');

taskFormElement.addEventListener('submit', function (event) {
  event.preventDefault();
  const taskInputElement = document.getElementById('task-input');
  const task = taskInputElement.value;
  addTask(task);
  taskInputElement.value = '';
  return false;
});


function renderTaskList() {
  const taskListElement = document.querySelector('#task-list');
  taskListElement.innerHTML = '';

  const taskElements = taskList.map((task) => {
    return `
        <span class="card__list__item__text">
          ${task.task}
        </span>
        <div class="card__list__item__actions">
          <button class="card__list__item__actions__button" onclick="completeTask(${task.taskId})">
            <i class="fa-solid fa-circle-check"></i>
          </button>
          <button class="card__list__item__actions__button" onclick="removeTask(${task.taskId})">
            <i class="fa-solid fa-circle-xmark"></i>
          </button>
        </div>
    `;
  });

  const taskFragment = document.createDocumentFragment();
  taskElements.forEach((taskElement) => {
    taskFragment.appendChild(document.createElement('li')).innerHTML = taskElement;
  });

  taskListElement.appendChild(taskFragment);
}

function renderCompletedTaskList() {
  const completedTaskListElement = document.querySelector('#completed-task-list');
  completedTaskListElement.innerHTML = '';

  const taskElements = completedTaskList.map((task) => {
    return `
        <span class="card__list__item__text completed">
          ${task.task}
        </span>
    `;
  });

  const taskFragment = document.createDocumentFragment();
  taskElements.forEach((taskElement) => {
    taskFragment.appendChild(document.createElement('li')).innerHTML = taskElement;
  });

  completedTaskListElement.appendChild(taskFragment);
}


function addTask (task) {
  console.log('Adding task: ', task);
  taskList.push({task, taskId});
  taskId++;
  renderTaskList();
}

function removeTask (taskId) {
  console.log('Removing task: ', taskId);
  taskList = taskList.filter((task) => task.taskId !== taskId);
  renderTaskList();
}

function completeTask (taskId) {
  console.log('Completing task: ', taskId);
  const task = taskList.find((task) => task.taskId === taskId);
  console.log(task);
  removeTask(taskId);
  completedTaskList.push(task);
  renderCompletedTaskList();
}