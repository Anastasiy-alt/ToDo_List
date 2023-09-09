// Получаем необходимые элементы
const addButton = document.querySelector('.add__button');
const inputField = document.querySelector('.add__input');
const listSection = document.querySelector('.list');
const taskTemplate = document.querySelector('.task-template');
const blockOptionButtons = document.querySelectorAll('.block-option__button');

// Проверяем, есть ли сохраненные задачи в LocalStorage, и загружаем их
let tasks = [];
if (localStorage.getItem('tasks')) {
  try {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  } catch (error) {
    console.error('Error parsing tasks from LocalStorage:', error);
  }
  renderTasks();
}

// Функция для добавления задачи
function addTask() {
  const taskText = inputField.value;
  if (taskText !== '') {
    const task = {
      text: taskText,
      completed: false
    };
    tasks.push(task);

    // Создаем элемент задачи и добавляем его в список
    const taskElement = createTaskElement(task);
    listSection.appendChild(taskElement);

    // Сохраняем задачи в LocalStorage
    saveTasksToLocalStorage();

    // Очищаем поле ввода
    inputField.value = '';
  }
}

// Функция для удаления задачи
function deleteTask(taskElement) {
  const taskIndex = Array.from(listSection.children).indexOf(taskElement);
  if (taskIndex > -1) {
    listSection.removeChild(taskElement);
    tasks.splice(taskIndex, 1);
    saveTasksToLocalStorage();
  }
}

// Функция для отметки задачи как выполненной или невыполненной
function toggleCompleteTask(taskElement) {
  const taskIndex = Array.from(listSection.children).indexOf(taskElement);
  if (taskIndex > -1) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    taskElement.classList.toggle('task_theme_comp');
    saveTasksToLocalStorage();
  }
}

// Функция для создания элемента задачи
function createTaskElement(task) {
  const taskElement = taskTemplate.content.cloneNode(true);
  const taskTextElement = taskElement.querySelector('.task__text');
  const taskButtonCompElement = taskElement.querySelector('.task__button-comp');

  taskTextElement.textContent = task.text;
  taskElement.querySelector('.task__button-del').addEventListener('click', () => deleteTask(taskElement));
  taskButtonCompElement.addEventListener('click', () => toggleCompleteTask(taskElement));

  if (task.completed) {
    taskElement.classList.add('task_theme_comp');
    taskButtonCompElement.classList.add('task__button-comp_click');
  } else {
    taskButtonCompElement.classList.remove('task__button-comp_click');
  }

  return taskElement;
}

// Функция для рендеринга задач из массива
function renderTasks() {
  tasks.forEach(task => {
    const taskElement = createTaskElement(task);
    listSection.appendChild(taskElement);
  });
}

// Функция для сохранения задач в LocalStorage
function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Слушатель на кнопку добавления задачи
addButton.addEventListener('click', addTask);

