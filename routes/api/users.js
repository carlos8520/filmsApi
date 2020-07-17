const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const { User } = require("../../db");

router.post(
  "/register",
  [
    check("username", "el nombre de usuario es obligatorio").not().isEmpty(),
    check("password", "el campo contraseña es obligatorio").not().isEmpty(),
    check("email", "el email debe estar correcto").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errores: errors.array() });
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = await User.create(req.body);
    res.json(user);
  }
);

module.exports = router;
