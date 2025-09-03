const express = require("express");
const router = express.Router();
const connection = require("../connectDb");

router.get("/", async (req, res) => {
  const [rows] = await connection.query("SELECT * FROM tb_aluno");
  res.json(rows);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const [rows] = await connection.query("SELECT * FROM tb_aluno WHERE aluno_id = ?", [id]);
  res.json(rows[0]);
});

router.post("/", async (req, res) => {
  const { aluno_nome, aluno_cpf, aluno_email, aluno_telefone, aluno_data_nascimento, fk_endereco_aluno } = req.body;
  const [result] = await connection.query(
    "INSERT INTO tb_aluno (aluno_nome, aluno_cpf, aluno_email, aluno_telefone, aluno_data_nascimento, fk_endereco_aluno) VALUES (?, ?, ?, ?, ?, ?)",
    [aluno_nome, aluno_cpf, aluno_email, aluno_telefone, aluno_data_nascimento, fk_endereco_aluno]
  );
  res.status(201).json({ id: result.insertId, ...req.body });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { aluno_nome, aluno_cpf, aluno_email, aluno_telefone, aluno_data_nascimento, fk_endereco_aluno } = req.body;
  await connection.query(
    "UPDATE tb_aluno SET aluno_nome=?, aluno_cpf=?, aluno_email=?, aluno_telefone=?, aluno_data_nascimento=?, fk_endereco_aluno=? WHERE aluno_id=?",
    [aluno_nome, aluno_cpf, aluno_email, aluno_telefone, aluno_data_nascimento, fk_endereco_aluno, id]
  );
  res.json({ id, ...req.body });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await connection.query("DELETE FROM tb_aluno WHERE aluno_id=?", [id]);
  res.json({ message: "Aluno deletado com sucesso" });
});

module.exports = router;

