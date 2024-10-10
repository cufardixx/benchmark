import { MikroORM} from '@mikro-orm/core';
import { User } from './entity/User';
import config from './mikro-orm.config';


async function main() {
  const orm = await MikroORM.init(config);
  const em = orm.em.fork(); // Crea una nueva instancia de EntityManager

  // Medir tiempo de la operación Create
  let start = process.hrtime();
  const user = new User();
  user.name = "John Doe";
  user.email = "johndoe@example.com";
  await em.persistAndFlush(user); // Persistir la instancia del usuario
  let end = process.hrtime(start);
  console.log("User created:", user);
  console.log(`Create operation en: ${end[0]}s ${end[1] / 1000000}ms`);

  // Medir tiempo de la operación Read
  start = process.hrtime();
  const users = await em.find(User, {}); // Buscar usuarios
  end = process.hrtime(start);
  console.log("All users:", users);
  console.log(`Read operation en: ${end[0]}s ${end[1] / 1000000}ms`);

  // Medir tiempo de la operación Update
  start = process.hrtime();
  const updateUser = await em.findOne(User, { id: 1 }); // Encontrar usuario por ID
  if (updateUser) {
    updateUser.name = "Jane Doe";
    await em.persistAndFlush(updateUser); // Guardar la actualización
    end = process.hrtime(start);
    console.log("User updated:", updateUser);
    console.log(`Update operation en: ${end[0]}s ${end[1] / 1000000}ms`);
  }

  // Medir tiempo de la operación Delete
  start = process.hrtime();
  if (updateUser) {
    await em.removeAndFlush(updateUser); // Eliminar usuario
  }
  end = process.hrtime(start);
  console.log("User deleted");
  console.log(`Delete operation en: ${end[0]}s ${end[1] / 1000000}ms`);

  await orm.close();
  process.exit();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});