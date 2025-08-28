CREATE DATABASE IF NOT EXISTS db_gerenciamento_academico;
USE db_gerenciamento_academico;

CREATE TABLE tb_endereco(
endereco_id INT PRIMARY KEY AUTO_INCREMENT,
endereco_comple VARCHAR(100) NULL,
endereco_cep VARCHAR(10) NOT NULL,
endereco_estado ENUM('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO') NOT NULL,
endereco_cidade VARCHAR(100) NOT NULL,
endereco_bairro VARCHAR(100) NOT NULL
);

CREATE TABLE tb_aluno(
aluno_id INT AUTO_INCREMENT PRIMARY KEY,
aluno_nome VARCHAR(255) NOT NULL,
aluno_cpf VARCHAR(50) NOT NULL UNIQUE,
aluno_email VARCHAR(255) NOT NULL,
aluno_telefone VARCHAR(255) NOT NULL,
aluno_data_nascimento DATE NOT NULL,
fk_endereco_aluno INT NOT NULL,
FOREIGN KEY (fk_endereco_aluno) REFERENCES tb_endereco(endereco_id)
);

CREATE TABLE tb_professor(
prof_id INT AUTO_INCREMENT PRIMARY KEY,
prof_nome VARCHAR(100) NOT NULL,
prof_cpf VARCHAR(15) NOT NULL UNIQUE,
prof_telefone VARCHAR(100) NOT NULL,
prof_formacao VARCHAR(100) NOT NULL,
prof_titulacao ENUM("graduação","pos-graduação","mestrado","doutorado","phd") NOT NULL,
fk_endereco_prof INT NOT NULL,
FOREIGN KEY (fk_endereco_prof) REFERENCES tb_endereco(endereco_id)
);