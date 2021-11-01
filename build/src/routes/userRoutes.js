"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const userRoutes = (0, express_1.Router)();
const userController = new userController_1.default();
userRoutes.post('/', (req, res) => {
    userController.createUser(req, res);
});
userRoutes.get('/', (req, res) => {
    userController.getAllUsers(res);
});
userRoutes.post('/login', (req, res) => {
    userController.login(req, res);
});
exports.default = userRoutes;
