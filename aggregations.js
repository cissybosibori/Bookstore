import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./models/Book.js";

dotenv.config();

async function runAggregations() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // 1. Average price by genre
    const avgPriceByGenre = await Book.aggregate([
      {
        $group: {
          _id: "$genre",
          avgPrice: { $avg: "$price" },
        },
      },
    ]);
    console.log("Average price by genre:", avgPriceByGenre);

    // 2. Most prolific author
    const mostProlificAuthor = await Book.aggregate([
      {
        $group: {
          _id: "$author",
          totalBooks: { $sum: 1 },
        },
      },
      { $sort: { totalBooks: -1 } },
      { $limit: 1 },
    ]);
    console.log("Most prolific author:", mostProlificAuthor);

    // 3. Books by decade
    const booksByDecade = await Book.aggregate([
      {
        $group: {
          _id: {
            $concat: [
              {
                $toString: {
                  $multiply: [
                    { $floor: { $divide: ["$published_year", 10] } },
                    10,
                  ],
                },
              },
              "s",
            ],
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    console.log("Books by decade:", booksByDecade);

    await mongoose.connection.close();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Aggregation error:", error);
  }
}

runAggregations();
