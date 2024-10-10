"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./entity/User");
exports.default = {
    entities: [User_1.User],
    dbName: 'benchmark_db',
    type: 'mysql',
    user: 'root',
    password: 'password',
    debug: true,
};
