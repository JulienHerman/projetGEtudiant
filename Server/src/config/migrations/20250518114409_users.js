/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Users', function(table) {
        table.increments('id').primary();                         // id auto-incrémenté
        table.string('name').notNullable();                       // prénom
        table.string('surname').notNullable();                    // nom
        table.string('email').notNullable().unique();             // email unique
        table.string('password').notNullable();                   // mot de passe
        table.enu('role', ['USER', 'ADMIN']).notNullable();       // rôle
        table.enu('status', ['ACTIVE', 'INACTIVE']).notNullable();// statut
        table.timestamps(true, true);                             // created_at et updated_at automatiques
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Users');
};
