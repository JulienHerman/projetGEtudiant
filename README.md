📚 projetGEtudiant

<p>Application web complète pour la gestion d'étudiants, construite avec Node.js (+ ORM Objection.js), Express, React et MariaDB.
Elle permet l'ajout, la modification, la suppression et la visualisation d'étudiants et d'utilisateurs avec système d'authentification.</p>

<code>
projetGEtudiant /<br>
├── Frontend        → Application Reac<br>
├── Server          → Backend Node.js<br>
├── README.md       → Documentation du projet
</code>

___

<h4>Initialisation :</h4>
<ol><li>Cloner le projet :</li></ol>

```bash
git clone https://github.com/JulienHerman/projetGEtudiant.git
cd projetGEtudiant
```

___

<ol start=2><li>Configurer votre base de donné :</li></ol>
<li>créer votre base de données et votre utilisateur </li>
<li>Modifie le fichier <code>Server/src/config/knexfile.js</code> selon votre configuration</li>

exemple : 
<code>module.exports = {
    development: {
      client: 'mysql2',
      connection: {
        host: 'localhost',
        user: 'monUser',
        password: 'monPassword',
        database: 'monDatabase'
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
  </code>

___

<ol start=3><li>Installer les dependences : </li></ol>
<li>Frontend</li>

```bash
cd Frontend
npm install
cd ../
```

<li>Backend</li>

```bash
cd Server
npm install
cd ../
```
___

<ol start=4><li>Lacer les migrations : </li></ol>

<li>Création de tables</li>

```bash
cd Server
npx knex --knexfile src/config/knexfile.js migrate:latest
cd ../
```
<li>Données Initials (user : admin)</li>

```bash
cd Server
npx knex --knexfile src/config/knexfile.js seed:run
cd ../
```

___

<ol start=5><li>Lacer le serveur dans un terminal : </li></ol>

```bash
cd Server
node src/index.js
```

___

<ol start=6><li>Lacer le frontend dans un autre terminal : </li></ol>

```bash
cd Frontend
npm start
```

---
___

<h4>Note :</h4>

<li>Utilisateur par defaut :</li>
<h5>- Email : admin@mail.com</h5>
<h5>- Mot de passe : motdepasse123</h5>