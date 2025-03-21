const mongooes = require("mongoose");
const colors = require("colors");
const connectDB = async () => {
    try {
        await mongooes.connect(process.env.MONGO_URL);
        console.log(
            `Connected to Database ${mongooes.connection.host}`
            .bgCyan
        );
    } catch (error) {
        console.log("Db error", error.colors.bgRed);
    }
};
module.exports = connectDB;
