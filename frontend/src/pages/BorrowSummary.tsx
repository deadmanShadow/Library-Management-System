import { BookOpen, Clock, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

interface BorrowSummary {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
}

const BorrowSummaryPage = () => {
  const [summary, setSummary] = useState<BorrowSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/borrow")
      .then((res) => res.json())
      .then((res) => {
        setSummary(res.data);
        setLoading(false);
      });
  }, []);

  const totalBorrowedBooks = summary.reduce(
    (sum, item) => sum + item.totalQuantity,
    0
  );
  const averageBorrows =
    summary.length > 0 ? (totalBorrowedBooks / summary.length).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Borrowed Books Summary
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Track the most popular books in your library and monitor borrowing
            trends
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Books</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {summary.length}
                </p>
              </div>
              <div className="bg-indigo-100 rounded-full p-3">
                <BookOpen className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Borrowed
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {totalBorrowedBooks}
                </p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Average Borrows
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {averageBorrows}
                </p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
                <p className="text-lg font-medium text-gray-600">
                  Loading summary...
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Please wait while we gather the data
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Rank
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Book Title
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      ISBN
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Total Borrowed
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Popularity
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {summary.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center">
                          <div className="bg-gray-100 rounded-full p-4 mb-4">
                            <BookOpen className="h-8 w-8 text-gray-400" />
                          </div>
                          <p className="text-xl font-medium text-gray-500 mb-2">
                            No borrowing data found
                          </p>
                          <p className="text-gray-400">
                            Borrowed books will appear here once available
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    summary
                      .sort((a, b) => b.totalQuantity - a.totalQuantity)
                      .map((row, idx) => {
                        const popularityPercentage =
                          (row.totalQuantity /
                            Math.max(...summary.map((s) => s.totalQuantity))) *
                          100;
                        return (
                          <tr
                            key={idx}
                            className="hover:bg-indigo-50/50 transition-all duration-200 group"
                            style={{ animationDelay: `${idx * 50}ms` }}
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <span
                                  className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                                    idx === 0
                                      ? "bg-yellow-100 text-yellow-800"
                                      : idx === 1
                                      ? "bg-gray-100 text-gray-800"
                                      : idx === 2
                                      ? "bg-orange-100 text-orange-800"
                                      : "bg-indigo-100 text-indigo-800"
                                  }`}
                                >
                                  {idx + 1}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                {row.book.title}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-gray-600 font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                                {row.book.isbn}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-indigo-600">
                                  {row.totalQuantity}
                                </span>
                                <span className="text-sm text-gray-500">
                                  copies
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-1000"
                                    style={{
                                      width: `${popularityPercentage}%`,
                                    }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium text-gray-600 min-w-[45px]">
                                  {popularityPercentage.toFixed(0)}%
                                </span>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="text-center mt-8 text-gray-500">
          <p className="text-sm">
            Data shows the total number of times each book has been borrowed
            from the library
          </p>
        </div>
      </div>
    </div>
  );
};

export default BorrowSummaryPage;
