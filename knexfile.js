module.exports = {

  development: {
    client: 'postgresql',
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
  }
};