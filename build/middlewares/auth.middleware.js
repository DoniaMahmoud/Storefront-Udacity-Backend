"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
var config_1 = __importDefault(require("../config"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var authMiddleware = function (req, _res, next) {
    try {
        //user will send token in header
        // get auth header
        var auth = req.get('authorization');
        // if auth header exists => validate
        if (auth) {
            //check if token value type is bearer
            var bearer = auth === null || auth === void 0 ? void 0 : auth.split(' ')[0];
            var token = auth === null || auth === void 0 ? void 0 : auth.split(' ')[1];
            //if bearer =>
            if (bearer ===
                'Bearer' &&
                token) {
                //if token is verified based on secretToken
                var verifiedToken = jsonwebtoken_1.default.verify(token, config_1.default.secretToken);
                if (verifiedToken) {
                    next();
                }
                else {
                    throw new Error("ERROR: User authentication failed");
                }
                //if not verified => failed to auth user
            }
            else {
                throw new Error("ERROR: User authentication failed");
            }
        }
        // if no auth header exists => no token provided
        else {
            throw new Error("ERROR: no token provided");
        }
    }
    catch (error) {
        throw new Error("ERROR: Invalid user token ".concat(error));
    }
};
exports.authMiddleware = authMiddleware;
