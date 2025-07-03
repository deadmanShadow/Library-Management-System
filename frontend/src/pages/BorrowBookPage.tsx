import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useBorrowBookMutation,
  useGetBookByIdQuery,
} from "../features/api/apiSlice";

const BorrowBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetBookByIdQuery(id as string);
  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();
  const [quantity, setQuantity] = useState(1);

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (isError || !data)
    return <div className="p-8 text-center text-red-500">Book not found.</div>;

  const book = data.data;
  const maxQuantity = book.copies;
  const canBorrow = maxQuantity > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (quantity < 1 || quantity > maxQuantity) {
      toast.error(`Quantity must be between 1 and ${maxQuantity}`);
      return;
    }

    try {
      await borrowBook({
        book: book._id,
        quantity,
        dueDate: defaultDueDate,
      }).unwrap();

      toast.success("Book borrowed successfully!");
      navigate(`/borrow-summary/${book._id}`);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to borrow book.");
    }
  };

  return (
    <div className="max-w-lg mx-auto my-12 bg-white rounded-xl shadow-xl p-8">
      <h2 className="text-2xl font-bold mb-6">
        Borrow: <span className="text-indigo-600">{book.title}</span>
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Quantity</label>
          <input
            type="number"
            min={1}
            max={maxQuantity}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            disabled={!canBorrow}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
          />
          <div className="text-xs text-gray-400 mt-1">
            {maxQuantity} copies available
          </div>
        </div>
        <button
          type="submit"
          disabled={
            isBorrowing || !canBorrow || quantity < 1 || quantity > maxQuantity
          }
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isBorrowing ? "Processing..." : "Borrow"}
        </button>
      </form>
      {!canBorrow && (
        <div className="mt-4 text-red-500 text-sm font-medium">
          This book is currently unavailable.
        </div>
      )}
    </div>
  );
};

export default BorrowBookPage;
