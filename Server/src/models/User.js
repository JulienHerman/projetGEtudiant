const { Model } = require('objection');
const schema = require('./user.schema');

class User extends Model {
  static get tableName() {
    return 'Users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: Object.keys(schema).filter(k => schema[k].required),
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        surname: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        role: { type: 'string', enum: schema.role.values },
        status: { type: 'string', enum: schema.status.values },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' }
      }
    };
  }

  $beforeInsert() {
    // Format: 'YYYY-MM-DD HH:mm:ss' compatible avec MySQL/MariaDB
    const now = new Date();
    const mysqlDate = now.toISOString().slice(0, 19).replace('T', ' ');
    this.created_at = mysqlDate;
    this.updated_at = mysqlDate;
  }

  $beforeUpdate() {
    // Même format pour updatedAt
    const now = new Date();
    this.updated_at = now.toISOString().slice(0, 19).replace('T', ' ');
  }

}

module.exports = User;
