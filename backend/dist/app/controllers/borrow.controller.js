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
exports.getBorrowSummary = exports.borrowBook = void 0;
const book_model_1 = require("../models/book.model");
const borrow_model_1 = require("../models/borrow.model");
//post api
const borrowBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("\n--- Incoming borrow request ---");
        console.log("Request body:", req.body);
        const { book: bookId, quantity, dueDate } = req.body;
        console.log("Parsed:", { bookId, quantity, dueDate });
        const book = yield book_model_1.Book.findById(bookId);
        console.log("Book found from DB:", !!book, book ? book._id : null);
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
    }
    catch (error) {
        console.error("BorrowBook Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.borrowBook = borrowBook;
//get borrow api
const getBorrowSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "book",
                },
            },
            { $unwind: "$book" },
            {
                $project: {
                    _id: 0,
                    totalQuantity: 1,
                    book: {
                        title: "$book.title",
                        isbn: "$book.isbn",
                    },
                },
            },
        ]);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: summary,
        });
    }
    catch (error) {
        console.error("Borrow Summary Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.getBorrowSummary = getBorrowSummary;
