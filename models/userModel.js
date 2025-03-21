const mongooes = require("mongoose");

//schema
const userChema = new mongooes.Schema(
    {
        username: {
            type: String,
            require: [true, "user name is required"],
            unique: true,
        },
        email: {
            type: String,
            require: [true, "email is required"],
            unique: true,
        },
        password: {
            type: String,
            require: [true, "password is required"],
        },
        address: {
            type: Array,
        },
        phone: {
            type: String,
            require: [true, "phone is required"],
            unique: true,
        },
        usertype: {
            type: String,
            require: [true, "user type is required"],
            default: "clinet",
            enum: ["clinet", "admin", "vendor", "driver"],
        },
        profile: {
            type: String,
            default:
                "https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png",
        },
        answer: {
            type: String,
            require: [true, "Answer is required"],
        },
    },
    { timestamps: true }
);

//export
module.exports = mongooes.model("User", userChema);
