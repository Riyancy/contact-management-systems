import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

import connectDB from "./config/db.js";
connectDB();

const app = express();

app.get("/", (req, res) => {
    res.send("Contact Management System API Running");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});