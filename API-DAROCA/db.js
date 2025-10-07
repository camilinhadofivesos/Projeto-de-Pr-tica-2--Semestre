require('dotenv').config();
const mssql = require('mssql');

const connectionSring = process.env.CONNECTION_STRING;

async function conectaBD(){
  try{
    await mssql.connect(connectionSring);
    console.log('Conexão com o banco feita.')
  }
  catch(error){
    console.error('Erro na conexão com o BD.', error);
  }
}

module.exports = { mssql, conectaBD};