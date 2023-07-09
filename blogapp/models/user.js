const { DataTypes } = require("sequelize");
const sequelize = require("../data/sql");

const User = sequelize.define("user",{
   fullname: {
     type: DataTypes.STRING,
     allowNull: false
   },
   password:{
    type: DataTypes.STRING,
    allowNull:false
   },
   email:{
    type:DataTypes.STRING,
    allowNull: false
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


module.exports = User