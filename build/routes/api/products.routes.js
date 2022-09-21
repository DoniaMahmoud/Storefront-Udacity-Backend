"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var products_controller_1 = require("../../controllers/products.controller");
var auth_middleware_1 = require("../../middlewares/auth.middleware");
var routes = express_1.default.Router();
routes.get('/', function (_req, res) {
    res.send('products route');
});
//middlewares and controllers
// create product
routes.post('/create', auth_middleware_1.authMiddleware, products_controller_1.create);
// get all products
routes.get('/getProducts', products_controller_1.index);
// get specific product
routes.get('/getProduct/:id', products_controller_1.show);
// update product
routes.patch('/update', products_controller_1.edit);
// delete product
routes.delete('/delete/:id', products_controller_1.deletee);
exports.default = routes;
