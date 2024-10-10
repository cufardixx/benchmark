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
const typeorm_1 = require("typeorm"); // Asegúrate de importar DataSource
const entity_1 = require("./User/entity");
const AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'eventlife',
    synchronize: true,
    logging: false,
    entities: [entity_1.User],
});
// Reemplaza createConnection con dataSource.initialize()
AppDataSource.initialize().then(() => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = AppDataSource.getRepository(entity_1.User);
    // Create
    const user = new entity_1.User();
    user.name = "John Doe";
    user.email = "johndoe@example.com";
    yield userRepository.save(user);
    console.log("User created:", user);
    // Read
    const users = yield userRepository.find();
    console.log("All users:", users);
    // Update
    const updateUser = yield userRepository.findOneBy({ id: 1 });
    if (updateUser) {
        updateUser.name = "Jane Doe";
        yield userRepository.save(updateUser);
        console.log("User updated:", updateUser);
    }
    // Delete
    yield userRepository.delete({ id: 1 });
    console.log("User deleted");
    process.exit();
}));
//# sourceMappingURL=index.js.map