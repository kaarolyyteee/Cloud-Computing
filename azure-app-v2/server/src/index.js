const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const productRouter = require('./controller/product');

const app = express();
const port = normalizePort(process.env.PORT || 8080);

app.use(cors());
app.use(express.json());

// available routes
app.use('/api/v1/products', productRouter);

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

module.exports = app;
