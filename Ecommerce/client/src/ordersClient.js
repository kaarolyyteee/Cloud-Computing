const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const externalProto = __dirname + "/../proto/orders_service.proto";
const packageDefinition = protoLoader.loadSync(externalProto, {});
const ecomPackage = grpc.loadPackageDefinition(packageDefinition).ecom;
const ordersClient = new ecomPackage.OrdersService(
  `grpc-server:8080`,
  grpc.credentials.createInsecure()
);

module.exports = ordersClient;
