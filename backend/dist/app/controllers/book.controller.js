"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowBook = exports.deleteBook = exports.updateBook = exports.getBookById = exports.getBooks = exports.createBook = void 0;
const book_model_1 = require("../models/book.model");
const borrow_model_1 = require("../models/borrow.model");
//create
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBook = new book_model_1.Book(req.body);
        const savedBook = yield newBook.save();
        const bookData = savedBook.toObject();
        res.status(200).json({
            success: true,
            message: "Book created successfully",
            data: bookData,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createBook = createBook;
// get
const getBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = "createdAt", sort = "desc", limit = "10", page = "1", } = req.query;
        const query = {};
        if (filter)
            query.genre = filter;
        const sortOptions = {
            [sortBy]: sort === "asc" ? 1 : -1,
        };
        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 10;
        const skip = (pageNum - 1) * limitNum;
        // Get total count (for frontend pagination)
        const total = yield book_model_1.Book.countDocuments(query);
        const books = yield book_model_1.Book.find(query)
            .sort(sortOptions)
            .limit(limitNum)
            .skip(skip);
        const formattedBooks = books.map((book) => book.toObject());
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: formattedBooks,
            total,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getBooks = getBooks;
//book by id
const getBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const book = yield book_model_1.Book.findById(bookId);
        if (!book) {
            res.status(404).json({
                success: false,
                message: "Book not found",
            });
            return;
        }
        const bookData = book.toObject();
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: bookData,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getBookById = getBookById;
//update
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const updatedBook = yield book_model_1.Book.findByIdAndUpdate(bookId, Object.assign({}, req.body), { new: true, runValidators: true });
        if (!updatedBook) {
            res.status(404).json({
                success: false,
                message: "Book not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook.toObject(),
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateBook = updateBook;
//delete
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const deleted = yield book_model_1.Book.findByIdAndDelete(bookId);
        if (!deleted) {
            res.status(404).json({
                success: false,
                message: "Book not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteBook = deleteBook;
const borrowBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        // --------- Add this validation here! ---------
        if (!dueDate) {
            res.status(400).json({
                success: false,
                message: "Due date is required",
            });
            return;
        }
        const due = new Date(dueDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (isNaN(due.getTime()) || due < today) {
            res.status(400).json({
                success: false,
                message: "Due date must be a valid date in the future",
            });
            return;
        }
        // ---------------------------------------------
        const book = yield book_model_1.Book.findById(bookId);
        if (!book) {
            res.status(404).json({
                success: false,
                message: "Book not found",
            });
            return;
        }
        if (book.copies < quantity) {
            res.status(400).json({
                success: false,
                message: `Only ${book.copies} copies are available`,
            });
            return;
        }
        yield book.processBorrow(quantity);
        const borrow = yield borrow_model_1.Borrow.create({
            book: book._id,
            quantity,
            dueDate,
        });
        const formattedBorrow = {
            _id: borrow._id,
            book: borrow.book,
            quantity: borrow.quantity,
            dueDate: borrow.dueDate,
            createdAt: borrow.createdAt,
            updatedAt: borrow.updatedAt,
        };
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: formattedBorrow,
        });
        return;
    }
    catch (error) {
        console.error("BorrowBook Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
        return;
    }
});
exports.borrowBook = borrowBook;
