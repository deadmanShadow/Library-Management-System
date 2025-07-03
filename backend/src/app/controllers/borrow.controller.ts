import { RequestHandler } from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";

//post api
export const borrowBook: RequestHandler = async (req, res, next) => {
  try {
    console.log("\n--- Incoming borrow request ---");
    console.log("Request body:", req.body);
    const { book: bookId, quantity, dueDate } = req.body;
    console.log("Parsed:", { bookId, quantity, dueDate });
    const book = await Book.findById(bookId);
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
    await book.processBorrow(quantity);
    const borrow = await Borrow.create({
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
  } catch (error) {
    console.error("BorrowBook Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//get borrow api
export const getBorrowSummary: RequestHandler = async (req, res) => {
  try {
    const summary = await Borrow.aggregate([
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
  } catch (error) {
    console.error("Borrow Summary Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
