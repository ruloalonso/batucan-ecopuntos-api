const crypto = require("crypto");

// Protege endpoints de administración con una clave compartida (ADMIN_KEY).
// El cliente la envía en la cabecera "x-admin-key".
const requireAdmin = (req, res, next) => {
  const adminKey = process.env.ADMIN_KEY;

  if (!adminKey) {
    return res
      .status(503)
      .json({ message: "Función de administración no configurada" });
  }

  const provided = Buffer.from(String(req.get("x-admin-key") || ""));
  const expected = Buffer.from(adminKey);

  if (
    provided.length !== expected.length ||
    !crypto.timingSafeEqual(provided, expected)
  ) {
    return res.status(401).json({ message: "Clave de administración incorrecta" });
  }

  next();
};

module.exports = requireAdmin;
