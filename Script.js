document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    // Fetch and display tasks
    fetch('tasks.php')
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => {
                addTaskToList(task);
            });
        });

    // Handle form submission
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = taskInput.value;
        if (task) {
            fetch('tasks.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `task=${encodeURIComponent(task)}`
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    addTaskToList(task);
                    taskInput.value = '';
                } else {
                    alert('Error adding task');
                }
            });
        }
    });

    // Add task to list
    function addTaskToList(task) {
        const li = document.createElement('li');
        li.textContent = task;
        taskList.appendChild(li);
    }
});
