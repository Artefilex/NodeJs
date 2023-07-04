const express = require("express");
const router = express.Router();
const db = require("../data/sql");

router.all("/admin/blogs/create", async function (req, res) {
  if (req.method === "GET") {
    try {
      const [categories] = await db.execute("select * from categories");
      res.render("admin/blog-create", {
        title: "aloha app",
        categories: categories,
      });
    } catch (err) {
      console.log(err);
    }
  } else if (req.method === "POST") {
    try {
      const header = req.body.header;
      const desc = req.body.desc;
      const image = req.body.image;
      const category = req.body.category;
      const main = req.body.main == "on" ? 1 : 0;
      const onay = req.body.onay == "on" ? 1 : 0;
      const insertQuery = `INSERT INTO blok (baslik ,description ,image ,mainpage ,onay ,categoryid) VALUES (?,?,?,?,?,?) `;
      const values = [header, desc, image, main, onay, category];

      // console.log(values)
      await db.execute(insertQuery, values);

      res.redirect("/admin/blogs?action=create");
    } catch (err) {
      console.log(err);
    }
  }
});
router.all("/admin/blogs/delete/:blogid", async (req, res)=>{
if(req.method === "GET"){
 const blogid = req.params.blogid
 try{
  const [blogs,] = await db.execute("select * from blok where blogid =?", [blogid])
  const blog = blogs[0]
  if(blog){
    res.render("admin/blog-delete",{
        title: "delete blog",
        blog: blog
  })
  }
 }
 catch(err){

 }
}
 else if (req.method === "POST") {
        try {
          const blogid = req.body.blogid
          const updateQuery = `Delete  from blok  WHERE blogid = ?`;
          const values = [ blogid];
          await db.execute(updateQuery, values);
         
          res.redirect("/admin/blogs?action=delete")
        } catch (err) {
          console.log(err);
        }
      }

})

router.all("/admin/blogs/:blogid", async function (req, res) {
  if (req.method === "GET") {
    try {
      const blogid = req.params.blogid;
      const [blogs] = await db.execute("select * from blok where blogid =?", [
        blogid,
      ]);
      const [categories] = await db.execute("select * from categories ");
      const blog = blogs[0];
      if (blog) {
        return res.render("admin/blog-edit", {
          title: "blogs edit",
          blog: blog,
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
      const image = req.body.image;
      const category = req.body.category;
      const main = req.body.main == "on" ? 1 : 0;
      const onay = req.body.onay == "on" ? 1 : 0;
      const updateQuery = `UPDATE blok SET baslik = ?, description = ?, image = ?, mainpage = ?, onay = ?, categoryid = ? WHERE blogid = ?`;
      const values = [header, desc, image, main, onay, category, blogid];

      await db.execute(updateQuery, values);
      res.redirect("/admin/blogs?action=edit&blogid=" +blogid)
    } catch (err) {
      console.log(err);
    }
  }
});

router.all("/admin/blogs", async function (req, res) {
  if (req.method === "GET") {
    try {
      const [blogs] = await db.execute(
        "select blogid, baslik, image from blok   "
      );
      res.render("admin/blog-list", {
        title: "blog list",
        blogs: blogs,
        action:req.query.action,
        blogid: req.query.blogid
      });
    } catch (err) {
      console.log(err);
    }
  }
});

module.exports = router;
