const dbName = "NamesDB"; // name for the database
const storeName = "names"; // Name of the object store (same as table which we studied in SQL)
let db; // Variable for database instance


const request = indexedDB.open(dbName, 1); //creating database

//only runs when we do certain schema changes or want to create a new objectstore
request.onupgradeneeded = event => {
    let db = event.target.result;
    // Check if the object store 'names' exists; if not, create it
    if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true }); // Set 'id' as the primary key and auto-increment it
    }
};

// runs every time
request.onsuccess = event => {
    db = event.target.result; // Assign the opened database to the variable `db`
    loadNames(); // Load the names stored in the database
};

//if can't open database then it gives error
request.onerror = event => console.error("Database error: ", event.target.errorCode);


function addName() {
    const nameInput = document.getElementById("nameInput"); 
    if (!nameInput.value.trim()) return; 

    // Start a transaction for adding data
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName); //create the instance of your table
    store.add({ name: nameInput.value }); // Add the new name to the object store

    // After the transaction completes, clear the input field and reload the names list
    transaction.oncomplete = () => {
        nameInput.value = ""; 
        loadNames();
    };
}


function loadNames() {
    const transaction = db.transaction(storeName, "readonly"); // Start a readonly transaction(we have some more option like readwrite)
    const store = transaction.objectStore(storeName);
    const request = store.getAll(); // Get all entries from the 'names' object store

    // Event when the names are successfully retrieved from the store
    request.onsuccess = () => {
        const names = request.result; // Get the result (an array of names)
        const nameList = document.getElementById("nameList"); // Get the DOM element to display the list of names
        nameList.innerHTML = ""; // Clear the current list

        // Loop through each name and add it to the list
        names.forEach(name => {
            const li = document.createElement("li"); 
            li.textContent = name.name; 

            
            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.onclick = () => editName(name.id, name.name); //for editing

           
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.onclick = () => deleteName(name.id); //for deletion

            
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
            nameList.appendChild(li);
        });
    };
}

// Function to edit a name
function editName(id, oldName) {
    const newName = prompt("Edit name:", oldName); 
    if (!newName) return; 

    // Start a transaction for updating the name
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName); //create an instance of your table named storename
    store.put({ id, name: newName }); // Update the name in the store with the same id

    
    transaction.oncomplete = () => loadNames();
}

// Function to delete a name
function deleteName(id) {
    // Start a transaction for deleting the name
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    store.delete(id); // Delete the name with the specified id

    //reload the names list
    transaction.oncomplete = () => loadNames();
}
