const UUIDv4 = require("uuid").v4;
const express = require("express");
const router = express.Router();

const Product = require("../models/product");

const products = [];

// CREATE
router.post("/", async (req, res) => {
  try {
    const product = new Product(
      UUIDv4(),
      req.body.name,
      req.body.price,
      req.body.quantity
    );

    products.push(product);

    res.json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// READ many
router.get("/", async (_, res) => {
  try {
    res.send(products);
  } catch (error) {
    return res.status(500).json(error);
  }
});

function deleteProducts() {
  products.length = 0;
}

function getProducts() {
  return products;
}

module.exports = { router, deleteProducts, getProducts };
