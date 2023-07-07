const { DataTypes } = require("sequelize");
const sequelize = require("../data/sql");

const Category = sequelize.define(
  "category",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
);



module.exports = Category;
