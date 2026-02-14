"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const auth_controller_1 = require("./modules/auth/auth.controller");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// DB connect (agar db.ts sahi hai to)
(0, db_1.connectDB)();
// ✅ SIMPLE WIRING (no dependency injection for now)
const authController = new auth_controller_1.AuthController();
// ✅ REGISTER ROUTE
app.post('/register', (req, res) => {
    authController.register(req, res);
});
exports.default = app;
