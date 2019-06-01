const express = require("express");
const router = express.Router();

const superuserController = require("../main/controllers/superuser");
let multer = require("multer");
let upload = multer();

router.post("/auth/signup", upload.fields([]), superuserController.register);
router.post("/auth/login", upload.fields([]), superuserController.login);
module.exports = router;
