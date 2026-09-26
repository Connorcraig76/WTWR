require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/error-handler.js");
const NotFoundError = require("./errors/not-found-error");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const { PORT = 3001, MONGO_URI = "mongodb://127.0.0.1:27017/wtwr_db" } =
  process.env;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.use("/", mainRouter);

app.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
