import jwt from "jsonwebtoken";

export const livres = ["/api/auth/login", "/api/auth/cadastro", "/api/parametro/todos", '/api/auth/alterar-senha'];
export const user = { id: "" };
export default (req, res, next) => {
  if (livres.includes(req.path)) {
    next();
    return;
  }
  const header = req.headers["authorization"];

  if (!header) {
    return res.json({ erro: "Usuário não autenticado" });
  }
  var token = header.replace("Bearer ", "");
  if (!token) return res.status(401).send({ auth: false, message: "No token provided." });

  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(401).send({ auth: false, message: "Failed to authenticate token." });

    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    user.id = decoded.id;
    next();
  });
};
