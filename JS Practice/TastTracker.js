const tasks = [   
{ 
    taskName: "Write report", completed: true, priority: 2 
},   
{ 
    taskName: "Attend meeting", completed: false, priority: 3 
},   
{ 
    taskName: "Fix bug", completed: false, priority: 1 
},   
{ 
    taskName: "Update website", completed: true, priority: 4 
} 
];
console.log(tasks);
// find
let a = tasks.find((task)=> task.priority < 3)
console.log(a);

// findIndex
let b = tasks.find((task)=> task.completed ===false)
console.log(b);
// reduce
let c = tasks.reduce((acc, obj)=> (acc) + (obj.completed), 0);
console.log(c);

// forEach
tasks.forEach((task)=> {
    console.log(task.taskName);
})
