module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'music-hacktiv8',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  // test: {
  //   username: root,
  //   password: null,
  //   database: database_test,
  //   host: '127.0.0.1',
  //   dialect: mysql,
  //   operatorsAliases: false,
  // },
  production: {
    username: 'process.env.DB_USERNAME',
    password: 'process.env.DB_PASSWORD',
    database: 'process.env.DB_NAME',
    host: 'process.env.DB_HOST',
    dialect: 'postgres',
  },
}
