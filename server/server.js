require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const authRouter = require("./routes/auth")
const privateAccessRouter = require("./routes/private")
const spendRouter = require("./routes/spend") //  add spending
const exerciseRouter = require("./routes/exercise") //  add exercises
const postRouter = require("./routes/post") // add post
const cors = require("cors");
connectDB();

app.use(express.json());
app.use(cors());

app.get("/", (req, res, next) => {
  res.send("Api running");
});

// Connecting Routes
app.use("/api/auth", authRouter);
app.use("/api/private", privateAccessRouter);
app.use("/spend-data", spendRouter);
app.use("/exercise-data", exerciseRouter);
app.use("/posts", postRouter)

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});