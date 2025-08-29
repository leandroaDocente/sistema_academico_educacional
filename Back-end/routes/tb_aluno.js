import pool from "../../connectDb";

const Aluno = {
  getAll: async () => {
    const [rows] = await pool.query("SELECT * FROM tb_aluno");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await pool.query("SELECT * FROM tb_aluno WHERE aluno_id = ?", [id]);
    return rows[0]; 
  },

  create: async (data) => {
    const { aluno_nome, aluno_cpf, aluno_email, aluno_telefone, aluno_data_nascimento, fk_endereco_aluno } = data;
    const [result] = await pool.query(
      "INSERT INTO tb_aluno (aluno_nome, aluno_cpf, aluno_email, aluno_telefone, aluno_data_nascimento, fk_endereco_aluno) VALUES (?, ?, ?, ?, ?, ?)",
      [aluno_nome, aluno_cpf, aluno_email, aluno_telefone, aluno_data_nascimento, fk_endereco_aluno]
    );
    return { id: result.insertId, ...data };
  },

  update: async (id, data) => {
    const { aluno_nome, aluno_cpf, aluno_email, aluno_telefone, aluno_data_nascimento, fk_endereco_aluno } = data;
    await pool.query(
      "UPDATE tb_aluno SET aluno_nome=?, aluno_cpf=?, aluno_email=?, aluno_telefone=?, aluno_data_nascimento=?, fk_endereco_aluno=? WHERE aluno_id=?",
      [aluno_nome, aluno_cpf, aluno_email, aluno_telefone, aluno_data_nascimento, fk_endereco_aluno, id]
    );
    return { id, ...data };
  },

  delete: async (id) => {
    await pool.query("DELETE FROM tb_aluno WHERE aluno_id=?", [id]);
    return { message: "Aluno deletado com sucesso" };
  }
};

export default Aluno;
