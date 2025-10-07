const { mssql } = require('../db');

async function listarProdutos(categoria) {
    const dados = await mssql.query(`SELECT * FROM daroca.produtos where categoria = ${categoria}`)
    return dados.recordset;
}

module.exports = {listarProdutos};