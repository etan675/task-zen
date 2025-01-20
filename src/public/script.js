/* eslint-disable no-undef */

// elements
const newTaskForm = document.querySelector(".new-task-form");
const newTaskInput = document.getElementById('newTaskInput');
const addTaskButton = document.querySelector(".add-task-button");
const todoList = document.querySelector(".todo-list");
const sidebarProfileTab = document.getElementById('tasksSidebarProfileTab');
const sidebarProfileDropdown = document.querySelector('.tasks-sidebar-profile-dropdown');
const logoutButton = document.getElementById('logoutButton');
const sidebarTabs = document.querySelectorAll('.tasks-sidebar__tab');
const profileUsername = document.getElementById('profileUsername');

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

const handleLoginRedirect = () => {
    alert('Session expired, please log in.');
    window.location.replace('/login');
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

const handleDisplayTasks = async () => {
    const tasks = await getTasks();

    if (tasks) {
        const template = document.getElementById('todo-item-template');

        tasks.forEach((task) => {
            const todoItemClone = template.content.cloneNode(true);

            const container = todoItemClone.querySelector('.todo-item');
            const checkboxInput = todoItemClone.querySelector('.todo-item__checkbox');
            const span = todoItemClone.querySelector('.todo-item__text');
            const textInput = todoItemClone.querySelector('.todo-item__text-input');

            const kebabMenu = todoItemClone.querySelector('.todo-item__kebab-menu');
            const dropdown = todoItemClone.querySelector('.todo-item__dropdown');
            const dropdownEditButton = todoItemClone.querySelector('.todo-item__dropdown-edit-button');
            const dropdownDeleteButton = todoItemClone.querySelector('.todo-item__dropdown-delete-button');

            container.dataset.id = task.id;

            checkboxInput.checked = task.checked;
            checkboxInput.onchange = handleCheckboxChange;

            span.textContent = task.content;

            textInput.value = task.content;
            textInput.onblur = handleTodoTextInputBlur;
            textInput.onkeydown = handleTodoTextInputKeydown;

            kebabMenu.onclick = handleKebabMenuClick;

            dropdown.onclick = handleTodoItemDropdownClick;
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

    await createNewTask(data);

    // can client side revalidate
    window.location.reload();
}

const handleCheckboxChange = async (e) => {
    const checkbox = e.target;
    const todoItem = checkbox.closest('.todo-item');
    const taskId = todoItem.dataset.id;

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
    const todoItem = kebabMenu.closest('.todo-item');
    const dropdown = todoItem.querySelector('.todo-item__dropdown');

    if (!dropdown.classList.contains('todo-item__dropdown--open')) {
        const rect = kebabMenu.getBoundingClientRect();

        // align with kebab menu
        dropdown.style.top = `${rect.bottom}px`;
        dropdown.style.right = `${window.innerWidth - rect.right}px`;
    
        dropdown.classList.add('todo-item__dropdown--open');

    } else {
        dropdown.classList.remove('todo-item__dropdown--open');
    }
}

const handleTodoItemDropdownClick = (e) => {
    const dropdown = e.currentTarget;

    dropdown.classList.remove('todo-item__dropdown--open');
}

const handleTodoItemDropdownOutsideClick = (e) => {
    const openDropdowns = document.querySelectorAll('.todo-item__dropdown--open');

    openDropdowns.forEach((dropdown) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('todo-item__dropdown--open');
        }
    });
}

const handleTaskDelete = async (e) => {
    const deleteButton = e.target;
    const todoItem = deleteButton.closest('.todo-item');
    
    const taskId = todoItem.dataset.id;

    await deleteTask(taskId);

    // can client side revalidate
    window.location.reload();
}

const handleShowTaskEdit = (e) => {
    const editButton = e.target;
    const todoItem = editButton.closest('.todo-item');
    const todoText = todoItem.querySelector('.todo-item__text');
    const todoTextInput = todoItem.querySelector('.todo-item__text-input');

    if (!isDisplayed(todoTextInput)) {
        todoTextInput.disabled = false;
        
        removeElement(todoText);
        displayElement(todoTextInput);

        todoTextInput.focus();
    }
}

const handleTodoTextInputBlur = async (e) => {
    const todoTextInput = e.target;
    const todoItem = todoTextInput.closest('.todo-item');
    const todoText = todoItem.querySelector('.todo-item__text');

    const taskId = todoItem.dataset.id;

    todoTextInput.disabled = true;

    // if was active then unfocused, just submit the new content
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

const handleSidebarProfileClick = (e) => {
    e.stopPropagation();

    const profileTab = e.currentTarget;
    const rect = profileTab.getBoundingClientRect();
    const dropdown = document.querySelector('.tasks-sidebar-profile-dropdown');
    
    dropdown.classList.toggle('tasks-sidebar-profile-dropdown--open');
    // align with right edge of profile tab
    dropdown.style.left = `${rect.right - dropdown.offsetWidth}px`;
}

const handleSidebarProfileDropdownClick = (e) => {
    const dropdown = e.currentTarget;

    dropdown.classList.remove('tasks-sidebar-profile-dropdown--open');
}

const handleSidebarProfileDropdownOutsideClick = (e) => {
    const dropdown = document.querySelector('.tasks-sidebar-profile-dropdown');

    if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('tasks-sidebar-profile-dropdown--open');
    }
}

const handleSidebarTabClick = (e) => {
    const tab = e.currentTarget;
    const activeTab = document.querySelector('.tasks-sidebar__tab--active');

    activeTab.classList.remove('tasks-sidebar__tab--active');
    tab.classList.add('tasks-sidebar__tab--active');
}

const handleLogoutButtonClick = () => {
    logout();
}

// event listeners
addTaskButton.addEventListener('click', handleAddTaskButtonClick);
newTaskForm.addEventListener('submit', handleCreateNewTask);
newTaskInput.addEventListener('blur', handleNewTaskInputBlur);
sidebarProfileTab.addEventListener('click', handleSidebarProfileClick);
sidebarProfileDropdown.addEventListener('click', handleSidebarProfileDropdownClick);
logoutButton.addEventListener('click', handleLogoutButtonClick);
sidebarTabs.forEach(tab => {
    if (tab.id !== 'tasksSidebarProfileTab') {
        tab.addEventListener('click', handleSidebarTabClick);
    }
})

window.addEventListener('click', (e) => {
    handleTodoItemDropdownOutsideClick(e);
    handleSidebarProfileDropdownOutsideClick(e);
})

window.addEventListener('load', () => {
    const username = sessionStorage.getItem('userEmail');

    if (username) {
        profileUsername.textContent = username;
        profileUsername.title = username
    }

    handleDisplayTasks();
})

// data fetching
const getTasks = async () => {
    try {
        const res = await fetch('/api/tasks/all');

        if (!res.ok) {
            if (res.status === 401) {
                handleLoginRedirect();
            }

            throw new Error('get tasks failed')
        }

        return await res.json();

    } catch (err) {
        console.error(err);
    }
}

const createNewTask = async (task) => {
    try {
        const res = await fetch('/api/tasks/new', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        })

        if (!res.ok) {
            if (res.status === 401) {
                handleLoginRedirect();
            }

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
        const res = await fetch(`/api/tasks/edit/${taskId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...newTask }),
        });

        if (!res.ok) {
            if (res.status === 401) {
                handleLoginRedirect();
            }

            throw new Error('edit task failed');
        }

        return await res.json();

    } catch (err) {
        console.error(err);
    }
}

const deleteTask = async (taskId) => {
    try {
        const res = await fetch(`/api/tasks/delete/${taskId}`, {
            method: 'DELETE'
        });

        if (!res.ok) {
            if (res.status === 401) {
                handleLoginRedirect();
            }

            throw new Error('delete task failed');
        }

        return await res.json();

    } catch (err) {
        console.error(err);
    }
}

const logout = () => {
    fetch('/logout', { method: 'POST' }).then((res) => {
        if (res.ok) {
            window.location.reload();
        }
    }).catch((err) => {
        console.error(err);
    });
}