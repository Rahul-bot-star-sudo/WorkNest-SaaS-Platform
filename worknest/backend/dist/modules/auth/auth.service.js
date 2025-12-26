"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const auth_config_1 = require("./auth.config");
class AuthService {
    registerUser(dto) {
        // STEP 1: validate
        if (!dto.email)
            throw new Error('Email required');
        if (!dto.password)
            throw new Error('Password required');
        // STEP 2: password strength
        if (dto.password.length < 8)
            throw new Error('Weak password');
        // STEP 3: create user (temporary, DB later)
        const user = {
            email: dto.email,
            role: auth_config_1.DEFAULT_ROLE,
        };
        // STEP 4: return safe response
        return user;
    }
}
exports.AuthService = AuthService;
