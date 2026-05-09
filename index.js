import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
    res.send("Contact Management System API Running");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});