const express = require("express");
const User = require("../models/user");
const { NotFoundError } = require("../utils/errors");
const router = express.Router();

router.post("/login", async (req, res, next) => {});

router.post("/register", async (req, res, next) => {});

module.exports = router;
