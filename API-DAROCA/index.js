// api-daroca/index.js
require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const { conectaBD } = require("./db");

app.use(express.json());
app.use(cors({ origin : "*"}));

// Rotas existentes
const clientesRoutes = require("./routes/clientes");
const usuariosRoutes = require("./routes/usuarios");

// Rotas novas
const comentariosRoutes = require("./routes/comentarios");
const contatoRoutes = require("./routes/contato");
const produtoRoutes = require('./routes/produtosRoutes');
const produtosBusca = require('./routes/produtosBusca');

// Usar as rotas com prefixo "/api"
app.use("/api/clientes", clientesRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/comentarios", comentariosRoutes);
app.use("/api/contato", contatoRoutes);
app.use('/produtos', produtoRoutes);
app.use('/produtosBusca', produtosBusca);

app.get("/", (req, res) => {
  res.json({mensagem : "Servidor funcionando!"});
});


conectaBD();
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
