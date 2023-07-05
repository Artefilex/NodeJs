const { DataTypes } = require("sequelize");
const sequelize = require("../data/sql");

const Category = sequelize.define("blog", {
  categoryid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Category;
