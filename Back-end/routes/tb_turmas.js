const express = require("express");
const router = express.Router();
const connection = require("../connectDb"); // sua conexão MySQL

// ================= GET TODAS AS TURMAS =================
router.get("/", async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM tb_turmas");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= GET TURMA POR ID =================
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await connection.query(
      "SELECT * FROM tb_turmas WHERE turma_id = ?",
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: "Turma não encontrada" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= CADASTRAR TURMA =================
router.post("/", async (req, res) => {
  try {
    const { fk_prof_turma, fk_curso_turma, turma_horario, turma_data } = req.body;

    const [result] = await connection.query(
      "INSERT INTO tb_turmas (fk_prof_turma, fk_curso_turma, turma_horario) VALUES (?, ?, ?)",
      [fk_prof_turma, fk_curso_turma, turma_horario]
    );

    res.status(201).json({
      message: "Turma cadastrada com sucesso!",
      turma: { id: result.insertId, ...req.body }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= ATUALIZAR TURMA =================
router.put("/:id", async (req, res) => {
  try {
    const { fk_prof_turma, fk_curso_turma, turma_horario} = req.body;

    const [result] = await connection.query(
      "UPDATE tb_turmas SET fk_prof_turma = ?, fk_curso_turma = ?, turma_horario = ?, WHERE turma_id = ?",
      [fk_prof_turma, fk_curso_turma, turma_horario, req.params.id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: "Turma não encontrada" });

    res.json({
      message: "Turma atualizada com sucesso!",
      turma: { id: req.params.id, ...req.body }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= DELETAR TURMA =================
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await connection.query(
      "DELETE FROM tb_turmas WHERE turma_id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: "Turma não encontrada" });

    res.json({ message: "Turma deletada com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
