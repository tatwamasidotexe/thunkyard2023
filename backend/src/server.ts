import express from "express";

const app = express();
const port = 5000;

// creating an endpoint for a HTTP get request
app.get("/", (req, res) => {
    res.send("hello world");
});

// start the server
app.listen(port, () => {
    console.log("Server running on port: " + port)
});