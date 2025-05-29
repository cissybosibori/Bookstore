import mongoose from "mongoose";
import dotenv from "dotenv";
import { insertBooks } from "./insert_books.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    insertBooks(); // Run once to insert data
  })
  .catch(err => console.error("MongoDB connection error:", err));