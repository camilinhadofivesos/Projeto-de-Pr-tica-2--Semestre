const produtoModel = require('../models/produtosBuscaModels');

async function buscar(req, res) {
    try{
        const nome = req.params.nome;
        const produtosNome = await produtoModel.buscarProdutos(nome);
        console.log('Produtos do banco:', produtosNome); 
        if (produtosNome) {
            res.json(produtosNome);
        }
        else{
            res.json([])
        }
    }
    catch(erro){
        console.error('Erro na busca dos produtos: ', erro);
    }
}

module.exports = { buscar };