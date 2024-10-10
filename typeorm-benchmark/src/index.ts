import "reflect-metadata";
import { DataSource } from 'typeorm'; 
import { User } from "./User/entity";

const AppDataSource = new DataSource({
  type: "mysql",
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '1234',
  database: 'benchmark_db',
  synchronize: true,
  logging: false,
  entities: [User],
});

// Reemplaza createConnection con dataSource.initialize()
AppDataSource.initialize().then(async () => {
  const userRepository = AppDataSource.getRepository(User);

  // Medir tiempo de la operación Create
  let start = process.hrtime();
  const user = new User();
  user.name = "John Doe";
  user.email = "johndoe@example.com";
  await userRepository.save(user);
  let end = process.hrtime(start);
  console.log("User created:", user);
  console.log(`Create operation en: ${end[0]}s ${end[1] / 1000000}ms`);

  // Medir tiempo de la operación Read
  start = process.hrtime();
  const users = await userRepository.find();
  end = process.hrtime(start);
  console.log("All users:", users);
  console.log(`Read operation en: ${end[0]}s ${end[1] / 1000000}ms`);

  // Medir tiempo de la operación Update
  start = process.hrtime();
  const updateUser = await userRepository.findOneBy({ id: 1 });
  if (updateUser) {
    updateUser.name = "Jane Doe";
    await userRepository.save(updateUser);
    end = process.hrtime(start);
    console.log("User updated:", updateUser);
    console.log(`Update operation en: ${end[0]}s ${end[1] / 1000000}ms`);
  }

  // Medir tiempo de la operación Delete
  start = process.hrtime();
  await userRepository.delete({ id: 1 });
  end = process.hrtime(start);
  console.log("User deleted");
  console.log(`Delete operation en: ${end[0]}s ${end[1] / 1000000}ms`);

  process.exit();
});

