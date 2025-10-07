const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtosController');

router.get("/:categoria", produtoController.listar);
console.log('chegou no :categoria')

module.exports = router;