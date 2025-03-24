const categoryModel = require("../models/categoryModel");

const createCatController = async (req, res) => {
    try {
        const { title, imageUrl } = req.body;
        if (!title) {
            return res.status(500).send({
                success: false,
                message: "please provide category title or image",
            });
        }
        const newCategory = new categoryModel({ title, imageUrl });
        await newCategory.save();
        res.status(200).send({
            success: true,
            message: "category created",
            newCategory,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Create Cat API",
            error,
        });
    }
};

//GET ALL CATEGORY
const getAllCategoryController = async (req, res) => {
    try{
        const category = await categoryModel.find({});
        if (!category) {
            return res.status(404).send({
                success: false,
                message: "Please provide category",
            });
        }
        res.status(200).send({
            success: true,
            totalCount: category.length,
            category,
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Create Cat API",
            error,
        });
    }
};

module.exports = { createCatController, getAllCategoryController };
