const express = require('express');
const router = express.Router();
const connection = require('../connectDb');

// GET todos os alunos
router.get('/', async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM tb_aluno");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET aluno por ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM tb_aluno WHERE aluno_id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Aluno não encontrado" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST novo aluno
router.post('/', async (req, res) => {
  try {
    const { aluno_nome, aluno_cpf, aluno_telefone, aluno_email, aluno_nascimento, fk_endereco_aluno } = req.body;
    const [result] = await connection.query(
      "INSERT INTO tb_aluno (aluno_nome, aluno_cpf, aluno_telefone, aluno_email, aluno_nascimento, fk_endereco_aluno) VALUES (?, ?, ?, ?, ?, ?)",
      [aluno_nome, aluno_cpf, aluno_telefone, aluno_email, aluno_nascimento, fk_endereco_aluno]
    );
    res.status(201).json({ id: result.insertId, aluno_nome, aluno_cpf, aluno_telefone, aluno_email, aluno_nascimento, fk_endereco_aluno });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT atualizar aluno
router.put('/:id', async (req, res) => {
  try {
    const { aluno_nome, aluno_cpf, aluno_telefone, aluno_email, aluno_nascimento, fk_endereco_aluno } = req.body;
    await connection.query(
      "UPDATE tb_aluno SET aluno_nome=?, aluno_cpf=?, aluno_telefone=?, aluno_email=?, aluno_nascimento=?, fk_endereco_aluno=? WHERE aluno_id=?",
      [aluno_nome, aluno_cpf, aluno_telefone, aluno_email, aluno_nascimento, fk_endereco_aluno, req.params.id]
    );
    res.json({ id: req.params.id, aluno_nome, aluno_cpf, aluno_telefone, aluno_email, aluno_nascimento, fk_endereco_aluno });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE aluno
router.delete('/:id', async (req, res) => {
  try {
    await connection.query("DELETE FROM tb_aluno WHERE aluno_id=?", [req.params.id]);
    res.json({ message: "Aluno deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;