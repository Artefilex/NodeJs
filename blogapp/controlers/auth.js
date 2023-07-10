const User = require("../models/user");
const bcrypt = require("bcrypt");
const SENDMAIL = require("../helpers/send-mail");
const config = require("../config");
const mailText = require("../helpers/mail-template");
const crypto = require("crypto");
const { Op } = require("sequelize");

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
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      req.session.message = {
        text: "Girdiğiniz email adresine ait bir kayıt bulunmaktadır",
        class: "warning",
      };

      return res.redirect("login");
    }

    const newUser = await User.create({
      fullname: name,
      email: email,
      password: hashedPassword,
    });
    const messagesendto = `Hi ${newUser.fullname}, you were emailed me through nodemailer`;
    const options = {
      from: config.email.from,
      to: newUser.email,
      subject: "hesap oluşturuldu",
      html: mailText(messagesendto),
    };
    SENDMAIL(options, (info) => {
      console.log("Email sent successfully");
      console.log("MESSAGE ID: ", info.messageId);
    });
    req.session.message = {
      text: "hesaba giriş yapabilirsiniz ",
      class: "success",
    };
    return res.redirect("login");
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
        message: { text: "email hatalı ya da yok", class: "warning" },
      });
    }
    //   parola kontrolü

    // 0506mka1938


    const match = await bcrypt.compare(password, user.password);
    if(!match){
      res.render("auth/login", {
        title: "login",
        message: { text: "parola hatalı", class: "warning" },
      });
    }
    if (match) {
      const userRoles = await user.getRoles({
        attributes: ["rolename"],
        raw: true
      });
      req.session.roles = userRoles.map((role) => role["rolename"])
      
      // session
      req.session.isAuth = true;
      req.session.fullname = user.fullname;
      req.session.userid = user.id
      const url = req.query.returnUrl || "/";
      console.log(url)
      return res.redirect(url);
     
      // session in db
      // token-based auth - api
  
  
    
    }
    
  } catch (err) {
    console.log(err);
  }
};

exports.get_logout = async (req, res) => {
  try {
    await req.session.destroy();
    await new Promise((resolve) => setTimeout(resolve, 500));
    return res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

exports.get_reset = async (req, res) => {
  const message = req.session.message;
  delete req.session.message;
  try {
    return res.render("auth/reset-password", {
      title: "reset",
      message: message,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.post_reset = async (req, res) => {
  const mail = req.body.email;
  try {
    var token = crypto.randomBytes(32).toString("hex");
    const user = await User.findOne({ where: { email: mail } });
    if (!user) {
      req.session.message = {
        text: "Girdiğiniz email adresine ait bir kayıt bulunmaktadır",
        class: "warning",
      };

      return res.redirect("reset-password");
    }

    user.resetToken = token;
    user.resetTokenExiration = Date.now() + 1000 * 60 * 60;
    await user.save();
    const messagesendto = `Hi ${user.fullname}, your password is here`;
    const options = {
      from: config.email.from,
      to: user.email,
      subject: "reset password",
      html: ` 
         <h4>${messagesendto}</h4>  
         <p>
         <a href="http://localhost:3000/account/new-password/${token}" > click and update password </a> 
         </p>  
        `,
    };

    SENDMAIL(options, (info) => {
      console.log("Email sent successfully");
      console.log("MESSAGE ID: ", info.messageId);
    });

    req.session.message = {
      text: "mail bak",
      class: "success",
    };
    res.redirect("login");
  } catch (err) {
    console.log(err);
  }
};

exports.get_newpassword = async (req, res) => {
 const token= req.params.token
  try {
   const user = await User.findOne({where: {
    resetToken : token,
    resetTokenExiration:{
      [Op.gt] : Date.now()
    }
   }}) 
    return res.render("auth/new-password", {
      title: "new password",
      token:token,
      userId: user.id
    });
  } catch (err) {
    console.log(err);
  }
};

exports.post_newpassword = async (req, res) => {
 const token = req.body.token
 const userId = req.body.userId
 const password = req.body.password
  try {
    const user = await User.findOne({where: {
      resetToken : token,
      resetTokenExiration:{
        [Op.gt] : Date.now()
      },
      id: userId
     }}) 
     user.password = await bcrypt.hash(password, 10)
     user.resetToken = null;
     user.resetTokenExiration = null
     await user.save()
     req.session.message = {text: "parola güncellendi ",class: "success"}
    return res.redirect("login")
  
  } catch (err) {
    console.log(err);
  }
};