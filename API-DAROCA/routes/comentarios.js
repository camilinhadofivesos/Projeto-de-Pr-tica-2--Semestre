const express = require("express");
const router = express.Router();
const { sql, config } = require("../db");

// GET - listar todos os comentários - http://localhost:3000/api/comentarios
router.get("/", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .query("SELECT id, nome, comentario, dataCriacao FROM daroca.comentarios ORDER BY id DESC");
    res.json(result.recordset);
  } catch (err) {
    console.error("Erro ao buscar comentários:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST - criar novo comentário - http://localhost:3000/api/comentarios
router.post("/", async (req, res) => {
  const { nome, comentario } = req.body;
  if (!nome || !comentario) {
    return res.status(400).json({ error: "Nome e comentário são obrigatórios" });
  }

  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input("nome", sql.VarChar, nome)
      .input("comentario", sql.Text, comentario)
      .query("INSERT INTO daroca.comentarios (nome, comentario) VALUES (@nome, @comentario)");

    res.status(201).json({ mensagem: "Comentário enviado com sucesso!" });
  } catch (err) {
    console.error("Erro ao cadastrar comentário:", err);
    res.status(500).json({ error: err.message });
  }
});

// PATCH - editar comentário por ID - http://localhost:3000/api/comentarios/:id
router.patch("/:id", async (req, res) => {
  const { nome, comentario } = req.body;
  const id = parseInt(req.params.id);

  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input("id", sql.Int, id)
      .input("nome", sql.VarChar, nome)
      .input("comentario", sql.Text, comentario)
      .query(`
        UPDATE daroca.comentarios
        SET
          nome = COALESCE(@nome, nome),
          comentario = COALESCE(@comentario, comentario)
        WHERE id = @id
      `);

    res.json({ mensagem: "Comentário atualizado com sucesso!" });
  } catch (err) {
    console.error("Erro ao atualizar comentário:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE - remover comentário por ID - http://localhost:3000/api/comentarios/:id
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input("id", sql.Int, id)
      .query("DELETE FROM daroca.comentarios WHERE id = @id");

    res.json({ mensagem: "Comentário removido com sucesso!" });
  } catch (err) {
    console.error("Erro ao remover comentário:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
