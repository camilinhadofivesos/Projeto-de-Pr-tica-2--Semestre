const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosBuscaController');

router.get("/:nome", produtosController.buscar);

module.exports = router;