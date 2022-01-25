// Define UI variables 
const form = document.querySelector('#task-from'); 
const taskInput = document.querySelector('#task'); 
const filter = document.querySelector('#filter'); 
const taskList = document.querySelector('.collection'); 
const clearBtn = document.querySelector('.clear-tasks'); 

// Load event listener 
loadEventListener(); 

// Load event listener function 
function loadEventListener() { 
    document.addEventListener('DOMContentLoaded', getTasks); 
    form.addEventListener('submit', addTask); 
    taskList.addEventListener('click', removeTask); 
    clearBtn.addEventListener('click', clearTasks); 
    filter.addEventListener('keyup', filterTasks); 
}  

// Function add Task 
function addTask (e) {
     
    if(taskInput.value === '') {
       // Create  div element 
       const errorDiv = document.createElement('div'); 
       // Add a class 
       errorDiv.className = 'error'; 
       // Create a text node  
       errorDiv.appendChild(document.createTextNode('Kindly add a task'));
       
       // Get elements 
       const cardContent = document.querySelector('.card-content'); 
       const cardTitle = document.querySelector('.card-title'); 

       // Add errorDiv 
       cardContent.insertBefore(errorDiv, cardTitle); 
    
       // Clear error message after 2sec
       setTimeout(clearError, 2000); 
    } else {
        // Create an li element 
        const li = document.createElement('li');  
        // Add a class 
        li.className = 'collection-item';  
        // Add a text note and append to li 
        li.appendChild(document.createTextNode(taskInput.value)); 
        // Create a link element and add it to li 
        const link = document.createElement('a');  
        // Add a class 
        link.className = 'delete-item secondary-content'; 
        // Add the icon HTML 
        link.innerHTML = `<i>x</i>`;  
        // Append the link to the li 
        li.appendChild(link);  

        // Append the li to the ul 
        taskList.appendChild(li);  

        // Set task to local storage 
        storeTasksInLocalStorage(taskInput.value); 

        // Clear input 
        taskInput.value = ''; 

    }

    e.preventDefault();
}

// Function Store Tasks in local storage 
function storeTasksInLocalStorage(task) {
    let tasks; 

    if (localStorage.getItem('tasks') === null) {
       tasks = []; 
   } else {
       tasks = JSON.parse(localStorage.getItem('tasks')); 
   } 

   tasks.push(task); 

   localStorage.setItem('tasks', JSON.stringify(tasks)); 
}  

// Function get tasks from local storage 
function getTasks() {
    let tasks; 

    if (localStorage.getItem('tasks') === null) {
       tasks = []; 
    } else { 
       tasks = JSON.parse(localStorage.getItem('tasks')); 
    } 

    tasks.forEach(function() { 
      
       taskList.appendChild(li); 
    }); 
}

// Function clear error message 
function clearError() {
    document.querySelector('.error').style.display = 'none'; 
} 

// Function remove task 
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {  
        if (confirm('Are you sure you want to delete?')) {
            e.target.parentElement.parentElement.remove(); 
        } 

        // Display success div
        document.querySelector('#success').style.display = 'block'; 

       setTimeout(clearSuccess, 2000); 
    } 

    e.preventDefault(); 
} 

// Function clear success message 
function clearSuccess() {
    document.querySelector('#success').style.display ='none'; 
} 

// Function clear tasks
function clearTasks() {
   /*  taskList.innerHTML = '';   */

    // You can also use 
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild); 
    }
} 

// Function filter tasks 
function filterTasks(e) { 
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(
        function(task) {
            const item = task.firstChild.textContent; 

            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block'; 
            } else {
                task.style.display = 'none'; 
            }
        }
    )
}