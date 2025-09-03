-- Criar banco
CREATE DATABASE IF NOT EXISTS db_gerenciamento_academico;
USE db_gerenciamento_academico;

-- =========================
-- Tabela Endereço
-- =========================
CREATE TABLE tb_endereco(
    endereco_id INT PRIMARY KEY AUTO_INCREMENT,
    endereco_comple VARCHAR(100) NULL,
    endereco_cep VARCHAR(10) NOT NULL,
    endereco_estado ENUM('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO') NOT NULL,
    endereco_cidade VARCHAR(100) NOT NULL,
    endereco_bairro VARCHAR(100) NOT NULL
);

-- =========================
-- Tabela Aluno
-- =========================
CREATE TABLE tb_aluno(
    aluno_id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_nome VARCHAR(255) NOT NULL,
    aluno_cpf VARCHAR(100) NOT NULL UNIQUE,
    aluno_email VARCHAR(255) NOT NULL,
    aluno_telefone VARCHAR(255) NOT NULL,
    aluno_data_nascimento DATE NOT NULL,
    fk_endereco_aluno INT NOT NULL,
    FOREIGN KEY (fk_endereco_aluno) REFERENCES tb_endereco(endereco_id)
);

-- =========================
-- Tabela Professor
-- =========================
CREATE TABLE tb_professor(
    prof_id INT AUTO_INCREMENT PRIMARY KEY,
    prof_nome VARCHAR(100) NOT NULL,
    prof_cpf VARCHAR(100) NOT NULL UNIQUE,
    prof_telefone VARCHAR(100) NOT NULL,
    prof_formacao VARCHAR(100) NOT NULL,
    prof_titulacao ENUM("graduação","pos-graduação","mestrado","doutorado","phd") NOT NULL,
    fk_endereco_prof INT NOT NULL,
    FOREIGN KEY (fk_endereco_prof) REFERENCES tb_endereco(endereco_id)
);

-- =========================
-- Tabela Disciplinas
-- =========================
CREATE TABLE tb_disciplinas(
    disc_id INT PRIMARY KEY AUTO_INCREMENT,
    disc_nome VARCHAR(200) NOT NULL,
    disc_duracao VARCHAR(50) NOT NULL,
    ementa TEXT,
    fk_professor INT NOT NULL,
    FOREIGN KEY (fk_professor) REFERENCES tb_professor(prof_id)
);

-- =========================
-- Tabela Cursos
-- =========================
CREATE TABLE tb_cursos (
    cursos_id INT PRIMARY KEY AUTO_INCREMENT,
    cursos_cordenador VARCHAR(50) NULL,
    cursos_nome VARCHAR(200) NOT NULL,
    cursos_duracao INT NOT NULL,
    modalidade ENUM('PRESENCIAL', 'EAD'),
    nivel_curso ENUM('Tecnico', 'Pós-graduação', 'Graduação', 'Doutorado', 'PHD', 'Tecnologo', 'Mestrado')
);

-- =========================
-- Relacionamento Curso x Disciplina
-- =========================
CREATE TABLE curso_disc(
    id_cursoDisciplina INT PRIMARY KEY AUTO_INCREMENT,
    fk_curso_id INT NOT NULL,
    fk_disc_id INT NOT NULL,
    FOREIGN KEY (fk_curso_id) REFERENCES tb_cursos(cursos_id),
    FOREIGN KEY (fk_disc_id) REFERENCES tb_disciplinas(disc_id)
);

-- =========================
-- Tabela Turmas
-- =========================
CREATE TABLE tb_turmas(
    turma_id INT PRIMARY KEY AUTO_INCREMENT,
    fk_aluno_turma INT NULL,
    fk_prof_turma INT NOT NULl,
    turma_curso VARCHAR(255) NOT NULL,
    turma_horario VARCHAR(255) NOT NULL,
    fk_disc_turma INT NOT NULL,
    FOREIGN KEY (fk_disc_turma) REFERENCES tb_disciplinas(disc_id),
    FOREIGN KEY (fk_aluno_turma) REFERENCES tb_aluno(aluno_id),
    FOREIGN KEY (fk_prof_turma) REFERENCES tb_professor(prof_id)
);

-- =========================
-- Tabela Matricula
-- =========================
CREATE TABLE matricula(
    matricula_id INT PRIMARY KEY AUTO_INCREMENT,
    fk_aluno_id INT NULL,
    fk_curso_id INT NOT NULL,
    fk_turma_id INT NOT NULL,
    FOREIGN KEY (fk_curso_id) REFERENCES tb_cursos(cursos_id),
    FOREIGN KEY (fk_turma_id) REFERENCES tb_turmas(turma_id),
    FOREIGN KEY (fk_aluno_id) REFERENCES tb_aluno(aluno_id)
);

-- =========================
-- VIEW disciplina x professor
-- =========================
CREATE VIEW chama_prof AS
SELECT d.disc_id,
       d.disc_nome,
       p.prof_nome
FROM tb_disciplinas d
INNER JOIN tb_professor p
    ON d.fk_professor = p.prof_id;

-- =========================
-- INSERTS DE EXEMPLO
-- =========================

