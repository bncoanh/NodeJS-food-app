const restaurantModel = require("../models/restaurantModel");

//CREATE RESTAURANT
const createRestaurantController = async (req, res) => {
    try {
        const {
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        } = req.body;

        // validation
        if (!title || !coords) {
            return res.status(500).send({
                success: false,
                message: "please provide title and address",
            });
        }

        console.log("Data being saved:", {
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        });

        const newRestaurant = new restaurantModel({
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        });

        console.log("New restaurant object:", newRestaurant);

        const savedRestaurant = await newRestaurant.save();
        console.log("Saved restaurant result:", savedRestaurant);

        res.status(201).send({
            success: true,
            message: "New Resturant Created successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Create Resturant api",
            error,
        });
    }
};

//GET ALL RESRAURANT
const getAllRestaurantController = async (req, res) => {
    try {
        const restaurant = await restaurantModel.find({});
        if (!restaurant) {
            return res.status(404).send({
                success: false,
                message: "Please Provide Resturnat ID",
            });
        }
        res.status(200).send({
            success: true,
            totalCount: restaurant.length,
            restaurant,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Get ALL Restaurant API",
            error,
        });
    }
};

// GET RESTAURANT BY ID
const getRestaurantByIdController = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        if (!restaurantId) {
            return res.status(404).send({
                success: false,
                message: "Please Provide Resturnat ID",
            });
        }
        //find id
        const restaurant = await restaurantModel.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).send({
                success: false,
                message: "no restaurant id",
            });
        }
        res.status(200).send({
            success: true,
            restaurant,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Get ALL Restaurant API",
            error,
        });
    }
};

//DELETE BY ID
const deleteRestaurantController = async (req, res) => {
    const restaurant = req.params.id;
    if (!restaurant) {
        return res.status(404).send({
            success: false,
            message: "no restaurant id",
        });
    }
    //find restaurant
    await restaurantModel.findByIdAndDelete(restaurant);
    res.status(200).send({
        success: true,
        message: "deleted restaurant",
    });
};
module.exports = {
    createRestaurantController,
    getAllRestaurantController,
    getRestaurantByIdController,
    deleteRestaurantController,
};
