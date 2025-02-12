let input = document.querySelector('#inp-task');
let inputDate = document.querySelector('#inp-date');
let inputPriority = document.querySelector('#inp-priority');
let addTask = document.querySelector('.task-btn');
let cardData = document.querySelector('.card');

let editingTask = null; 

addTask.addEventListener('click', function () {
    if (editingTask) {
        
        editingTask.querySelector(".task-text").textContent = input.value;
        editingTask.querySelector(".task-date").textContent = inputDate.value;
        editingTask.querySelector(".task-priority").textContent = inputPriority.value;

        addTask.textContent = "Add Task";
        editingTask = null;
        return;
    }

    console.log(input.value);
    console.log(inputDate.value);
    console.log(inputPriority.value);

    const div = document.createElement("div");
    div.classList.add("card-div");
    div.style.display = "flex";
    div.style.flexDirection = "row";
    div.style.justifyContent = "space-between";
    div.style.alignItems = "center";
    div.style.border = "2px solid red";
    div.style.borderRadius = "10px";
    div.style.padding = "10px 8px";

    const para = document.createElement("h4");
    para.classList.add("task-text");
    para.textContent = `${input.value}`;

    const date = document.createElement("h4");
    date.classList.add("task-date");
    date.textContent = `${inputDate.value}`;

    const priority = document.createElement("h4");
    priority.classList.add("task-priority");
    priority.textContent = `${inputPriority.value}`;

    let removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.textContent = "Remove";
    removeBtn.style.padding = "5px";
    removeBtn.style.borderRadius = "5px";
    removeBtn.style.backgroundColor = "yellow";

    removeBtn.addEventListener('click', function () {
        div.remove(); 
    });

    let editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.textContent = "Edit";
    editBtn.style.padding = "2px 5px";
    editBtn.style.borderRadius = "5px";
    editBtn.style.backgroundColor = "yellow";

    editBtn.addEventListener('click', function () {
        input.value = para.textContent;
        inputDate.value = date.textContent;
        inputPriority.value = priority.textContent;

        addTask.textContent = "Update";
        editingTask = div; 
    });

    div.append(para);
    div.append(date);
    div.append(priority);
    div.append(editBtn);
    div.append(removeBtn);
    cardData.append(div);
});
