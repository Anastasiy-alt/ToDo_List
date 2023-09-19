const addButton = document.querySelector('.add__button');
const inputField = document.querySelector('.add__input');
const listSection = document.querySelector('[name=list-all]');
const listSectionComplete = document.querySelector('[name=list-complete]');
const taskTemplate = document.querySelector('.task-template');
const btnSelectEven = document.querySelector('[name=btn-even]');
const btnSelectOdd = document.querySelector('[name=btn-odd]');
const btnDeleteFirst = document.querySelector('[name=btn-del-first]');
const btnDeleteLast = document.querySelector('[name=btn-del-last]');
let tasks = [];
let tasksCompleted = [];


//Вызов функции удаления первой задачи в списке
btnDeleteFirst.addEventListener('click', function (evt) {
    const items = listSection.querySelectorAll('.task');
    items[0].remove();
    tasks.splice(0, 1);
    saveTasksToLocalStorage();
});

//Вызов функции удаления последней задачи в списке
btnDeleteLast.addEventListener('click', function (evt) {
    const items = listSection.querySelectorAll('.task');
    items[items.length - 1].remove();
    tasks.splice(items.length - 1, 1);
    saveTasksToLocalStorage();
});

//Вызов функции выделения четных задач в списке
btnSelectEven.addEventListener('click', function (evt) {
    btnSelectEven.classList.toggle('block-option__button_theme_active')
    const items = document.querySelectorAll('.task');
    if (btnSelectEven.classList.contains('block-option__button_theme_active')) {
        for (let i = 1; i < items.length; i += 2) {
            items[i].classList.add('task_theme_mark-even');
        }
    } else {
        for (let i = 0; i < items.length; i += 1) {
            items[i].classList.remove('task_theme_mark-even');
        }
    }
});

//Вызов функции выделения нечетных задач в списке
btnSelectOdd.addEventListener('click', function (evt) {
    btnSelectOdd.classList.toggle('block-option__button_theme_active')
    const items = document.querySelectorAll('.task');
    if (btnSelectOdd.classList.contains('block-option__button_theme_active')) {
        for (let i = 0; i < items.length; i += 2) {
            items[i].classList.add('task_theme_mark-odd');
        }
    } else {
        for (let i = 0; i < items.length; i += 1) {
            items[i].classList.remove('task_theme_mark-odd');
        }
    }
});

// Проверяем, есть ли сохраненные задачи в LocalStorage, и загружаем их
if (localStorage.getItem('tasksCompleted')) {
    try {
        tasksCompleted = JSON.parse(localStorage.getItem('tasksCompleted'));
    } catch (error) {
        console.error('Error parsing tasks completed from LocalStorage:', error);
    }
    renderTasksCompleted();
}

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
            completed: false,
        };
        tasks.push(task);
        const taskElement = createTaskElement(task);
        listSection.append(taskElement);
        saveTasksToLocalStorage();
        inputField.value = '';
    }
}

// Функция для удаления задачи
function deleteTask(taskElement) {
    const taskIndex = Array.from(listSection.children).indexOf(taskElement);
    if (taskIndex > -1) {
        taskElement.remove();
        tasks.splice(taskIndex, 1);
        saveTasksToLocalStorage();
    }
}
function deleteTaskCompleted(taskElementComp) {
    const taskIndex = Array.from(listSectionComplete.children).indexOf(taskElementComp);
    if (taskIndex > -1) {
        taskElementComp.remove();
        tasksCompleted.splice(taskIndex, 1);
        saveTasksToLocalStorage();
    }
}

// Функция для отметки задачи как выполненной или невыполненной
function completeTask(taskElement) {
    const taskIndex = Array.from(listSection.children).indexOf(taskElement);
    if (taskIndex > -1) {
        tasks[taskIndex].completed = true;
        console.log(tasks[taskIndex])
        taskElement.classList.add('task_theme_comp');
        let buttonComplete = taskElement.querySelector('.task__button-comp')
        buttonComplete.classList.add('task__button-comp_click');
        const taskComp = {
            text: taskElement.querySelector('.task__text').textContent,
            completed: true,
        };
        console.log(taskComp)
        tasksCompleted.push(taskComp)
        const taskElementComp = createTaskElement(taskComp);
        listSectionComplete.append(taskElementComp);
        taskElement.remove();
        tasks.splice(taskIndex, 1);
        saveTasksToLocalStorage();
    }
}

function removeCompleteTask(taskElement) {
    const taskIndex = Array.from(listSectionComplete.children).indexOf(taskElement);
    if (taskIndex > -1) {
        tasksCompleted[taskIndex].completed = false;
        console.log(tasksCompleted[taskIndex])
        taskElement.classList.remove('task_theme_comp');
        let buttonComplete = taskElement.querySelector('.task__button-comp')
        buttonComplete.classList.remove('task__button-comp_click');
        const taskNew = {
            text: taskElement.querySelector('.task__text').textContent,
            completed: false,
        };
        tasks.push(taskNew)
        const taskElementNew = createTaskElement(taskNew);
        listSection.append(taskElementNew);
        taskElement.remove();
        tasksCompleted.splice(taskIndex, 1);
        saveTasksToLocalStorage();
    }
}

// Функция для создания элемента задачи
function createTaskElement(task) {
    const taskElementTemp = taskTemplate.content.cloneNode(true);
    const taskElement = taskElementTemp.querySelector('.task').cloneNode(true);
    const taskTextElement = taskElement.querySelector('.task__text');
    const taskButtonCompElement = taskElement.querySelector('.task__button-comp');
    taskTextElement.textContent = task.text;
    if (task.completed) {
        taskButtonCompElement.addEventListener('click', () => removeCompleteTask(taskElement));
        taskElement.querySelector('.task__button-del').addEventListener('click', () => deleteTaskCompleted(taskElement));
        taskElement.classList.add('task_theme_comp');
        taskButtonCompElement.classList.add('task__button-comp_click');
    } else {
        taskButtonCompElement.addEventListener('click', () => completeTask(taskElement));
        taskElement.querySelector('.task__button-del').addEventListener('click', () => deleteTask(taskElement));
        taskButtonCompElement.classList.remove('task__button-comp_click');
        taskElement.classList.remove('task_theme_comp');
    }
    return taskElement;
}

// Функция для рендеринга задач из массива
function renderTasks() {
    tasks.forEach(task => {
        const taskElement = createTaskElement(task);
        listSection.append(taskElement);
    });
}
function renderTasksCompleted() {
    tasksCompleted.forEach(task => {
        const taskElement = createTaskElement(task);
        listSectionComplete.append(taskElement);
    });
}

// Функция для сохранения задач в LocalStorage
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('tasksCompleted', JSON.stringify(tasksCompleted));
}

addButton.addEventListener('click', addTask);