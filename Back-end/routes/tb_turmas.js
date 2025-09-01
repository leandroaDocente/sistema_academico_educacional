const express = require("express");
const router = express.Router();
const connection = require("../db"); 

router.post("/", (req, res) => {
  const { codigoTurma, disciplinaTurma, professorTurma, semestreTurma, anoTurma } = req.body;

  if (!codigoTurma || !disciplinaTurma || !professorTurma || !semestreTurma || !anoTurma) {
    return res.status(400).json({ error: "Preencha todos os campos obrigatórios" });
  }

  const query = `
    INSERT INTO tb_turma 
    (codigoTurma, disciplinaTurma, professorTurma, semestreTurma, anoTurma) 
    VALUES (?, ?, ?, ?, ?)
  `;

  connection.query(query, [codigoTurma, disciplinaTurma, professorTurma, semestreTurma, anoTurma], (err, result) => {
    if (err) {
      console.error("Erro ao cadastrar turma:", err);
      return res.status(500).json({ error: "Erro no servidor" });
    }
    res.status(201).json({ message: "Turma cadastrada com sucesso!", turmaId: result.insertId });
  });
});

router.get("/", (req, res) => {
  connection.query("SELECT * FROM tb_turma", (err, results) => {
    if (err) {
      console.error("Erro ao buscar turmas:", err);
      return res.status(500).json({ error: "Erro no servidor" });
    }
    res.json(results);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  connection.query("SELECT * FROM tb_turma WHERE turma_id = ?", [id], (err, result) => {
    if (err) {
      console.error("Erro ao buscar turma:", err);
      return res.status(500).json({ error: "Erro no servidor" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Turma não encontrada" });
    }
    res.json(result[0]);
  });
});


router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { codigoTurma, disciplinaTurma, professorTurma, semestreTurma, anoTurma } = req.body;

  const query = `
    UPDATE tb_turma 
    SET codigoTurma=?, disciplinaTurma=?, professorTurma=?, semestreTurma=?, anoTurma=?
    WHERE turma_id=?
  `;

  connection.query(query, [codigoTurma, disciplinaTurma, professorTurma, semestreTurma, anoTurma, id], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar turma:", err);
      return res.status(500).json({ error: "Erro no servidor" });
    }
    res.json({ message: "Turma atualizada com sucesso!" });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  connection.query("DELETE FROM tb_turma WHERE turma_id = ?", [id], (err, result) => {
    if (err) {
      console.error("Erro ao deletar turma:", err);
      return res.status(500).json({ error: "Erro no servidor" });
    }
    res.json({ message: "Turma deletada com sucesso!" });
  });
});

module.exports = router;
