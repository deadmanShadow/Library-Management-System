# Library Management System

A fully functional and minimalist Library Management System built using **React**, **Redux Toolkit Query (RTK Query)**, and **TypeScript**. This app allows users to manage books and borrow records with a clean and responsive interface, without the complexity of authentication or payment systems.

## 🧩 Features

### ✅ Public Routes

- All routes are accessible without login or authentication.

### 📘 Book Management

- **Book List Table**: Displays all books with essential details.
- **CRUD Operations**: Create, update, and delete book entries.
- **Borrow Functionality**: Borrow any available book.
- **Availability Logic**:
  - If `copies = 0`, the book becomes unavailable.
  - Quantity borrowed cannot exceed available copies.

### 📝 Borrow Management

- Borrow books via a simple form.
- Capture borrow quantity and due date.
- Redirects to a summary page upon success.

### 📊 Borrow Summary

- Aggregated summary of borrowed books.
- Columns: `Title`, `ISBN`, `Total Quantity Borrowed`.

---

## 🖼️ UI Components

- **Navbar** – Navigation links: All Books, Add Book, Borrow Summary.
- **Book Table/Grid** – List of books with actions.
- **Forms & Dialogs** – Create/Edit/Borrow books via forms or modals.
- **Footer** – Basic site info or credits.


## 🛠️ Tech Stack

| Layer            | Technology                |
| ---------------- | ------------------------- |
| Frontend         | React + TypeScript        |
| State Management | Redux Toolkit + RTK Query |
| Styling          | Tailwind CSS              |
| Backend          | Node.js + Express.js      |
| Database         | MongoDB + Mongoose        |
