require('dotenv').config()

const pg = require('pg')
// enable SSL when connecting to prod database
pg.defaults.ssl = false


module.exports = {
  development: {
    client: 'pg',
    connection:process.env.DATABASE_URL, //'postgres://localhost/secrets',
    migrations: {
      directory: './src/db/migrations'
    },
    seeds: {
      directory: './src/db/seeds/dev'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection:'postgres://localhost/secrets_test',
    migrations: {
      directory: './src/db/migrations'
    },
    seeds: {
      directory: './src/db/seeds/test'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './src/db/migrations'
    },
    seeds: {
      directory: './src/db/seeds/production'
    },
    useNullAsDefault: true
  }
};
