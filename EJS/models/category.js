const { DataTypes } = require("sequelize");
const sequelize = require("../data/sql");

const Category = sequelize.define(
  "category",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
);

// ,{ timestams false yapmazsan her bir tabloya ekstiradan ikiş kolon daha ekliyor
//     timestamps: false
// }

module.exports = Category;
