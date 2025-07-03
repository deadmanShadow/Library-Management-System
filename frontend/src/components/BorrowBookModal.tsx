function BorrowBookModal({ open, onClose, book, onSubmit, isLoading }) {
  const [quantity, setQuantity] = useState(1);

  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({
            quantity,
            dueDate: new Date(dueDate).toISOString(),
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
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border p-2 rounded w-full"
            required
          />
          <div className="text-xs text-gray-400 mt-1">
            {book.copies} copies available
          </div>
        </div>
        <div>
          <label className="block mb-1">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
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
