import { Book as BookIcon } from "lucide-react";
import type { Book } from "../shared/types";
import BookActions from "./BookActions";
interface BookTableProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (bookId: string) => void;
}

const BookTable = ({ books, onEdit, onDelete }: BookTableProps) => (
  <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <th className="px-6 py-4 text-left text-sm font-semibold">Title</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">
              Author
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Genre</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">ISBN</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">
              Copies
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold">
              Status
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {books.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-16 text-center">
                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 rounded-full p-4 mb-4">
                    <BookIcon className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-xl font-medium text-gray-500 mb-2">
                    No books found
                  </p>
                  <p className="text-gray-400">
                    Click "Add New Book" to get started
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            books.map((book, index) => (
              <tr
                key={book._id}
                className="hover:bg-indigo-50/50 transition-all duration-200 group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {book.title}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700">{book.author}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {book.genre}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 font-mono text-sm">
                  {book.isbn}
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-900">
                    {book.copies}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {book.copies === 0 || !book.available ? (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Unavailable
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Available
                      </span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <BookActions
                    book={book}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);
export default BookTable;
