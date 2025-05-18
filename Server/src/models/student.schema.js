module.exports = {
    nom:                 { type: 'string', required: true },
    prenom:              { type: 'string', required: true },
    numero_inscription:  { type: 'string', required: true, unique: true },
    niveau:              { type: 'enum', values: ['L1', 'L2', 'L3', 'M1', 'M2'], required: true },
    parcours:            { type: 'string', required: false },
    mention:             { type: 'string', required: false },
    statut:              { type: 'string', required: true },
    sexe:                { type: 'enum', values: ['HOMME', 'FEMME'], required: true }
  };
  