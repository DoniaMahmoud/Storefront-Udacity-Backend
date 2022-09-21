"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var _a = process.env, PORT = _a.PORT, NODE_ENV = _a.NODE_ENV, DB_HOST = _a.DB_HOST, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_DBPort = _a.POSTGRES_DBPort, POSTGRES_DB_Test = _a.POSTGRES_DB_Test, PEPPER = _a.PEPPER, SALT = _a.SALT, SECRET_TOKEN = _a.SECRET_TOKEN;
exports.default = {
    port: Number(PORT),
    database: NODE_ENV ===
        'dev'
        ? POSTGRES_DB
        : POSTGRES_DB_Test,
    host: DB_HOST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    dbPort: Number(POSTGRES_DBPort),
    pepper: PEPPER,
    salt: SALT,
    secretToken: SECRET_TOKEN,
};
