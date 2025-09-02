// ==================================================================
// =================FUNCIONAMENTO DO SIDEBAR=========================
// ================================================================== 

const navLinks = document.querySelectorAll('.sidebar a');

// Pega todas as seções e forms
const telaInicial = document.querySelector('.telainicial');
const cadastroAluno = document.getElementById('cadastroAluno');
const cadastroProfessor = document.getElementById('cadastroProfessor');
const cadastroDisciplina = document.getElementById('cadastroDisciplina');
const cadastroTurma = document.getElementById('cadastroTurma');
const cadastroCurso = document.getElementById('cadastroCurso');

// Pega o container principal
const mainContainer = document.querySelector('main.container');

// Função para mostrar a seção correta
function mostrarSecao(secaoId) {
  // Esconde todas
  telaInicial.style.display = 'flex';
  cadastroAluno.style.display = 'none';
  cadastroProfessor.style.display = 'none';
  cadastroDisciplina.style.display = 'none';
  cadastroTurma.style.display = 'none';
  cadastroCurso.style.display = 'none';

  // Remove h1 anterior
  const prevH1 = mainContainer.querySelector('h1');
  if(prevH1) prevH1.remove();

  // Variável do título
  let titulo = '';

  switch(secaoId) {
    case 'inicio':
      telaInicial.style.display = 'flex';
      titulo = 'Bem-vindo ao Sistema Acadêmico';
      break;
    case 'cadastroAluno':
      cadastroAluno.style.display = 'flex';
      titulo = 'Cadastro de Alunos';
      break;
    case 'cadastroProfessor':
      cadastroProfessor.style.display = 'flex';
      titulo = 'Cadastro de Professores';
      break;
    case 'cadastroDisciplina':
      cadastroDisciplina.style.display = 'flex';
      titulo = 'Cadastro de Disciplinas';
      break;
    case 'cadastroTurma':
      cadastroTurma.style.display = 'flex';
      titulo = 'Cadastro de Turmas';
      break;
    case 'cadastroCurso':
      cadastroCurso.style.display = 'flex';
      titulo = 'Cadastro de Cursos';
      break;
  }

  // Cria título no topo se tiver
  if(titulo){
    const h1 = document.createElement('h1');
    h1.textContent = titulo;
    mainContainer.prepend(h1);
  }

  // Salva no localStorage
  localStorage.setItem('ultimaSecao', secaoId);
}

// Event listener nos links da nav
navLinks.forEach(link => {
  link.addEventListener('click', function(e){
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    mostrarSecao(targetId);
  });
});

// Ao carregar a página, verifica localStorage
const ultimaSecao = localStorage.getItem('ultimaSecao') || 'inicio';
mostrarSecao(ultimaSecao);
