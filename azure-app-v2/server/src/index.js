const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const productRouter = require('./controller/product');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// available routes
app.use('/api/v1/products', productRouter);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

module.exports = app;
