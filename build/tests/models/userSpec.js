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
var user_model_1 = require("../../models/user.model");
var database_1 = __importDefault(require("../../database"));
var uModel = new user_model_1.UserModel();
var user = {
    email: 'donia@gmail.com',
    first_name: 'donia',
    last_name: 'mahmoud',
    password: 'password',
};
describe('User CRUD Operations Suite', function () {
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
    var testCreateUser = {
        email: 'test@gmail.com',
        first_name: 'test',
        last_name: 'test',
        password: 'password',
    };
    //create
    it('should create a new user and return it', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, uModel.create(testCreateUser)];
                case 1:
                    createdUser = _a.sent();
                    expect(createdUser).toEqual({
                        id: createdUser.id,
                        email: 'test@gmail.com',
                        first_name: 'test',
                        last_name: 'test',
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    //index => get all users
    it('should get all users and ensure that there are 2 created', function () { return __awaiter(void 0, void 0, void 0, function () {
        var getAllUsers, numUsers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, uModel.index()];
                case 1:
                    getAllUsers = _a.sent();
                    numUsers = getAllUsers.length;
                    expect(numUsers).toEqual(2);
                    return [2 /*return*/];
            }
        });
    }); });
    //show => get specific user
    it('should get the user with the specified id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var getUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, uModel.show(user.id)];
                case 1:
                    getUser = _a.sent();
                    expect(getUser).toEqual({
                        id: user.id,
                        email: 'donia@gmail.com',
                        first_name: 'donia',
                        last_name: 'mahmoud',
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    //update
    it('should get the updated user given the updated data', function () { return __awaiter(void 0, void 0, void 0, function () {
        var getUpdatedUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, uModel.edit({
                        id: user.id,
                        email: 'user@gmail.com',
                        first_name: 'user',
                        last_name: 'user',
                        password: 'userpassword',
                    })];
                case 1:
                    getUpdatedUser = _a.sent();
                    expect(getUpdatedUser.email).toEqual('user@gmail.com');
                    expect(getUpdatedUser.first_name).toEqual('user');
                    expect(getUpdatedUser.last_name).toEqual('user');
                    return [2 /*return*/];
            }
        });
    }); });
    //delete
    it('should get the deleted user given the delete id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var getDeletedUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, uModel.delete(user.id)];
                case 1:
                    getDeletedUser = _a.sent();
                    expect(getDeletedUser.email).toEqual('user@gmail.com');
                    expect(getDeletedUser.first_name).toEqual('user');
                    expect(getDeletedUser.last_name).toEqual('user');
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
                    sql = 'DELETE FROM users';
                    return [4 /*yield*/, conn.query(sql)];
                case 2:
                    _a.sent();
                    conn.release();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('User Login and Authetication Suite', function () {
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
    it('should return true if user logged in successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
        var loggedUser, flag;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, uModel.login(user.email, user.password)];
                case 1:
                    loggedUser = _a.sent();
                    flag = false;
                    if ((loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.email) ===
                        user.email &&
                        (loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.first_name) ===
                            user.first_name &&
                        (loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.last_name) ===
                            user.last_name) {
                        flag = true;
                    }
                    expect(flag).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return null if login failed', function () { return __awaiter(void 0, void 0, void 0, function () {
        var loggedUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, uModel.login(user.email, '1232')];
                case 1:
                    loggedUser = _a.sent();
                    expect(loggedUser).toBe(null);
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
                    sql = 'DELETE FROM users';
                    return [4 /*yield*/, conn.query(sql)];
                case 2:
                    _a.sent();
                    conn.release();
                    return [2 /*return*/];
            }
        });
    }); });
});
