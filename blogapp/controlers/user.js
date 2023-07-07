const Blog = require("../models/blog");
const Category = require("../models/category");
const { Op } = require("sequelize");

exports.blogs_details = async function (req, res) {
  const slug = req.params.slug;
  try {
    const blog = await Blog.findOne({
      where: {
        url: slug,
      },
      raw: true,
    });
    if (blog) {
      return res.render("users/blog-details", {
        title: blog.title,
        blog: blog,
      });
    }
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

exports.blogs_list = async function (req, res) {
  const size = 2;
  const { page = 0 } = req.query;
  const slug = req.params.slug;

  try {
    const { rows, count } = await Blog.findAndCountAll({
      where: { confirmation: true },
      include: slug ? { model: Category, where: { url: slug } } : null,
      raw: true,
      limit: size,
      offset: page * size,
    });

    const categories = await Category.findAll();
    res.render("users/blogs", {
      title: " blogs app",
      categories: categories,
      blogs: rows,
      totalItems: count,
      totalPages: Math.ceil(count / size),
      currentPage: page,
      selectedCategory: slug,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.main = async function (req, res) {
  try {
    const blogs = await Blog.findAll({
      where: {
        [Op.and]: [
          { confirmation: true },
          {
            main: true,
          },
        ],
      },

      raw: true,
    });
    const categories = await Category.findAll({
      raw: true,
    });
    res.render("users/index", {
      title: " blogs app",
      categories: categories,
      blogs: blogs,
      selectedCategory: null,
    });
  } catch (err) {
    console.log(err);
  }
};
