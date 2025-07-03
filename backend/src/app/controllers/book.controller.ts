import { RequestHandler } from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";

//create
export const createBook: RequestHandler = async (req, res, next) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    const bookData = savedBook.toObject();
    res.status(200).json({
      success: true,
      message: "Book created successfully",
      data: bookData,
    });
  } catch (error) {
    next(error);
  }
};
// get
export const getBooks: RequestHandler = async (req, res, next) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "desc",
      limit = "10",
      page = "1",
    } = req.query;

    const query: Record<string, any> = {};
    if (filter) query.genre = filter;

    const sortOptions: { [key: string]: 1 | -1 } = {
      [sortBy as string]: sort === "asc" ? 1 : -1,
    };
    const pageNum = parseInt(page as string) || 1;
    const limitNum = parseInt(limit as string) || 10;
    const skip = (pageNum - 1) * limitNum;

    // Get total count (for frontend pagination)
    const total = await Book.countDocuments(query);
    const books = await Book.find(query)
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
  } catch (error) {
    next(error);
  }
};

//book by id
export const getBookById: RequestHandler = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);

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
  } catch (error) {
    next(error);
  }
};

//update
export const updateBook: RequestHandler = async (req, res, next) => {
  try {
    const { bookId } = req.params;

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { ...req.body },
      { new: true, runValidators: true }
    );

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
  } catch (error) {
    next(error);
  }
};

//delete
export const deleteBook: RequestHandler = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const deleted = await Book.findByIdAndDelete(bookId);

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
  } catch (error) {
    next(error);
  }
};
export const borrowBook: RequestHandler = async (req, res, next) => {
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

    const book = await Book.findById(bookId);
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
    return;
  } catch (error) {
    console.error("BorrowBook Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
    return;
  }
};
