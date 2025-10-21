document.addEventListener("DOMContentLoaded", function () {
  const todoList = document.querySelector("#todoList");

  async function main() {
    await displayMotivationalQuote();
    let todos = await loadTasks();

    // Add New Task Button Click
    const addTodoButton = document.querySelector("#addTodo");
    addTodoButton.addEventListener("click", function () {
      const taskNameInput = document.querySelector("#taskName");
      const taskName = taskNameInput.value.trim();

      const taskUrgencySelect = document.querySelector("#taskUrgency");
      const taskUrgency = taskUrgencySelect.value;

      if (taskName) {
        addTodo(todos, taskName, taskUrgency);
        renderTodos(todos);
        taskNameInput.value = "";
      } else {
        showAlert("Please enter a task name", "warning");
      }
    });

    // Save Tasks Button Click
    const saveButton = document.querySelector("#save-btn");
    saveButton.addEventListener("click", async function () {
      await saveTasks(todos);
    });

    renderTodos(todos);
    
  }

  // Render Todos to the DOM
  function renderTodos(todos) {
    todoList.innerHTML = "";
    for (let todo of todos) {
      const li = document.createElement("li");
      li.className =
        "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
        <span>${todo.name} <span class="badge bg-primary">${todo.urgency}</span></span>
        <div>
          <button class="btn edit-btn btn-success btn-sm me-1">Edit</button>
          <button class="btn delete-btn btn-danger btn-sm">Delete</button>
        </div>
      `;

      todoList.appendChild(li);

      // Add Event Listener for Edit Button
      li.querySelector(".edit-btn").addEventListener("click", function () {
        const newName = prompt("Enter the new task name: ", todo.name);
        const newUrgency = prompt("Enter the new urgency:", todo.urgency);
        if (newName && newUrgency) {
          modifyTask(todos, todo.id, newName, newUrgency);
          renderTodos(todos);
        }
      });
      
      // Add Event Listener for Delete Button
      li.querySelector(".delete-btn").addEventListener("click", function () {
        const confirmation = confirm(
          "Do you want to delete the task: " + todo.name + "?"
        );
        if (confirmation) {
          deleteTask(todos, todo.id);
          renderTodos(todos);
        }
      });
    }
  }

  // ASYNC FUNCTION: Display Motivational Quote
  async function displayMotivationalQuote() {
    const quoteText = document.querySelector("#quoteText");
    const quoteAuthor = document.querySelector("#quoteAuthor");
    
    try {
      const quote = await fetchMotivationalQuote();
      
      quoteText.textContent = `"${quote.text}"`;
      
      quoteAuthor.textContent = `- ${quote.author}`;
    } catch (error) {
    
      console.error("Error displaying quote:", error); 
    }
  }

  main();
});