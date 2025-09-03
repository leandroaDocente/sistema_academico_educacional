const express = require('express');
const router = express.Router();
const connection = require("../connectDb");

// GET todos os professores
router.get('/', async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM tb_professor");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET professor por ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM tb_professor WHERE prof_id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Professor não encontrado" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST novo professor
router.post('/', async (req, res) => {
  try {
    const { prof_nome, prof_cpf, prof_telefone, prof_formacao, prof_titulacao, fk_endereco_prof } = req.body;
    const [result] = await connection.query(
      "INSERT INTO tb_professor (prof_nome, prof_cpf, prof_telefone, prof_formacao, prof_titulacao, fk_endereco_prof) VALUES (?, ?, ?, ?, ?, ?)",
      [prof_nome, prof_cpf, prof_telefone, prof_formacao, prof_titulacao, fk_endereco_prof]
    );
    res.status(201).json({ id: result.insertId, prof_nome, prof_cpf, prof_telefone, prof_formacao, prof_titulacao, fk_endereco_prof });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT atualizar professor
router.put('/:id', async (req, res) => {
  try {
    const { prof_nome, prof_cpf, prof_telefone, prof_formacao, prof_titulacao, fk_endereco_prof } = req.body;
    await connection.query(
      "UPDATE tb_professor SET prof_nome=?, prof_cpf=?, prof_telefone=?, prof_formacao=?, prof_titulacao=?, fk_endereco_prof=? WHERE prof_id=?",
      [prof_nome, prof_cpf, prof_telefone, prof_formacao, prof_titulacao, fk_endereco_prof, req.params.id]
    );
    res.json({ id: req.params.id, prof_nome, prof_cpf, prof_telefone, prof_formacao, prof_titulacao, fk_endereco_prof });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE professor
router.delete('/:id', async (req, res) => {
  try {
    await connection.query("DELETE FROM tb_professor WHERE prof_id=?", [req.params.id]);
    res.json({ message: "Professor deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;