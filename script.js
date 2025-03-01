console.log("Script Loaded!");

// Task array from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const taskList = document.getElementById('task-list');
const taskForm = document.getElementById('task-form');
const editTaskForm = document.getElementById('edit-task-form');
const taskInput = document.getElementById('task-input');
const editTaskInput = document.getElementById('edit-task-input');
let editIndex = null; // To track which task is being edited

// Render tasks when the page loads
document.addEventListener('DOMContentLoaded', renderTasks);

// Handle form submission (Add Task)
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();

    if (!taskText) {
        alert("Task cannot be empty!");
        return;
    }

    tasks.push({ text: taskText, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = ''; // Clear input
    bootstrap.Modal.getInstance(document.getElementById('task-modal')).hide();
});

// Handle Edit Task
editTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (editIndex !== null) {
        tasks[editIndex].text = editTaskInput.value.trim();
        saveTasks();
        renderTasks();
        bootstrap.Modal.getInstance(document.getElementById('edit-task-modal')).hide();
        editIndex = null; // Reset edit index
    }
});

// Function to display tasks
function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <span class="${task.completed ? 'text-decoration-line-through' : ''}">${task.text}</span>
            <div>
                <button class="btn btn-sm btn-primary" onclick="editTask(${index})">Edit</button>
                <button class="btn btn-sm btn-success" onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Open Edit Modal & Set Task Text
function editTask(index) {
    editIndex = index;
    editTaskInput.value = tasks[index].text;
    new bootstrap.Modal(document.getElementById('edit-task-modal')).show();
}

// Toggle task completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
