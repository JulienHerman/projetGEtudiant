module.exports = {
    development: {
      client: 'mysql2',
      connection: {
        host: 'localhost',
        user: 'herman',
        password: 'herman@123!',
        database: 'g_etudiant'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
	directory: './migrations',
        tableName: 'knex_migrations'
      },
	seeds: {
  	directory: './seeds'
	}

    }
  };
  
