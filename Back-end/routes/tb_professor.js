import pool from "../../connectDb";

const Professor = {
  getAll: async () => {
    const [rows] = await pool.query("SELECT * FROM tb_professor");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await pool.query("SELECT * FROM tb_professor WHERE prof_id = ?", [id]);
    return rows[0];
  },

  create: async (data) => {
    const { prof_nome, prof_cpf, prof_telefone, prof_formacao, prof_titulacao, fk_endereco_prof } = data;
    const [result] = await pool.query(
      "INSERT INTO tb_professor (prof_nome, prof_cpf, prof_telefone, prof_formacao, prof_titulacao, fk_endereco_prof) VALUES (?, ?, ?, ?, ?, ?)",
      [prof_nome, prof_cpf, prof_telefone, prof_formacao, prof_titulacao, fk_endereco_prof]
    );
    return { id: result.insertId, ...data };
  },

  update: async (id, data) => {
    const { prof_nome, prof_cpf, prof_telefone, prof_formacao, prof_titulacao, fk_endereco_prof } = data;
    await pool.query(
      "UPDATE tb_professor SET prof_nome=?, prof_cpf=?, prof_telefone=?, prof_formacao=?, prof_titulacao=?, fk_endereco_prof=? WHERE prof_id=?",
      [prof_nome, prof_cpf, prof_telefone, prof_formacao, prof_titulacao, fk_endereco_prof, id]
    );
    return { id, ...data };
  },

  delete: async (id) => {
    await pool.query("DELETE FROM tb_professor WHERE prof_id=?", [id]);
    return { message: "Professor deletado com sucesso" };
  }
};

export default Professor;
