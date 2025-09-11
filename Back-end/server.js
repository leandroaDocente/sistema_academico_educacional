const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const alunoRoutes = require("./routes/tb_aluno");
const professorRoutes = require("./routes/tb_professor");
const enderecoRoutes = require("./routes/tb_endereco");
const disciplinaRoutes = require("./routes/tb_disciplinas"); 
const turmasRoutes = require ("./routes/tb_turmas");
const cursoRoutes = require ("./routes/tb_cursos");

app.use("/tb_aluno", alunoRoutes);
app.use("/tb_professor", professorRoutes);
app.use("/tb_endereco", enderecoRoutes);
app.use("/tb_disciplinas", disciplinaRoutes); 
app.use("/tb_turmas", turmasRoutes);
app.use("/tb_cursos", cursoRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});