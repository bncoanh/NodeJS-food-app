const foodModel = require("../models/foodModel");

// CREATE FOOD
const createFoodController = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
        } = req.body;

        if (!title || !description || !price || !restaurant) {
            return res.status(500).send({
                success: false,
                message: "Please Provide all fields",
            });
        }
        const newFood = new foodModel({
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
        });

        await newFood.save();
        res.status(201).send({
            success: true,
            message: "New Food Item Created",
            newFood,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in create food api",
            error,
        });
    }
};

//GET ALL FOOD
const getAllFoodController = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        if (!foods) {
            return res.status(500).send({
                success: false,
                message: "Foods not found",
            });
        }
        res.status(200).send({
            success: true,
            message: "All foods",
            totalCount: foods.length,
            foods,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get all food",
            error,
        });
    }
};

// GET FOOD BY ID
const getFoodByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(500).send({
                success: false,
                message: "Please provide id",
            });
        }
        const food = await foodModel.findById(id);
        if (!food) {
            return res.status(500).send({
                success: false,
                message: "Food not found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Single Food",
            food,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In get SIngle Food API",
            error,
        });
    }
};

//GET FOOD BY RESTAURANT
const getFoodByRestaurantController = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        if (!restaurantId) {
            return res.status(500).send({
                success: false,
                message: "Please provide restaurant id",
            });
        }
        const foods = await foodModel.find({ restaurant: restaurantId });
        if (!foods) {
            return res.status(404).send({
                success: false,
                message: "Foods not found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Foods by restaurant",
            totalCount: foods.length,
            foods,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get food by restaurant",
            error,
        });
    }
};

//UPDATE FOOD
const updateFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(404).send({
                success: false,
                message: "Please provide food id",
            });
        }
        const food = await foodModel.findByIdAndUpdate(foodId);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "Food not found",
            });
        }
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            rating,
        } = req.body;
        const updatedFood = await foodModel.findByIdAndUpdate(
            foodId,
            {
                title,
                description,
                price,
                imageUrl,
                foodTags,
                category,
                code,
                isAvailable,
                rating,
            },
            {
                new: true,
            }
        );
        res.status(200).send({
            success: true,
            message: "Food updated successfully",
            updatedFood,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in update food",
            error,
        });
    }
};

//DELETE FOOD
const deleteFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(404).send({
                success: false,
                message: "Please provide food id",
            });
        }
        const food = await foodModel.findByIdAndDelete(foodId);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "Food not found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Food deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in delete food",
            error,
        });
    }
};

module.exports = {
    createFoodController,
    getAllFoodController,
    getFoodByIdController,
    getFoodByRestaurantController,
    updateFoodController,
    deleteFoodController
};
