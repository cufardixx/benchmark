import { MySqlDriver } from '@mikro-orm/mysql';
import { User } from './entity/User';
import { defineConfig } from '@mikro-orm/mysql'; // Asegúrate de importar el driver correcto

export default defineConfig({
  entities: [User], // Añade tus entidades aquí
  dbName: 'benchmark_db', // Nombre de la base de datos
  driver: MySqlDriver, // o el driver que estés utilizando
  user: 'root', // Usuario de la base de datos
  password: '1234', // Contraseña de la base de datos
  host: '127.0.0.1', // Host de la base de datos
  port: 3306, // Puerto de MySQL
  debug: true, // Opción para activar/desactivar logs detallados
  allowGlobalContext: true, // Opcional, si quieres habilitar el contexto global
});