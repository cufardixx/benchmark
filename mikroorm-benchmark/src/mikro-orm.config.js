"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("@mikro-orm/mysql");
const User_1 = require("./entity/User");
const mysql_2 = require("@mikro-orm/mysql"); // Asegúrate de importar el driver correcto
exports.default = (0, mysql_2.defineConfig)({
    entities: [User_1.User], // Añade tus entidades aquí
    dbName: 'benchmark_db', // Nombre de la base de datos
    driver: mysql_1.MySqlDriver, // o el driver que estés utilizando
    user: 'root', // Usuario de la base de datos
    password: '1234', // Contraseña de la base de datos
    host: '127.0.0.1', // Host de la base de datos
    port: 3306, // Puerto de MySQL
    debug: true, // Opción para activar/desactivar logs detallados
    allowGlobalContext: true, // Opcional, si quieres habilitar el contexto global
});
