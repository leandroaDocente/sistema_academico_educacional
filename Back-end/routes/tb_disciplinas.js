const express = require('express');
const router = express.Router();
const connection = require('../connectDb');

router.post('/', (req, res) => {
  const { nome, codigo, cargaHoraria, semestre, professorResponsavel } = req.body;

  if (!nome || !codigo || !cargaHoraria || !semestre || !professorResponsavel) {
    return res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
  }

  const sql = `
    INSERT INTO tb_disciplinas (nome, codigo, carga_horaria, semestre, professor_responsavel)
    VALUES (?, ?, ?, ?, ?)
  `;

  connection.query(sql, [nome, codigo, cargaHoraria, semestre, professorResponsavel], (err, result) => {
    if (err) {
      console.error('Erro ao inserir disciplina:', err);
      return res.status(500).json({ error: 'Erro ao cadastrar disciplina.' });
    }
    res.status(201).json({ message: 'Disciplina cadastrada com sucesso!', id: result.insertId });
  });
});

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM tb_disciplinas';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar disciplinas:', err);
      return res.status(500).json({ error: 'Erro ao buscar disciplinas.' });
    }
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM tb_disciplinas WHERE id = ?';

  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao buscar disciplina:', err);
      return res.status(500).json({ error: 'Erro ao buscar disciplina.' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Disciplina não encontrada.' });
    }
    res.json(result[0]);
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, codigo, cargaHoraria, semestre, professorResponsavel } = req.body;

  const sql = `
    UPDATE tb_disciplinas 
    SET nome = ?, codigo = ?, carga_horaria = ?, semestre = ?, professor_responsavel = ?
    WHERE id = ?
  `;

  connection.query(sql, [nome, codigo, cargaHoraria, semestre, professorResponsavel, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar disciplina:', err);
      return res.status(500).json({ error: 'Erro ao atualizar disciplina.' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Disciplina não encontrada.' });
    }
    res.json({ message: 'Disciplina atualizada com sucesso!' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM tb_disciplinas WHERE id = ?';

  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar disciplina:', err);
      return res.status(500).json({ error: 'Erro ao deletar disciplina.' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Disciplina não encontrada.' });
    }
    res.json({ message: 'Disciplina deletada com sucesso!' });
  });
});

module.exports = router;
