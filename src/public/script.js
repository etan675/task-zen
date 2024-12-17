/* eslint-disable no-undef */

// elements
const newTaskForm = document.querySelector(".new-task-form");
const newTaskInput = document.getElementById('newTaskInput');
const addTaskButton = document.querySelector(".add-task-button");
const todoList = document.querySelector(".todo-list");

// helpers
const isDisplayed = (el) => {
    return !el.classList.contains('hidden');
}

const removeElement = (el) => {
    el.classList.add('hidden');
}

const displayElement = (el) => {
    el.classList.remove('hidden');
}

// event handlers
const handleAddTaskButtonClick = (e) => {
    e.stopPropagation();

    if (!isDisplayed(newTaskForm) && isDisplayed(addTaskButton)) {
        displayElement(newTaskForm);
        removeElement(addTaskButton);
    }
}

const handleNewTaskFormOutsideClick = (e) => {
    if (!newTaskForm.contains(e.target)) {
        newTaskInput.value = '';

        removeElement(newTaskForm);
        displayElement(addTaskButton);
    }
}

const handleKebabMenuDropdownOutsideClick = (e) => {
    const kebabMenuDropdowns = document.querySelectorAll('.todo-item-dropdown-menu');

    kebabMenuDropdowns.forEach((dropdown) => {
        if (!dropdown.contains(e.target)) {
            removeElement(dropdown);
        }
    });
}

const handleDisplayTasks = async () => {
    const tasks = await getTasks();

    if (tasks) {
        const template = document.getElementById('todo-item-template');

        tasks.forEach((task) => {
            const todoItemClone = template.content.cloneNode(true);

            const input = todoItemClone.querySelector('.todo-item-checkbox');
            const container =  todoItemClone.querySelector('.todo-item-container');
            const span = todoItemClone.querySelector('.todo-item-text');
            const kebabMenu = todoItemClone.querySelector('.todo-item-kebab-menu');
            const dropdown = todoItemClone.querySelector('.todo-item-dropdown-menu-item-delete');

            container.dataset.id = task.id;
            input.type = 'checkbox';
            input.checked = task.checked;
            input.onchange = handleCheckboxChange;
            span.innerHTML = task.content;
            kebabMenu.onclick = handleKebabMenuClick;
            dropdown.onclick = handleTaskDelete;

            todoList.appendChild(todoItemClone);
        })

        todoList.scrollTop = todoList.scrollHeight;
    }
}

const handleCheckboxChange = async (e) => {
    const checkbox = e.target;
    const todoItemContainer = checkbox.closest('.todo-item-container');
    const taskId = todoItemContainer.dataset.id;

    const newTasks = await changeTaskChecked(taskId);

    // disabled when waiting for query response
    checkbox.disabled = true;

    // validate checkboxes against data
    newTasks?.forEach((task) => {
        const todoCheckbox = document.querySelector(`[data-id="${task.id}"]`);

        todoCheckbox.checked = task.checked;
    })

    checkbox.disabled = false
}

const handleKebabMenuClick = (e) => {
    e.stopPropagation();

    const kebabMenu = e.currentTarget;
    const kebabMenuContainer = kebabMenu.parentNode;
    const dropdown = kebabMenuContainer.querySelector('.todo-item-dropdown-menu');

    if (isDisplayed(dropdown)) {
        removeElement(dropdown);
    } else {
        // every time we display the dropdown, we need to calculate the position
        const rect = kebabMenuContainer.getBoundingClientRect();

        dropdown.style.top = `${rect.bottom + window.scrollY}px`;
        dropdown.style.left = `${rect.left + window.scrollX + 17}px`;

        displayElement(dropdown);
    }
}

const handleTaskDelete = async (e) => {
    const deleteButton = e.target;
    const todoItemContainer = deleteButton.closest('.todo-item-container');
    
    const taskId = todoItemContainer.dataset.id;
    
    deleteTask(taskId);
}


// event listeners
addTaskButton.addEventListener('click', handleAddTaskButtonClick)

window.addEventListener('click', (e) => {
    handleNewTaskFormOutsideClick(e);
    handleKebabMenuDropdownOutsideClick(e);
})

window.addEventListener('load', () => {
    handleDisplayTasks();
})

// data fetching
const getTasks = async () => {
    try {
        const res = await fetch('/tasks');

        if (!res.ok) {
            throw new Error('error!')
        }

        const json =  await res.json();
        return json;
    } catch (err) {
        console.error(err);
    }
}

const changeTaskChecked = async (taskId) => {
    try {
        const res = await fetch(`/tasks/check/${taskId}`, {
            method: 'PATCH'
        });

        if (!res.ok) {
            throw new Error('error');
        }

        const json = await res.json();
        return json;
    } catch (err) {
        console.error(err);
    }
}

const deleteTask = async (taskId) => {
    try {
        const res = await fetch(`/tasks/delete/${taskId}`, {
            method: 'DELETE'
        });

        if (!res.ok) {
            throw new Error('error');
        }

        window.location.reload();
    } catch (err) {
        console.error(err);
    }
}