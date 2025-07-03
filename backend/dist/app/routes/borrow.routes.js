"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoutes = void 0;
const borrow_controller_1 = require("../controllers/borrow.controller");
const borrowRoutes = (app) => {
    app.post("/api/borrow", borrow_controller_1.borrowBook);
    app.get("/api/borrow", borrow_controller_1.getBorrowSummary);
};
exports.borrowRoutes = borrowRoutes;
