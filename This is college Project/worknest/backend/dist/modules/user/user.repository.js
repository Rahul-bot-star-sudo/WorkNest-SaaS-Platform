"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_schema_1 = require("./user.schema");
class UserRepository {
    async findByEmail(email) {
        return await user_schema_1.User.findOne({ email });
    }
    async save(user) {
        const savedUser = new user_schema_1.User(user);
        return await savedUser.save();
    }
}
exports.UserRepository = UserRepository;
