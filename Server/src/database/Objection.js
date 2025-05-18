const Knex = require('knex');
const { Model } = require('objection');

const knex = Knex(require('../config/knexfile').development);
Model.knex(knex);

module.exports = knex;
