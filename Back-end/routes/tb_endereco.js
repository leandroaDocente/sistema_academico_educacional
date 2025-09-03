const express = require('express');
const router = express.Router();

const connection = require('../connectDb'); // Alterado de pool para connection

// GET todos os endereços
router.get('/', async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM tb_endereco");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET endereço por ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM tb_endereco WHERE endereco_id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Endereço não encontrado" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST novo endereço
router.post('/', async (req, res) => {
  try {
    const { endereco_comple, endereco_cep, endereco_estado, endereco_cidade, endereco_bairro } = req.body;
    const [result] = await connection.query(
      "INSERT INTO tb_endereco (endereco_comple, endereco_cep, endereco_estado, endereco_cidade, endereco_bairro) VALUES (?, ?, ?, ?, ?)",
      [endereco_comple, endereco_cep, endereco_estado, endereco_cidade, endereco_bairro]
    );
    res.status(201).json({ id: result.insertId, endereco_comple, endereco_cep, endereco_estado, endereco_cidade, endereco_bairro });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT atualizar endereço
router.put('/:id', async (req, res) => {
  try {
    const { endereco_comple, endereco_cep, endereco_estado, endereco_cidade, endereco_bairro } = req.body;
    await connection.query(
      "UPDATE tb_endereco SET endereco_comple=?, endereco_cep=?, endereco_estado=?, endereco_cidade=?, endereco_bairro=? WHERE endereco_id=?",
      [endereco_comple, endereco_cep, endereco_estado, endereco_cidade, endereco_bairro, req.params.id]
    );
    res.json({ id: req.params.id, endereco_comple, endereco_cep, endereco_estado, endereco_cidade, endereco_bairro });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE endereço
router.delete('/:id', async (req, res) => {
  try {
    await connection.query("DELETE FROM tb_endereco WHERE endereco_id=?", [req.params.id]);
    res.json({ message: "Endereço deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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