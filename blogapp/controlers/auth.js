const User = require("../models/user");
const bcrypt = require("bcrypt");
exports.get_register = async (req, res) => {
  try {
    return res.render("auth/register", {
      title: "register",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.post_register = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      req.session.message = {
        text: "Girdiğiniz email adresine ait bir kayıt bulunmaktadır ",
        class: "warning",
      };

      return res.redirect("login");
    }

    await User.create({
      fullname: name,
      email: email,
      password: hashedPassword,
    });
    req.session.message = {
      text: "hesaba giriş yapabilirsiniz ",
      class: "success",
    };
    return res.redirect("/login");
  } catch (err) {
    console.log(err);
  }
};

exports.get_login = async (req, res) => {
  const message = req.session.message;
  delete req.session.message;
  try {
    res.render("auth/login", {
      title: "login",
      message: message,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.post_login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.render("auth/login", {
        title: "login",
        message: { text: "email hatalı ya da yok ", class: "warning" },
      });
    }
    //   parola kontrolü

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      // login oldu
      // cokkie  güvenli degil el yordamıyla degistiriliebilir
      // res.cookie("isAuth", 1)

      // session
      req.session.isAuth = true;
      req.session.fullname = user.fullname;
      const url = req.query.returnUrl || "/";
      // session in db
      // token-based auth - api

      return res.redirect(url);
    }

    res.render("auth/login", {
      title: "login",
      message: { text: "parola hatalı  ", class: "warning" },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.get_logout = async (req, res) => {
  try {
    // res.clearCookie("isAuth") cokkie için
    await req.session.destroy();
    return res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};
