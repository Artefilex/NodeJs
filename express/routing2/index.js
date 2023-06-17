// burda nodejs kütüphanesi olan path methodunu kullandık çünkü amacımız bir html.sayfasını dinamik olarak acmaktı 
// dinamik olarak http://localhost:3000 yapacagımız bir arama için öncelikle uzantılarımmızı verdik 
//  daha sonra console.log(__dirname ) ile projenin yolunu bulduk neede oldugunu bulkduk 
//   res.sendFile(path.join(__dirname, "views/users","blog-detail.html")) 
// path.join ile dosya yolunu birleştirdik burada parcalara böldük 
//  __dirname C:\Users\baris\Desktop\nodejs\express\routing2 dönerken 
//  views/users ile ilgili htmle gittik daha sonra da html dosyasını cagırdık 


const express = require("express");
const app = express();
const path = require("path")
app.use("/blogs/:blogid", (req, res) => {
    console.log(__dirname)  // C:\Users\baris\Desktop\nodejs\express\routing2
    console.log(__filename)
    // res.send("vvsdvds ddv ")
    //    C:\Users\baris\Desktop\nodejs\express\routing2\views\users\index.html
      res.sendFile(path.join(__dirname, "views/users","blog-detail.html"))
    //   res.sendFile("C:\Users\baris\Desktop\nodejs\express\routing2 ");
});
app.use("/blogs", (req, res) => {
  //res.send("blog sayfası ");
  res.sendFile(path.join(__dirname, "views/users","blogs.html"))
});



app.use("/", (req, res) => {
//   res.send("ana sayfa ");
  res.sendFile(path.join(__dirname, "views/users","index.html"))
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
