const express = require("express");
const router = express.Router();

const productController = require("../controller/product");
const ordersClient = require("../ordersClient");

// CREATE
router.post("/", async (_, res) => {
  try {
    const products = productController.getProducts();

    const totalPrice = products.reduce(
      (acc, product) => acc + product.quantity * product.price,
      0.0
    );

    const createOrderRequest = {
      products: products,
      totalPrice: totalPrice,
    };

    ordersClient.createOrder(createOrderRequest, (err, response) => {
      if (err) throw err;

      productController.deleteProducts();
      const orderId = response.orderId;
      res.json(orderId);
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

// READ many
router.get("/", async (_, res) => {
  try {
    ordersClient.getOrders({}, (err, response) => {
      if (err) throw err;

      const orders = response.orders;
      res.send(orders);
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
