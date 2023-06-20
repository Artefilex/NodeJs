const express = require("express");
const router = express.Router();
const db = require("../data/sql");


router.use("/blogs/:blogid", function (req, res) {
  res.render("users/blog-details");
});

router.use("/blogs", function (req, res) {
  db.execute("select * from blok where onay = 1")
    .then((result) => {
      db.execute("select * from categories")
      .then((result2)=>{
        res.render("users/blogs", {
            title: " blogs app",
            categories:result2[0] ,
            blogs: result[0],
          });
      })
      .catch((err)=>{
        console.log(err)
      })
    })
    .catch((err) => {
      console.log(err);
    });
});

router.use("/", function (req, res) {
  db.query("select * from blok where onay = 1 and  mainpage = 1 ")
    .then((result) => {
      db.execute("select * from categories")
        .then((result2) => {
          res.render("users/index", {
            title: "popüler kurslar",
            blogs: result[0],
            categories: result2[0],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

// ejs kullanırken naptık dinamik veriler kullanmak için html uzantılarımızı  .ejs ile degistik
// artık dosyaları sendFile methoduyla degil render ederek gönderiyoruz path join methodlarına da ihityacımız kalmadı
//  ejs fidiyo bizim icin

module.exports = router;
