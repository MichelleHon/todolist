const express = require("express"); // Import Express
const cors = require("cors"); // Import CORS middleware

const app = express(); // Initialize the Express app
const port = 3000;  // Define the port where the server will listen

app.use(cors()); // Use CORS to allow requests from the frontend
app.use(express.json()); // Use express.json() to parse incoming JSON requests

let tasks = [ // In-memory array to store tasks
    //{ id: 1, task: "Do homework" },
    //{ id: 2, task: "Do laundry" },
    //{ id: 3, task: "Eat dinner" }
];

let taskCount = 0;

// GET route to send the list of tasks to the frontend
app.get("/tasks", (request, response) => {
    response.json(tasks); // Send the tasks array as a JSON response
});

// Start the server and listen for requests on port 3000
app.listen(port, () => {
    console.log("Server is running");
});

app.post("/tasks", (request, response) => {
    const newTask = {
        id: taskCount++, // Assign a unique ID
        task: request.body.task  // Get the task from the request body
    };
    tasks.push(newTask);     // Add to tasks array
    response.json(newTask);       // Send back the new task
});

app.delete("/tasks/:id", (request, response) => {
    const taskId = parseInt(request.params.id); //Convert id to integer
    tasks = tasks.filter((task) => task.id !== taskId); // Remove the task
    response.sendStatus(200); // Send OK status
});