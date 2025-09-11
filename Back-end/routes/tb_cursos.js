const express = require("express");
const router = express.Router();
const connection = require("../connectDb"); // sua conexão MySQL

// ================= GET TODOS OS CURSOS =================
router.get("/", async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM tb_cursos");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= GET CURSO POR ID =================
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await connection.query(
      "SELECT * FROM tb_cursos WHERE cursos_id = ?",
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: "Curso não encontrado" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= CADASTRAR CURSO =================
router.post("/", async (req, res) => {
  try {
    const { cursos_nome, cursos_cordenador, cursos_duracao, modalidade, nivel_curso } = req.body;

    const [result] = await connection.query(
      "INSERT INTO tb_cursos (cursos_nome, cursos_cordenador, cursos_duracao, modalidade, nivel_curso) VALUES (?, ?, ?, ?, ?)",
      [cursos_nome, cursos_cordenador || null, cursos_duracao, modalidade, nivel_curso]
    );

    res.status(201).json({
      message: "Curso cadastrado com sucesso!",
      curso: { id: result.insertId, ...req.body },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= ATUALIZAR CURSO =================
router.put("/:id", async (req, res) => {
  try {
    const { cursos_nome, cursos_cordenador, cursos_duracao, modalidade, nivel_curso } = req.body;

    const [result] = await connection.query(
      "UPDATE tb_cursos SET cursos_nome = ?, cursos_cordenador = ?, cursos_duracao = ?, modalidade = ?, nivel_curso = ? WHERE cursos_id = ?",
      [cursos_nome, cursos_cordenador || null, cursos_duracao, modalidade, nivel_curso, req.params.id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: "Curso não encontrado" });

    res.json({ message: "Curso atualizado com sucesso!", curso: { id: req.params.id, ...req.body } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= DELETAR CURSO =================
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await connection.query(
      "DELETE FROM tb_cursos WHERE cursos_id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: "Curso não encontrado" });

    res.json({ message: "Curso deletado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
