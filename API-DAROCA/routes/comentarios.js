const express = require("express");
const router = express.Router();

let comentarios = [];

router.get("/", (req, res) => res.json(comentarios));

router.post("/", (req, res) => {
  const { nome, comentario } = req.body;
  if (!nome || !comentario) {
    return res.status(400).json({ error: "Nome e comentário são obrigatórios" });
  }
  const novo = { id: comentarios.length + 1, nome, comentario };
  comentarios.push(novo);
  res.status(201).json(novo);
});

module.exports = router;