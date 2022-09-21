"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var orders_products_controller_1 = require("../../controllers/orders-products.controller");
var routes = express_1.default.Router();
routes.get('/', function (_req, res) {
    res.send('orders-products route');
});
//middlewares and controllers
// create orders-products
routes.post('/createOP', orders_products_controller_1.create);
// get all orders-products
routes.get('/getOPs/:id', orders_products_controller_1.index);
// get specific orders-products
routes.get('/getOP/:id', orders_products_controller_1.show);
// update orders-products
routes.post('/update', orders_products_controller_1.edit);
// delete orders-products
routes.delete('/delete', orders_products_controller_1.deletee);
exports.default = routes;
