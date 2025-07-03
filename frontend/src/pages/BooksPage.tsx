import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import BookEditModal from "../components/BookEditModal";
import BookFormModal from "../components/BookFormModal";
import BookPagination from "../components/BookPagination";
import BookStats from "../components/BookStats";
import BookTable from "../components/BookTable";
import {
  useCreateBookMutation,
  useDeleteBookMutation,
  useGetBooksQuery,
  useUpdateBookMutation,
} from "../features/api/apiSlice";

const initialFormState = {
  title: "",
  author: "",
  genre: "",
  isbn: "",
  description: "",
  copies: 1,
  available: true,
};

const itemsPerPage = 10;

const BooksPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editBookData, setEditBookData] = useState<any>(null);
  const [formData, setFormData] = useState(initialFormState);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("add") === "1") {
      setIsAddModalOpen(true);
    }
  }, [location.search]);

  const { data, isLoading, isError } = useGetBooksQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  const [createBook] = useCreateBookMutation();
  const [deleteBook] = useDeleteBookMutation();
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
  const books = data?.data || [];
  const totalBooks = data?.total || 0;
  const totalPages = Math.ceil(totalBooks / itemsPerPage);
  const availableBooks = books.filter((b) => b.available).length;
  const totalCopies = books.reduce((sum, b) => sum + b.copies, 0);

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    navigate("/books", { replace: true });
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? parseInt(value) || 0
          : value,
    }));
  };

  const handleEditFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setEditBookData((prev: any) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? parseInt(value) || 0
          : value,
    }));
  };

  const handleAddSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = {
      ...formData,
      available: formData.copies > 0 ? formData.available : false,
    };
    try {
      await createBook(payload).unwrap();
      toast.success("Book added successfully!");
      setIsAddModalOpen(false);
      setFormData(initialFormState);
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to add book. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload = {
        ...editBookData,
        available: editBookData.copies > 0 ? editBookData.available : false,
      };
      await updateBook({ id: editBookData._id, book: payload }).unwrap();
      toast.success("Book updated successfully!");
      setIsEditModalOpen(false);
      setEditBookData(null);
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to update book. Please try again."
      );
    }
  };

  const handleDelete = async (bookId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This book will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6366F1",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await deleteBook(bookId).unwrap();
        toast.success("Book deleted successfully!");
      } catch (error: any) {
        toast.error(
          error?.data?.message || "Failed to delete book. Please try again."
        );
      }
    }
  };

  const handleEdit = (book: any) => {
    setEditBookData(book);
    setIsEditModalOpen(true);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl font-medium text-gray-700">Loading books...</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-100">
        <div className="text-center">
          <div className="bg-red-100 rounded-full p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
            <span className="text-red-600 text-3xl font-bold">!</span>
          </div>
          <p className="text-xl font-medium text-red-600">
            Failed to load books.
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-xl shadow-lg"></div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-800 to-purple-600 bg-clip-text text-transparent">
                Apollo Collection
              </h1>
              <p className="text-gray-600 mt-3">
                Manage and explore your book inventory
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span className="font-medium">Add New Book</span>
          </button>
        </div>
        <BookStats
          totalBooks={totalBooks}
          availableBooks={availableBooks}
          totalCopies={totalCopies}
        />

        <BookTable books={books} onEdit={handleEdit} onDelete={handleDelete} />

        <div className="flex items-center justify-between mt-8">
          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-medium">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(currentPage * itemsPerPage, totalBooks)}
            </span>{" "}
            of <span className="font-medium">{totalBooks}</span> results
          </p>
          <BookPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <BookFormModal
        open={isAddModalOpen}
        onClose={handleCloseAddModal}
        formData={formData}
        onChange={handleFormChange}
        onSubmit={handleAddSubmit}
        isSubmitting={isSubmitting}
      />

      <BookEditModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        formData={editBookData || initialFormState}
        onChange={handleEditFormChange}
        onSubmit={handleEditSubmit}
        isSubmitting={isUpdating}
      />
    </div>
  );
};

export default BooksPage;
