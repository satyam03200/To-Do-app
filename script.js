// Get necessary elements from the DOM
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const filterSelect = document.getElementById('filterSelect');
const taskList = document.getElementById('taskList');

// Add task event handler
addButton.addEventListener('click', addTask);

// Filter tasks event handler
filterSelect.addEventListener('change', filterTasks);

// Task data
let tasks = [];

// Add task function
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    const task = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    tasks.push(task);
    renderTasks();
    taskInput.value = '';
  }
}

// Render tasks function
function renderTasks() {
  const filterValue = filterSelect.value;
  let filteredTasks = tasks;

  if (filterValue === 'completed') {
    filteredTasks = tasks.filter((task) => task.completed);
  } else if (filterValue === 'incomplete') {
    filteredTasks = tasks.filter((task) => !task.completed);
  }

  taskList.innerHTML = '';

  for (const task of filteredTasks) {
    const row = document.createElement('tr');

    const taskCell = document.createElement('td');
    taskCell.innerText = task.text;
    row.appendChild(taskCell);

    const statusCell = document.createElement('td');
    const statusCheckbox = document.createElement('input');
    statusCheckbox.type = 'checkbox';
    statusCheckbox.checked = task.completed;
    statusCheckbox.addEventListener('change', () => {
      task.completed = statusCheckbox.checked;
      renderTasks();
    });
    statusCell.appendChild(statusCheckbox);
    row.appendChild(statusCell);

    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => {
      tasks = tasks.filter((item) => item.id !== task.id);
      renderTasks();
    });
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    taskList.appendChild(row);
  }
}

// Filter tasks function
function filterTasks() {
  renderTasks();
}

// Initialize tasks
renderTasks();
