const { mssql} = require('../db')

async function buscarProdutos(nome) {
    try{
        const request = new mssql.Request();
        const query = `SELECT * FROM daroca.produtos where nome = '${nome}'`;
        const dados = await request.query(query);
        return dados.recordset;
    }
    catch(erro){
        console.log('Erro na query do banco de dados:', erro)
    }
}

module.exports = {buscarProdutos};