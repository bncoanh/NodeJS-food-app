const express = require("express");
const authMiddlewares = require("../middlewares/authMiddlewares");
const {
    createCatController,
    getAllCategoryController,
    updateCategoryController,
    deleteCategoryController,
} = require("../controllers/categoryController");

const router = express.Router();

//routes
//CREATE CATEGORY
router.post("/createCat/", authMiddlewares, createCatController);
//GET ALL CATEGORY
router.get("/getAll/", getAllCategoryController);

router.put("/update/:id", updateCategoryController);

router.delete("/delete/:id", deleteCategoryController);

module.exports = router;
