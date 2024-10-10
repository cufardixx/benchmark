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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const orm = yield core_1.MikroORM.init(mikro_orm_config_1.default);
        const em = orm.em.fork(); // Crea una nueva instancia de EntityManager
        // Medir tiempo de la operación Create
        let start = process.hrtime();
        const user = new User_1.User();
        user.name = "John Doe";
        user.email = "johndoe@example.com";
        yield em.persistAndFlush(user); // Persistir la instancia del usuario
        let end = process.hrtime(start);
        console.log("User created:", user);
        console.log(`Create operation en: ${end[0]}s ${end[1] / 1000000}ms`);
        // Medir tiempo de la operación Read
        start = process.hrtime();
        const users = yield em.find(User_1.User, {}); // Buscar usuarios
        end = process.hrtime(start);
        console.log("All users:", users);
        console.log(`Read operation en: ${end[0]}s ${end[1] / 1000000}ms`);
        // Medir tiempo de la operación Update
        start = process.hrtime();
        const updateUser = yield em.findOne(User_1.User, { id: 1 }); // Encontrar usuario por ID
        if (updateUser) {
            updateUser.name = "Jane Doe";
            yield em.persistAndFlush(updateUser); // Guardar la actualización
            end = process.hrtime(start);
            console.log("User updated:", updateUser);
            console.log(`Update operation en: ${end[0]}s ${end[1] / 1000000}ms`);
        }
        // Medir tiempo de la operación Delete
        start = process.hrtime();
        if (updateUser) {
            yield em.removeAndFlush(updateUser); // Eliminar usuario
        }
        end = process.hrtime(start);
        console.log("User deleted");
        console.log(`Delete operation en: ${end[0]}s ${end[1] / 1000000}ms`);
        yield orm.close();
        process.exit();
    });
}
main().catch((err) => {
    console.error(err);
    process.exit(1);
});
