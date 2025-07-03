import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const PORT = 5000;

mongoose
  .connect(MONGO_URI as string)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection error:", err);
    process.exit(1);
  });
