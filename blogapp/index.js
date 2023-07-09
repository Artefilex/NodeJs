
// express modulleri
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const session = require("express-session");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

// node_modules
const path = require("path");


// routes
const userRoutes = require("./routes/user");
const sequelize = require("./routes/sequelize");
const authRoutes = require("./routes/auth");

// custom modules

const sequelizeDb = require("./data/sql");
const dummyData = require("./data/dummy-data");
const locals = require("./middlewares/locals")


// models

const Category = require("./models/category");
const Blog = require("./models/blog");
const User = require("./models/user");

// template engine

app.set("view engine", "ejs");

// middleware

app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(
  session({
    secret: "baris", // random guid oluştıur,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 24, // bir günlük session oluşturduk
    },
    store: new SequelizeStore({
      db: sequelizeDb 
    })
  })
);

app.use(locals)


app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(sequelize);
app.use(userRoutes);
app.use("/account", authRoutes);

Blog.belongsToMany(Category, { through: "blogCategories" });
Category.belongsToMany(Blog, { through: "blogCategories" });
Blog.belongsTo(User);

User.hasMany(Blog);


// async function sync() {
//   await sequelizeDb.sync({ force: true });
//   await dummyData();
// }
// sync();
app.listen(3000, function () {
  console.log("listening on port 3000");
});
