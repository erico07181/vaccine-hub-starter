const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { NotFoundError } = require("./utils/errors");
const { application } = require("express");
const app = express();

const port = process.env.PORT || 3001;

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});

/* Handles 404 errors */
app.use((req, res, next) => {
  return next(new NotFoundError());
});