-- Endereços
INSERT INTO tb_endereco (endereco_comple, endereco_cep, endereco_estado, endereco_cidade, endereco_bairro)
VALUES ('Rua das Flores, 123', '70000-000', 'DF', 'Brasília', 'Asa Sul');

INSERT INTO tb_endereco (endereco_comple, endereco_cep, endereco_estado, endereco_cidade, endereco_bairro)
VALUES ('Av. Paulista, 1578', '01310-200', 'SP', 'São Paulo', 'Bela Vista');

INSERT INTO tb_endereco (endereco_comple, endereco_cep, endereco_estado, endereco_cidade, endereco_bairro)
VALUES ('Rua das Acácias, 45', '40000-000', 'BA', 'Salvador', 'Pituba');

INSERT INTO tb_endereco (endereco_comple, endereco_cep, endereco_estado, endereco_cidade, endereco_bairro)
VALUES ('Av. Brasil, 2345', '20000-000', 'RJ', 'Rio de Janeiro', 'Copacabana');

INSERT INTO tb_endereco (endereco_comple, endereco_cep, endereco_estado, endereco_cidade, endereco_bairro)
VALUES ('Rua Sete de Setembro, 321', '80000-000', 'PR', 'Curitiba', 'Centro');

-- Alunos
INSERT INTO tb_aluno (aluno_nome, aluno_cpf, aluno_email, aluno_telefone, aluno_data_nascimento, fk_endereco_aluno)
VALUES ('João Silva', '12345678901', 'joao.silva@email.com', '(61) 91234-5678', '2000-05-12', 1);

INSERT INTO tb_aluno (aluno_nome, aluno_cpf, aluno_email, aluno_telefone, aluno_data_nascimento, fk_endereco_aluno)
VALUES ('Maria Oliveira', '23456789012', 'maria.oliveira@email.com', '(11) 92345-6789', '1999-08-23', 2);

INSERT INTO tb_aluno (aluno_nome, aluno_cpf, aluno_email, aluno_telefone, aluno_data_nascimento, fk_endereco_aluno)
VALUES ('Carlos Souza', '34567890123', 'carlos.souza@email.com', '(71) 93456-7890', '2001-03-15', 3);

-- Professores
INSERT INTO tb_professor (prof_nome, prof_cpf, prof_telefone, prof_formacao, prof_titulacao, fk_endereco_prof)
VALUES ('Fernanda Lima', '98765432100', '(61) 99876-5432', 'Letras', 'mestrado', 1);

INSERT INTO tb_professor (prof_nome, prof_cpf, prof_telefone, prof_formacao, prof_titulacao, fk_endereco_prof)
VALUES ('Ricardo Gomes', '87654321099', '(11) 98765-4321', 'Matemática', 'doutorado', 2);

INSERT INTO tb_professor (prof_nome, prof_cpf, prof_telefone, prof_formacao, prof_titulacao, fk_endereco_prof)
VALUES ('Patrícia Souza', '76543210988', '(21) 97654-3210', 'História', 'pos-graduação', 4);

-- Disciplinas (ligando ao professor)
INSERT INTO tb_disciplinas (disc_nome, disc_duracao, fk_professor)
VALUES ('Português', '60h', 1);

INSERT INTO tb_disciplinas (disc_nome, disc_duracao, fk_professor)
VALUES ('Matemática', '80h', 2);

INSERT INTO tb_disciplinas (disc_nome, disc_duracao, fk_professor)
VALUES ('História do Brasil', '40h', 3);

-- Cursos
INSERT INTO tb_cursos (cursos_cordenador, cursos_nome, cursos_duracao, modalidade, nivel_curso)
VALUES ('Fernanda Lima', 'Letras - Português', 360, 'PRESENCIAL', 'Graduação');

INSERT INTO tb_cursos (cursos_cordenador, cursos_nome, cursos_duracao, modalidade, nivel_curso)
VALUES ('Ricardo Gomes', 'Licenciatura em Matemática', 400, 'PRESENCIAL', 'Graduação');

INSERT INTO tb_cursos (cursos_cordenador, cursos_nome, cursos_duracao, modalidade, nivel_curso)
VALUES ('Patrícia Souza', 'História', 300, 'PRESENCIAL', 'Graduação');

-- Ligando cursos x disciplinas
INSERT INTO curso_disc (fk_curso_id, fk_disc_id) VALUES (1, 1);
INSERT INTO curso_disc (fk_curso_id, fk_disc_id) VALUES (2, 2);
INSERT INTO curso_disc (fk_curso_id, fk_disc_id) VALUES (3, 3);

-- Turmas
INSERT INTO tb_turmas (fk_aluno_turma, fk_prof_turma, turma_curso, turma_horario, fk_disc_turma)
VALUES (1, 1, 'Letras - Português', 'Matutino', 1);

INSERT INTO tb_turmas (fk_aluno_turma, fk_prof_turma, turma_curso, turma_horario, fk_disc_turma)
VALUES (2, 2, 'Licenciatura em Matemática', 'Noturno', 2);

INSERT INTO tb_turmas (fk_aluno_turma, fk_prof_turma, turma_curso, turma_horario, fk_disc_turma)
VALUES (3, 3, 'História', 'Vespertino', 3);
