// api-daroca/index.js
require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const produtoRoutes = require('./routes/produtos');

app.use(express.json());

// Rotas existentes
const clientesRoutes = require("./routes/clientes");
const usuariosRoutes = require("./routes/usuarios");

// Rotas novas
const comentariosRoutes = require("./routes/comentarios");
const contatoRoutes = require("./routes/contato");

// Usar as rotas com prefixo "/api"
app.use("/api/clientes", clientesRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/comentarios", comentariosRoutes);
app.use("/api/contato", contatoRoutes);
app.use('/produtos', produtoRoutes);

app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
