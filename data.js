// API Configuration
const BASE_JSON_BIN_URL = "https://api.jsonbin.io/v3/b";
const BIN_ID = "68f76b9443b1c97be975a6bf";
const MASTER_KEY = "$2a$10$gwFurzkHmNUypHT4auE8KOL5HmTJUASMxToPdHaEU9z5OU6QL.Bg6";

function getNextId(todos) {
  if (todos.length === 0) return 1;
  return Math.max(...todos.map((t) => t.id)) + 1;
}

// Motivational Quote API Configuration

const QUOTE_API_URL = "https://zenquotes.io/api/random";

async function fetchMotivationalQuote() {
  try {
    const response = await axios.get(QUOTE_API_URL);

    const quoteData = response.data[0];

    // Return text and author
    return {
      text: quoteData.q,
      author: quoteData.a,
    };
  } catch (error) {
    console.error("Error fetching motivational quote:", error);

    // default message
    return {
      text: "Believe in yourself and all that you are!",
      author: "Anonymous",
    };
  }
}

// Add New Task

function addTodo(todos, name, urgency) {
  // Create a new task with unique ID
  let newTodo = {
    id: getNextId(todos),
    name: name,
    urgency: urgency,
  };
  // Add the new task to the end of the array
  todos.push(newTodo);
}

// Modify Existing Task

function modifyTask(todos, id, newTaskName, newUrgency) {
  let task = todos.find((t) => t.id == id);
  if (task) {
    task.name = newTaskName;
    task.urgency = newUrgency;
  } else {
    console.log("Task is not found");
  }
}

// Delete Task

function deleteTask(todos, id) {
  let indexToDelete = todos.findIndex((t) => t.id == id);
  if (indexToDelete !== -1) {
    todos.splice(indexToDelete, 1);
  } else {
    console.log("Task is not found");
  }
}

// ASYNC Functions to Load tasks from JSON Bin

async function loadTasks() {
  try {
    const response = await axios.get(
      BASE_JSON_BIN_URL + "/" + BIN_ID + "/latest"
    );
    return response.data.record;
  } catch (error) {
    console.error("Error loading tasks:", error);
    showAlert("Error loading tasks", "danger");
    return [];
  }
}

// ASYNC Function to Save tasks to JSON Bin

async function saveTasks(todos) {
  try {
    const response = await axios.put(`${BASE_JSON_BIN_URL}/${BIN_ID}`, todos, {
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": MASTER_KEY,
      },
    });
    showAlert("Tasks saved successfully!", "success");
    return response.data;
  } catch (error) {
    console.error("Error saving tasks:", error);
    showAlert("Error saving tasks", "danger");
  }
}

// Function to show alert messages

function showAlert(message, type) {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  document.body.appendChild(alertDiv);
  setTimeout(() => alertDiv.remove(), 3000);
}
