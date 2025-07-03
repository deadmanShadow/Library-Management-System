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
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Book title is required"],
        trim: true,
    },
    author: {
        type: String,
        required: [true, "Author name is required"],
        trim: true,
    },
    genre: {
        type: String,
        required: [true, "Genre is required"],
        enum: [
            "FICTION",
            "NON_FICTION",
            "SCIENCE",
            "HISTORY",
            "BIOGRAPHY",
            "FANTASY",
        ],
    },
    isbn: {
        type: String,
        required: [true, "ISBN is required"],
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        default: "",
        trim: true,
    },
    copies: {
        type: Number,
        required: [true, "Number of copies is required"],
        min: [0, "Copies must be a positive number"],
        validate: {
            validator: Number.isInteger,
            message: "Copies must be an integer",
        },
    },
    available: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            delete ret.__v;
            return ret;
        },
    },
    toObject: {
        transform: (doc, ret) => {
            delete ret.__v;
            return {
                _id: ret._id,
                title: ret.title,
                author: ret.author,
                genre: ret.genre,
                isbn: ret.isbn,
                description: ret.description,
                copies: ret.copies,
                available: ret.available,
                createdAt: ret.createdAt,
                updatedAt: ret.updatedAt,
            };
        },
    },
});
bookSchema.methods.processBorrow = function (quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (this.copies < quantity) {
                throw new Error("Not enough copies available to borrow");
            }
            this.copies -= quantity;
            this.available = this.copies > 0;
            yield this.save();
        }
        catch (error) {
            console.error("Error processing borrow:", error);
        }
    });
};
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
