const produtoModel = require('../models/produtosModels');

async function listar(req, res) {    
    try {
        const categoria = parseInt(req.params.categoria);
        const produtos = await produtoModel.listarProdutos(categoria);

        if (produtos) {
            res.json(produtos);
        } else {
            res.json([]);
        }

    } catch (error) {
        console.error(error); 
    }
}

module.exports = {listar};