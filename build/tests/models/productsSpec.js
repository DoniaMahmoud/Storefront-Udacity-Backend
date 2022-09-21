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
var product_model_1 = require("../../models/product.model");
var database_1 = __importDefault(require("../../database"));
var pModel = new product_model_1.ProductModel();
var product = {
    name: 'ps5',
    category: 'gaming',
    price: 10000.999,
};
describe('Product CRUD Operations Suite', function () {
    //create
    it('should create a new product and return it', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdProduct;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pModel.create(product)];
                case 1:
                    createdProduct = _a.sent();
                    console.log(typeof product.price);
                    console.log(typeof createdProduct.price);
                    expect(createdProduct).toEqual({
                        id: createdProduct.id,
                        name: product.name,
                        category: product.category,
                        price: product.price.toString(),
                    });
                    product.id =
                        createdProduct.id;
                    return [2 /*return*/];
            }
        });
    }); });
    //index => get all users
    it('should get all products and ensure that there is product created', function () { return __awaiter(void 0, void 0, void 0, function () {
        var getAllProducts, numProducts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pModel.index()];
                case 1:
                    getAllProducts = _a.sent();
                    numProducts = getAllProducts.length;
                    expect(numProducts).toEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
    //show => get specific user
    it('should get the product with the specified product id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var getProduct;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pModel.show(product.id)];
                case 1:
                    getProduct = _a.sent();
                    expect(getProduct).toEqual({
                        id: product.id,
                        name: product.name,
                        category: product.category,
                        price: product.price.toString(),
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    //update
    it('should get the updated order given the updated data', function () { return __awaiter(void 0, void 0, void 0, function () {
        var getUpdatedProduct;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pModel.edit({
                        id: product.id,
                        name: 'ps3',
                        category: product.category,
                        price: (5000.999).toString(),
                    })];
                case 1:
                    getUpdatedProduct = _a.sent();
                    expect(getUpdatedProduct.name).toEqual('ps3');
                    expect(getUpdatedProduct.price.toString()).toEqual('5000.999');
                    return [2 /*return*/];
            }
        });
    }); });
    //delete
    it('should get the deleted order given the order id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var getDeletedProduct;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pModel.delete(product.id)];
                case 1:
                    getDeletedProduct = _a.sent();
                    expect(getDeletedProduct.id).toEqual(product.id);
                    expect(getDeletedProduct.name).toBe('ps3');
                    expect(getDeletedProduct.category).toBe(product.category);
                    expect(getDeletedProduct.price.toString()).toBe('5000.999');
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var conn, sql;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    conn = _a.sent();
                    sql = 'DELETE FROM products';
                    return [4 /*yield*/, conn.query(sql)];
                case 2:
                    _a.sent();
                    conn.release();
                    return [2 /*return*/];
            }
        });
    }); });
});
