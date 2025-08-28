const apiUrlAluno = 'http://localhost:3000/aluno';
const apiUrlProfessor = 'http://localhost:3000/professor';

const formAluno = document.getElementById('cadastroAluno');
const formProfessor = document.getElementById('cadastroProfessor');

// ==================================================================
// =================FUNCIONAMENTO DOS FORMULÁRIOS=====================
// ==================================================================


// =================CADASTRO DE ALUNO===============================

formAluno.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Dados do formulário
  const nome = formAluno.querySelector('input[name="nomeAluno"]').value;
  const email = formAluno.querySelector('input[name="emailAluno"]').value;
  const cpf = formAluno.querySelector('input[name="cpfAluno"]').value;
  const endereco = formAluno.querySelector('input[name="enderecoAluno"]').value;
  const complemento = formAluno.querySelector('input[name="complementoAluno"]').value;
  const cep = formAluno.querySelector('input[name="cepAluno"]').value;
  const bairro = formAluno.querySelector('input[name="bairroAluno"]').value;
  const cidade = formAluno.querySelector('input[name="cidadeAluno"]').value;
  const estado = formAluno.querySelector('select[name="estadoAluno"]').value;
  const telefone = formAluno.querySelector('input[name="telefoneAluno"]').value;
  const dataNascimento = formAluno.querySelector('input[name="dataNascimentoAluno"]').value;

  try {
    const response = await fetch(apiUrlAluno, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome,
        email,
        cpf,
        endereco,
        complemento,
        cep,
        bairro,
        cidade,
        estado,
        telefone,
        dataNascimento
      }),
    });

    if (!response.ok) throw new Error('Erro na requisição');

    const user = await response.json();
    formAluno.reset();
    alert("Aluno cadastrado com sucesso!");
    console.log(user);
  } catch (error) {
    console.error(error);
    alert("Erro ao cadastrar aluno. Tente novamente.");
  }
});

// =================CADASTRO DE PROFESSOR===========================

formProfessor.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Dados do formulário
  const nome = formProfessor.querySelector('input[name="nomeProfessor"]').value;
  const cpf = formProfessor.querySelector('input[name="cpfProfessor"]').value;
  const endereco = formProfessor.querySelector('input[name="enderecoProfessor"]').value;
  const complemento = formProfessor.querySelector('input[name="complementoProfessor"]').value;
  const cep = formProfessor.querySelector('input[name="cepProfessor"]').value;
  const bairro = formProfessor.querySelector('input[name="bairroProfessor"]').value;
  const cidade = formProfessor.querySelector('input[name="cidadeProfessor"]').value;
  const estado = formProfessor.querySelector('input[name="estadoProfessor"]').value;
  const telefone = formProfessor.querySelector('input[name="telefoneProfessor"]').value;
  const formacao = formProfessor.querySelector('input[name="formacaoProfessor"]').value;
  const titulacao = formProfessor.querySelector('select[name="titulacao"]').value;

  console.log({
    nome,
    cpf,
    endereco,
    complemento,
    cep,
    bairro,
    cidade,
    estado,
    telefone,
    formacao,
    titulacao
  });

  try {
    const response = await fetch(apiUrlProfessor, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome,
        cpf,
        endereco,
        complemento,
        cep,
        bairro,
        cidade,
        estado,
        telefone,
        formacao,
        titulacao
      }),
    });

console.log(nome, cpf, endereco, complemento, cep, bairro, cidade, estado, telefone, formacao, titulacao);

    if (!response.ok) throw new Error('Erro na requisição');

    const user = await response.json();
    formProfessor.reset();
    alert("Professor cadastrado com sucesso!");
    console.log(user);
  } catch (error) {
    console.error(error);
    alert("Erro ao cadastrar professor. Tente novamente.");
  }
});