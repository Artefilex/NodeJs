const { DataTypes } = require("sequelize");
const sequelize = require("../data/sql");


const Blog = sequelize.define("blog", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
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
},{
  timestamps: true,
  validate: {
    chekcValid(){
      if(this.main && !this.confirmation){
        throw new Error("anasayfa bloğu onaylanmadı ")
      }
    }
  }
} );

module.exports = Blog;
