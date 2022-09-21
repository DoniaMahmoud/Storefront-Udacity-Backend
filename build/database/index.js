"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var config_1 = __importDefault(require("../config"));
var db = new pg_1.Pool({
    port: config_1.default.dbPort,
    database: config_1.default.database,
    host: config_1.default.host,
    user: config_1.default.user,
    password: config_1.default.password,
});
db.on('connect', function () {
    console.log('Database is connected');
});
db.on('remove', function () {
    console.log('Database is disconnected');
});
db.on('error', function (error) {
    console.log('ERROR: An error has occured while connecting to the database', error.message);
});
exports.default = db;
