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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const entity_1 = require("./User/entity");
const AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'benchmark_db',
    synchronize: true,
    logging: false,
    entities: [entity_1.User],
});
// Reemplaza createConnection con dataSource.initialize()
AppDataSource.initialize().then(() => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = AppDataSource.getRepository(entity_1.User);
    // Medir tiempo de la operación Create
    let start = process.hrtime();
    const user = new entity_1.User();
    user.name = "John Doe";
    user.email = "johndoe@example.com";
    yield userRepository.save(user);
    let end = process.hrtime(start);
    console.log("User created:", user);
    console.log(`Create operation took: ${end[0]}s ${end[1] / 1000000}ms`);
    // Medir tiempo de la operación Read
    start = process.hrtime();
    const users = yield userRepository.find();
    end = process.hrtime(start);
    console.log("All users:", users);
    console.log(`Read operation took: ${end[0]}s ${end[1] / 1000000}ms`);
    // Medir tiempo de la operación Update
    start = process.hrtime();
    const updateUser = yield userRepository.findOneBy({ id: 1 });
    if (updateUser) {
        updateUser.name = "Jane Doe";
        yield userRepository.save(updateUser);
        end = process.hrtime(start);
        console.log("User updated:", updateUser);
        console.log(`Update operation took: ${end[0]}s ${end[1] / 1000000}ms`);
    }
    // Medir tiempo de la operación Delete
    start = process.hrtime();
    yield userRepository.delete({ id: 1 });
    end = process.hrtime(start);
    console.log("User deleted");
    console.log(`Delete operation took: ${end[0]}s ${end[1] / 1000000}ms`);
    process.exit();
}));
