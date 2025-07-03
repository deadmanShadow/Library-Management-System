import { Application } from "express";
import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
} from "../controllers/book.controller";

export const bookRoutes = (app: Application) => {
  app.post("/api/books", createBook);
  app.get("/api/books", getBooks);
  app.get("/api/books/:bookId", getBookById);
  app.put("/api/books/:bookId", updateBook);
  app.delete("/api/books/:bookId", deleteBook);
};
