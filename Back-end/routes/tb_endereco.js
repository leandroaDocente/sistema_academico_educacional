import pool from "../connectDb";

const Endereco = {
  getAll: async () => {
    const [rows] = await pool.query("SELECT * FROM tb_endereco");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await pool.query("SELECT * FROM tb_endereco WHERE endereco_id = ?", [id]);
    return rows[0];
  },

  create: async (data) => {
    const { endereco_comple, endereco_cep, endereco_estado, endereco_cidade, endereco_bairro } = data;
    const [result] = await pool.query(
      "INSERT INTO tb_endereco (endereco_comple, endereco_cep, endereco_estado, endereco_cidade, endereco_bairro) VALUES (?, ?, ?, ?, ?)",
      [endereco_comple, endereco_cep, endereco_estado, endereco_cidade, endereco_bairro]
    );
    return { id: result.insertId, ...data };
  },

  update: async (id, data) => {
    const { endereco_comple, endereco_cep, endereco_estado, endereco_cidade, endereco_bairro } = data;
    await pool.query(
      "UPDATE tb_endereco SET endereco_comple=?, endereco_cep=?, endereco_estado=?, endereco_cidade=?, endereco_bairro=? WHERE endereco_id=?",
      [endereco_comple, endereco_cep, endereco_estado, endereco_cidade, endereco_bairro, id]
    );
    return { id, ...data };
  },

  delete: async (id) => {
    await pool.query("DELETE FROM tb_endereco WHERE endereco_id=?", [id]);
    return { message: "Endereço deletado com sucesso" };
  }
};

export default Endereco;
