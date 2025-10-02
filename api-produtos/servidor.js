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


async function conectaBD() {
    try {
        await mssql.connect(stringSQL);
        console.log('Conexão com o banco bem sucedida.')
    }
    catch (error) {
        console.log("Erro na conexão com o banco de dados", error)
    }
}
conectaBD()

app.get("/produtos/:categoria", async (req, res) => {
    try{
        const categoria = parseInt(req.params.categoria);
        const result = await mssql.query(`Select * from daroca.produtos where categoria = ${categoria}`);
        if (result.recordset.length > 0){
            res.send(result.recordset)
        }
        else{
            res.send([])
        }
    }
    catch(error){
        res.status(400).json('Erro.', error)
    }
})

app.get('/produtosBusca/:nome', async (req, res) => {
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
})

//rota principal
app.listen(porta, () => console.log('API funcionando!'))

app.use('/', (req, res) => res.json({ mensagem: 'Servidor em execução' }))




