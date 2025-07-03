# Library Management System :

A simple and modular Library Management System built with **Node.js**, **Express**, and **TypeScript**. This project provides a basic API for managing books and borrowing records in a library.

---

## Features :

- Book CRUD operations (Create, Read, Update, Delete)
- Borrowing system for tracking book loans
- Centralized error handling middleware
- Organized architecture with MVC pattern
- Built with TypeScript for type safety

### Project Structure :

```
src/
│
├── app/
│ ├── controllers/ # Route handlers (logic layer)
│ ├── middlewares/ # Custom middleware (error handling)
│ ├── models/ # Data models (Book & Borrow)
│ └── routes/ # Route definitions
│
├── app.ts # Entry point for the application
├── server.ts # Server startup code
└── local.ts # Local dev config
```

### Technologies Used :

1. Node.js
2. Express
3. TypeScript
4. Mongoose

# Clone the repository :

git clone https://github.com/deadmanShadow/library-management-system.git

### Install and Run :

```
cd library-management-system

npm install

npm run dev
```
