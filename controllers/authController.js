const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
// Dang ky/ register
const registerController = async (req, res) => {
    try {
        const { username, email, password, phone, address, answer } = req.body;
        // xac nhan/ validation
        if (!username || !email || !password || !phone || !address || !answer) {
            return res.status(500).send({
                success: false,
                message: "please provide all fields",
            });
        }
        // check user
        const exisiting = await userModel.findOne({ email });
        if (exisiting) {
            return res.status(500).send({
                success: false,
                message: " Email already register please login ",
            });
        }
        //hash passwprd
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // create new user
        const user = await userModel.create({
            username,
            email,
            password: hashedPassword,
            address,
            phone,
            answer,
        });
        res.status(201).send({
            success: true,
            message: "Successfully registed ",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in register api",
            error,
        });
    }
};

//LOGIN / dang nhap
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: "Please provide email or password",
            });
        }
        // check user
        const user = await userModel.findOne({
            email
        });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "user not found",
            });
        }
        const isMach = await bcrypt.compare(password, user.password);
        if (!isMach) {
            return res.status(500).send({
                success: false,
                message: "Invadil Creadentials",
            });
        }
        // token
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        user.password = undefined;
        res.status(200).send({
            success: true,
            message: "login successfully",
            token,
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login api",
        });
    }
};
module.exports = { registerController, loginController };
