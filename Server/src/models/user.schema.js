module.exports = {
    name:      { type: 'string', required: true },
    surname:   { type: 'string', required: true },
    email:     { type: 'string', required: true, unique: true },
    password:  { type: 'string', required: true },
    role:      { type: 'enum', values: ['ADMIN', 'USER'], default: 'USER' },
    status:    { type: 'enum', values: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' }
  };
  