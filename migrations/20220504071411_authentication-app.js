/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
  return knex.schema.createTable('user', (tbl) => {
    tbl.increments()
    tbl.text('username')
      .notNullable()
      .unique()
    tbl.text('email')
      .notNullable()
      .unique()
    tbl.text('password')
      .notNullable
    tbl.timestamps(true, true)
  })

  .createTable('user_data', (tbl) => {
    tbl.increments()
    tbl.text('sex')
    tbl.text('address')
    tbl.text('town')
    tbl.integer('phone_number')

    //Foreign key to 'user' table
    tbl.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('user')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_data').dropTableIfExists('user')
};
