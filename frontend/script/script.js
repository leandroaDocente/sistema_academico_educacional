  
  // ! ID do seu select
  const selectProfessor = document.getElementById('professorTurma'); // ID do seu select
  const selectCursoTurma = document.getElementById('cursoTurma');
  const selectProfessorDisciplina = document.getElementById('professorDisciplina');

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

async function carregarCursos() {
  try {
    const response = await fetch('http://localhost:3000/tb_cursos');
    const cursos = await response.json();
    cursos.forEach(curso => {
      const option = document.createElement('option');
      option.value = curso.cursos_id;
      option.textContent = curso.cursos_nome;
      selectCursoTurma.appendChild(option);
    });
  } catch (error) {
    console.error('Erro ao carregar cursos:', error);
  }
}
carregarCursos();