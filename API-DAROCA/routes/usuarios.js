const express = require("express");
const router = express.Router();

let usuarios = [
  { id: 1, nome: "Ana", email: "ana@email.com", senha: "123456" },
  { id: 2, nome: "Carlos", email: "carlos@email.com", senha: "abc123" },
];

const nextId = (arr) => (arr.length ? Math.max(...arr.map(u => u.id)) + 1 : 1);

// GET - listar usuários
router.get("/", (req, res) => res.json(usuarios));

// POST - cadastrar usuário
router.post("/", (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Nome, email e senha são obrigatórios." });
  }
  if (usuarios.some(u => u.email === email)) {
    return res.status(400).json({ error: "Email já cadastrado." });
  }
  const novoUsuario = { id: nextId(usuarios), nome, email, senha };
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

// PATCH - atualizar usuário
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);
  if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });
  if (req.body.nome) usuario.nome = req.body.nome;
  if (req.body.email) usuario.email = req.body.email;
  if (req.body.senha) usuario.senha = req.body.senha;
  res.json(usuario);
});


// DELETE - remover usuário
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }
  usuarios.splice(index, 1);
  res.json({ message: "Usuário removido com sucesso" });
});


// LOGIN - autenticar usuário
router.post("/login", (req, res) => {
  const { email, senha } = req.body;
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);
  if (!usuario) return res.status(401).json({ error: "Credenciais inválidas" });
  res.json({
    message: "Login realizado com sucesso!",
    usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email }
  });
});

module.exports = router;