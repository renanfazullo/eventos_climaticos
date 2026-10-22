const con = require('../db')

const cadastrar = (req, res) => {
    const { nome, email, senha } = req.body
    try {
        const query = 'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, password(?));'
        con.query(query, [nome, email, senha], (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao cadastrar usuário' })
            } else {
                const novoUsuario = req.body
                novoUsuario.id = results.insertId
                res.status(201).json({ message: 'Usuário cadastrado com sucesso', user: novoUsuario })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao cadastrar usuário', details: 'Informe { nome, email, senha }' })
    }
}

const listar = (req, res) => {
    const query = 'SELECT * FROM usuario;'
    con.query(query, (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao buscar usuários' })
        } else {
            res.json(results)
        }
    })
}

const alterar = (req, res) => {
    const { nome, email, senha } = req.body
    try {
        const sql = 'UPDATE usuario SET nome = ?, email = ?, senha = password(?) WHERE id = ?;'
        con.query(sql, [nome, email, senha, Number(req.params.id)], (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao alterar usuário' })
            } else {
                const novoUsuario = req.body
                novoUsuario.id = results.insertId
                res.status(202).json({ message: 'Usuário alterado com sucesso', user: novoUsuario })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao alterar usuário', details: 'Informe { nome, email, senha }' })
    }
}


const excluir = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM usuario WHERE id = ?;';

    con.query(query, [id], (err, results) => {
        if (err) {
            if (err.code == 'ER_ROW_IS_REFERENCED_2') {
                return res.status(400).json({
                    error: 'Nao e possivel excluir usuario que possui eventos cadastrados'
                });
            }

            console.error(err);
            return res.status(500).json({ error: 'Erro ao excluir usuario' });
        } else if (results.affectedRows == 0) {
            res.status(404).json({ error: 'Usuario nao encontrado' });
        } else {
            res.json({ message: 'Usuario excluido com sucesso' });
        }
    });
};


const login = (req, res) => {
    const { email, senha } = req.body;

    const query = 'SELECT id, nome, email FROM usuario WHERE email = ? AND senha = password(?);';

    con.query(query, [email, senha], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao fazer login' });
        } else if (results.length == 0) {
            res.status(404).json({ error: 'Usuario ou senha incorretos' });
        } else {
            res.json(results[0]);
        }
    });
};

module.exports = {
    listar,
    cadastrar,
    alterar,
    excluir,
    login
};