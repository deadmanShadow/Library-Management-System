import { Application } from "express";
import { borrowBook, getBorrowSummary } from "../controllers/borrow.controller";

export const borrowRoutes = (app: Application) => {
  app.post("/api/borrow", borrowBook);
  app.get("/api/borrow", getBorrowSummary);
};
