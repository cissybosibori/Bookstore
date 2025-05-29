import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./models/Book.js";

dotenv.config();

const setupIndexes = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Create a simple index on title
    await Book.collection.createIndex({ title: 1 });
    console.log("Index created on 'title'");

    // Create a compound index on author and published_year
    await Book.collection.createIndex({ author: 1, published_year: -1 });
    console.log("Compound index created on 'author' and 'published_year'");

    mongoose.connection.close();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error setting up indexes:", error);
  }
};

setupIndexes();
