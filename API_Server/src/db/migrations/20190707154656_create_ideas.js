exports.up = function (knex, Promise) {
  return knex.schema.createTable('ideas', table => {
      table.increments('id').primary()
      table.string('idea')
      table.string('creator')
    })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('ideas')
}
