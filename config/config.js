module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'music-hacktiv8',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: root,
    password: null,
    database: database_test,
    host: '127.0.0.1',
    dialect: mysql,
    operatorsAliases: false,
  },
  production: {
    username: 'euauvrbahzvxbb',
    password: 'd762eb4afb2afd9dd9eae3410e391353d49000a31f7db5e3192621a013a94ec6',
    database: 'd4ur40ta3hjvsn',
    host: 'ec2-50-19-95-77.compute-1.amazonaws.com',
    dialect: 'postgres',
  },
}
