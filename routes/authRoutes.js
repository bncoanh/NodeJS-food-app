const express = require("express");
const {
    registerController,
    loginController,
} = require("../controllers/authController");
const router = express.Router();

//routes
//REGISTER // POST
router.post("/register", registerController);

//LOGIN / Dang nhap
router.post("/login", loginController);
module.exports = router;
