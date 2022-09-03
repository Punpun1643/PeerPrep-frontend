// connect nodejs server to db
import { Sequelize } from 'sequelize';

const db = new Sequelize('sqlite::memory:');

export default db;
