const db = require("../db/sql");

 const register =async(req,res)=>{
  try {
    const { userName, email, password, firstName, lastName } = req.body;
    const inserQuery = `INSERT INTO userinfo (username, mail, password, first_name, last_name) VALUES (?,?,?,?,?)`;
    const values = [userName, email, password, firstName, lastName];

    await db.execute(inserQuery, values);
    console.log("Veritabanına başarıyla eklendi");
    res.redirect("/")
  } catch (err) {
    console.error("Veritabanına ekleme hatası: ", err);
    res.send("Kayıt işlemi sırasında bir hata oluştu.");
  }


}

module.exports = register;
