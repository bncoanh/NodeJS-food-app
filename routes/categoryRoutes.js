const express = require("express");
const authMiddlewares = require("../middlewares/authMiddlewares");
const { createCatController, getAllCategoryController } = require("../controllers/categoryController");


const router = express.Router();

//routes
//CREATE CATEGORY
router.post("/createCat/", authMiddlewares, createCatController)
//GET ALL CATEGORY
router.get("/getAll/", getAllCategoryController)
module.exports = router;
