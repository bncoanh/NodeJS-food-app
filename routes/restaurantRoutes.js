const express = require("express");
const authMiddlewares = require("../middlewares/authMiddlewares");
const {
    createRestaurantController,
    getAllRestaurantController,
    getRestaurantByIdController,
    deleteRestaurantController
} = require("../controllers/restaurantController");

const router = express.Router();

//routes
// CREATE RESTAURENT
router.post("/create", authMiddlewares, createRestaurantController);

//GET ALL RESRAURANT
router.get("/getAll", getAllRestaurantController);

//GET RESTAURANT BY ID
router.get("/get/:id", getRestaurantByIdController)

//DELETE RESTAURANT BY ID
router.delete("/delete/:id", deleteRestaurantController)
module.exports = router;
