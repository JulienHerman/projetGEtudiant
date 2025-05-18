/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const bcrypt = require('bcryptjs');

exports.seed = async function(knex) {
  await knex('Users').del();

  const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const hashedPassword = await bcrypt.hash('motdepasse123', 10);

  await knex('Users').insert([
    {
      name: 'Admin',
      surname: 'Root',
      email: 'admin@mail.com',
      password: hashedPassword,
      role: 'ADMIN',
      status: 'ACTIVE',
      created_at: now,
      updated_at: now
    },
    {
      name: 'Jean',
      surname: 'Dupont',
      email: 'test@mail.com',
      password: hashedPassword,
      role: 'USER',
      status: 'ACTIVE',
      created_at: now,
      updated_at: now
    }
  ]);
};

