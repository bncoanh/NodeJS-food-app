const express = require("express");
const {
    getUserController,
    updateUserController,
    updatePasswordController,
    resetPasswordController,
    deleteUserController,
} = require("../controllers/userController");
const authMiddlewares = require("../middlewares/authMiddlewares");

const router = express.Router();

//routes
// GET USER // GET
router.get("/getUser", authMiddlewares, getUserController);
// update user
router.put("/updateUser", authMiddlewares, updateUserController);
// update password
router.post("/updatePassword", authMiddlewares, updatePasswordController);
// reset password
router.post("/resetPasword", authMiddlewares, resetPasswordController)
// delete user
router.delete("/deleteUser/:id", authMiddlewares, deleteUserController)
module.exports = router;
