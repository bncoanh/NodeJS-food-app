// Get USER

const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

const getUserController = async (req, res) => {
    try {
        // find user
        const user = await userModel.findById({ _id: req.body.id });
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found",
            });
        }
        //hinde password
        user.password = undefined;
        //resp
        res.status(200).send({
            success: true,
            message: "User get Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Eror in Get User API",
            error,
        });
    }
};

//UPDATE USER
const updateUserController = async (req, res) => {
    try {
        // find user
        const user = await userModel.findById({ _id: req.body.id });
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "user not found",
            });
        }
        //update
        const { username, address, phone } = req.body;
        if (username) user.username = username;
        if (address) user.address = address;
        if (phone) user.phone = phone;
        //save user
        await user.save();
        res.status(200).send({
            success: true,
            message: "USer Updated SUccessfully",
        });
    } catch (error) {
        console.log(erorr);
        res.status(500).send({
            success: false,
            message: "Error In Udpate Userr API",
            error,
        });
    }
};

//update password
const updatePasswordController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.id });
        if (!user) {
            res.status(500).send({
                success: false,
                message: " user not found",
            });
        }
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(500).send({
                success: false,
                message: " please provide old or new Password",
            });
        }
        // so sanh mat khaur/ token

        const isMach = await bcrypt.compare(oldPassword, user.password);
        if (!isMach) {
            return res.status(500).send({
                success: false,
                message: "Invadil Creadentials",
            });
        }
        // bam
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: "Password updated successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error not successfully",
            error,
        });
    }
};

//reset password
const resetPasswordController = async (req, res) => {
    try {
      const { email, newPassword, answer } = req.body;
      if (!email || !newPassword || !answer) {
        return res.status(500).send({
          success: false,
          message: "Please Privide All Fields",
        });
      }
      const user = await userModel.findOne({ email, answer });
      if (!user) {
        return res.status(500).send({
          success: false,
          message: "User Not Found or invlaid answer",
        });
      }
      //hashing password
      var salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
      await user.save();
      res.status(200).send({
        success: true,
        message: "Password Reset SUccessfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "eror in PASSWORD RESET API",
        error,
      });
    }
  };

const deleteUserController = async (req, res) => {
    try {
      await userModel.findByIdAndDelete(req.params.id);
      return res.status(200).send({
        success: true,
        message: "Your account has been deleted",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr In Delete Profile API",
        error,
      });
    }
};

// DELETE USER

module.exports = {
    getUserController,
    updateUserController,
    updatePasswordController,
    resetPasswordController,
    deleteUserController,
};
