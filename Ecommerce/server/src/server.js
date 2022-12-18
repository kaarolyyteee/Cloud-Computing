require("dotenv").config();
const UUIDv4 = require("uuid").v4;

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const Order = require("./models/order");
const packageDefinition = protoLoader.loadSync(
  __dirname + "/../proto/orders_service.proto",
  {}
);
const packageObject = grpc.loadPackageDefinition(packageDefinition);
const ecomPackage = packageObject.ecom;

const port = process.env.PORT || 8080;
const orders = [];

function createOrder(call, callback) {
  const request = call.request;

  const order = new Order(UUIDv4(), request.products, request.totalPrice);

  orders.push(order);

  callback(null, { order: order });
}

function getOrders(_, callback) {
  callback(null, { orders: orders });
}

function main() {
  console.log("listining on port " + port);
  const server = new grpc.Server();
  server.addService(ecomPackage.OrdersService.service, {
    createOrder: createOrder,
    getOrders: getOrders,
  });
  server.bindAsync(
    `0.0.0.0:${port}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
    }
  );
}

main();
