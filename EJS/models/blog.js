const { DataTypes } = require("sequelize");
const sequelize = require("../data/sql");

const Blog = sequelize.define("blog", {
  blogid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subtitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  main: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  confirmation: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  categoryid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  addTime: {
    type: DataTypes.DATETIME,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Blog;
