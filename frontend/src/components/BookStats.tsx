import { Book } from "lucide-react";
interface BookStatsProps {
  totalBooks: number;
  availableBooks: number;
  totalCopies: number;
}
const BookStats = ({
  totalBooks,
  availableBooks,
  totalCopies,
}: BookStatsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">Total Books</p>
          <p className="text-3xl font-bold text-gray-900">{totalBooks}</p>
        </div>
        <div className="bg-blue-100 p-3 rounded-xl">
          <Book className="h-6 w-6 text-blue-600" />
        </div>
      </div>
    </div>
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">Available</p>
          <p className="text-3xl font-bold text-green-600">{availableBooks}</p>
        </div>
        <div className="bg-green-100 p-3 rounded-xl">
          <div className="h-6 w-6 bg-green-600 rounded-full"></div>
        </div>
      </div>
    </div>
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">Total Copies</p>
          <p className="text-3xl font-bold text-purple-600">{totalCopies}</p>
        </div>
        <div className="bg-purple-100 p-3 rounded-xl">
          <div className="h-6 w-6 bg-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">∑</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default BookStats;
