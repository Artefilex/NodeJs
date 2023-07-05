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

Category.hasMany(Blog)
Blog.belongsTo(Category)

// console.log(dummyData())
// uygulaması -sync

//IIFE
async function sync(){
  await sequelizeDb.sync({alter: true})
   await dummyData();
} 
sync()
app.listen(3000, function () {
  console.log("listening on port 3000");
});
