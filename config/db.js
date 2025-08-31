const mysql = require('mysql2/promise');
require('dotenv').config();

// Cria um "pool" de conexões para otimizar o uso do banco de dados
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Testa a conexão
pool.getConnection()
    .then(conn => {
        console.log('Conectado ao banco de dados MySQL com sucesso!');
        conn.release(); // Libera a conexão
    })
    .catch(err => {
        console.error('Erro ao conectar com o banco de dados:', err.stack);
    });

module.exports = pool;