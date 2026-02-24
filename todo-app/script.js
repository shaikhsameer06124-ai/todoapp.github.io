let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        if (filter === "completed" && !task.completed) return;
        if (filter === "pending" && task.completed) return;

        const li = document.createElement("li");
        if (task.completed) li.classList.add("completed");

        const taskInfo = document.createElement("div");
        taskInfo.innerHTML = `
            <strong>${task.text}</strong><br>
            <small>Due: ${task.date || "No date"} | ${task.priority}</small>
        `;
        taskInfo.onclick = () => toggleComplete(index);

        const actions = document.createElement("div");

        const editBtn = document.createElement("button");
        editBtn.innerText = "✏";
        editBtn.onclick = () => editTask(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "❌";
        deleteBtn.onclick = () => deleteTask(index);

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(taskInfo);
        li.appendChild(actions);

        taskList.appendChild(li);
    });
}

function addTask() {
    const text = document.getElementById("taskInput").value.trim();
    const date = document.getElementById("dueDate").value;
    const priority = document.getElementById("priority").value;

    if (!text) {
        alert("Enter a task!");
        return;
    }

    tasks.push({
        text: text,
        date: date,
        priority: priority,
        completed: false
    });

    saveTasks();
    renderTasks();

    document.getElementById("taskInput").value = "";
    document.getElementById("dueDate").value = "";
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function editTask(index) {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
    }
}

function filterTasks(type) {
    renderTasks(type);
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

renderTasks();