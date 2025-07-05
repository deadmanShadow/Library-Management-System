"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const errorHandle_1 = require("./app/middlewares/errorHandle");
const book_routes_1 = require("./app/routes/book.routes");
const borrow_routes_1 = require("./app/routes/borrow.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["https://lms-deadman.vercel.app"],
}));
(0, book_routes_1.bookRoutes)(app);
(0, borrow_routes_1.borrowRoutes)(app);
app.get("/", (req, res) => {
    res.send("Welcome to Library Management System API");
});
app.use(errorHandle_1.errorHandle);
exports.default = app;
