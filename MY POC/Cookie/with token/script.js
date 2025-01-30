const express = require("express"); //for creating the server
const jwt = require("jsonwebtoken"); // for verifying JWTs
const cookieParser = require("cookie-parser"); // for handling cookies

const app = express(); //Express app initialisation

const SECRET_KEY = "abc123"; 

app.use(express.json()); // Middleware for JSON requests
app.use(cookieParser()); // Middleware for cookies in requests
const cors = require("cors"); // Import CORS to allow cross-origin requests
app.use(cors({ origin: "http://localhost:5500", credentials: true })); 

const users = { username: "AnkurTiwari", password: "12345" }; // Mock user credentials for authentication
//you guys should use database for same 

// POST request to /login for user authentication
app.post("/login", (req, res) => {
    const { username, password } = req.body; // Extract username and password from the request body
    if (username === users.username && password === users.password) { // Check if credentials match
        //match the credentials from your database
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" }); // Create JWT with 1 hour expiry
        res.cookie("authToken", token, {
            httpOnly: true, // Make cookie accessible only by the server (not JavaScript)
            maxAge: 60 * 60 * 1000, // Set cookie expiry to 1 hour
        });
        return res.status(200).send("Login successful!"); // Send success response
    }
    res.status(401).send("Invalid credentials"); // Send error if credentials are invalid
});


app.get("/dashboard", (req, res) => {
    const token = req.cookies.authToken; // Retrieve token from cookies
    if (!token) return res.status(401).send("Unauthorized"); 
    try {
        const decoded = jwt.verify(token, SECRET_KEY); // Verify the token using the secret key
        res.status(200).send(`Welcome to the dashboard, ${decoded.username}`); 
    } catch (err) {
        res.status(403).send("Invalid or expired token"); 
    }
});


app.post("/logout", (req, res) => {
    res.clearCookie("authToken", { // Clear the authToken cookie
        httpOnly: true, // Ensure cookie is cleared securely
        sameSite: "strict", // Prevent cookie from being sent with cross-site requests
    });
    res.status(200).send("Logout successful"); 
});

// Start the server and listen on port 3000
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000"); 
});
