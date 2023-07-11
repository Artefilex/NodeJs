const { DataTypes } = require("sequelize");
const sequelize = require("../data/sql");
const bcrypt = require("bcrypt")
const User = sequelize.define("user",{
   fullname: {
     type: DataTypes.STRING,
     allowNull: false,
     validate:{
      notEmpty:{
        msg: "fullname boş bırakılamaz",
      },
      isFullName(value){
        if(value.split(" ").length < 2){
          throw new Error("ad ve soyad bilgisini düzgün girin");
        }
      }

     }
   },
   password:{
    type: DataTypes.STRING,
    allowNull:false,
    validate:{
     notEmpty: {
      msg: "parola boş olmaz "
     },
     len:{
      args: [5,10],
      msg :  "parola 5 10 karakter arasonda olmalı "
     }
    }
   },
   email:{
    type:DataTypes.STRING,
    allowNull: false,
    unique:{
      args: true,
      msg: "emaile ait hesap bulunmaktadır"
    },
    validate:{
      notEmpty:{
        msg: "fullname boş bırakılamaz",
      },
      isEmail :{
        msg: "email girmelisiniz"
      },
     
     }
   },
   resetToken:{
     type: DataTypes.STRING,
     allowNull: true
   },
   resetTokenExiration:{
    type: DataTypes.DATE,
    allowNull: true
  }

},{timestaps: true})

User.afterValidate( async (user) =>{
  user.password = await bcrypt.hash(user.password, 10);
})

// burda sequelize hooks kullandık afterValidate()

module.exports = User