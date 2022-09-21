"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_controller_1 = require("../../controllers/users.controller");
var auth_middleware_1 = require("../../middlewares/auth.middleware");
var routes = express_1.default.Router();
// routes.get('/', (_req:Request , res:Response) :void => {
//     res.send('users route');
//    });
//middlewares and controllers
// create a new user
routes.post('/create', users_controller_1.create);
// get all users
routes.get('/getUsers', auth_middleware_1.authMiddleware, users_controller_1.index);
// get specific user
routes.get('/getUser/:id', auth_middleware_1.authMiddleware, users_controller_1.show);
// update user
routes.patch('/update', auth_middleware_1.authMiddleware, users_controller_1.edit);
// delete user
routes.delete('/delete/:id', auth_middleware_1.authMiddleware, users_controller_1.deletee);
// login user
routes.post('/login', users_controller_1.login);
exports.default = routes;
