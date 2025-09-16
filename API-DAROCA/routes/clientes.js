const express = require("express");
const router = express.Router();

// "Banco de dados" fake
let clientes = [
  { id: 1, nome: "Maria", idade: 20 },
  { id: 2, nome: "João", idade: 22 },
];

// GET - listar todos os clientes
router.get("/", (req, res) => {
  res.json(clientes);
});

// POST - adicionar cliente novo (com validação)
router.post("/", (req, res) => {
  const { nome, idade } = req.body;

  // Validação simples para nome e idade
  if (!nome || !idade) {
    return res.status(400).json({ error: "Nome e idade são obrigatórios." });
  }

  const novoCliente = {
    id: clientes.length + 1,
    nome,
    idade,
  };

  clientes.push(novoCliente);
  res.status(201).json(novoCliente);
});

// PATCH - atualizar cliente
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const cliente = clientes.find(c => c.id === id);

  if (!cliente) {
    return res.status(404).json({ error: "Cliente não encontrado" });
  }

  if (req.body.nome) cliente.nome = req.body.nome;
  if (req.body.idade) cliente.idade = req.body.idade;

  res.json(cliente);
});

// DELETE - remover cliente
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  clientes = clientes.filter(c => c.id !== id);
  res.json({ message: "Cliente removido com sucesso" });
});

module.exports = router;