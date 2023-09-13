// Получаем необходимые элементы
const addButton = document.querySelector('.add__button');
const inputField = document.querySelector('.add__input');
const listSection = document.querySelector('[name=list-all]');
const listSectionComplete = document.querySelector('[name=list-complete]');
const taskTemplate = document.querySelector('.task-template');

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
        if (task.completed) {
            const taskElement = createTaskElement(task);
            listSectionComplete.append(taskElement);
        } else {
            const taskElement = createTaskElement(task);
            listSection.append(taskElement);
        }

        // const taskElement = createTaskElement(task);
        // listSection.append(taskElement);

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
        taskElement.remove();
        tasks.splice(taskIndex, 1);
        saveTasksToLocalStorage();
    }
}

// Функция для удаления выполненной задачи
function deleteTaskComplete(taskElement) {
    const taskIndexComplete = Array.from(listSectionComplete.children).indexOf(taskElement);
    if (taskIndexComplete > -1) {
        taskElement.remove();
        tasks.splice(taskIndexComplete, 1);
        saveTasksToLocalStorage();
    }
}

// Функция для отметки задачи как выполненной или невыполненной
function toggleCompleteTask(taskElement) {
    const taskIndex = Array.from(listSection.children).indexOf(taskElement);
    if (taskIndex > -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        taskElement.classList.toggle('task_theme_comp');
        let buttonComplete = taskElement.querySelector('.task__button-comp')
        buttonComplete.classList.toggle('task__button-comp_click');

        if (taskElement.classList.contains('task_theme_comp')) {
            // Удаляем элемент задачи из списка
            taskElement.remove();
            // Добавляем элемент задачи в конец списка
            listSectionComplete.append(taskElement);
        } else {
            // Удаляем элемент задачи из списка
            taskElement.remove();
            // Добавляем элемент задачи в конец списка
            listSection.append(taskElement);
        }

        // if (taskElement.classList.contains('task_theme_comp')) {
        //     // Удаляем элемент задачи из списка
        //     taskElement.remove();
        //     // Добавляем элемент задачи в конец списка
        //     listSection.append(taskElement);

        // } else {
        //     // Удаляем элемент задачи из списка
        //     taskElement.remove();
        //     // Добавляем элемент задачи в начало списка
        //     listSection.prepend(taskElement);
        // }


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
    // taskElement.querySelector('.task__button-del').addEventListener('click', () => deleteTask(taskElement));
    taskButtonCompElement.addEventListener('click', () => toggleCompleteTask(taskElement));

    if (task.completed) {
        taskElement.querySelector('.task__button-del').addEventListener('click', () => deleteTaskComplete(taskElement));
        taskElement.classList.add('task_theme_comp');
        let button = taskElement.querySelector('.task__button-comp')
        button.classList.add('task__button-comp_click');
        // listSection.append(task);
    } else {
        taskButtonCompElement.classList.remove('task__button-comp_click');
        taskElement.querySelector('.task__button-del').addEventListener('click', () => deleteTask(taskElement));
        // listSection.prepend(task);
    }

    return taskElement;
}

// Функция для рендеринга задач из массива
function renderTasks() {
    // Сортируем массив задач таким образом, чтобы выполненные задачи были в конце списка
    // tasks.sort((a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1);

    tasks.forEach(task => {
        const taskElement = createTaskElement(task);
        if (taskElement.classList.contains('task_theme_comp')) {
            listSectionComplete.append(taskElement);
        } else {
            listSection.append(taskElement);
        }
    });
}

// Функция для сохранения задач в LocalStorage
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Слушатель на кнопку добавления задачи
addButton.addEventListener('click', addTask);

// Слушатели на кнопки удаления и отметки задачи
// listSection.addEventListener('click', function(event) {
//     const target = event.target;
//     const taskElement = target.closest('.task');
  
//     if (target.classList.contains('task__button-del')) {
//       deleteTask(taskElement);
//     } else if (target.classList.contains('task__button-comp')) {
//         toggleCompleteTask(taskElement);
//     }
//   });
  
