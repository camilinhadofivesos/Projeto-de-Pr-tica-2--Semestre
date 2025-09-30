const express = require("express");
const router = express.Router();
const { sql, config } = require("../db");
const bcrypt = require("bcrypt");

// GET - listar todos os usuários - http://localhost:3000/api/usuarios
router.get("/", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .query("SELECT id, nome, email, dataCriacao FROM daroca.usuarios ORDER BY id DESC");
    res.json(result.recordset);
  } catch (err) {
    console.error("Erro ao buscar usuários:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST - cadastrar novo usuário - http://localhost:3000/api/usuarios
router.post("/", async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Nome, email e senha são obrigatórios." });
  }

  try {
    const pool = await sql.connect(config);
    
    // Verifica se o email já existe
    const check = await pool.request()
      .input("email", sql.VarChar, email)
      .query("SELECT id FROM daroca.usuarios WHERE email = @email");
    
    if (check.recordset.length > 0) {
      return res.status(400).json({ error: "Email já cadastrado." });
    }

    // Hash da senha
    const hashedSenha = await bcrypt.hash(senha, 10);

    // Inserir no banco
    await pool.request()
      .input("nome", sql.VarChar, nome)
      .input("email", sql.VarChar, email)
      .input("senha", sql.VarChar, hashedSenha)
      .query("INSERT INTO daroca.usuarios (nome, email, senha) VALUES (@nome, @email, @senha)");

    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    console.error("Erro ao cadastrar usuário:", err);
    res.status(500).json({ error: err.message });
  }
});

// PATCH - atualizar usuário  - http://localhost:3000/api/usuarios/:id
router.patch("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, email, senha } = req.body;

  try {
    const pool = await sql.connect(config);

    let query = `
      UPDATE daroca.usuarios
      SET
        nome = COALESCE(@nome, nome),
        email = COALESCE(@email, email)
    `;

    const request = pool.request()
      .input("id", sql.Int, id)
      .input("nome", sql.VarChar, nome)
      .input("email", sql.VarChar, email);

    if (senha) {
      const hashedSenha = await bcrypt.hash(senha, 10);
      query += ", senha = @senha";
      request.input("senha", sql.VarChar, hashedSenha);
    }

    query += " WHERE id = @id";

    await request.query(query);
    res.json({ mensagem: "Usuário atualizado com sucesso." });
  } catch (err) {
    console.error("Erro ao atualizar usuário:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE - remover usuário - http://localhost:3000/api/usuarios/:id
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input("id", sql.Int, id)
      .query("DELETE FROM daroca.usuarios WHERE id = @id");

    res.json({ mensagem: "Usuário removido com sucesso." });
  } catch (err) {
    console.error("Erro ao remover usuário:", err);
    res.status(500).json({ error: err.message });
  }
});

// LOGIN - autenticar usuário - http://localhost:3000/api/usuarios/login
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).json({ error: "Email e senha são obrigatórios." });

  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM daroca.usuarios WHERE email = @email");

    const usuario = result.recordset[0];
    if (!usuario) return res.status(401).json({ error: "Credenciais inválidas" });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ error: "Credenciais inválidas" });

    res.json({
      message: "Login realizado com sucesso!",
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email }
    });
  } catch (err) {
    console.error("Erro ao autenticar usuário:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;