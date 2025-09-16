require('dotenv').config();
const express = require("express")
const app = express();
const porta = process.env.PORTA;
const stringSQL = process.env.CONNECTION_STRING;
const mssql = require('mssql');
const cors = require('cors');

app.use(cors({
    origin: "*"
}));

app.use(express.json());


async function conectaBD(){
    try{
        await mssql.connect(stringSQL);
    }
    catch(error){
        console.log("Erro na conexão com o banco de dados", error)
    }
}
conectaBD()

app.get("/produtos", async (req, res) => {
    const produtos = await mssql.query `select * from daroca.produtos`
    console.log(produtos);
    res.json(produtos);
})

//rota principal
app.listen(porta, () => console.log('API funcionando!'))

app.use('/', (req, res) => res.json({mensagem: 'Servidor em execução'}))