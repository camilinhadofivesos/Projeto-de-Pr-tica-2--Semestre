const express = require("express");
const router = express.Router();

let mensagens = [];

router.get("/", (req, res) => res.json(mensagens));

router.post("/", (req, res) => {
  const { nome, email, mensagem } = req.body;
  if (!nome || !email || !mensagem) {
    return res.status(400).json({ error: "Preencha todos os campos" });
  }
  const nova = { id: mensagens.length + 1, nome, email, mensagem };
  mensagens.push(nova);
  res.status(201).json(nova);
});

module.exports = router;