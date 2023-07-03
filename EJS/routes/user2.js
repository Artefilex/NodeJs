const express = require("express");
const router = express.Router();
const db = require("../data/sql");



router.use("/blogs/category/:categoryid", async function(req, res) {
  const id = req.params.categoryid;
  try {
      const [blogs, ] = await db.execute("select * from blok where categoryid=?", [id]); 
      const [categories, ] = await db.execute("select * from categories");

      res.render("users/blogs", {
          title: "Tüm Kurslar",
          blogs: blogs,
          categories: categories,
          selectedCategory: id
      })
  }
  catch(err) {
      console.log(err);
  }
});



router.use("/blogs/:blogid", async function (req, res) {
  const id = req.params.blogid;
  try {
    const [blogs,] = await db.execute("select * from blok where blogid=?", [id]);
    if (blogs[0]) {
      return res.render("users/blog-details", {
        title: blogs[0].title,
        blog: blogs[0],
      });
    }
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

router.use("/blogs", async function (req, res) {
  try {
    const [blogs] = await db.execute("select * from blok where onay = 1");
    const [categories] = await db.execute("select * from categories");
    res.render("users/blogs", {
      title: " blogs app",
      categories: categories,
      blogs: blogs,
      selectedCategory: null
    });
  } catch (err) {
    console.log(err);
  }
});

router.use("/", async function (req, res) {
  try {
    const [blogs] = await db.query(
      "select * from blok where onay = 1 and  mainpage = 1 "
    );
    const [categories] = await db.execute("select * from categories");
    res.render("users/blogs", {
      title: " blogs app",
      categories: categories,
      blogs: blogs,
      selectedCategory: null
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
