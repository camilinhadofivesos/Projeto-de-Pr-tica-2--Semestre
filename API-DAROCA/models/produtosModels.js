const { mssql } = require('../db');

async function listarProdutos(categoria) {
    try{
        const request = new mssql.Request();
        const query = `SELECT * FROM daroca.produtos WHERE categoria = ${categoria}`;        
        const dados = await request.query(query);
        return dados.recordset;

    } catch (error) {
        console.error(error);
    }
}


module.exports = { listarProdutos };