const express = require('express');
const router = express.Router();

const connection = require('../connectDb'); 

router.post('/', async (req, res) => {
    try {
        const {
            prof_nome, prof_cpf, prof_telefone, prof_formacao, prof_titulacao, fk_endereco_prof
        } = req.body;

        const [result] = await connection.query("INSERT INTO tb_professor (prof_nome, prof_cpf, prof_telefone, prof_formacao, prof_titulacao, fk_endereco_prof) VALUES (?, ?, ?, ?, ?, ?)", [prof_nome, prof_cpf, prof_telefone, prof_formacao, prof_titulacao, fk_endereco_prof]);

        res.status(201).json({id: result.insertId,  ...req.body});

    } catch (error) {
        if (connection) {
            await connection.rollback();
        }
        console.error('Erro ao cadastrar professor:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

router.get('/', async (req, res) => {
    let connection;
    try {
        connection = await connectDb();
        const sql = `SELECT * FROM tb_professor`;
        const [rows] = await connection.execute(sql);
        
        res.status(200).json(rows);

    } catch (error) {
        console.error('Erro ao listar professores:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    } finally {
        if (connection) {
            connection.end();
        }
    }
});

router.get('/:id', async (req, res) => {
    let connection;
    try {
        const { id } = req.params;
        connection = await connectDb();
        const sql = 'SELECT * FROM tb_professor WHERE prof_id = ?';
        const [rows] = await connection.execute(sql, [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Professor não encontrado.' });
        }
        
        res.status(200).json(rows[0]);

    } catch (error) {
        console.error('Erro ao buscar professor:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    } finally {
        if (connection) {
            connection.end();
        }
    }
});

router.put('/:id', async (req, res) => {
    let connection;
    try {
        const { id } = req.params;
        const { prof_nome, prof_cpf, prof_telefone, prof_formacao, prof_titulacao } = req.body;

        if (!prof_nome || !prof_cpf || !prof_telefone || !prof_formacao || !prof_titulacao) {
            return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
        }

        connection = await connectDb();
        const sql = `UPDATE tb_professor SET
            prof_nome = ?,
            prof_cpf = ?,
            prof_telefone = ?,
            prof_formacao = ?,
            prof_titulacao = ?
        WHERE prof_id = ?`;

        const [result] = await connection.execute(sql, [
            prof_nome,
            prof_cpf,
            prof_telefone,
            prof_formacao,
            prof_titulacao,
            id
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Professor não encontrado para edição.' });
        }

        res.status(200).json({ message: 'Informações do professor atualizadas com sucesso.' });

    } catch (error) {
        console.error('Erro ao editar professor:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    } finally {
        if (connection) {
            connection.end();
        }
    }
});

router.delete('/:id', async (req, res) => {
    let connection;
    try {
        const { id } = req.params;
        connection = await connectDb();

        const [rows] = await connection.execute('SELECT fk_endereco_prof FROM tb_professor WHERE prof_id = ?', [id]);
        if (rows.length === 0) {
             return res.status(404).json({ message: 'Professor não encontrado para exclusão.' });
        }
        const enderecoId = rows[0].fk_endereco_prof;

        await connection.beginTransaction();

        const [resultProfessor] = await connection.execute('DELETE FROM tb_professor WHERE prof_id = ?', [id]);
        
        const [resultEndereco] = await connection.execute('DELETE FROM tb_endereco WHERE endereco_id = ?', [enderecoId]);

        await connection.commit();

        res.status(200).json({ message: 'Professor e endereço associado excluídos com sucesso.' });

    } catch (error) {
        if (connection) {
            await connection.rollback();
        }
        console.error('Erro ao deletar professor:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    } finally {
        if (connection) {
            connection.end();
        }
    }
});

module.exports = router;