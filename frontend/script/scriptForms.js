const apiUrlAluno = 'http://localhost:3000/tb_aluno';
const apiUrlProfessor = 'http://localhost:3000/tb_professor';
const apiUrlDisciplina = 'http://localhost:3000/tb_disciplinas';
const apiUrlTurma = 'http://localhost:3000/tb_turmas';
const apiUrlCurso = 'http://localhost:3000/tb_cursos';

const formAluno = document.getElementById('cadastroAluno');
const formProfessor = document.getElementById('cadastroProfessor');
const formDisciplina = document.getElementById('cadastroDisciplina');
const formTurma = document.getElementById('cadastroTurma'); 
const formCurso = document.getElementById('cadastroCurso');


// ! ==================================================================
// ! ================= CADASTRO DE ALUNO ===============================
// ! ==================================================================

formAluno.addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log("🔵 Evento: cadastroAluno");
  // Endereço
  const endereco = {
    endereco_comple: formAluno.querySelector('input[name="endereco_comple"]').value,
    endereco_cep: formAluno.querySelector('input[name="endereco_cep"]').value,
    endereco_estado: formAluno.querySelector('select[name="endereco_estado"]').value,
    endereco_cidade: formAluno.querySelector('input[name="endereco_cidade"]').value,
    endereco_bairro: formAluno.querySelector('input[name="endereco_bairro"]').value,
  };

  // Aluno
  const aluno = {
    aluno_nome: formAluno.querySelector('input[name="aluno_nome"]').value,
    aluno_email: formAluno.querySelector('input[name="aluno_email"]').value,
    aluno_cpf: formAluno.querySelector('input[name="aluno_cpf"]').value,
    aluno_telefone: formAluno.querySelector('input[name="aluno_telefone"]').value,
    aluno_data_nascimento: formAluno.querySelector('input[name="aluno_data_nascimento"]').value,
  };

  try {
    // Cadastra endereço
    const enderecoResponse = await fetch("http://localhost:3000/tb_endereco", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(endereco),
    });
    if (!enderecoResponse.ok) throw new Error("Erro ao cadastrar endereço");

    const enderecoData = await enderecoResponse.json();
    aluno.fk_endereco_aluno = enderecoData.id; // id retornado pelo backend

    // Cadastra aluno
    const alunoResponse = await fetch(apiUrlAluno, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aluno),
    });
    if (!alunoResponse.ok) throw new Error("Erro ao cadastrar aluno");

    alert("Aluno cadastrado com sucesso!");
    formAluno.reset();

  } catch (error) {
    console.error(error);
    alert("Erro ao cadastrar aluno.");
  }

  console.log(endereco);
  console.log(aluno);
});


// ! ==================================================================
// ! ================= CADASTRO DE PROFESSOR ==========================
// ! ==================================================================

formProfessor.addEventListener('submit', async (e) => {
  e.preventDefault();

  const endereco = {
    endereco_comple: formProfessor.querySelector('input[name="endereco_comple"]').value,
    endereco_cep: formProfessor.querySelector('input[name="endereco_cep"]').value,
    endereco_estado: formProfessor.querySelector('select[name="endereco_estado"]').value,
    endereco_cidade: formProfessor.querySelector('input[name="endereco_cidade"]').value,
    endereco_bairro: formProfessor.querySelector('input[name="endereco_bairro"]').value,
  };

  const professor = {
    prof_nome: formProfessor.querySelector('input[name="prof_nome"]').value,
    prof_cpf: formProfessor.querySelector('input[name="prof_cpf"]').value,
    prof_telefone: formProfessor.querySelector('input[name="prof_telefone"]').value,
    prof_formacao: formProfessor.querySelector('input[name="prof_formacao"]').value,
    prof_titulacao: formProfessor.querySelector('select[name="prof_titulacao"]').value,
  };

  try {
    const enderecoResponse = await fetch("http://localhost:3000/tb_endereco", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(endereco),
    });
    if (!enderecoResponse.ok) throw new Error("Erro ao cadastrar endereço");

    const enderecoData = await enderecoResponse.json();
    professor.fk_endereco_prof = enderecoData.id;

    const professorResponse = await fetch(apiUrlProfessor, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(professor),
    });
    if (!professorResponse.ok) throw new Error("Erro ao cadastrar professor");

    alert("Professor cadastrado com sucesso!");
    formProfessor.reset();

  } catch (error) {
    console.error(error);
    alert("Erro ao cadastrar professor.");
  }

  console.log(endereco);
  console.log(professor);
});


// ! ==================================================================
// ! ================= CADASTRO DE DISCIPLINA =========================
// ! ==================================================================

formDisciplina.addEventListener('submit', async (e) => {
  e.preventDefault();

  const disciplina = {
    disc_nome: formDisciplina.querySelector('input[name="disc_nome"]').value,
    disc_duracao: formDisciplina.querySelector('input[name="disc_duracao"]').value,
    fk_cursos_disc: formDisciplina.querySelector('select[name="fk_cursos_disc"]').value
  };

  try {
    const response = await fetch(apiUrlDisciplina, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(disciplina),
    });
    if (!response.ok) throw new Error("Erro ao cadastrar disciplina");

    alert("Disciplina cadastrada com sucesso!");
    formDisciplina.reset();

  } catch (error) {
    console.error(error);
    alert("Erro ao cadastrar disciplina.");
  }

  console.log(disciplina);
});


// ! ==================================================================
// ! ================= CADASTRO DE TURMA ==============================
// ! ==================================================================

formTurma.addEventListener('submit', async (e) => {
  e.preventDefault();

  const turma = {
    fk_prof_turma: formTurma.querySelector('select[name="fk_prof_turma"]').value,
    turma_curso: formTurma.querySelector('select[name="fk_curso_turma"]').value,
    turma_horario: formTurma.querySelector('input[name="turma_horario"]').value,
  };

  try {
    const response = await fetch(apiUrlTurma, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(turma),
    });

    const data = await response.json(); // lê o body da resposta

    if (!response.ok) {
      // mostra a mensagem real do backend
      throw new Error(data.error || "Erro ao cadastrar turma");
    }

    alert(data.message);
    formTurma.reset();

    // Aqui você pode chamar uma função para atualizar a tabela sem refresh
    // await carregarTurmas();

  } catch (error) {
    console.error(error);
    alert(error.message); // mostra o erro real
  }

  console.log(turma);
});



// ! ==================================================================
// ! ================= CADASTRO DE CURSO ==============================
// ! ==================================================================

formCurso.addEventListener('submit', async (e) => {
  e.preventDefault();
console.log("🔵 Evento: cadastroCurso");
  const curso = {
    cursos_nome: formCurso.querySelector('input[name="cursos_nome"]').value,
    cursos_cordenador: formCurso.querySelector('input[name="cursos_cordenador"]').value,
    cursos_duracao: parseInt(formCurso.querySelector('input[name="cursos_duracao"]').value),
  };

  try {
    const response = await fetch(apiUrlCurso, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(curso),
    });
    if (!response.ok) throw new Error("Erro ao cadastrar curso");

    alert("Curso cadastrado com sucesso!");
    formCurso.reset();

  } catch (error) {
    console.error(error);
    alert("Erro ao cadastrar curso.");
  }

  console.log(curso);
});