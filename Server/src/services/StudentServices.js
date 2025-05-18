const Student = require('../models/Student');

const studentServiceObjection = {
  create: async (data) => {
    return await Student.query().insert(data);
  },

  findAll: async () => {
    return await Student.query();
  },

  findById: async (id) => {
    return await Student.query().findById(id);
  },

  update: async (id, data) => {
    const updated = await Student.query().patchAndFetchById(id, data);
    if (!updated) throw new Error('Étudiant non trouvé');
    return updated;
  },

  delete: async (id) => {
    const deleted = await Student.query().deleteById(id);
    if (!deleted) throw new Error('Étudiant non trouvé ou déjà supprimé');
    return true;
  }
};

module.exports = studentServiceObjection;
