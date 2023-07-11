const Blog = require("../models/blog");
const Category = require("../models/category");
const Role = require("../models/role");
const User = require("../models/user");
const fs = require("fs");
const { Op } = require("sequelize");
const db = require("../data/sql");
const slugfield = require("../helpers/slugfield");
const sequelize = require("../data/sql");

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
      let image = "";
      const userid = req.session.userid;
      const main = req.body.main == "on" ? 1 : 0;
      const onay = req.body.onay == "on" ? 1 : 0;

      if(title== ""){
        throw new Error("title is not empty")
      }
      if(title.length < 5 || title.length > 30){
        throw new Error("title is must be between 5 and 30 ")
      }
      if(req.file){
          image =  req.file.filename;
          fs.unlink("./public/images" +  req.body.image,err =>{
            console.log(err)
          })
       }


      await Blog.create({
        title: title,
        url: slugfield(title),
        subtitle: subtitle,
        desc: desc,
        image: image,
        main: main,
        confirmation: onay,
        userId: userid,
      });

      res.redirect("/admin/blogs?action=create");
    } catch (err) {
      console.log(err);
      let danger = ""
      if(err instanceof Error) {
        danger += err.message
        res.render("admin/blog-create", {
          title: "create app",
          categories:await Category.findAll(),
          message: {text: danger , class: "danger"},
         
        });
      }
    }
  }
};

exports.blog_delete = async (req, res) => {
  if (req.method === "GET") {
    const blogid = req.params.blogid;
    const userid = req.session.userid;
    const isAdmin = req.session.roles.includes("admin");
    try {
      const blog = await Blog.findOne({
        where: isAdmin ? { id: blogid } : { id: blogid, userId: userid },
      });
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
      // res.redirect("/admin/blogs/");
    } catch (err) {
      console.log(err);
      res.status(500).send("An error occurred" + err);
    }
  }
};

exports.blog_edit = async function (req, res) {
  if (req.method === "GET") {
    const userid = req.session.userid;
    const blogid = req.params.blogid;
    const isAdmin = req.session.roles.includes("admin");
    try {
      const blog = await Blog.findOne({
        where: isAdmin ? { id: blogid } : { id: blogid, userId: userid },
        include: {
          model: Category,
          attributes: ["id"],
        },
      });
      const categories = await Category.findAll();
     
      if (blog) {
        return res.render("admin/blog-edit", {
          title: "blogs edit",
          blog: blog,
          categories: categories,
        });
      }
      res.redirect("/admin/blogs");
    } catch (err) {
      console.log(err);
    }
  } else if (req.method === "POST") {
    const isAdmin = req.session.roles.includes("admin");
    const blogid = req.body.blogid;
    const header = req.body.header;
    const subtitle = req.body.subtitle;
    const desc = req.body.desc;
    const main = req.body.main == "on" ? 1 : 0;
    const onay = req.body.onay == "on" ? 1 : 0;
    const categorieIds = req.body.catagories;
    const url = req.body.url;
    const userid = req.session.userid;
    let image = req.body.image;
    if (req.file) {
      image = req.file.filename;
      fs.unlink("./public/images/" + req.body.image, (err) => {});
    }

    try {
      const blog = await Blog.findOne({
        where: isAdmin ? { id: blogid } : { id: blogid, userId: userid },
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
        blog.url = slugfield(url);
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
      // res.redirect("/admin/blogs");
    } catch (err) {
      console.log(err);
      res.status(500).send("An error occurred" + err);
    }
  }
};

exports.blog_list = async function (req, res) {
  if (req.method === "GET") {
    const userid = req.session.userid;
    const isModerator = req.session.roles.includes("moderator");
    const isAdmin = req.session.roles.includes("admin");
    try {
      const blogs = await Blog.findAll({
        attributes: ["id", "title", "image"],
        include: {
          model: Category,
          attributes: ["name"],
        },
        where: isModerator && !isAdmin ? { userId: userid } : null,
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

exports.get_roles = async function (req, res) {
  try {
    const roles = await Role.findAll({
      attributes: {
        include: [
          "role.id",
          "role.rolename",
          [sequelize.fn("COUNT", sequelize.col("users.id")), "user_count"],
        ],
      },
      include: [{ model: User, attributes: ["id"] }],
      group: ["role.id"],
      raw: true,
      includeIgnoreAttributes: false,
    });

    res.render("admin/role-list", {
      title: "role list",
      roles: roles,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred");
  }
};

exports.get_roles_edit = async function (req, res) {
  const id = req.params.roleid;
  try {
    const role = await Role.findByPk(id);
    const users = await role.getUsers();
    if (role) {
      return res.render("admin/role-edit", {
        title: role.rolename,
        role: role,
        users: users,
      });
    }

    res.redirect("admin/roles");
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred");
  }
};
exports.post_roles_edit = async function (req, res) {
  const roleid = req.body.roleid;
  const rolename = req.body.rolename;
  try {
    await Role.update(
      { rolename: rolename },
      {
        where: {
          id: roleid,
        },
      }
    );
    return res.redirect("/admin/roles");
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred");
  }
};

exports.roles_remove = async function (req, res) {
  const roleid = req.body.roleid;
  const userid = req.body.userid;
  try {
    await sequelize.query(
      `delete from roleUsers  where userId= ${userid} and roleId= ${roleid}  `
    );
    return res.redirect("/admin/roles/" + roleid);
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred");
  }
};

exports.get_users = async function (req, res) {
  try {
    const users = await User.findAll({
      attributes: ["id", "fullname", "email"],
      include: {
        model: Role,
        attributes: ["rolename"],
      },
    });
    res.render("admin/user-list", {
      title: "users list ",
      users: users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred");
  }
};
exports.get_users_edit = async function (req, res) {
  const userid = req.params.userid;
  try {
    const user = await User.findOne({
      where: { id: userid },
      include: { model: Role, attributes: ["id"] },
    });
    const roles = await Role.findAll();

    res.render("admin/user-edit", {
      title: "users list ",
      user: user,
      roles: roles,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred");
  }
};

exports.post_users_edit = async function (req, res) {
  const userid = req.params.userid;
  const fullname = req.body.fullname;
  const email = req.body.email;
  const roleIds = req.body.roles;

  // console.log(req.body)
  try {
    const user = await User.findOne({
      where: { id: userid },
      include: { model: Role, attributes: ["id"] },
    });
    if (user) {
      (user.fullname = fullname), (user.email = email);
      if (roleIds == undefined) {
        await user.removeRoles(user.roles);
      } else {
        await user.removeRoles(user.roles);
        const selectedRoles = await Role.findAll({
          where: {
            id: {
              [Op.in]: roleIds,
            },
          },
        });
        await user.addRoles(selectedRoles);
      }
      await user.save();
      return res.redirect("/admin/users");
    }
    return res.redirect("/admin/users");
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred");
  }
};
