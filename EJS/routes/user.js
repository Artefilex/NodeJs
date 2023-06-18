const express = require("express");
const router = express.Router();

const data ={
    title : "popüler kurslar ",
    categories : [ "bla bla" , "web geliştirme" ,"programlama" , "mobi luygulama" , "veri analizi ", "office uyguamları "],
    blogs: [
        {
            blogid: 1,
            title: "Komple Uygulamalı Web Geliştirme ",
            description: "Sıfırdan ileri seviyeye 'Web Geliştirme': Html, Css, Sass, Flexbox, Bootstrap, Javascript, Angular, JQuery, Asp.Net Mvc&Core Mvc",
            image: "1.jpeg",
            main: true
        },
        {
            blogid: 2,
            title: "Python ile Sıfırdan İleri Seviye Python Programlama",
            description: "Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
            image: "2.jpeg",
            main: true
        },
        {
            blogid: 3,
            title: "Sıfırdan İleri Seviye Modern Javascript Dersleri ES7+ ",
            description: "Modern javascript dersleri ile (ES6 & ES7+) Nodejs, Angular, React ve VueJs için sağlam bir temel oluşturun.",
            image: "3.jpeg",
            main: false
        },

    ]
}

router.use("/blogs/:blogid", function(req, res) {
    res.render("users/blog-details");
});

router.use("/blogs", function(req, res) {
    res.render("users/blogs",data);
});

router.use("/", function(req, res) {
    res.render("users/index",data);
});


// ejs kullanırken naptık dinamik veriler kullanmak için html uzantılarımızı  .ejs ile degistik 
// artık dosyaları sendFile methoduyla degil render ederek gönderiyoruz path join methodlarına da ihityacımız kalmadı 
//  ejs fidiyo bizim icin 

module.exports = router;