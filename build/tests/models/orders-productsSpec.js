"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var orders_products_model_1 = require("../../models/orders-products.model");
var order_model_1 = require("../../models/order.model");
var product_model_1 = require("../../models/product.model");
var user_model_1 = require("../../models/user.model");
var database_1 = __importDefault(require("../../database"));
var opModel = new orders_products_model_1.OrdersProductsModel();
var oModel = new order_model_1.OrderModel();
var pModel = new product_model_1.ProductModel();
var uModel = new user_model_1.UserModel();
var user = {
    email: 'doniam@gmail.com',
    first_name: 'donia',
    last_name: 'mahmoud',
    password: 'password',
};
var order = {
    status: 'active',
    userID: user.id,
};
var product = {
    name: 'ps5',
    category: 'gaming',
    price: 10000,
};
var orderProduct = {
    quantity: 500,
    orderID: order.id,
    productID: product.id,
};
describe('Order Products CRUD Operations Suite', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdUser, createdProduct, createdOrder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, uModel.create(user)];
                case 1:
                    createdUser = _a.sent();
                    user.id =
                        createdUser.id;
                    order.userID =
                        createdUser.id;
                    return [4 /*yield*/, pModel.create(product)];
                case 2:
                    createdProduct = _a.sent();
                    return [4 /*yield*/, oModel.create(order)];
                case 3:
                    createdOrder = _a.sent();
                    order.id =
                        createdOrder.id;
                    product.id =
                        createdProduct.id;
                    orderProduct.orderID =
                        order.id;
                    orderProduct.productID =
                        product.id;
                    return [2 /*return*/];
            }
        });
    }); });
    // const testCreateOP : IOrderProduct ={
    //         quantity: 500 as unknown as string,
    //         orderID: order.id as string,
    //         productID: product.id as string
    // }
    //create
    it('should create order product and return it ', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdOP;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, opModel.create(orderProduct)];
                case 1:
                    createdOP = _a.sent();
                    orderProduct.id =
                        createdOP.id;
                    expect(createdOP).toEqual({
                        id: createdOP.id,
                        quantity: 500,
                        orderid: order.id,
                        productid: product.id,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    //index => get all order products
    it('should get all order products and ensure that there is one created', function () { return __awaiter(void 0, void 0, void 0, function () {
        var getAllOPs, numOPs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, opModel.index(order.id)];
                case 1:
                    getAllOPs = _a.sent();
                    numOPs = getAllOPs.length;
                    expect(numOPs).toEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
    //show => get specific order product
    it('should get  specific order product with specified id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var getOP;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, opModel.show(orderProduct.id)];
                case 1:
                    getOP = _a.sent();
                    expect(getOP).toEqual({
                        id: orderProduct.id,
                        quantity: 500,
                        orderid: order.id,
                        productid: product.id,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    //update
    it('should get the updated user given the updated data', function () { return __awaiter(void 0, void 0, void 0, function () {
        var getUpdatedOP;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, opModel.edit({
                        quantity: '1000',
                        orderID: order.id,
                        productID: product.id,
                    })];
                case 1:
                    getUpdatedOP = _a.sent();
                    expect(getUpdatedOP.quantity).toEqual(1000);
                    return [2 /*return*/];
            }
        });
    }); });
    //delete
    it('should get the deleted user given the delete id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var getDeletedOP;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, opModel.delete(orderProduct)];
                case 1:
                    getDeletedOP = _a.sent();
                    expect(getDeletedOP.id).toEqual(orderProduct.id);
                    expect(getDeletedOP.quantity).toEqual(1000);
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var conn, sql1, sql2, sql3, sql4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    conn = _a.sent();
                    sql1 = 'DELETE FROM users';
                    sql2 = 'DELETE FROM orders';
                    sql3 = 'DELETE FROM products';
                    sql4 = 'DELETE FROM orders_products';
                    return [4 /*yield*/, conn.query(sql4)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, conn.query(sql2)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, conn.query(sql3)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, conn.query(sql1)];
                case 5:
                    _a.sent();
                    conn.release();
                    return [2 /*return*/];
            }
        });
    }); });
});
