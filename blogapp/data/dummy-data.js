const Category = require("../models/category");
const Blog = require("../models/blog");
const slugField = require("../helpers/slugfield");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const Role = require("../models/role");

async function populate() {
  const count = await Category.count();

  if (count == 0) {
    const categories = await Category.bulkCreate([
      { name: "Web Geliştirme", url: slugField("Web Geliştirme") },
      { name: "Mobil Geliştirme", url: slugField("Mobil Geliştirme") },
      { name: "Programlama", url: slugField("Programlama") },
    ]);
    const user = await User.bulkCreate([
      {
        fullname: "Barış Tunçdemir",
        email: "baris@gmail.com",
        password: await bcrypt.hash("0506mka1938", 10),
      },
      {
        fullname: "Sedef bayramhan ",
        email: "sedef@gmail.com",
        password: await bcrypt.hash("0506mka1938", 10),
      },
      {
        fullname: "baris tuncdemir",
        email: "baris.tncdmr@gmail.com",
        password: await bcrypt.hash("0506mka1938", 10),
      },
      {
        fullname: "artefilex",
        email: "artefilex@gmail.com",
        password: await bcrypt.hash("0506mka1938", 10),
      },
      
    ]);
    const role = await Role.bulkCreate([
      {rolename:"admin"},
      {rolename:"moderator"},
      {rolename:"quest"}

    ]);
    const blogs = await Blog.bulkCreate([
      {
        title: "Komple Uygulamalı Web Geliştirme Eğitimi",
        url: slugField("Komple Uygulamalı Web Geliştirme Eğitimi"),
        subtitle:
          "Sıfırdan ileri seviyeye 'Web Geliştirme': Html, Css, Sass, Flexbox, Bootstrap, Javascript, Angular, JQuery, Asp.Net Mvc&Core Mvc",
        aciklama:
          "Web geliştirme komple bir web sitesinin hem web tasarım (html,css,javascript), hem de web programlama (asp.net mvc) konularının kullanılarak geliştirilmesidir. Sadece html css kullanarak statik bir site tasarlayabiliriz ancak işin içine bir web programlama dilini de katarsak dinamik bir web uygulaması geliştirmiş oluruz.",
        desc: "Python, son zamanların en popüler programlama dili haline geldi. Python' ın bu kadar popüler olmasındaki sebep şüphesiz öğrenmesi kolay bir yazılım dili olmasıdır.sadikturan adreslerinde paylaşmış olduğum python dersleri serisini takip ederek ister video ister yazılı kaynaklar yardımıyla kısa zamanda python programlama alanında uzmanlık kazanın ve hayal ettiğiniz projeyi gerçekleştirin.",
        image: "1.jpeg",
        main: true,
        confirmation: true,
        userId: 2
      },
      {
        title: "Python ile Sıfırdan İleri Seviye Python Programlama",
        url: slugField("Python ile Sıfırdan İleri Seviye Python Programlama"),
        subtitle:
          "Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
        desc: "Python, son zamanların en popüler programlama dili haline geldi. Python' ın bu kadar popüler olmasındaki sebep şüphesiz öğrenmesi kolay bir yazılım dili olmasıdır.sadikturan adreslerinde paylaşmış olduğum python dersleri serisini takip ederek ister video ister yazılı kaynaklar yardımıyla kısa zamanda python programlama alanında uzmanlık kazanın ve hayal ettiğiniz projeyi gerçekleştirin.",
        image: "2.jpeg",
        main: true,
        confirmation: true,
        userId: 2
      },
      {
        title: "Python ile Sıfırdan İleri Seviye Python Programlama",
        url: slugField("Python ile Sıfırdan Programlama"),
        subtitle:
          "Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
        desc: "Python, son zamanların en popüler programlama dili haline geldi. Python' ın bu kadar popüler olmasındaki sebep şüphesiz öğrenmesi kolay bir yazılım dili olmasıdır.sadikturan adreslerinde paylaşmış olduğum python dersleri serisini takip ederek ister video ister yazılı kaynaklar yardımıyla kısa zamanda python programlama alanında uzmanlık kazanın ve hayal ettiğiniz projeyi gerçekleştirin.",
        image: "2.jpeg",
        main: true,
        confirmation: true,
        userId: 2
      },
      {
        title: "Python ile Sıfırdan İleri Seviye Python Programlama",
        url: slugField("İleri Seviye Python Programlama"),
        subtitle:
          "Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
        desc: "Python, son zamanların en popüler programlama dili haline geldi. Python' ın bu kadar popüler olmasındaki sebep şüphesiz öğrenmesi kolay bir yazılım dili olmasıdır.sadikturan adreslerinde paylaşmış olduğum python dersleri serisini takip ederek ister video ister yazılı kaynaklar yardımıyla kısa zamanda python programlama alanında uzmanlık kazanın ve hayal ettiğiniz projeyi gerçekleştirin.",
        image: "2.jpeg",
        main: true,
        confirmation: true,
        userId: 2
      },
      {
        title: "Python ile Sıfırdan İleri Seviye Python Programlama",
        url: slugField("Python ile Sıfırdan İleri Seviye Python Programlama"),
        subtitle:
          "Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
        desc: "Python, son zamanların en popüler programlama dili haline geldi. Python' ın bu kadar popüler olmasındaki sebep şüphesiz öğrenmesi kolay bir yazılım dili olmasıdır.sadikturan adreslerinde paylaşmış olduğum python dersleri serisini takip ederek ister video ister yazılı kaynaklar yardımıyla kısa zamanda python programlama alanında uzmanlık kazanın ve hayal ettiğiniz projeyi gerçekleştirin.",
        image: "2.jpeg",
        main: true,
        confirmation: true,
        userId: 1
      },
      {
        title: "Python ile Sıfırdan İleri Seviye Python Programlama",
        url: slugField("Python ile Sıfırdan Programlama"),
        subtitle:
          "Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
        desc: "Python, son zamanların en popüler programlama dili haline geldi. Python' ın bu kadar popüler olmasındaki sebep şüphesiz öğrenmesi kolay bir yazılım dili olmasıdır.sadikturan adreslerinde paylaşmış olduğum python dersleri serisini takip ederek ister video ister yazılı kaynaklar yardımıyla kısa zamanda python programlama alanında uzmanlık kazanın ve hayal ettiğiniz projeyi gerçekleştirin.",
        image: "2.jpeg",
        main: true,
        confirmation: true,
        userId: 1
      },
      {
        title: "Python ile Sıfırdan İleri Seviye Python Programlama",
        url: slugField("İleri Seviye Python Programlama"),
        subtitle:
          "Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
        desc: "Python, son zamanların en popüler programlama dili haline geldi. Python' ın bu kadar popüler olmasındaki sebep şüphesiz öğrenmesi kolay bir yazılım dili olmasıdır.sadikturan adreslerinde paylaşmış olduğum python dersleri serisini takip ederek ister video ister yazılı kaynaklar yardımıyla kısa zamanda python programlama alanında uzmanlık kazanın ve hayal ettiğiniz projeyi gerçekleştirin.",
        image: "2.jpeg",
        main: true,
        confirmation: true,
        userId: 1
      },
    ]);
    await user[0].addRole(role[0]) // admin => baris
    await user[1].addRole(role[1]) // moderator => sedef
    await user[2].addRole(role[2]) // quest => artefilex
    await user[3].addRole(role[1])
    await categories[0].addBlog(blogs[0]);
    await categories[0].addBlog(blogs[1]);
    await categories[0].addBlog(blogs[2]);
    await categories[0].addBlog(blogs[3]);
    await categories[0].addBlog(blogs[4]);
    await categories[0].addBlog(blogs[5]);
    await categories[0].addBlog(blogs[6]);

    await categories[1].addBlog(blogs[2]);
    await categories[1].addBlog(blogs[3]);
    await categories[1].addBlog(blogs[0]);
    await blogs[0].addCategory(categories[1]);
    await categories[0].createBlog({
      title: "Komple Uygulamalı Web Geliştirme Eğitimi",
      url: slugField("Programlamalar içinde en güzeli "),
      subtitle:
        "Sıfırdan ileri seviyeye 'Web Geliştirme': Html, Css, Sass, Flexbox, Bootstrap, Javascript, Angular, JQuery, Asp.Net Mvc&Core Mvc",
      aciklama:
        "Web geliştirme komple bir web sitesinin hem web tasarım (html,css,javascript), hem de web programlama (asp.net mvc) konularının kullanılarak geliştirilmesidir. Sadece html css kullanarak statik bir site tasarlayabiliriz ancak işin içine bir web programlama dilini de katarsak dinamik bir web uygulaması geliştirmiş oluruz.",
      desc: "Python, son zamanların en popüler programlama dili haline geldi. Python' ın bu kadar popüler olmasındaki sebep şüphesiz öğrenmesi kolay bir yazılım dili olmasıdır.sadikturan adreslerinde paylaşmış olduğum python dersleri serisini takip ederek ister video ister yazılı kaynaklar yardımıyla kısa zamanda python programlama alanında uzmanlık kazanın ve hayal ettiğiniz projeyi gerçekleştirin.",
      image: "1.jpeg",
      main: true,
      confirmation: true,
      userId: 1
    });
  }
}

module.exports = populate;
