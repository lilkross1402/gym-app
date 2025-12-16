const express = require("express");
const router = express.Router();
const pool = require("../db");
const verifyToken = require("../middlewares/auth");

// GET /api/clases
router.get("/", verifyToken, async (req, res) => {
  try {
    const usuario = req.user.usuario;
    const result = await pool.query(
      "SELECT * FROM clases_inscritas WHERE usuario = $1",
      [usuario]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener las clases." });
  }
});

module.exports = router;
