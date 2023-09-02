const btnSelectEven = document.querySelector('[name=btn-even]');
const btnSelectOdd = document.querySelector('[name=btn-odd]');
const btnDeleteFirst = document.querySelector('[name=btn-del-first]');
const btnDeleteLast = document.querySelector('[name=btn-del-last]');
const btnAddTask = document.querySelector('[name=btn-add]');
const btnDeleteTask = document.querySelector('[name=btn-delete]');
const tasksList = document.querySelector('.list');
const taskTemplate = document.querySelector('.task-template');
const taskTextInput = document.querySelector('.add__input')

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
    // resetButtonSave(popupAddCard, popupValidation);
});