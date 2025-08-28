// ==================================================================
// =================FUNCIONAMENTO DO SIDEBAR=========================
// ================================================================== 

const navLinks = document.querySelectorAll('.sidebar a');

  // Pega os formulários
  const cadastroAluno = document.querySelector('.cadastroAluno-form');
  const cadastroProfessor = document.querySelector('.cadprofessor-form');
  const telaInicial = document.querySelector('.telainicial');

  // Pega o container para o h1
  const mainContainer = document.querySelector('main.container');

  // Função para mostrar a seção correta
  function mostrarSecao(secaoId) {
    // Esconde todas
    cadastroAluno.style.display = 'none';
    cadastroProfessor.style.display = 'none';
    telaInicial.style.display = 'none';

    // Remove h1 anterior
    const prevH1 = mainContainer.querySelector('h1');
    if(prevH1) prevH1.remove();

    // Mostra a seção correta e cria h1 se necessário
    let titulo = '';
    if(secaoId === 'cadastroAluno'){
      cadastroAluno.style.display = 'flex';
      titulo = 'Cadastro de Alunos';
    } else if(secaoId === 'cadastroProfessor'){
      cadastroProfessor.style.display = 'flex';
      titulo = 'Cadastro de Professores';
    } else if(secaoId === 'inicio'){
      telaInicial.style.display = 'flex';
      titulo = 'Bem-vindo ao Dashboard!';
    }

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

  