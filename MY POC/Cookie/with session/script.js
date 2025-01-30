const express = require("express"); // for creating the server
const session = require("express-session"); // for managing user sessions

const app = express(); //Express app initialization

app.use(express.json()); //Middleware for JSON requests

const cors = require("cors"); 
app.use(cors({ origin: "http://localhost:5500", credentials: true })); // Enable CORS for frontend at localhost:5500 and allow credentials (cookies)



app.use(
    session({
        secret: "123abc",
        resave: false, // Prevents session from being saved back to the session store if it wasn't modified
        saveUninitialized: true, // Forces a session to be saved even if it's not modified
        cookie: {
            httpOnly: true, // Makes the session cookie inaccessible to JavaScript (security)
            secure: false, // Set to true if using HTTPS (ensures cookie is sent only over secure connections)
            expires: new Date(Date.now() + 60 * 60 * 1000), // Set cookie expiry to 1 hour
        },
    })
);


app.post("/login", (req, res) => {
    console.log(req.body); // Logs the request body for debugging (you can remove in production)
    const { username, password } = req.body; // Extracts username and password from the request body

    // Check if credentials match hardcoded values(note: use database for same)
    if (username === "AnkurTiwari" && password === "12345") {
        req.session.user = { username }; // Store user data in the session
        return res.status(200).send("Login successful!"); 
    }
    res.status(401).send("Invalid credentials"); 
});


app.get("/dashboard", (req, res) => {
    if (req.session.user) { // Check if the user is logged in)
        res.status(200).send(`Welcome to the dashboard, ${req.session.user.username}`); 
    } else {
        res.status(401).send("Unauthorized"); 
    }
});


app.post("/logout", (req, res) => {
    req.session.destroy((err) => { // Destroy the session
        if (err) return res.status(500).send("Logout failed"); 
        res.clearCookie("connect.sid"); // Clear the session cookie from the client
        res.status(200).send("Logout successful");
    });
});

// Start the server and listen on port 8000
app.listen(8000, () => console.log("Server running on http://localhost:8000"));
