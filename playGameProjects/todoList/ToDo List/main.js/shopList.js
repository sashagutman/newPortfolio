const form = document.querySelector('#form');
const taskInput = document.querySelector("#taskInput");
const taskLists = document.querySelector('#taskLists');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.forEach(function (task) {
        renderTask(task)
    });

}

checkEmptyList()

saveToLocalStorage()
//add task
form.addEventListener('submit', addTask)

// delete task
taskLists.addEventListener('click', deleteTask)

// done task
taskLists.addEventListener('click', doneTask)

// function
function showPopup(message) {
    const popup = document.querySelector('.popup');
    const popupMessage = document.querySelector('.popup-message');
    popupMessage.textContent = message;
    popup.classList.add('show-popup');

    // Закрыть всплывающее окно через 3 секунды
    setTimeout(() => {
        popup.classList.remove('show-popup');
    }, 2000);
}

function addTask(event) {
    //Canceling the form submission. Oтменяем отправку формы.
    event.preventDefault();

    //Retrieving the task text from the given input. Достаем текст задачи из даного инпута
    const taskText = taskInput.value;
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
    };

    // всплывающее окно при пустом инпуте
    if (taskText === '') {
        showPopup('בבקשה הזן משימה');
        return;
    }

    tasks.push(newTask)

    const newCssClass = newTask.done ? 'task-title task-title-done' : 'task-title';

    const taskHTML =
        `<li id="${newTask.id}" class="task-list">
        <span class="${newCssClass}">${newTask.text}</span>
            <div class="task-item__buttons">
                <button type="button" data-action="done" class="form-btn">
                    <i class="bi bi-check-square"></i>
                </button>
                    <button type="button" data-action="delete" class="form-btn">
                    <i class="bi bi-trash3"></i>
                </button>
            </div>
    </li>`

    //Adding a task to the page. Добавляем задачу на страницу
    taskLists.insertAdjacentHTML('beforeend', taskHTML);
    taskInput.value = '';
    taskInput.focus();

    saveToLocalStorage()
    checkEmptyList()
}

function deleteTask(event) {
    // проверяем что клик был не по кнопке 'удалить задачу'
    if (event.target.dataset.action !== 'delete') return

    const perentNode = event.target.closest('.task-list')

    // определяем id задачу
    const id = +perentNode.id;
    const index = tasks.findIndex((task) => task.id === id)

    // удаляем задачу из масcива
    tasks.splice(index, 1);
    console.log(tasks);

    saveToLocalStorage()

    // удаляем задачу из разметки
    perentNode.remove()

    checkEmptyList()

}

function doneTask(event) {
    // проверяем что клик был не по кнопке 'задача выполнена'
    if (event.target.dataset.action !== 'done') return

    const perentNode = event.target.closest('.task-list')
    // определяем id задачу
    const id = +perentNode.id;
    const task = tasks.find((task) => {
        if (task.id === id) {
            return true
        }
    })
    task.done = !task.done;

    saveToLocalStorage()

    const taskTitle = perentNode.querySelector('.task-title')
    taskTitle.classList.toggle('task-title-done')
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
    const newCssClass = task.done ? 'task-title task-title-done' : 'task-title';

    const taskHTML =
        `<li id="${task.id}" class="task-list">
        <span class="${newCssClass}">${task.text}</span>
            <div class="task-item__buttons">
                <button type="button" data-action="done" class="form-btn">
                    <i class="bi bi-check-square"></i>
                </button>
                    <button type="button" data-action="delete" class="form-btn">
                    <i class="bi bi-trash3"></i>
                </button>
            </div>
    </li>`

    taskLists.insertAdjacentHTML('beforeend', taskHTML);
}

function checkEmptyList() {
    if (tasks.length === 0) {
        // Показываем сообщение "רשימת משימות ריקה"
        emptyList.classList.remove('none-list');
    } else {
        // Скрываем сообщение "רשימת משימות ריקה"
        emptyList.classList.add('none-list');
    }
}
// function