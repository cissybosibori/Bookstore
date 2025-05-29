import Book from "./models/Book.js";

export const insertBooks = async () => {
  const books = [
    {
      title: "Eloquent JavaScript",
      author: "Marijn Haverbeke",
      genre: "Programming",
      published_year: 2018,
      price: 30,
      in_stock: true,
      pages: 472,
      publisher: "No Starch Press"
    },
    {
      title: "Fullstack Open",
      author: "University of Helsinki",
      genre: "Programming",
      published_year: 2023,
      price: 0,
      in_stock: true,
      pages: 600,
      publisher: "University of Helsinki"
    },
    {
      title: "The Nature of Code",
      author: "Daniel Shiffman",
      genre: "Programming",
      published_year: 2012,
      price: 28,
      in_stock: true,
      pages: 500,
      publisher: "self-published"
    },
    {
      title: "The Courage to Be Disliked",
      author: "Ichiro Kishimi",
      genre: "Self-help",
      published_year: 2013,
      price: 22,
      in_stock: true,
      pages: 288,
      publisher: "Allen & Unwin"
    },
    {
      title: "Why Men Love Bitches",
      author: "Sherry Argov",
      genre: "Relationships",
      published_year: 2002,
      price: 18,
      in_stock: true,
      pages: 288,
      publisher: "Simon & Schuster"
    },
    {
      title: "Think and Grow Rich",
      author: "Napoleon Hill",
      genre: "Self-help",
      published_year: 1937,
      price: 15,
      in_stock: true,
      pages: 238,
      publisher: "The Ralston Society"
    },
    {
      title: "It Ends With Us",
      author: "Colleen Hoover",
      genre: "Romance",
      published_year: 2016,
      price: 20,
      in_stock: true,
      pages: 384,
      publisher: "Atria Books"
    },
    {
      title: "The 48 Laws of Power",
      author: "Robert Greene",
      genre: "Self-help",
      published_year: 1998,
      price: 25,
      in_stock: true,
      pages: 452,
      publisher: "Penguin"
    },
    {
      title: "Harry Potter",
      author: "J.K. Rowling",
      genre: "Fantasy",
      published_year: 1997,
      price: 35,
      in_stock: true,
      pages: 309,
      publisher: "Bloomsbury"
    },
    {
      title: "Diary of a Wimpy Kid",
      author: "Jeff Kinney",
      genre: "Children",
      published_year: 2007,
      price: 12,
      in_stock: true,
      pages: 217,
      publisher: "Amulet Books"
    },
  ];

 try {
    // Enforce unique titles
    await Book.collection.createIndex({ title: 1 }, { unique: true });

    const count = await Book.countDocuments();
    if (count === 0) {
      const result = await Book.insertMany(books);
      console.log("Books inserted:", result.length);
    } else {
      console.log("Books already exist in the database. No new inserts.");
    }
  } catch (err) {
    if (err.code === 11000) {
      console.error("Duplicate entry detected. Skipping insert.");
    } else {
      console.error("Error inserting books:", err);
    }
  }
};