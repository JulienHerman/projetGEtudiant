const { Model } = require('objection');
const schema = require('./student.schema');

class Student extends Model {
  static get tableName() {
    return 'Students';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: Object.keys(schema).filter(k => schema[k].required),
      properties: {
        id: { type: 'integer' },
        nom: { type: 'string' },
        prenom: { type: 'string' },
        numero_inscription: { type: 'string' },
        niveau: { type: 'string', enum: schema.niveau.values },
        parcours: { type: 'string' },
        mention: { type: 'string' },
        statut: { type: 'string' },
        sexe: { type: 'string', enum: schema.sexe.values },
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

module.exports = Student;
