const pool = require('../config/db');

/**
 * @description Marca uma nova consulta
 * @route POST /api/consultas
 */
const marcarConsulta = async (req, res) => {
    const { nome, cpf, email, especialidade, data } = req.body;

    if (!nome || !cpf || !email || !especialidade || !data) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        let [pacientes] = await connection.execute('SELECT id_paciente FROM Pacientes WHERE cpf = ?', [cpf]);
        let pacienteId;

        if (pacientes.length > 0) {
            pacienteId = pacientes[0].id_paciente;
        } else {
            const [result] = await connection.execute(
                'INSERT INTO Pacientes (nome, cpf, email) VALUES (?, ?, ?)',
                [nome, cpf, email]
            );
            pacienteId = result.insertId;
        }

        const [especialidades] = await connection.execute('SELECT id_especialidade FROM Especialidades WHERE nome_especialidade = ?', [especialidade]);
        
        if (especialidades.length === 0) {
            await connection.rollback();
            return res.status(400).json({ message: 'Especialidade não encontrada.' });
        }
        const especialidadeId = especialidades[0].id_especialidade;

        await connection.execute(
            'INSERT INTO Consultas (data_consulta, id_paciente, id_especialidade) VALUES (?, ?, ?)',
            [data, pacienteId, especialidadeId]
        );

        await connection.commit();
        res.status(201).json({ message: 'Consulta marcada com sucesso!' });

    } catch (error) {
        await connection.rollback();
        console.error('Erro ao marcar consulta:', error);
        res.status(500).json({ message: 'Erro no servidor ao tentar marcar a consulta.' });
    } finally {
        connection.release();
    }
};

/**
 * @description Busca consultas por nome ou CPF do paciente
 * @route GET /api/consultas/search?q=termo_de_busca
 */
const buscarConsultas = async (req, res) => {
    const termo = req.query.q;

    if (!termo) {
        return res.status(400).json({ message: 'É necessário um termo para a busca.' });
    }

    try {
        const query = `
            SELECT 
                c.id_consulta,
                p.nome, 
                p.cpf, 
                c.data_consulta, 
                e.nome_especialidade 
            FROM Consultas c
            JOIN Pacientes p ON c.id_paciente = p.id_paciente
            JOIN Especialidades e ON c.id_especialidade = e.id_especialidade
            WHERE p.nome LIKE ? OR p.cpf LIKE ?
            ORDER BY c.data_consulta DESC;
        `;
        const [results] = await pool.execute(query, [`%${termo}%`, `%${termo}%`]);

        res.status(200).json(results);

    } catch (error) {
        console.error('Erro ao buscar consultas:', error);
        res.status(500).json({ message: 'Erro no servidor ao buscar consultas.' });
    }
};

/**
 * @description Cancela um agendamento
 * @route DELETE /api/consultas/:id
 */
const cancelarConsulta = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'O ID da consulta é obrigatório.' });
    }

    try {
        const [result] = await pool.execute('DELETE FROM Consultas WHERE id_consulta = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Consulta não encontrada ou já cancelada.' });
        }

        res.status(200).json({ message: 'Agendamento cancelado com sucesso!' });

    } catch (error) {
        console.error('Erro ao cancelar consulta:', error);
        res.status(500).json({ message: 'Erro no servidor ao cancelar a consulta.' });
    }
};

module.exports = {
    marcarConsulta,
    buscarConsultas,
    cancelarConsulta,
};