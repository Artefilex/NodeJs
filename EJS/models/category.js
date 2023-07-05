const { DataTypes } = require("sequelize");
const sequelize = require("../data/sql");

const Category = sequelize.define("category", {
  categoryid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},{
    timestamps: false 
});

async function sync() {
  await Category.sync({ alter: true });
  console.log("category tablosu eklendi ")
//  1. yöntem  
//  const c1 = Category.build({
//     name:"Web geliştirme"
// })
//  await c1.save()
//  console.log("category eklendi ")

// ikinci yöntem direkt ekleme 
// await Category.create({ name:"mobil uygulama"})
// await Category.create({ name:"database"})
// await Category.create({ name:"sql srogu"})


// 3.yöntem bulCreate toplu insert işlemi 

const count = await Category.count()

if(count == 0){
await Category.bulkCreate([
    { name:"mobil uygulama"},
    { name:"database"},
    { name:"sql uygulama"}
])
 console.log("category eklendi ")
}
}

// ,{ timestams false yapmazsan her bir tabloya ekstiradan ikiş kolon daha ekliyor 
//     timestamps: false 
// }

sync();
module.exports = Category;
