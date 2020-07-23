const jwt = require("jwt-simple");
const moment = require("moment");

const checkToken = (req, res, next) => {
  if (!req.headers["user-token"]) {
    return res.json({ error: "incluir user-token en cabecera íllo" });
  }

  const userToken = req.headers["user-token"];
  let payload = {};

  try {
    payload = jwt.decode(userToken, "frase secreta");
  } catch (err) {
    return res.json({ error: "token incorrecto íllo" });
  }

  if (payload.expiredAt < moment().unix()) {
    return res.json({ error: "token ha expirao payaso" });
  }

  req.usuarioId = payload.usuarioId;

  next();
};

module.exports = {
  checkToken: checkToken,
};
