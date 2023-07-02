const express = require("express");
const path = require("path");
const app = express();

const session = require("express-session")


app.set("view engine", "ejs");
app.use(session({
  secret: "author",
  resave:false,
  saveUninitialized: true
}))

app.get("/admin/logout", (req, res) => {
  req.session.isAdmin = false;
  
  res.redirect("/");
});

app.get("/user/logout", (req, res) => {
  req.session.isUser = false;
  res.redirect("/");
});

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "node_modules")));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin")


app.use(adminRoutes)
app.use(userRoutes);
app.listen(3000, () => {
  console.log("listen on port 3000");
});
