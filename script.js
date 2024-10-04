document
    .getElementById("taskForm")
    .addEventListener("submit", handleTaskSubmission);

window.addEventListener("DOMContentLoaded", fetchTasks);

function handleTaskSubmission(event) {
    event.preventDefault(); // Stops the form from refreshing the page

    // Get the task input value
    let taskInputValue = document.getElementById("taskInput").value;

    if (taskInputValue.length > 50) {
        alert("Task cannot have more than 50 characters");
    } else if (taskInputValue.length < 3) {
        alert("Task cannot have less than 3 characters");
    } else {
        //console.log("Task entered:", taskInputValue); //logs the task

        // If valid, add the task to the backend
        addTaskToBackend(taskInputValue);

        // Clear the input field after submission
        document.getElementById('taskInput').value = '';
    }
}

function addTaskToList(task) {
    let newTask = document.createElement('li');
    newTask.textContent = task.task;

    let taskList = document.getElementById("taskList");
    // taskList.appendChild(newTask); // does<li></li> for us

    // Create a delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    // Add event listener for the delete button
    deleteButton.addEventListener("click", function () {
        deleteTaskFromBackend(task.id, newTask);
    });

    newTask.appendChild(deleteButton);
    taskList.appendChild(newTask);
}

function addTaskToBackend(task) {
    fetch("http://localhost:3000/tasks", {
        method: "POST", //Sending data to the server
        headers: {
            "Content-Type": "application/json" //Tell the server we are sending JSON
        },
        body: JSON.stringify({ task }) // Convert the task into a JSON string
    })
        .then((response) => response.json()) // Parse the response as JSON
        .then((newTask) => {
            addTaskToList(newTask); // Add the new task to the DOM
        })
        .catch((error) => {
            console.error("Error adding tasks: ", error); //Handle any errors
        });
}

function deleteTaskFromBackend(taskId, taskElement) {
    fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE"
    }).then(() => {
        taskElement.remove();
    })
        .catch((error) => {
            console.error("Error adding tasks: ", error); //Handle any errors
        });
}

function fetchTasks() { 
    fetch("http://localhost:3000/tasks") // Send a GET request to the server
        .then((response) => response.json()) // Convert the response to JSON
        .then((tasks) => {
            const taskList = document.getElementById("taskList");
            taskList.innerHTML = ""; // Clear the existing list

            for (let i = 0; i < tasks.length; i++) {  // or tasks.forEach((task) =>
                addTaskToList(tasks[i]);

                //const newTask = document.createElement("li");
                //newTask.textContent = tasks.task; // Add task to the list //tasks[i]

                //const deleteButton = document.createElement("button");
                //deleteButton.testContent = "Delete";

                //deleteButton.addEventListener("click", function)

                //taskList.appendChild(newTask);
            };
        })

        .catch((error) => console.error("Error fetching tasks:",
            error));
}