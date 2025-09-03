const express = require('express');
const router = express.Router();
const connectDb = require('../connectDb');

router.post('/', async (req, res) => {
    const { endereco_comple, endereco_cep, endereco_estado, endereco_cidade, endereco_bairro } = req.body;

    if (!endereco_cep || !endereco_estado || !endereco_cidade || !endereco_bairro) {
        return res.status(400).json({ error: 'Os campos CEP, Estado, Cidade e Bairro são obrigatórios.' });
    }
    
    let connection;
    try {
        connection = await connectDb();
        const sql = 'INSERT INTO tb_endereco (endereco_comple, endereco_cep, endereco_estado, endereco_cidade, endereco_bairro) VALUES (?, ?, ?, ?, ?)';
        const [result] = await connection.execute(sql, [endereco_comple, endereco_cep, endereco_estado, endereco_cidade, endereco_bairro]);
        
        res.status(201).json({ 
            message: 'Endereço cadastrado com sucesso!', 
            enderecoId: result.insertId 
        });
        
    } catch (error) {
        console.error('Erro ao cadastrar endereço:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    } finally {
        if (connection) {
            connection.end();
        }
    }
});

module.exports = router;