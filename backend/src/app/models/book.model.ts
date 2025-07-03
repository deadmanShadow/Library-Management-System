import { Document, Schema, model } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
  createdAt: Date;
  updatedAt: Date;
  processBorrow(quantity: number): Promise<void>;
}

const bookSchema = new Schema<IBook>(
  {
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
  },
  {
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
  }
);
bookSchema.methods.processBorrow = async function (
  this: any,
  quantity: number
): Promise<void> {
  try {
    if (this.copies < quantity) {
      throw new Error("Not enough copies available to borrow");
    }
    this.copies -= quantity;
    this.available = this.copies > 0;
    await this.save();
  } catch (error) {
    console.error("Error processing borrow:", error);
  }
};

export const Book = model<IBook>("Book", bookSchema);
