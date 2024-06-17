const knex = require('knex');

const db  = knex(
    {
      client: 'pg',
      connection: {
        database: 'training',
        user:     'postgres',
        password: 'root',
        port: 5432
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    },);

const checkDbConnection = async() => 
await db.raw('select 1');

checkDbConnection();
module.exports = {db};