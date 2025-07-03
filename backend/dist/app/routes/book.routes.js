"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const book_controller_1 = require("../controllers/book.controller");
const bookRoutes = (app) => {
    app.post("/api/books", book_controller_1.createBook);
    app.get("/api/books", book_controller_1.getBooks);
    app.get("/api/books/:bookId", book_controller_1.getBookById);
    app.put("/api/books/:bookId", book_controller_1.updateBook);
    app.delete("/api/books/:bookId", book_controller_1.deleteBook);
};
exports.bookRoutes = bookRoutes;
