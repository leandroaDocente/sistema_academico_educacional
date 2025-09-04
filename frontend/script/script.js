  
  // ! ID do seu select
  const selectCurso = document.getElementById('cursoDisciplina'); // ID do seu select
  const selectProfessor = document.getElementById('professorTurma'); // ID do seu select
  const selectAluno = document.getElementById('alunoTurma');
  const selectDisciplina = document.getElementById('disciplinaTurma');
  const selectCursoTurma = document.getElementById('cursoTurma');
  const selectProfessorDisciplina = document.getElementById('professorDisciplina');

  // ! Função para carregar os cursos
  async function carregarCursos() {
    try {
      const response = await fetch('http://localhost:3000/tb_cursos');
      const cursos = await response.json();

      cursos.forEach(curso => {
        const option = document.createElement('option');
        option.value = curso.cursos_id;   // ID do curso
        option.textContent = curso.cursos_nome;
        selectCurso.appendChild(option);
      });
    } catch (error) {
      console.error('Erro ao carregar cursos:', error);
    }
  }
  carregarCursos();

  // ! Função para carregar os professores
  async function carregarProfessores() {
    try {
      const response = await fetch('http://localhost:3000/tb_professor');
      const professores = await response.json();

      professores.forEach(professor => {
        const option = document.createElement('option');
        option.value = professor.prof_id;   // ID do professor
        option.textContent = professor.prof_nome;
        selectProfessor.appendChild(option);
      });
    } catch (error) {
      console.error('Erro ao carregar professores:', error);
    }
  }
  carregarProfessores();

// ! Função para carregar os alunos
async function carregarAlunos() {
  try {
    const response = await fetch('http://localhost:3000/tb_aluno');
    const alunos = await response.json();

    alunos.forEach(aluno => {
      const option = document.createElement('option');
      option.value = aluno.aluno_id;   // ID do aluno
      option.textContent = aluno.aluno_nome;
      selectAluno.appendChild(option);
    });
  } catch (error) {
    console.error('Erro ao carregar alunos:', error);
  }
}
carregarAlunos();

// ! Função para carregar as disciplinas
async function carregarDisciplinas() {
  try {
    const response = await fetch('http://localhost:3000/tb_disciplinas');
    const disciplinas = await response.json();

    disciplinas.forEach(disciplina => {
      const option = document.createElement('option');
      option.value = disciplina.disc_id;   // ID da disciplina
      option.textContent = disciplina.disc_nome;
      selectDisciplina.appendChild(option);
    });
  } catch (error) {
    console.error('Erro ao carregar disciplinas:', error);
  }
}
carregarDisciplinas();

// ! Função para carregar os cursos
async function carregarCursosTurma() {
  try {
    const response = await fetch('http://localhost:3000/tb_cursos');
    const cursos = await response.json();

    cursos.forEach(curso => {
      const option = document.createElement('option');
      option.value = curso.cursos_id;   // ID do curso
      option.textContent = curso.cursos_nome;
      selectCursoTurma.appendChild(option);
    });
  } catch (error) {
    console.error('Erro ao carregar cursos:', error);
  }
}
carregarCursosTurma();

// ! Função para carregar os professores
async function carregarProfessoresDisciplina() {
  try {
    const response = await fetch('http://localhost:3000/tb_professor');
    const professores = await response.json();

    professores.forEach(professor => {
      const option = document.createElement('option');
      option.value = professor.prof_id;   // ID do professor
      option.textContent = professor.prof_nome;
      selectProfessorDisciplina.appendChild(option);
    });
  } catch (error) {
    console.error('Erro ao carregar professores:', error);
  }
}
carregarProfessoresDisciplina();