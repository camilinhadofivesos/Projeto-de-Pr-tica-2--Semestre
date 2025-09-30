const express = require("express");
const router = express.Router();
const { sql, config } = require("../db");

// GET - listar todas as mensagens - http://localhost:3000/api/contato
router.get("/", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .query("SELECT id, nome, email, mensagem, dataCriacao FROM daroca.contato ORDER BY id DESC");
    res.json(result.recordset);
  } catch (err) {
    console.error("Erro ao buscar mensagens:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST - enviar nova mensagem - http://localhost:3000/api/contato
router.post("/", async (req, res) => {
  const { nome, email, mensagem } = req.body;
  if (!nome || !email || !mensagem) {
    return res.status(400).json({ error: "Preencha todos os campos" });
  }

  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input("nome", sql.VarChar, nome)
      .input("email", sql.VarChar, email)
      .input("mensagem", sql.Text, mensagem)
      .query("INSERT INTO daroca.contato (nome, email, mensagem) VALUES (@nome, @email, @mensagem)");

    res.status(201).json({ mensagem: "Mensagem enviada com sucesso!" });
  } catch (err) {
    console.error("Erro ao enviar mensagem:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
