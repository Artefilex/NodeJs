const db = require("../db/sql");

 const login =async (req, res) =>{
    try{
     const {loginUserName, loginMail, loginPassword } = req.body
     const selectQuery = `Select *From userinfo Where username = ? AND mail = ? AND password = ?`
     const values = [loginUserName, loginMail, loginPassword]
     const [result,] = await db.execute(selectQuery, values);
     const[userIsAdmin,] = await db.execute("Select * From userinfo Where isAdmin = 1 ");
    //   console.log(result[0])
    //   console.log(userIsAdmin[0])
       if( result[0].isAdmin === userIsAdmin[0].isAdmin){
          req.session.isAdmin = true;
          res.redirect('/');
      }
      else if (result.length > 0) {
         const user = result[0];
         req.session.isUser = true;
         res.redirect('/');
       } 
       
       else {
         res.send("Giriş bilgileri geçersiz.");
       }
      
    }
    catch (err){
     console.error("Veritabanına ekleme hatası: ", err);
     res.send("Kayıt işlemi sırasında bir hata oluştu.");
    }
   }

module.exports = login;