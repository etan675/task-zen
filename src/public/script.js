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
        newTaskInput.focus();
        removeElement(addTaskButton);
    }
}

const handleNewTaskInputBlur = () => {
    newTaskInput.value = '';

    removeElement(newTaskForm);
    displayElement(addTaskButton);
}

const handleKebabMenuDropdownOutsideClick = (e) => {
    const kebabMenuDropdowns = document.querySelectorAll('.todo-item__dropdown-menu');

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

            const container =  todoItemClone.querySelector('.todo-item__container');
            const checkboxInput = todoItemClone.querySelector('.todo-item__checkbox');
            const span = todoItemClone.querySelector('.todo-item__text');
            const textInput = todoItemClone.querySelector('.todo-item__text-input');

            const kebabMenu = todoItemClone.querySelector('.todo-item__kebab-menu');
            const dropdown = todoItemClone.querySelector('.todo-item__dropdown-menu');
            const dropdownEditButton = todoItemClone.querySelector('.todo-item__dropdown-menu--edit');
            const dropdownDeleteButton = todoItemClone.querySelector('.todo-item__dropdown-menu--delete');

            container.dataset.id = task.id;

            checkboxInput.checked = task.checked;
            checkboxInput.onchange = handleCheckboxChange;

            span.textContent = task.content;

            textInput.value = task.content;
            textInput.onblur = handleTodoTextInputBlur;
            textInput.onkeydown = handleTodoTextInputKeydown;

            kebabMenu.onclick = handleKebabMenuClick;

            dropdown.onclick = handleKebabMenuDropdownClick;
            dropdownEditButton.onclick = handleShowTaskEdit;
            dropdownDeleteButton.onclick = handleTaskDelete;

            todoList.appendChild(todoItemClone);
        })

        todoList.scrollTop = todoList.scrollHeight;
    }
}

const handleCreateNewTask = async (e) => {
    e.preventDefault();

    const formData = new FormData(newTaskForm);
    const data = { newTask: formData.get('newTask') };

    const newTask = await createNewTask(data);

    // can client side revalidate
    window.location.reload();
}

const handleCheckboxChange = async (e) => {
    const checkbox = e.target;
    const todoItemContainer = checkbox.closest('.todo-item__container');
    const taskId = todoItemContainer.dataset.id;

    // disabled when waiting for query response
    checkbox.disabled = true;

    const newTask = await changeTaskChecked(taskId, checkbox.checked);

    // revalidate the checkbox state
    checkbox.checked = newTask.checked;
    checkbox.disabled = false
}

const handleKebabMenuClick = (e) => {
    e.stopPropagation();

    const kebabMenu = e.currentTarget;
    const kebabMenuContainer = kebabMenu.parentNode;
    const dropdown = kebabMenuContainer.querySelector('.todo-item__dropdown-menu');

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

const handleKebabMenuDropdownClick = (e) => {
    const dropdown = e.currentTarget;

    removeElement(dropdown);
}

const handleTaskDelete = async (e) => {
    const deleteButton = e.target;
    const todoItemContainer = deleteButton.closest('.todo-item__container');
    
    const taskId = todoItemContainer.dataset.id;

    const deletedId = deleteTask(taskId);

    // can client side revalidate
    window.location.reload();
}

const handleShowTaskEdit = (e) => {
    const editButton = e.target;
    const todoItemContainer = editButton.closest('.todo-item__container');
    const todoText = todoItemContainer.querySelector('.todo-item__text');
    const todoTextInput = todoItemContainer.querySelector('.todo-item__text-input');

    if (!isDisplayed(todoTextInput)) {
        todoTextInput.disabled = false;

        displayElement(todoTextInput);

        todoTextInput.focus();

        removeElement(todoText);
    }
}

const handleTodoTextInputBlur = async (e) => {
    const todoTextInput = e.target;
    const todoItemContainer = todoTextInput.closest('.todo-item__container');
    const todoText = todoItemContainer.querySelector('.todo-item__text');

    const taskId = todoItemContainer.dataset.id;

    todoTextInput.disabled = true;

    const editedTask = await editTaskContent(taskId, todoTextInput.value);

    todoText.textContent = editedTask.content;

    removeElement(todoTextInput);
    displayElement(todoText);
}

const handleTodoTextInputKeydown = (e) => {
    const todoTextInput = e.target;

    if (e.key === "Enter") {
        todoTextInput.blur();
    }
}

// event listeners
addTaskButton.addEventListener('click', handleAddTaskButtonClick);
newTaskForm.addEventListener('submit', handleCreateNewTask);
newTaskInput.addEventListener('blur', handleNewTaskInputBlur);

window.addEventListener('click', (e) => {
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
            throw new Error('get tasks failed')
        }

        return await res.json();

    } catch (err) {
        console.error(err);
    }
}

const createNewTask = async (task) => {
    try {
        const res = await fetch('/tasks/new', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        })

        if (!res.ok) {
            throw new Error('create task failed')
        }

        return await res.json();

    } catch (err) {
        console.error(err);
    }
}

const changeTaskChecked = async (taskId, checked) => {
    return await editTask(taskId, { checked });
}

const editTaskContent = async (taskId, content) => {
    return await editTask(taskId, { content });
}

const editTask = async (taskId, newTask) => {
    try {
        const res = await fetch(`/tasks/edit/${taskId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...newTask }),
        });

        if (!res.ok) {
            throw new Error('edit task failed');
        }

        return await res.json();

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
            throw new Error('delete task failed');
        }

        return await res.json();

    } catch (err) {
        console.error(err);
    }
}