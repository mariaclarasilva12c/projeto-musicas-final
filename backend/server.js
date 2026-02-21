const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conexão usando os dados da sua imagem
const pool = mysql.createPool({
    host: 'benserverplex.ddns.net',
    user: 'alunos',
    password: 'senhaAlunos',
    database: 'web_03mc',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Rota para mostrar músicas
app.get('/musicas', (req, res) => {
    pool.query('SELECT * FROM musicas_clara', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Rota para cadastrar música
app.post('/musicas', (req, res) => {
    const { titulo, artista, genero } = req.body;
    const sql = 'INSERT INTO musicas_clara (titulo, artista, genero) VALUES (?, ?, ?)';
    pool.query(sql, [titulo, artista, genero], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Música cadastrada!');
    });
});

// Rota para apagar música
app.delete('/musicas/:id', (req, res) => {
    pool.query('DELETE FROM musicas_clara WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Música apagada!');
    });
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));