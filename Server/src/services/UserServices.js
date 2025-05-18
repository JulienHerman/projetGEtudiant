const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userServiceObjection = {
    create: async (data) => {
    data.password = await bcrypt.hash(data.password, 10);
    const response = await User.query().insert(data);

    const token = jwt.sign(
      {
        id: response.id,
        email: response.email,
        role: response.role
      },
      'SECRET&12345',
      { expiresIn: '5h' }
    );

    return {
      access_token:token,
      token_type:"Bearer",
      status: response.status,
      id: response.id,
      email: response.email,
      name: response.name,
      surname: response.surname,
      role: response.role,
      updated_at: response.updated_at,
      created_at: response.created_at
    }
    },

    findAll: async () => {
        return await User.query();
    },

    findById: async (id) => {
        return await User.query().findById(id);
    },

    update: async (id, data) => {
        const updated = await User.query().patchAndFetchById(id, data);
        if (!updated) throw new Error('Utilisateur non trouvé');
        return updated;
    },

    delete: async (id) => {
        const deleted = await User.query().deleteById(id);
        if (!deleted) throw new Error('Utilisateur non trouvé ou déjà supprimé');
        return true;
    },

    findByEmail: async (email) => {
        return await User.query().findOne({ email });
    }
};

module.exports = userServiceObjection;
