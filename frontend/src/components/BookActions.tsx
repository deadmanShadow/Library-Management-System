import { Download, Edit3, Trash2 } from "lucide-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useBorrowBookMutation } from "../features/api/apiSlice";
import { Book } from "../shared/types";

type BorrowBookModalProps = {
  open: boolean;
  onClose: () => void;
  book: Pick<Book, "_id" | "title" | "copies" | "available">;
  onSubmit: (params: { quantity: number; dueDate: Date }) => void;
  isLoading: boolean;
};

function BorrowBookModal({
  open,
  onClose,
  book,
  onSubmit,
  isLoading,
}: BorrowBookModalProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [dueDate, setDueDate] = useState<Date>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          onSubmit({
            quantity,
            dueDate,
          });
        }}
        className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md space-y-5"
      >
        <h2 className="text-lg font-bold mb-2">Borrow "{book.title}"</h2>
        <div>
          <label className="block mb-1">Quantity</label>
          <input
            type="number"
            min={1}
            max={book.copies}
            value={quantity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuantity(Number(e.target.value))
            }
            className="border p-2 rounded w-full"
            required
          />
          <div className="text-xs text-gray-400 mt-1">
            {book.copies} copies available
          </div>
        </div>
        <div>
          <label className="block mb-1">Due Date</label>
          <DatePicker
            selected={dueDate}
            onChange={(date: Date | null) => date && setDueDate(date)}
            minDate={new Date()}
            className="mb-4"
            dateFormat="yyyy-MM-dd"
            required
          />
          <div className="text-xs text-gray-500 mt-2">
            Selected: {dueDate.toLocaleDateString()}
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            disabled={isLoading || quantity < 1 || quantity > book.copies}
            className="bg-indigo-600 text-white px-5 py-2 rounded font-medium disabled:opacity-50"
          >
            {isLoading ? "Borrowing..." : "OK"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-100 text-gray-700 px-5 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

type BookActionsProps = {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (bookId: string) => void;
};

const BookActions = ({ book, onEdit, onDelete }: BookActionsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [borrowBook, { isLoading }] = useBorrowBookMutation();

  const handleBorrowSubmit = async ({
    quantity,
    dueDate,
  }: {
    quantity: number;
    dueDate: Date;
  }) => {
    if (quantity < 1 || quantity > book.copies) {
      toast.error(`Quantity must be between 1 and ${book.copies}`);
      return;
    }
    try {
      await borrowBook({
        book: book._id,
        quantity,
        dueDate: dueDate.toISOString(),
      }).unwrap();
      toast.success("Book borrowed successfully!");
      setModalOpen(false);
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof (error as { data?: { message?: string } }).data?.message ===
          "string"
      ) {
        toast.error((error as { data: { message: string } }).data.message);
      } else {
        toast.error("Failed to borrow book.");
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onEdit(book)}
        className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-amber-700 bg-amber-100 rounded-lg hover:bg-amber-200 transition-colors duration-200"
      >
        <Edit3 className="h-3 w-3" />
        Edit
      </button>
      <button
        onClick={() => setModalOpen(true)}
        disabled={!book.available || book.copies === 0}
        className={`inline-flex items-center gap-1 px-3 py-2 text-xs font-medium rounded-lg transition-colors duration-200 ${
          book.available && book.copies > 0
            ? "text-green-700 bg-green-100 hover:bg-green-200"
            : "text-gray-400 bg-gray-100 cursor-not-allowed pointer-events-none"
        }`}
      >
        <Download className="h-3 w-3" />
        {isLoading ? "Processing..." : "Borrow"}
      </button>
      <button
        onClick={() => onDelete(book._id)}
        className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors duration-200"
      >
        <Trash2 className="h-3 w-3" />
        Delete
      </button>
      {/* Borrow modal */}
      <BorrowBookModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        book={book}
        onSubmit={handleBorrowSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default BookActions;
