"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashingPassword = void 0;
var config_1 = __importDefault(require("../config"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var hashingPassword = function (password) {
    var salt = Number(config_1.default.salt);
    var pepper = config_1.default.pepper;
    var hashedPassword = bcrypt_1.default.hashSync("".concat(password).concat(pepper), salt);
    return hashedPassword;
};
exports.hashingPassword = hashingPassword;
