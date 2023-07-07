const Blog = require("../models/blog");
const Category = require("../models/category");
const fs = require("fs");
const { Op } = require("sequelize");
const db = require("../data/sql");
const slugfield = require("../helpers/slugfield");

exports.blog_create = async function (req, res) {
  if (req.method === "GET") {
    try {
      const categories = await Category.findAll();
      res.render("admin/blog-create", {
        title: "create app",
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
     
      const main = req.body.main == "on" ? 1 : 0;
      const onay = req.body.onay == "on" ? 1 : 0;

      await Blog.create({
        title: title,
        url: slugfield(title),
        subtitle: subtitle,
        desc: desc,
        image: image,
        main: main,
        confirmation: onay 
      });

      res.redirect("/admin/blogs?action=create");
    } catch (err) {
      console.log(err);
      res.status(500).send("An error occurred" + err);
    }
  }
};

exports.blog_delete = async (req, res) => {
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
      res.status(500).send("An error occurred" + err);
    }
  }
};

exports.blog_edit = async function (req, res) {
  if (req.method === "GET") {
    const blogid = req.params.blogid;
    try {
      const blog = await Blog.findOne({
        where: {
          id: blogid,
        },
        include: {
          model: Category,
          attributes: ["id"],
        },
      });
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
    const blogid = req.body.blogid;
    const header = req.body.header;
    const subtitle = req.body.subtitle;
    const desc = req.body.desc;
    const main = req.body.main == "on" ? 1 : 0;
    const onay = req.body.onay == "on" ? 1 : 0;
    const categorieIds = req.body.catagories;
    const url = req.body.url;
    let image = req.body.image;
    if (req.file) {
      image = req.file.filename;
      fs.unlink("./public/images/" + req.body.image, (err) => {
  });
    }

    try {
      const blog = await Blog.findOne({
        where: {
          id: blogid,
        },
        include: {
          model: Category,
          attributes: ["id"],
        },
      });
      if (blog) {
        blog.title = header;
        blog.subtitle = subtitle;
        
        blog.desc = desc;
        blog.image = image;
        blog.main = main;
        blog.url =slugfield( url);
        blog.confirmation = onay;
        console.log(categorieIds);
        if (categorieIds == undefined) {
          await blog.removeCategories(blog.categories);
        } else {
          await blog.removeCategories(blog.categories);
          const selectedCategories = await Category.findAll({
            where: {
              id: {
                [Op.in]: categorieIds,
              },
            },
          });
          await blog.addCategories(selectedCategories);
        }

        await blog.save();
        return res.redirect("/admin/blogs?action=edit&blogid=" + blogid);
      }
      res.redirect("/admin/blogs");
    } catch (err) {
      console.log(err);
      res.status(500).send("An error occurred" + err);
    }
  }
};

exports.blog_list = async function (req, res) {
  if (req.method === "GET") {
    try {
      const blogs = await Blog.findAll({
        attributes: ["id", "title", "image"],
        include: {
          model: Category,
          attributes: ["name"],
        },
      });
      
      res.render("admin/blog-list", {
        title: "blog list",
        blogs: blogs,
        action: req.query.action,
        blogid: req.query.blogid,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("An error occurred" + err);
    }
  }
};



exports.category_remove = async function (req, res) {
     const blogid = req.body.blogid;
     const catid = req.body.categoryid;

    await db.query(
      `delete from blogcategories where blogId =${blogid} and categoryId=${catid}`
    );
    res.redirect("/admin/category/" + catid);
  
   
};

exports.category_create = async function (req, res) {
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
      res.status(500).send("An error occurred" + err);
    }
  }
};


exports.category_delete = async (req, res) => {
  if (req.method === "GET") {
    const catid = req.params.catid;
    try {
      const category = await Category.findByPk(catid);

      res.render("admin/category-delete", {
        title: "delete blog",
        category: category,
      });
    } catch (err) {
      console.log(err);
    }
  } else if (req.method === "POST") {
    const catid = req.body.categoryid;
    try {
      await Category.destroy({
        where: {
          id: catid,
        },
      });

      res.redirect("/admin/category?action=delete");
    } catch (err) {
      console.log(err);
      res.status(500).send("An error occurred" + err);
    }
  }
};

exports.category_edit = async function (req, res) {
  if (req.method === "GET") {
    const catid = req.params.categoryid;
    try {
      const category = await Category.findByPk(catid);
      const blogs = await category.getBlogs();
      if (category) {
        return res.render("admin/category-edit", {
          title: "category edit",
          category: category.dataValues,
          blogs: blogs,
          action: req.query.action,
          categoryid: req.query.categoryid,
        });
      }
      res.redirect("admin/category");
    } catch (err) {
      console.log(err);
    }
  } else if (req.method === "POST") {
    try {
      const catid = req.body.categoryid;
      const header = req.body.name;
      await Category.update(
        { name: header },
        {
          where: {
            id: catid,
          },
        }
      );

      return res.redirect("admin/category?action=edit&catid= " + catid);
    } catch (err) {
      console.log(err);
      res.status(500).send("An error occurred");
    }
  }
};

exports.category_list = async function (req, res) {
  if (req.method === "GET") {
    try {
      const categories = await Category.findAll();
      res.render("admin/category-list", {
        title: "category list",
        categories: categories,
        action: req.query.action,
        blogid: req.query.blogid,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("An error occurred");
    }
  }
};
