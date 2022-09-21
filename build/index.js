"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
var config_1 = __importDefault(require("./config"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
var corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
// port number
var port = config_1.default.port ||
    3000;
app.use(express_1.default.json());
//main route
app.use('/api', index_1.default);
app.listen(port, function () {
    console.log("Server started on port:".concat(port));
});
exports.default = app;
