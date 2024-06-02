document.getElementById('todo-form').addEventListener('submit', addTask);

let tasks = [];

function addTask(event) {
    event.preventDefault();
    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('due-date-input');
    const priorityInput = document.getElementById('priority-input');

    const task = {
        id: Date.now(),
        text: taskInput.value,
        dueDate: dueDateInput.value,
        priority: priorityInput.value,
        completed: false
    };

    tasks.push(task);
    taskInput.value = '';
    dueDateInput.value = '';
    priorityInput.value = 'Low';
    renderTasks();
}

function renderTasks() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.className = `todo-item ${task.completed ? 'completed' : ''}`;
        listItem.innerHTML = `
            <span>${task.text} (Due: ${task.dueDate}, Priority: ${task.priority})</span>
            <div>
                <button onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        todoList.appendChild(listItem);
    });
}

function toggleComplete(taskId) {
    tasks = tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task);
    renderTasks();
}

function editTask(taskId) {
    const task = tasks.find(task => task.id === taskId);
    const newTaskText = prompt('Edit task:', task.text);
    if (newTaskText !== null && newTaskText !== '') {
        task.text = newTaskText;
    }
    renderTasks();
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}

function sortTasks(criteria) {
    if (criteria === 'priority') {
        tasks.sort((a, b) => a.priority.localeCompare(b.priority));
    } else if (criteria === 'dueDate') {
        tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (criteria === 'completion') {
        tasks.sort((a, b) => a.completed - b.completed);
    }
    renderTasks();
}

renderTasks();
