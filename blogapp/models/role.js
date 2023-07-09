const { DataTypes } = require("sequelize");
const sequelize = require("../data/sql");

const Role = sequelize.define(
  "role",
  {
   rolename: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }
);



module.exports = Role;
