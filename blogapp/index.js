const express = require("express");
const app = express();

const path = require("path");

const userRoutes= require("./routes/user");
const sequelize = require("./routes/sequelize");


const sequelizeDb = require("./data/sql")
const dummyData = require("./data/dummy-data")
const Category = require("./models/category")
const Blog = require("./models/blog")

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(sequelize);
app.use(userRoutes);


Blog.belongsToMany(Category , {through: "blogCategories"})
Category.belongsToMany(Blog , {through: "blogCategories"})


async function sync(){
  await sequelizeDb.sync({force: true})
   await dummyData();
} 
sync()
app.listen(3000, function () {
  console.log("listening on port 3000");
});
