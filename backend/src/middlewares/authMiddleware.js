const jwt = require('jsonwebtoken');

module.exports = {
  verifyToken: (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ msg: "Acesso negado. Token não fornecido" });
    }

    try {
      const secret = process.env.SECRET
      const decoded = jwt.verify(token, secret);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(400).json({ msg: "Token inválido" });
    }
  }
};