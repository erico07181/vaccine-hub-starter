const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { PORT } = require("./config");
const { NotFoundError } = require("./utils/errors");
const { application } = require("express");
const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

/* Handles 404 errors */
app.use((req, res, next) => {
  return next(new NotFoundError());
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message: status },
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
