const express = require("express");
const app = express();
const path = require("path");
// proje yolunu bulursa aiiagıdakini kullan 

// app.use("/static" ,express.static("./public"))

// bulmazsa bunu kullan 
app.use("/static" ,express.static(path.join(__dirname, "./public")))
app.use("/libs" ,express.static("../node_modules")); // static dosyalarımızı acmak için express.static methodunu kullandık 
// aynı sekilde localde olunan image vide gibi fileların youlnu da verebiliriz /
// app.use(express.static('public')) bir public klasörü oluşturup altındaki herşeyi calıtstırabiliriz 
// http://localhost:3000/images/kitten.jpg
// http://localhost:3000/css/style.css
// http://localhost:3000/js/app.js
// http://localhost:3000/images/bg.png
// http://localhost:3000/hello.html
app.use("/blogs/:blogid", (req, res) => {
  
  res.sendFile(path.join(__dirname, "views/users", "blog-detail.html"));
});
app.use("/blogs", (req, res) => {
  res.sendFile(path.join(__dirname, "views/users", "blogs.html"));
});

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/users", "index.html"));
});

app.listen(4000, () => {
  console.log("listening on port 3000");
});