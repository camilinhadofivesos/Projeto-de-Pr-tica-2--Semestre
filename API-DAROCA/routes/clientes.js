const express = require("express");
const router = express.Router();
const { sql, config } = require("../db"); // só esta linha já importa sql e config
require('dotenv').config();

// GET - listar todos os clientes - http://localhost:3000/api/clientes
router.get("/", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    // altere o nome do schema conforme está no seu SQL:
    const result = await pool.request().query("SELECT * FROM daroca.clientes");
    res.json(result.recordset);
  } catch (err) {
    console.error("Erro ao buscar clientes:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST - cadastrar novo cliente - http://localhost:3000/api/clientes
router.post("/", async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Nome, email e senha são obrigatórios." });
  }
  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input("nome", sql.VarChar, nome)
      .input("email", sql.VarChar, email)
      .input("senha", sql.VarChar, senha)
      .query("INSERT INTO daroca.clientes (nome, email, senha) VALUES (@nome, @email, @senha)");
    res.status(201).json({ mensagem: "Cliente cadastrado com sucesso!" });
  } catch (err) {
    console.error("Erro ao cadastrar cliente:", err);
    res.status(500).json({ error: err.message });
  }
});

// PATCH - atualizar cliente - http://localhost:3000/api/clientes/:id
router.patch("/:id", async (req, res) => {
  const { nome, email, senha } = req.body;
  const id = parseInt(req.params.id);
  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input("id", sql.Int, id)
      .input("nome", sql.VarChar, nome)
      .input("email", sql.VarChar, email)
      .input("senha", sql.VarChar, senha)
      .query(`
        UPDATE daroca.clientes
        SET
          nome = COALESCE(@nome, nome),
          email = COALESCE(@email, email),
          senha = COALESCE(@senha, senha)
        WHERE id = @id
      `);
    res.json({ mensagem: "Cliente atualizado com sucesso." });
  } catch (err) {
    console.error("Erro ao atualizar cliente:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE - remover cliente - http://localhost:3000/api/clientes/:id
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input("id", sql.Int, id)
      .query("DELETE FROM daroca.clientes WHERE id = @id");
    res.json({ mensagem: "Cliente removido com sucesso." });
  } catch (err) {
    console.error("Erro ao remover cliente:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
