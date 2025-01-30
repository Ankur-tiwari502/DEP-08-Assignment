const req = indexedDB.open("myDatabase", 1);                  // Open the IndexedDB database (create if it doesn't exist) with name 'myDatabase' and version 1


req.onupgradeneeded = (e) => {
    let db = e.target.result; // Get the database instance
    // Check if the object store 'users' exists, and create it if not
    if (!db.objectStoreNames.contains("users")) {
        db.createObjectStore("users", { keyPath: "id" }); // Create the 'users' object store with 'id' as the primary key
    }
};


req.onsuccess = (e) => {
    console.log(e);
    let db = e.target.result; 

    // Start a 'readwrite' transaction on the 'users' object store
    const transaction = db.transaction("users", "readwrite");
    const userStore = transaction.objectStore("users"); // Get the 'users' object store

   
    let person = { 
        id: 1,  
        topic: 'Introduction to Array' 
    };

    // Add the user object to the 'users' object store
    let request = userStore.add(person);

   
    request.onsuccess = () => {
        console.log("User published successfully!"); 
    };

  
    request.onerror = (e) => {
        console.log("Error publishing user:", e.target.error); 
    };
};
