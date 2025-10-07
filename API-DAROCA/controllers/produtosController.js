const produtoModel = require('../models/produtosModels');


//busca pela categoria selecionada
async function listar(req, res)  {
    try{
        const categoria = parseInt(req.params.categoria);
        const result = await produtoModel.listarProdutos(categoria);
        if (result.recordset.length > 0){
            res.json(result);
        }
        else{
            res.send([])
        }
    }
    catch(error){
        res.status(400).json('Erro.', error)
    }
}

/*app.get('/produtosBusca/:nome', async (req, res) => {
    try{
        const nome = req.params.nome;
        const resultado = await mssql.query(`select * from daroca.produtos where nome = ${nome}`);
        if (resultado.recordset.length >0){
            res.send(resultado.recordset)
        }
        else{
            res.send([])
        }
    }
    catch(error){
        res.status(404).json('Produto não encontrado.')
    }
})*/

module.exports = {listar};