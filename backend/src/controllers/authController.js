const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("../models/User");
const User = mongoose.model("user");

module.exports = {
  registerUser: async (req, res) => {
    if (!req.body.name) {
      return res.status(422).json({ msg: "O nome é inválido" });
    }

    if (!req.body.email) {
      return res.status(422).json({ msg: "O email é inválido" });
    }

    if (!req.body.password) {
      return res.status(422).json({ msg: "A senha é inválida" });
    }

    if (req.body.password !== req.body.passwordConfirmation) {
      return res.status(422).json({ msg: "As senhas não coincidem" });
    }

    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      return res.status(422).json({ msg: "Por favor, utilize outro e-mail" });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: passwordHash,
    });

    try {
      await newUser.save();
      return res.status(201).json({ msg: "Usuário criado com sucesso" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        msg: "Aconteceu um erro no servidor, tente novamente mais tarde.",
      });
    }
  },

  loginUser: async (req, res) => {
    if (!req.body.email) {
      return res.status(422).json({ msg: "O campo de email é obrigatório" });
    }
    if (!req.body.password) {
      return res.status(422).json({ msg: "O campo de senha é obrigatório" });
    }

    const user = await User.findOne({ email: req.body.email });

    // check if user exists
    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    // check if password match
    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!checkPassword) {
      return res.status(422).json({ msg: "Senha inválida" });
    }

    try {
      const secret = process.env.SECRET;

      const token = jwt.sign(
        {
          id: user._id,
        },
        secret
      );

      return res
        .status(200)
        .json({ msg: "Autenticação realizada com sucesso", token });
    } catch (err) {
      console.error(err);

      return res.status(422).json({
        msg: "Ocorreu um erro no servidor, por favor tente novamente mais tarde!",
      });
    }
  },
};
