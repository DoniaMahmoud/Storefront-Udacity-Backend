"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var orders_controller_1 = require("../../controllers/orders.controller");
var auth_middleware_1 = require("../../middlewares/auth.middleware");
var routes = express_1.default.Router();
routes.get('/', function (_req, res) {
    res.send('orders route');
});
//middlewares and controllers
// create order
routes.post('/create', auth_middleware_1.authMiddleware, orders_controller_1.create);
// get all orders
routes.get('/getOrders', auth_middleware_1.authMiddleware, orders_controller_1.index);
// get specific order
routes.get('/getOrder/:id', auth_middleware_1.authMiddleware, orders_controller_1.show);
// update order
routes.patch('/update', auth_middleware_1.authMiddleware, orders_controller_1.edit);
// delete order
routes.delete('/delete/:id', auth_middleware_1.authMiddleware, orders_controller_1.deletee);
// get order by user id
routes.get('/getOrderbyUser/:id', auth_middleware_1.authMiddleware, orders_controller_1.getOrderByUser);
exports.default = routes;
