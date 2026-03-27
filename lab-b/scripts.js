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
    constructor() {
        this.tasks = [];
    }

    draw() {
        // debugger;
        let toDoList = document.getElementById("toDoList");
        toDoList.innerHTML = "";
        for (let task of this.tasks) {
            // debugger;
            // Object wrapper
            let taskObject = document.createElement('div');
            taskObject.classList.add("listItem");
            taskObject.dataset.uuid = task.uuid;
            // Task name
            let taskName = document.createElement("span");
            taskName.classList.add("itemName");
            taskName.innerText = task.name;
            // Task due date
            let dueTo = document.createElement("span");
            dueTo.classList.add("itemDate");
            dueTo.innerText = task.dueTo;
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
        resizeList(toDoList);
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
}

function resizeList(listEl) {
    listEl.style.maxHeight = listEl.scrollHeight + 'px';
}

// let crypto = new Crypto();
let taskList = new TaskList();
taskList.addTask("Buy groceries", "2024-06-30");
taskList.addTask("Finish project", "2024-07-15");
// taskList.draw();

function add(){
    let name = document.getElementById("newItemName").value;
    if (name === "") {return}
    let dueTo = document.getElementById("newItemDate").value;
    taskList.addTask(name, dueTo);
    document.getElementById("newItemName").value = "";
    document.getElementById("newItemDate").value= "";
}
