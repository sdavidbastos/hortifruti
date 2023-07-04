import 'dotenv/config'
import { Sequelize } from 'sequelize';

const { DB_DATABASE, DB_HOST, DB_PORT, DB_ROOT, DB_DIALECT } = process.env
const uri = `${DB_DIALECT}://${DB_ROOT}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`

export const sequelize = new Sequelize(uri);