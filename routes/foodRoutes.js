const express = require("express");
const authMiddlewares = require("../middlewares/authMiddlewares");
const {
    createFoodController,
    getAllFoodController,
    getFoodByIdController,
    getFoodByRestaurantController,
    updateFoodController,
    deleteFoodController,
} = require("../controllers/foodController");

const router = express.Router();

//routes
//CREATE FOOD
router.post("/create", authMiddlewares, createFoodController);
//GET ALL FOOD
router.get("/getAll", getAllFoodController);
//GET FOOD BY ID
router.get("/get/:id", getFoodByIdController);
//GET FOOD BY RESTAURANT
router.get("/getRestaurant/:id", getFoodByRestaurantController);
// GET UPDATE FOOD
router.put("/update/:id", authMiddlewares, updateFoodController)
//DELETE FOOD BY ID
router.delete("/delete/:id", authMiddlewares, deleteFoodController)
module.exports = router;
