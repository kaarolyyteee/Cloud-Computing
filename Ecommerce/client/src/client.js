require("dotenv").config();
const express = require("express");

const productController = require("./controller/product");
const storesRouter = require("./controller/stores");

const app = express();
const port = normalizePort(process.env.PORT || 3000);

app.use(express.json());

// available routes
app.use("/api/v1/products", productController.router);
app.use("/api/v1/stores", storesRouter);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}
