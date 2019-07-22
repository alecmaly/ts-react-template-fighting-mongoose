exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary()
    table.string('username').unique()
    table.string('token')
    table.string('password_digest')



    // let createQuery = `CREATE TABLE users(
    //   id SERIAL PRIMARY KEY NOT NULL,
    //   username TEXT,
    //   token TEXT,
    //   password_digest TEXT,
    //   created_at TIMESTAMP
    // )`;

    // return knex.raw(createQuery);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
