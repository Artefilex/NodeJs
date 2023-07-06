const Blog = require("../models/blog")
const Category = require("../models/category")
const {Op} = require("sequelize");

exports.blogs_by_category = async function(req, res) {
    const id = req.params.categoryid;
    try {
        const blogs = await Blog.findAll({
          where:{
       
            confirmation:true
          },
          include:{
            model: Category,
            where: {id: id}
          },
          
          raw:true
        })  
        const categories = await Category.findAll()
  console.log(blogs)
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
  }

exports.blogs_details = async function (req, res) {
    const id = req.params.blogid;
    try {
      const blog = await Blog.findByPk(id)  
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
  }

exports.blogs= async function (req, res) {
    try {
      const blogs = await Blog.findAll({
        where:{
          confirmation: true
        },
        raw: true
      });
      console.log(blogs)
      const categories = await Category.findAll()
      res.render("users/blogs", {
        title: " blogs app",
        categories: categories,
        blogs: blogs,
        selectedCategory: null
      });
    } catch (err) {
      console.log(err);
    }
  }  

exports.main = async function (req, res) {
    try {
      const blogs = await Blog.findAll({
        where:{
          [Op.and]: [{confirmation: true},{
            main: true}]
        },
       
        raw: true
      }
    
      );  console.log(blogs)
      const categories = await Category.findAll({
        raw: true    
      })
      res.render("users/blogs", {
        title: " blogs app",
        categories: categories,
        blogs: blogs,
        selectedCategory: null
      });
    } catch (err) {
      console.log(err);
    }
  }  