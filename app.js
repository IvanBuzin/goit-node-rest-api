import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { authMiddleware } from "./helpers/validateId.js";
import contactRouter from "./routes/contactRouter.js";
import userRouter from "./routes/authRouter.js";

const DB_URI = process.env.DB_URI;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/contacts", authMiddleware, contactRouter);

app.use((err, req, res, next) => {
  const { status = 500, message = "Internal server error" } = err;
  res.status(status).json({ message });
});

async function run() {
  try {
    await mongoose.connect(DB_URI);
    console.info("Database connection successful");

    app.listen(3000, () => {
      console.log("Server is running on port: 3000");
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

run();
