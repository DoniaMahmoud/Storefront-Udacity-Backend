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
var order_model_1 = require("../../models/order.model");
var user_model_1 = require("../../models/user.model");
var database_1 = __importDefault(require("../../database"));
var uModel = new user_model_1.UserModel();
var oModel = new order_model_1.OrderModel();
var user = {
    email: 'user@gmail.com',
    first_name: 'donia',
    last_name: 'mahmoud',
    password: 'password',
};
var order = {
    status: 'active',
    userID: user.id,
};
describe('Order CRUD Operations Suite', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, uModel.create(user)];
                case 1:
                    createdUser = _a.sent();
                    user.id =
                        createdUser.id;
                    order.userID =
                        createdUser.id;
                    return [2 /*return*/];
            }
        });
    }); });
    //create
    it('should create a new order and return it', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdOrder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, oModel.create(order)];
                case 1:
                    createdOrder = _a.sent();
                    expect(createdOrder).toEqual({
                        id: createdOrder.id,
                        status: order.status,
                        userid: order.userID,
                    });
                    order.id =
                        createdOrder.id;
                    return [2 /*return*/];
            }
        });
    }); });
    //index => get all users
    it('should get all orders and ensure that there is order created', function () { return __awaiter(void 0, void 0, void 0, function () {
        var getAllOrders, numOrders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, oModel.index()];
                case 1:
                    getAllOrders = _a.sent();
                    numOrders = getAllOrders.length;
                    expect(numOrders).toEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
    //show => get specific user
    it('should get the order with the specified order id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var getOrder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, oModel.show(order.id)];
                case 1:
                    getOrder = _a.sent();
                    expect(getOrder).toEqual({
                        id: order.id,
                        status: order.status,
                        userid: order.userID,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    //get order by  user
    it('should get order by user id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var getOrderByUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, oModel.getOrderByUser(user.id)];
                case 1:
                    getOrderByUser = _a.sent();
                    expect(getOrderByUser.id).toBe(order.id);
                    expect(getOrderByUser.status).toBe(order.status);
                    return [2 /*return*/];
            }
        });
    }); });
    //update
    it('should get the updated order given the updated data', function () { return __awaiter(void 0, void 0, void 0, function () {
        var getUpdatedOrder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, oModel.edit({
                        id: order.id,
                        status: 'complete',
                        userid: user.id,
                    })];
                case 1:
                    getUpdatedOrder = _a.sent();
                    expect(getUpdatedOrder.status).toEqual('complete');
                    return [2 /*return*/];
            }
        });
    }); });
    //delete
    it('should get the deleted order given the order id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var getDeletedOrder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, oModel.delete(order.id)];
                case 1:
                    getDeletedOrder = _a.sent();
                    expect(getDeletedOrder.id).toEqual(order.id);
                    expect(getDeletedOrder.status).toBe('complete');
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var conn, sql1, sql2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    conn = _a.sent();
                    sql1 = 'DELETE FROM users';
                    sql2 = 'DELETE FROM orders';
                    // const sql3= 'DELETE FROM products';
                    // const sql4= 'DELETE FROM orders_products';
                    return [4 /*yield*/, conn.query(sql2)];
                case 2:
                    // const sql3= 'DELETE FROM products';
                    // const sql4= 'DELETE FROM orders_products';
                    _a.sent();
                    return [4 /*yield*/, conn.query(sql1)];
                case 3:
                    _a.sent();
                    conn.release();
                    return [2 /*return*/];
            }
        });
    }); });
});
