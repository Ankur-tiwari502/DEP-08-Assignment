const dbName = "FileDB"; // Database name
const storeName = "files"; // Object Store name(its like table name)
let db; // referencing to the database

// Open the IndexedDB database or create it if it doesn't exist
const request = indexedDB.open(dbName, 1);

//only triggered when schema changes
request.onupgradeneeded = event => {
    let db = event.target.result; 
    // Check if the object store 'files' exists, if not, create it
    if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true }); // Create an object store with an auto-incrementing 'id'
    }
};

// triggers everytime when database opens successfully
request.onsuccess = event => {
    db = event.target.result; // Set the global db variable to the opened database
    loadFiles(); // Load and display files from the database
};

//when error
request.onerror = event => {
    console.error("Database error: ", event.target.errorCode);
};

// Function to save a file to the IndexedDB
function saveFile() {
    const fileInput = document.getElementById("fileInput"); 
    if (fileInput.files.length === 0) return; 
    const file = fileInput.files[0]; // Get the first selected file
    const reader = new FileReader(); // Create a new FileReader to read the file

    // Event triggered when the file is successfully read
    reader.onload = function(event) {
        const fileData = { name: file.name, data: event.target.result, type: file.type }; // Store the file data, including its name, content, and type
        const transaction = db.transaction(storeName, "readwrite"); // Create a transaction to read and write data to the 'files' object store
        const store = transaction.objectStore(storeName); // Get the object store for 'files'
        store.add(fileData); // Add the file data to the object store

        // Event triggered when the transaction is complete
        transaction.oncomplete = () => {
            loadFiles(); // Reload the files from the database and display them
            alert("File saved!"); 
        };
    };
    reader.readAsDataURL(file); // Read the file as a Data URL 
}


function loadFiles() {
    const transaction = db.transaction(storeName, "readonly"); // Start a readonly transaction
    console.log(transaction); 
    const store = transaction.objectStore(storeName); // Get the object store for 'files'
    console.log(store); 

    const request = store.getAll(); // Retrieve all records (files) from the object store

    request.onsuccess = () => {
        const files = request.result; // Get the result (list of files)
        const fileList = document.getElementById("fileList"); 
        fileList.innerHTML = ""; // Clear the existing list of files

        // Loop through each file and create an HTML list item to display it
        files.forEach(file => {
            const li = document.createElement("li"); 
            const link = document.createElement("a"); 
            link.href = file.data; 
            link.download = file.name; 
            link.textContent = file.name; 
            link.target = "_blank"; 

            li.appendChild(link); 
            fileList.appendChild(li); 
        });
    };
}
