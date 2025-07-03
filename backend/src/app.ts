import cors from "cors";
import express, { Application, Request, Response } from "express";
import { errorHandle } from "./app/middlewares/errorHandle";
import { bookRoutes } from "./app/routes/book.routes";
import { borrowRoutes } from "./app/routes/borrow.routes";
const app: Application = express();

app.use(express.json());
app.use(cors());
bookRoutes(app);
borrowRoutes(app);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Library Management System API");
});

app.use(errorHandle);

export default app;
