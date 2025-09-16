const express = require("express");
const router = express.Router();

let assinaturas = [];

router.get("/", (req, res) => res.json(assinaturas));

router.post("/", (req, res) => {
  const { nome, email, plano } = req.body;
  if (!nome || !email || !plano) {
    return res.status(400).json({ error: "Preencha todos os campos" });
  }
  const nova = { id: assinaturas.length + 1, nome, email, plano };
  assinaturas.push(nova);
  res.status(201).json(nova);
});

module.exports = router;