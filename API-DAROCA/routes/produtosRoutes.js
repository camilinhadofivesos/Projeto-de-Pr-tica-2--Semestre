const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtosController');

router.get("/:categoria", produtoController.listar);

module.exports = router;