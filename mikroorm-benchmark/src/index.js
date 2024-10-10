"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const User_1 = require("./entity/User");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const orm = yield core_1.MikroORM.init(mikro_orm_config_1.default);
    const userRepository = orm.em.getRepository(User_1.User);
    // Create
    const user = new User_1.User();
    user.name = "John Doe";
    user.email = "johndoe@example.com";
    yield orm.em.persistAndFlush(user);
    console.log("User created:", user);
    // Read
    const users = yield userRepository.findAll();
    console.log("All users:", users);
    // Update
    const updateUser = yield userRepository.findOne({ id: 1 });
    if (updateUser) {
        updateUser.name = "Jane Doe";
        yield orm.em.persistAndFlush(updateUser);
        console.log("User updated:", updateUser);
    }
    // Delete
    yield userRepository.nativeDelete({ id: 1 });
    console.log("User deleted");
    yield orm.close(true);
});
main().catch((err) => {
    console.error(err);
});
