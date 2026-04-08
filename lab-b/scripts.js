class Task {
    #uuid = "";
    #complete = false;
    #name = "";
    #dueTo = "";

    constructor(uuid, name, dueTo = "") {
        this.#uuid = uuid;
        this.#name = name;
        this.#dueTo = dueTo;
    }
    markComplete() {this.#complete = !this.#complete;}

    // Getters and Setters

    get name() {
        return this.#name;
    }

    set name(name) {
        this.#name = name;
    }

    get dueTo() {
        return this.#dueTo;
    }

    set dueTo(dueTo) {
        this.#dueTo = dueTo;
    }

    get complete() {
        return this.#complete;
    }

    get uuid() {
        return this.#uuid;
    }
}

class TaskList {
    tasks = [];
    term = "";
    constructor() {
        this.tasks = [];
        this.term = "";
    }

    draw(tasksToDisplay = null) {
        // debugger;
        let toDoList = document.getElementById("toDoList");
        toDoList.innerHTML = "";
        const displayTasks = tasksToDisplay !== null ? tasksToDisplay : this.tasks;

        for (let task of displayTasks) {
            // debugger;
            // Object wrapper
            let taskObject = document.createElement('div');
            taskObject.classList.add("listItem");
            taskObject.dataset.uuid = task.uuid;
            // Task name
            let taskName = document.createElement("span");
            taskName.classList.add("itemName");
            taskName.addEventListener("click", editTaskName.bind(this, taskName, task.uuid));
            taskName.innerHTML = highlightMatch(task.name, this.term);
            // Task due date
            let dueTo = document.createElement("span");
            dueTo.classList.add("itemDate");
            dueTo.addEventListener("click", editTaskDate.bind(this, dueTo, task.uuid));
            if (task.dueTo === "") {
                dueTo.innerText = "No Date"
            } else {
                dueTo.innerText = task.dueTo;
            }
            // Task delete button
            let taskDelete = document.createElement("button");
            taskDelete.classList.add("itemDeleteButton");
            taskDelete.onclick = this.deleteTask.bind(this, task.uuid);
            taskDelete.innerHTML = "<i class=\"fa-solid fa-trash-can itemDelete\"></i>"
            // Adding elements to document
            taskObject.appendChild(taskName);
            taskObject.appendChild(dueTo);
            taskObject.appendChild(taskDelete);
            toDoList.appendChild(taskObject);
        }
        resizeList();
        saveLocalStorage(taskList);
    }
    addTask(name, dueTo = "") {
        let uuid = crypto.randomUUID()
        this.tasks.push(new Task(uuid, name, dueTo));
        this.draw();
    }

    deleteTask(uuid) {
        for (let task of this.tasks) {
            if (task.uuid === uuid) {
                this.tasks.splice(this.tasks.indexOf(task), 1);
                this.draw()
            }
        }
    }

    get filteredTasks() {
        return this.tasks.filter(task => task.name.toLowerCase().includes(this.term.toLowerCase()));
    }
}

function resizeList() {
    let list = document.getElementById("toDoList");
    let height = 0;
    for (let children of list.children) {
        height += children.scrollHeight;
    }
    list.style.height = height + 'px';
}

// let crypto = new Crypto();
let taskList = loadLocalStorage()
// taskList.addTask("Buy groceries", "2024-06-30");
// taskList.addTask("Finish project", "2024-07-15");
taskList.draw();

function add(){
    let name = document.getElementById("newItemName").value;
    if (name === "") {return}
    let dueTo = document.getElementById("newItemDate").value;
    taskList.addTask(name, dueTo);
    document.getElementById("newItemName").value = "";
    document.getElementById("newItemDate").value= "";
}

function editTaskName(taskNameObj, uuid) {
    let taskNameEditField = document.createElement("input");
    taskNameEditField.value = taskNameObj.innerText;
    taskNameEditField.addEventListener("blur", () => {
        taskNameObj.innerText = taskNameEditField.value;
        taskNameEditField.replaceWith(taskNameObj);
        for (let task of taskList.tasks) {
            if (task.uuid === uuid) {
                task.name = taskNameEditField.value;
            }
        }
        saveLocalStorage(taskList);
    })
    taskNameObj.replaceWith(taskNameEditField);
}

function editTaskDate(taskDueToObj, uuid) {
    let dueToEditField = document.createElement("input");
    dueToEditField.type = "date";
    if (taskDueToObj.innerText === "No Date") {
        dueToEditField.value = "";
    } else {
        dueToEditField.value = taskDueToObj.innerText;
    }
    dueToEditField.addEventListener("blur", () => {
        taskDueToObj.innerText = dueToEditField.value;
        dueToEditField.replaceWith(taskDueToObj);
        for (let task of taskList.tasks) {
            if (task.uuid === uuid) {
                task.dueTo = dueToEditField.value;
            }
        }
        saveLocalStorage(taskList);
        if (taskDueToObj.innerText === "") {
            taskDueToObj.innerText = "No Date";
        }
    })
    taskDueToObj.replaceWith(dueToEditField);
}

function saveLocalStorage(task_list) {
    const tasksData = task_list.tasks.map(task => ({
        uuid: task.uuid,
        name: task.name,
        dueTo: task.dueTo,
        complete: task.complete
    }));
    localStorage.setItem("task_list", JSON.stringify(tasksData));
}

function loadLocalStorage() {
    try {
        const storedData = localStorage.getItem("task_list");
        const tasksData = storedData ? JSON.parse(storedData) : [];

        const task_list = new TaskList();
        if (Array.isArray(tasksData)) {
            for (let taskData of tasksData) {
                const task = new Task(taskData.uuid, taskData.name, taskData.dueTo);
                if (taskData.complete) {
                    task.markComplete();
                }
                task_list.tasks.push(task);
            }
        }
        return task_list;
    } catch (error) {
        console.error("Error loading tasks from localStorage:", error);
        return new TaskList();
    }
}

document.getElementById("search").addEventListener("keyup", (e) => {
    let search = document.getElementById("search")
    taskList.term = search.value

    if (search.value === "") {
        taskList.draw();
    } else {
        let filtered = taskList.filteredTasks
        taskList.draw(filtered);
    }
})

function highlightMatch(text, searchTerm) {
    if (!searchTerm) {
        return text;
    }

    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}
