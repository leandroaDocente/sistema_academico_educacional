const express = require('express');
const router = express.Router();
const connection = require('../connectDb'); 

// ================== CADASTRO ==================
router.post('/', async (req, res) => {
    try {
        const { prof_nome, prof_cpf, prof_telefone, prof_formacao, prof_titulacao, fk_endereco_prof } = req.body;

        const [result] = await connection.query(
            `INSERT INTO tb_professor 
             (prof_nome, prof_cpf, prof_telefone, prof_formacao, prof_titulacao, fk_endereco_prof) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [prof_nome, prof_cpf, prof_telefone, prof_formacao, prof_titulacao, fk_endereco_prof]
        );

        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        console.error('Erro ao cadastrar professor:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

// ================== LISTAR TODOS ==================
router.get('/', async (req, res) => {
    try {
        const [rows] = await connection.query(`SELECT * FROM tb_professor`);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao listar professores:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

// ================== LISTAR POR ID ==================
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await connection.query(
            'SELECT * FROM tb_professor WHERE prof_id = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Professor não encontrado.' });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Erro ao buscar professor:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

// ================== ATUALIZAR ==================
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { prof_nome, prof_cpf, prof_telefone, prof_formacao, prof_titulacao, fk_endereco_prof } = req.body;

        const [result] = await connection.query(
            `UPDATE tb_professor SET 
                prof_nome = ?, 
                prof_cpf = ?, 
                prof_telefone = ?, 
                prof_formacao = ?, 
                prof_titulacao = ?, 
                fk_endereco_prof = ?
             WHERE prof_id = ?`,
            [prof_nome, prof_cpf, prof_telefone, prof_formacao, prof_titulacao, fk_endereco_prof, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Professor não encontrado.' });
        }

        res.json({ message: 'Professor atualizado com sucesso.' });
    } catch (error) {
        console.error('Erro ao editar professor:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

module.exports = router;