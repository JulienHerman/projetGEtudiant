/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Students', function(table) {
        table.increments('id').primary();
        table.string('nom').notNullable();
        table.string('prenom').notNullable();
        table.string('numero_inscription').notNullable().unique();
        table.enu('niveau', ['L1', 'L2', 'L3', 'M1', 'M2']).notNullable();
        table.string('parcours');
        table.string('mention');
        table.enu('statut', ['PASSANT', 'REDOUBLANT']).notNullable();
        table.enu('sexe', ['HOMME', 'FEMME']).notNullable();
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Students');
};
