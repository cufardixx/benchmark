import { MikroORM } from "@mikro-orm/core";
import { User } from "./entity/User";
import mikroConfig from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  const userRepository = orm.em.getRepository(User);

  // Create
  const user = new User();
  user.name = "John Doe";
  user.email = "johndoe@example.com";
  await orm.em.persistAndFlush(user); 
  console.log("User created:", user);

  // Read
  const users = await userRepository.findAll();
  console.log("All users:", users);

  // Update
  const updateUser = await userRepository.findOne({ id: 1 });
  if (updateUser) {
    updateUser.name = "Jane Doe";
    await orm.em.persistAndFlush(updateUser); 
    console.log("User updated:", updateUser);
  }

  // Delete
  await userRepository.nativeDelete({ id: 1 });
  console.log("User deleted");

  await orm.close(true);
};

main().catch((err) => {
  console.error(err);
});
