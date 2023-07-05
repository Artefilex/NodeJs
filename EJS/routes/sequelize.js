const express = require("express");
const router = express.Router();

const imageUpload = require("../helpers/image-upload");
const fs = require("fs");
const Blog = require("../models/blog");

const Category = require("../models/category");
const { name } = require("ejs");

router.all(
  "/admin/blogs/create",
  imageUpload.upload.single("image"),
  async function (req, res) {
    if (req.method === "GET") {
      try {
        const categories = await Category.findAll();
        res.render("admin/blog-create", {
          title: "aloha app",
          categories: categories,
        });
      } catch (err) {
        console.log(err);
      }
    } else if (req.method === "POST") {
      try {
        const title = req.body.header;
        const subtitle = req.body.subtitle;
        const desc = req.body.desc;
        const image = req.file.filename;
        const category = req.body.category;
        const main = req.body.main == "on" ? 1 : 0;
        const onay = req.body.onay == "on" ? 1 : 0;

        await Blog.create({
          title: title,
          subtitle: subtitle,
          desc: desc,
          image: image,
          main: main,
          confirmation: onay,
          categoryid: category,
        });

        res.redirect("/admin/blogs?action=create");
      } catch (err) {
        console.log(err);
      }
    }
  }
);
router.all("/admin/blogs/delete/:blogid", async (req, res) => {
  if (req.method === "GET") {
    const blogid = req.params.blogid;
    try {
      const blog = await Blog.findByPk(blogid);
      if (blog) {
        res.render("admin/blog-delete", {
          title: "delete blog",
          blog: blog,
        });
      }
    } catch (err) {}
  } else if (req.method === "POST") {
    try {
      const blogid = req.body.blogid;
      const blog = await Blog.findByPk(blogid);
      if (blog) {
        await blog.destroy();
        res.redirect("/admin/blogs?action=delete");
      }
      res.redirect("/admin/blogs/");
    } catch (err) {
      console.log(err);
    }
  }
});

router.all(
  "/admin/blogs/:blogid",
  imageUpload.upload.single("image"),
  async function (req, res) {
    if (req.method === "GET") {
      try {
        const blogid = req.params.blogid;
        const blog = await Blog.findByPk(blogid);

        const categories = await Category.findAll();

        if (blog) {
          return res.render("admin/blog-edit", {
            title: "blogs edit",
            blog: blog.dataValues,
            categories: categories,
          });
        }
        res.redirect("admin/blogs");
      } catch (err) {
        console.log(err);
      }
    } else if (req.method === "POST") {
      try {
        const blogid = req.body.blogid;
        const header = req.body.header;
        const desc = req.body.desc;
        let image = req.body.image;
        if (req.file) {
          image = req.file.filename;
          fs.unlink("./public/images/" + req.body.image, (err) => {
            console.log(err);
            // fs modülü kullanarak eski dosya yolunu sildik req.body.image gelen uzantı ile
          });
        }
        const subtitle = req.body.subtitle;
        const category = req.body.category;
        const main = req.body.main == "on" ? 1 : 0;
        const onay = req.body.onay == "on" ? 1 : 0;
        const blog = await Blog.findByPk(blogid);

        if (blogid) {
          (blog.title = header),
            (blog.subtitle = subtitle),
            (blog.desc = desc),
            (blog.image = image),
            (blog.main = main),
            (blog.confirmation = onay),
            (blog.categoryid = category);
          await blog.save();
          return res.redirect("/admin/blogs?action=edit&blogid=" + blogid);
        }
        res.redirect("/admin/blogs");
      } catch (err) {
        console.log(err);
      }
    }
  }
);

router.all("/admin/blogs", async function (req, res) {
  if (req.method === "GET") {
    try {
      const blogs = await Blog.findAll({
        attributes: ["blogid", "title", "image"],
      });
      console.log(blogs);
      res.render("admin/blog-list", {
        title: "blog list",
        blogs: blogs,
        action: req.query.action,
        blogid: req.query.blogid,
      });
    } catch (err) {
      console.log(err);
    }
  }
});

router.all("/admin/category/create", async function (req, res) {
  if (req.method === "GET") {
    try {
      res.render("admin/category-create", {
        title: "add category",
      });
    } catch (err) {
      console.log(err);
    }
  } else if (req.method === "POST") {
    try {
      const name = req.body.catname;

      await Category.create({ name: name });
      res.redirect("admin/category?action=create");
    } catch (err) {
      console.log(err);
    }
  }
});

router.all("/admin/category/delete/:catid", async (req, res) => {
  if (req.method === "GET") {
    const catid = req.params.catid;
    try {
      const category = await Category.findByPk(catid);

      if (category) {
        res.render("admin/category-delete", {
          title: "delete blog",
          category: category,
        });
      }
    } catch (err) {}
  } else if (req.method === "POST") {
    try {
      const catid = req.body.catid;
      await Category.destroy({
        where: {
          categoryid: catid,
        },
      });

      res.redirect("/admin/category?action=delete");
    } catch (err) {
      console.log(err);
    }
  }
});

router.all("/admin/category/:categoryid", async function (req, res) {
  if (req.method === "GET") {
    try {
      const catid = req.params.categoryid;

      const category = await Category.findByPk(catid);

      if (category) {
        return res.render("admin/category-edit", {
          title: "category edit",
          category: category.dataValues,
        });
      }
      res.redirect("admin/category");
    } catch (err) {
      console.log(err);
    }
  } else if (req.method === "POST") {
    try {
      const catid = req.body.categoryid;
      const header = req.body.categoryname;
      await Category.update(
        { name: header },
        {
          where: {
            categoryid: catid,
          },
        }
      );

      return res.redirect("admin/category?action=edit&catid= " + catid);
    } catch (err) {
      console.log(err);
    }
  }
});

router.all("/admin/category", async function (req, res) {
  if (req.method === "GET") {
    try {
      const categories = await Category.findAll();
      console.log(categories);

      res.render("admin/category-list", {
        title: "category list",
        categories: categories,
        action: req.query.action,
        catid: req.query.catid,
      });
    } catch (err) {
      console.log(err);
    }
  }
});

module.exports = router;
