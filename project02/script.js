
let tasks = [];

const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

//Form Event Listener for Inputs//

taskForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const title = document.getElementById('task-title').value;
    const priority = document.getElementById('task-priority').value;
    const status = document.querySelector('input[name="task-status"]:checked').value;
    const task = { title, priority, status };
    tasks.push(task);
    addTaskToDOM(task, tasks.length - 1);
    taskForm.reset();
});

//Adds Task To List//

function addTaskToDOM(task, index) {
    const li = document.createElement('li');
    li.className = 'list-group-item task-item';
    li.dataset.index = index;

    li.innerHTML = `
        <span class="${task.status === 'completed' ? 'completed' : ''}">
            ${task.title} (${task.priority}) - ${task.status}
        </span>
        <div>
            <button class="btn btn-success btn-sm me-2 complete-btn">Mark Complete</button>
            <button class="btn btn-danger btn-sm remove-btn">Remove</button>
        </div>
    `;

    taskList.appendChild(li);

    li.querySelector('.remove-btn').addEventListener('click', removeTask);
    li.querySelector('.complete-btn').addEventListener('click', markComplete);
}

//Remove Task Button//

function removeTask(event) {
    const li = event.target.closest('li');
    const index = li.dataset.index;

    tasks.splice(index, 1);
    renderTasks();
}

//Complete Task Button

function markComplete(event) {
    const li = event.target.closest('li');
    const index = li.dataset.index;

    tasks[index].status = 'completed';

    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => addTaskToDOM(task, index));
}