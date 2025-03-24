const express = require("express");
const authMiddlewares = require("../middlewares/authMiddlewares");
const { placeOrderController, orderStatusController } = require("../controllers/orderController");
const adminMiddleware = require("../middlewares/adminMiddleware");


const router = express.Router();

//routes
router.post("/placeorder", authMiddlewares, placeOrderController);

// ORDER STATUS
router.post(
  "/orderStatus/:id",
  authMiddlewares,
  adminMiddleware,
  orderStatusController
);
module.exports = router;
