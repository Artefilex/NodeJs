const express = require("express");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
const path = require("path");
const userRoutes2 = require("./routes/user2");
const userRoutes = require("./routes/user");
const sequelize = require("./routes/sequelize");


app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(sequelize);
app.use(userRoutes2);
const sequelizeDb = require("./data/sql")
const dummyData = require("./data/dummy-data")
const Category = require("./models/category")
const Blog = require("./models/blog")
// ilişkiler

Blog.belongsToMany(Category , {through: "blogCategories"})
Category.belongsToMany(Blog , {through: "blogCategories"})



// Category.hasMany(Blog,{
//   foreignKey:{
//     name:"categoryId",
//     allowNull: false
//   },
//   onDelete: "RESTRICT",
//   onUpdate: "RESTRICT"
// })
// Blog.belongsTo(Category)

// bire çok ilişki kurdugumuz durumlarda eğer category içerisinden bir biligiyi silmek istiyorsak 
// ve bu kategori bircok blogda varsa categornin silinmesi onDelete: "RESTRICT" onUpdate: "RESTRICT" vererek allowNull false yaparsak 
//  asla kategorye baglı olan bloglar silinmeden o category silinmez

// eger onDelete: "SET NULL", onUpdate: "SET NULL" yaparsak bu allowNull da true gönderirsek 
//  bu kategorye baglı olan blogların categoryId leri null olarak set edilir 
//  onDelete: "CASCADE", onUpdate: "CASCADE"  allowNull: false ise bir kategory silince 
// ona baglı tüm blogları da siler 

// console.log(dummyData())
// uygulaması -sync

//IIFE
async function sync(){
  await sequelizeDb.sync({force: true})
   await dummyData();
} 
sync()
app.listen(3000, function () {
  console.log("listening on port 3000");
});
