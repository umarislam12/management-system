const express = require("express");
const router = express.Router();
const userController = require("../main/controllers/user");
let multer = require("multer");
let upload = multer();

router.post("/auth/signup", upload.fields([]), userController.register);
router.post("/auth/login", upload.fields([]), userController.login);
module.exports = router;
