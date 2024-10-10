import { MikroORM } from '@mikro-orm/core';
import { User } from './entity/User';

export default {
  entities: [User],
  dbName: 'benchmark_db',
  type: 'mysql',
  user: 'root',
  password: 'password',
  debug: true,
} as Parameters<typeof MikroORM.init>[0];
