import { createBrowserRouter, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BookTable from "../pages/BooksPage";
import BorrowSummaryPage from "../pages/BorrowSummary";

const RootLayout = () => (
  <div data-theme="light">
    <div className="mb-10">
      <Navbar />
    </div>
    <ToastContainer position="top-center" autoClose={2000} />
    <main className="container mx-auto py-6">
      <Outlet />
    </main>
    <Footer />
  </div>
);
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <BookTable /> },
      {
        path: "/borrow-summary",
        element: <BorrowSummaryPage />,
      },
    ],
  },
]);
