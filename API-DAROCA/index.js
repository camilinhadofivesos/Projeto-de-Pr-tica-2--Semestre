const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// Rotas existentes
const clientesRoutes = require("./routes/clientes");
const usuariosRoutes = require("./routes/usuarios");

// Rotas novas
const comentariosRoutes = require("./routes/comentarios");
const contatoRoutes = require("./routes/contato");
const assinaturasRoutes = require("./routes/assinaturas");

// Usar as rotas
app.use("/clientes", clientesRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/comentarios", comentariosRoutes);
app.use("/contato", contatoRoutes);
app.use("/assinaturas", assinaturasRoutes);

app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});