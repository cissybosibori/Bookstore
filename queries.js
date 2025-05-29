import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./models/Book.js";

dotenv.config();

async function runQueries() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // 1. Find all books in the Programming genre
    const programmingBooks = await Book.find({ genre: "Programming" });
    console.log("Programming Books:", programmingBooks);

    // 2. Find books published after 2015
    const recentBooks = await Book.find({ published_year: { $gt: 2015 } });
    console.log("Books published after 2015:", recentBooks);

    // 3. Update the price of "Eloquent JavaScript"
    const updateResult = await Book.updateOne(
      { title: "Eloquent JavaScript" },
      { $set: { price: 32 } }
    );
    console.log("Update Result:", updateResult);

    // 4. Delete the book titled "Diary of a Wimpy Kid"
    const deleteResult = await Book.deleteOne({ title: "Diary of a Wimpy Kid" });
    console.log("Delete Result:", deleteResult);

  } catch (error) {
    console.error("Error running queries:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Disconnected from MongoDB");
  }
}

 // 🔍 Performance Test with explain()
  const performanceResult = await Book.find({ title: "Eloquent JavaScript" }).explain("executionStats");
  console.log("Performance Analysis:\n", JSON.stringify(performanceResult, null, 2));

  mongoose.connection.close();

runQueries();