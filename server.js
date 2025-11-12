const path = require("path"); // Load Node.js path module for safe file paths
const express = require("express"); // Load Express framework
const axios = require("axios"); // Load Axios HTTP client
const router = require("express").Router();

const app = express(); // Create Express application instance
const PORT = process.env.PORT || 3000; // Use environment port or 3000 locally

app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form bodies
app.use(express.json()); // Parse JSON request bodies

app.use(
  express.static(path.join(__dirname, "public"))
); // Serve static files from public folder

app.get("/", (req, res) => { // Handle GET request to root path
  res.sendFile(
    path.join(__dirname, "public", "index.html")
  ); // Send index.html file as response
});

app.listen(PORT, () => // Start HTTP server
  console.log("Server on http://localhost:" + PORT) // Log server URL to console
);

router.get(
  "/time",
  (req, res) => res.json({ now: new Date().toISOString() })
); // Respond with current ISO time as JSON

router.get("/hello/:name", (req, res) => { // Match URL with name parameter
  res.send("Hello " + req.params.name); // Send plain text greeting
});

app.use("/api", router); // Mount router under /api path

app.post("/search", (req, res) => { // Handle POST submissions to /search
  const term = (req.body.q || "").trim(); // Read search field q and trim spaces
  const src = (req.body.src || "demo").toLowerCase(); // Read source option and normalise to lower case
  console.log("Search:", { term, src }); // Log values to server console
  res.redirect(
    "/#q=" + encodeURIComponent(term) +
    "&src=" + encodeURIComponent(src)
  ); // Redirect to root with hash storing q and src
}); // End of form handler