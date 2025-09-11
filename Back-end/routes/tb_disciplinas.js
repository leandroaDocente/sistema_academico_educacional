const express = require("express");
const router = express.Router();
const connection = require("../connectDb");

// CADASTRAR DISCIPLINA
router.post("/", async (req, res) => {
  try {
    const { disc_nome, disc_duracao, ementa, fk_professor } = req.body;

    if (!disc_nome || !disc_duracao || !fk_professor) {
      return res.status(400).json({ error: "Preencha todos os campos obrigatórios." });
    }

    const [result] = await connection.query(
      "INSERT INTO tb_disciplinas (disc_nome, disc_duracao, ementa, fk_professor) VALUES (?, ?, ?, ?)",
      [disc_nome, disc_duracao, ementa, fk_professor]
    );

    res.status(201).json({ message: "Disciplina cadastrada com sucesso!", id: result.insertId });
  } catch (error) {
    console.error("Erro ao inserir disciplina:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
});

// LISTAR TODAS
router.get("/", async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM tb_disciplinas");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao buscar disciplinas:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
});

// LISTAR POR ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await connection.query("SELECT * FROM tb_disciplinas WHERE disc_id = ?", [id]);

    if (rows.length === 0) return res.status(404).json({ error: "Disciplina não encontrada." });

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Erro ao buscar disciplina:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
});

// ATUALIZAR
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { disc_nome, disc_duracao, ementa, fk_professor } = req.body;

    const [result] = await connection.query(
      "UPDATE tb_disciplinas SET disc_nome = ?, disc_duracao = ?, ementa = ?, fk_professor = ? WHERE disc_id = ?",
      [disc_nome, disc_duracao, ementa, fk_professor, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: "Disciplina não encontrada." });

    res.json({ message: "Disciplina atualizada com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar disciplina:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
});

// DELETAR
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await connection.query("DELETE FROM tb_disciplinas WHERE disc_id = ?", [id]);

    if (result.affectedRows === 0) return res.status(404).json({ error: "Disciplina não encontrada." });

    res.json({ message: "Disciplina deletada com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar disciplina:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
});

module.exports = router;
