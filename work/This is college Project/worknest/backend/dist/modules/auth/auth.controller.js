"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
class AuthController {
    constructor() {
        this.authService = new auth_service_1.AuthService();
    }
    register(req, res) {
        try {
            const { email, password } = req.body;
            const result = this.authService.registerUser({
                email,
                password,
            });
            res.status(201).json(result);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}
exports.AuthController = AuthController;
