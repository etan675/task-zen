/* eslint-disable no-undef */

const newTaskForm = document.querySelector(".new-task-form");
const addTaskButton = document.querySelector(".add-task-button");
const todoList = document.querySelector(".todo-list");

// event handlers
const handleAddTaskButtonClick = (e) => {
    e.stopPropagation();

    if (!newTaskForm.style.display || newTaskForm.style.display === 'none') {
        newTaskForm.style.display = 'block';
    } else if (newTaskForm.style.display === 'block') {
        newTaskForm.style.display = 'none';
    }
}

const handleNewTaskFormOutsideClick = (e) => {
    if (!newTaskForm.contains(e.target)) {
        newTaskForm.style.display = 'none';
    }
}

const handleDisplayTasks = async () => {
    const tasks = await getTasks();

    if (tasks) {
        tasks.forEach((task) => {
            const li = document.createElement('li');
            
            li.classList.add('todo-item');
            li.innerHTML = task.content;
            
            todoList.appendChild(li);
        })
    }
}

// event listeners
addTaskButton.addEventListener('click', handleAddTaskButtonClick)

document.addEventListener('click', (e) => {
    handleNewTaskFormOutsideClick(e);
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