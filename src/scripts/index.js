const btnSelectEven = document.querySelector('[name=btn-even]');
const btnSelectOdd = document.querySelector('[name=btn-odd]');
const btnDeleteFirst = document.querySelector('[name=btn-del-first]');
const btnDeleteLast = document.querySelector('[name=btn-del-last]');
const btnAddTask = document.querySelector('[name=btn-add]');
const btnDeleteTask = document.querySelector('[name=btn-delete]');
const tasksList = document.querySelector('.list');

//функция привязки обработчика события клика по кнопке удаления 
function bindDeleteButtonClickHandler(task) {
    task.querySelector('.list__button-del').addEventListener('click', function (evt) {
        task.remove();
    });
};

//функция привязки обработчика события клика по лайку 
function bindMarkButtonClickHandler(task) {
    task.querySelector('.list__button-comp').addEventListener('click', function (evt) {
        evt.target.classList.toggle('list__button-comp_click');
    });
};

//форма отправки имени и инфо 

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileInfo.textContent = infoInput.value;
    closeModalWindow(popupEditProfile);
};

//функция поиска картинки и её дабавления 
function createTask(taskText) {
    const task = imgTemplate.querySelector('.list__item').cloneNode(true);
    task.querySelector('.list__text').textContent = title;
    bindMarkButtonClickHandler(task);
    bindDeleteButtonClickHandler(task);
    return task;
};

//вызов функции добавления задачи через кнопку add 
buttonAddTask.addEventListener('click', function (evt) {
    evt.preventDefault();
    const task = createTask(taskText.value);
    tasksList.prepend(task);
    taskText.value = '';
    // resetButtonSave(popupAddCard, popupValidation);
});