const btnSelectEven = document.querySelector('[name=btn-even]');
const btnSelectOdd = document.querySelector('[name=btn-odd]');
const btnDeleteFirst = document.querySelector('[name=btn-del-first]');
const btnDeleteLast = document.querySelector('[name=btn-del-last]');
const btnAddTask = document.querySelector('[name=btn-add]');
const btnDeleteTask = document.querySelector('[name=btn-delete]');
const tasksList = document.querySelector('.list');
const taskTemplate = document.querySelector('.task-template');
const taskTextInput = document.querySelector('.add__input');

//вызов функции удаления первой задачи в списке
btnDeleteFirst.addEventListener('click', function (evt) {
        // Получить ссылки на все элементы списка
        const items = document.querySelectorAll('.task');
        items[0].remove();
})

//вызов функции удаления последней задачи в списке
btnDeleteLast.addEventListener('click', function (evt) {
    // Получить ссылки на все элементы списка
    const items = document.querySelectorAll('.task');
    items[items.length-1].remove();
})

//вызов функции выделения четных задач в списке
btnSelectEven.addEventListener('click', function (evt) {
    btnSelectEven.classList.toggle('block-option__button_theme_active')
    // Получить ссылки на все элементы списка
    const items = document.querySelectorAll('.task');

    if (btnSelectEven.classList.contains('block-option__button_theme_active')) {
        // Итерироваться по элементам и выбрать каждый второй элемент
        for (let i = 1; i < items.length; i += 2) {
            items[i].classList.add('task_theme_mark-even');
        }
    } else {
        for (let i = 0; i < items.length; i += 1) {
            items[i].classList.remove('task_theme_mark-even');
        }
    }
})

//вызов функции выделения нечетных задач в списке
btnSelectOdd.addEventListener('click', function (evt) {
    btnSelectOdd.classList.toggle('block-option__button_theme_active')
    // Получить ссылки на все элементы списка
    const items = document.querySelectorAll('.task');

    if (btnSelectOdd.classList.contains('block-option__button_theme_active')) {
        // Итерироваться по элементам и выбрать каждый второй элемент
        for (let i = 0; i < items.length; i += 2) {
            items[i].classList.add('task_theme_mark-odd');
        }
    } else {
        for (let i = 0; i < items.length; i += 1) {
            items[i].classList.remove('task_theme_mark-odd');
        }
    }
})

//функция привязки обработчика события клика по кнопке удаления 
function bindDeleteButtonClickHandler(task) {
    task.querySelector('.task__button-del').addEventListener('click', function (evt) {
        task.remove();
    });
};

//функция привязки обработчика события клика по галочке 
function bindMarkButtonClickHandler(task) {
    task.querySelector('.task__button-comp').addEventListener('click', function (evt) {
        evt.target.classList.toggle('task__button-comp_click');
        task.classList.toggle('task_theme_comp');
        // task.classList.remove('task_theme_mark')
        if (task.classList.contains('task_theme_comp')) {
            tasksList.append(task);
        } else {
            tasksList.prepend(task);
        }

    });
};

//форма отправки задачи
function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileInfo.textContent = infoInput.value;
    closeModalWindow(popupEditProfile);
};

//функция добавления задачи
function createTask(taskText) {
    const taskCopy = taskTemplate.content.cloneNode(true);
    const task = taskCopy.querySelector('.task').cloneNode(true);
    task.querySelector('.task__text').textContent = taskText;
    bindMarkButtonClickHandler(task);
    bindDeleteButtonClickHandler(task);
    return task;
};

//вызов функции добавления задачи через кнопку add 
btnAddTask.addEventListener('click', function (evt) {
    evt.preventDefault();
    const task = createTask(taskTextInput.value);
    tasksList.prepend(task);
    taskTextInput.value = '';
});