const express = require("express")
const router = express.Router()

const Usuario = require('./controllers/usuario')
const Evento = require('./controllers/evento')

const rotaInicial = (req, res) => {
    res.json("Back-end de Eventos Climáticos respondendo")
}

router.get('/', rotaInicial)

router.get('/usuario', Usuario.listar)
router.post('/usuario', Usuario.cadastrar)
router.post('/usuario/login', Usuario.login)
router.put('/usuario/:id', Usuario.alterar)
router.delete('/usuario/:id', Usuario.excluir)

router.get('/evento', Evento.listar)
router.post('/evento', Evento.cadastrar)
router.put('/evento/:id', Evento.alterar)
router.delete('/evento/:id', Evento.excluir)
router.get('/evento/resumo', Evento.resumo)

module.exports = router