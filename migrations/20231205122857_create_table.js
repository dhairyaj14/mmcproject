
exports.up = function (knex) {
    return knex.schema.createTable('accounts', function (table) {
      table.increments('id').primary();
      table.string('name');
      table.jsonb('address');
      table.integer('phone');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
      table.timestamps(true, true);
      table.boolean('isVerified').defaultTo(false); 
      table.specificType('geopoints', 'GEOMETRY(Point, 4326)');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('accounts');
  };