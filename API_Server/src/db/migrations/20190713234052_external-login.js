exports.up = function(knex, Promise) {
  return knex.schema.createTable('external_logins', table => {
    table.increments('id').primary()
    table.string('provider_id')
    table.string('username').unique()
    table.string('provider')
    table.integer('user_id').references('users.id')
    table.unique(['provider_id', 'provider'])


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
  return knex.schema.dropTable('external_logins')
};
