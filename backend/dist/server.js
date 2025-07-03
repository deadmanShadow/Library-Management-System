"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI;
const PORT = 5000;
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => {
    console.log("Database connected");
    app_1.default.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`);
    });
})
    .catch((err) => {
    console.error("DB connection error:", err);
    process.exit(1);
});
