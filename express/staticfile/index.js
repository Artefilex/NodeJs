const express = require("express");
const app = express();
const userRoutes = require("./routes/user")
const adminRoutes = require("./routes/admin")
const path = require("path");
// proje yolunu bulursa aiiagıdakini kullan 

// app.use("/static" ,express.static("./public"))

// bulmazsa bunu kullan 
app.use("/static" ,express.static(path.join(__dirname, "./public")))

app.use("/libs" ,express.static("../node_modules")); 
// static dosyalarımızı acmak için express.static methodunu kullandık 
// aynı sekilde localde olunan image vide gibi fileların youlnu da verebiliriz 
// app.use(express.static('public')) bir public klasörü oluşturup altındaki herşeyi calıtstırabiliriz 

app.use("/admin",adminRoutes)
app.use(userRoutes)


app.listen(4000, () => {
  console.log("listening on port 4000");
});