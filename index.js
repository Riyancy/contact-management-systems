import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();


app.use(express.json());
app.use(bodyParser.json());


connectDB();


app.use("/api/contacts", contactRoutes);


app.get("/", (req, res) => {
    res.send("Contact Management System API Running");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});