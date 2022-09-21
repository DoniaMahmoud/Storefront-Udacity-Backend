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
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../../index"));
var user_model_1 = require("../../models/user.model");
var database_1 = __importDefault(require("../../database"));
// create a request object
var req = (0, supertest_1.default)(index_1.default);
var uModel = new user_model_1.UserModel();
// const pModel = new UserModel();
var authenticationToken = '';
var user = {
    email: 'user@gmail.com',
    first_name: 'donia',
    last_name: 'mahmoud',
    password: 'password',
};
var product = {
    name: 'ps5',
    category: 'gaming',
    price: 10000,
};
describe(' Testing products Endpoints', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, uModel.create(user)];
                case 1:
                    createdUser = _a.sent();
                    user.id =
                        createdUser.id;
                    return [2 /*return*/];
            }
        });
    }); });
    describe('User Login and Authetication Endpoint ', function () {
        it('should login to get authentication Token ', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, _a, id, email, first_name, last_name, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, req
                            .post('/api/users/login')
                            .set('Content-Type', 'application/json')
                            .send({
                            email: user.email,
                            password: user.password,
                        })];
                    case 1:
                        res = _b.sent();
                        _a = res.body
                            .loggedUser, id = _a.id, email = _a.email, first_name = _a.first_name, last_name = _a.last_name;
                        token = res.body
                            .token;
                        expect(id).toBe(user.id);
                        expect(email).toBe(user.email);
                        expect(first_name).toBe(user.first_name);
                        expect(last_name).toBe(user.last_name);
                        authenticationToken =
                            token;
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('products CRUD Endpoints', function () {
        //create
        it('should create product and return it ', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, _a, id, name, category, price;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, req
                            .post('/api/products/create')
                            .set('Content-Type', 'application/json')
                            .set('Authorization', "Bearer ".concat(authenticationToken))
                            .send(product)];
                    case 1:
                        res = _b.sent();
                        _a = res.body
                            .product, id = _a.id, name = _a.name, category = _a.category, price = _a.price;
                        expect(name).toBe(product.name);
                        expect(category).toBe(product.category);
                        expect(parseInt(price)).toBe(product.price);
                        product.id =
                            id;
                        return [2 /*return*/];
                }
            });
        }); });
        //get all products
        it('should get all products ', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, req
                            .get('/api/products/getProducts')
                            .set('Content-Type', 'application/json')];
                    case 1:
                        res = _a.sent();
                        expect(res.body
                            .products
                            .length).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should get a specific product given id ', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, _a, id, name, category, price;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, req
                            .get("/api/products/getProduct/".concat(product.id))
                            .set('Content-Type', 'application/json')];
                    case 1:
                        res = _b.sent();
                        _a = res.body
                            .product, id = _a.id, name = _a.name, category = _a.category, price = _a.price;
                        expect(id).toBe(product.id);
                        expect(name).toBe(product.name);
                        expect(category).toBe(product.category);
                        expect(parseInt(price)).toBe(product.price);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should update a specific product ', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, _a, name, price;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, req
                            .patch('/api/products/update')
                            .set('Content-Type', 'application/json')
                            .send({
                            id: product.id,
                            name: 'ps4',
                            category: product.category,
                            price: 7000,
                        })];
                    case 1:
                        res = _b.sent();
                        _a = res.body
                            .updatedProduct, name = _a.name, price = _a.price;
                        expect(name).toBe('ps4');
                        expect(parseInt(price)).toBe(7000);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should delete a specific product and return it', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, _a, id, name, category, price;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, req
                            .delete("/api/products/delete/".concat(product.id))
                            .set('Content-Type', 'application/json')];
                    case 1:
                        res = _b.sent();
                        _a = res.body
                            .deletedProduct, id = _a.id, name = _a.name, category = _a.category, price = _a.price;
                        expect(id).toBe(product.id);
                        expect(name).toBe('ps4');
                        expect(category).toBe(product.category);
                        expect(parseInt(price)).toBe(7000);
                        return [2 /*return*/];
                }
            });
        }); });
        afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var conn, sql1, sql3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql1 = 'DELETE FROM users';
                        sql3 = 'DELETE FROM products';
                        // const sql4= 'DELETE FROM orders_products';
                        return [4 /*yield*/, conn.query(sql3)];
                    case 2:
                        // const sql4= 'DELETE FROM orders_products';
                        _a.sent();
                        // await conn.query(sql2);
                        return [4 /*yield*/, conn.query(sql1)];
                    case 3:
                        // await conn.query(sql2);
                        _a.sent();
                        conn.release();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
