const express = require("express");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
const path = require("path");
const userRoutes2 = require("./routes/user2");
const userRoutes = require("./routes/user");
// const adminRoutes = require("./routes/admin");
const sequelize = require("./routes/sequelize");




app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(sequelize);
// app.use( adminRoutes);
// app.use(userRoutes);
app.use(userRoutes2);

app.listen(3000, function () {
  console.log("listening on port 3000");
});
