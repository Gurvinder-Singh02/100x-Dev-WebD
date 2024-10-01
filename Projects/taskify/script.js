let addModal = document.querySelector('.add-modal');
let categories = document.querySelector('.categories');
const tasksUI = document.querySelectorAll('.todo');
let tasks = [{
  "id": 1,
  "name": "Finish the project report",
  "priority": "Urgent",
  "status": "in-progress",
  "date": "10/01/2024",
  "time": "10:30 AM"
},
{
  "id": 2,
  "name": "Grocery shopping",
  "priority": "Low",
  "status": "completed",
  "date": "09/29/2024",
  "time": "3:45 PM"
},
{
  "id": 3,
  "name": "Clean the house",
  "priority": "Med",
  "status": "in-progress",
  "date": "09/30/2024",
  "time": "11:15 AM"
}];

tasks.forEach((task)=>{
  displayTask(task)
})

let taskId = 0;

let T_name = document.querySelector('#name');
let T_priority = document.querySelector('#priority');

// Opens the modal to add a task
function openModal() {
  addModal.style.display = 'flex';
  categories.style.display = 'none';
}

// Closes the modal after adding a task
function closeModal() {
  addModal.style.display = 'none';
  categories.style.display = 'flex';
}

// Adds a new task
function addTask() {
  if (!T_name.value || !T_priority.value) {
    alert("Invalid input");
    return;
  }

  const task = {
    id: taskId++,
    name: T_name.value,
    priority: T_priority.value,
    status: 'in-progress',
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString()
  };

  tasks.push(task);
  displayTask(task);
  closeModal();
}


// Displays the task in the appropriate column
function displayTask(task) {
  const taskElement = document.createElement('div');
  taskElement.className = 'todo';
  taskElement.draggable = true;
  taskElement.id = `task-${task.id}`;
  taskElement.innerHTML = `
    <h3>${task.name}</h3>
    <h5>${task.priority} Priority</h5>
    <div class="metrics">
      <div class="left">
        <img src="./src/watch.svg" alt="">
        <p class="time">${task.date}</p>
      </div>
      <p>${task.time}</p>
    </div>
    <div class="priority">
      <p>${task.priority}</p>
      <img src="./src/${task.priority.toLowerCase()}.svg" alt="">
    </div>
  `;

  // Append to the correct category's list
  document.querySelector(`#${task.status}-todos .todos`).appendChild(taskElement);
  updateCount(task.status);
  
  // Attach drag event listeners to the new task
  taskElement.addEventListener('dragstart', dragStart);
  taskElement.addEventListener('dragend', dragEnd);
}

function updateCount(category) {
  const count = tasks.filter(task => task.status === category).length;
  document.getElementById(`${category}-count`).textContent = count;
}

// Event listeners for dragging tasks
function dragStart() {
  this.classList.add('dragging');
}

function dragEnd() {
  this.classList.remove('dragging');
}

document.querySelectorAll('.todos').forEach(category => {
  category.addEventListener('dragover', dragOver);
  category.addEventListener('dragenter', dragEnter);
  category.addEventListener('dragleave', dragLeave);
  category.addEventListener('drop', drop);
});

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.add('drag-over');
}

function dragLeave() {
  this.classList.remove('drag-over');
}

// Handle the drop event and update the task status
function drop() {
  this.classList.remove('drag-over');
  
  const draggingTask = document.querySelector('.dragging');
  if (!draggingTask) return;

  const taskId = draggingTask.id.split('-')[1];
  const task = tasks.find(task => task.id == taskId);

  // Remove task from its current category
  document.getElementById(`task-${task.id}`).remove();

  // Determine the new status based on the drop zone
  const newStatus = this.closest('.category').id.replace('-todos', '');
  task.status = newStatus;

  // Re-display the task in the new category
  displayTask(task);
  updateCount(task.status);
}
