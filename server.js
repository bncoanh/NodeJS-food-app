const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//dieu duong cong
dotenv.config();

// connect DB
connectDB();
//Tao 1 doi tuong

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
//tao tuyen duong
// url http://localhost:8080
//user
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
//restaurent
app.use("/api/v1/restaurant", require("./routes/restaurantRoutes"));
//category
app.use("/api/v1/category", require("./routes/categoryRoutes"));
//food
app.use("/api/v1/food", require("./routes/foodRoutes"));

app.get("/", (req, res) => {
    return res
        .status(200)
        .send("<h1> Mai Dinh Truong dep trai nhat the gioi</h1>");
});

//POST
const PORT = process.env.PORT;

// lang nghe
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
