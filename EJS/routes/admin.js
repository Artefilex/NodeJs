const express = require("express");
const router = express.Router();
const db = require("../data/sql");
const imageUpload = require("../helpers/image-upload")
const fs = require("fs")
router.all("/admin/blogs/create", imageUpload.upload.single("image"), async function (req, res) {
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
  } else if (req.method === "POST" ) {
    try {
      const header = req.body.header;
      const desc = req.body.desc;
      const image = req.file.filename;
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

router.all("/admin/blogs/:blogid",  imageUpload.upload.single("image"), async function (req, res) {
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
      let image = req.body.image;
      if(req.file){
        image = req.file.filename;
        fs.unlink("./public/images/" + req.body.image, err =>{
          console.log(err)
          // fs modülü kullanarak eski dosya yolunu sildik req.body.image gelen uzantı ile 
        });
      }
     
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
      const header = req.body.catname;
      const insertQuery = `INSERT INTO categories (catname) VALUES (?) `;
      const values = [header];
      await db.execute(insertQuery, values);
      res.redirect("admin/category?action=create");
    } catch (err) {
      console.log(err);
    }
  }
});

router.all("/admin/category/delete/:catid", async (req, res)=>{
  if(req.method === "GET"){
   const catid = req.params.catid
   try{
    const [categories,] = await db.execute("select * from categories where catid =?", [catid])
    const category = categories[0]
    if(category){
      res.render("admin/category-delete",{
          title: "delete blog",
          category:category
    })
    }
   }
   catch(err){
  
   }
  }
   else if (req.method === "POST") {
          try {
            const catid = req.body.catid
            const updateQuery = `Delete  from categories  WHERE catid = ?`;
            const values = [ catid];
            await db.execute(updateQuery, values);
           
            res.redirect("/admin/category?action=delete")
          } catch (err) {
            console.log(err);
          }
        }
  
  })


router.all("/admin/category/:catid", async function (req, res) {
  if (req.method === "GET") {
    try {
      const catid= req.params.catid;
      const [categories] = await db.execute("select * from categories where catid =?", [
        catid,
      ]);
      const category = categories[0];
      if (category) {
        return res.render("admin/category-edit", {
          title: "blogs edit",
         category: category,
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
  
      const updateQuery = `UPDATE categories SET catname = ?  WHERE catid = ?`;
      const values = [header, catid];

      await db.execute(updateQuery, values);
      res.redirect("admin/category?action=edit&catid= " +catid)
    } catch (err) {
      console.log(err);
    }
  }
});





router.all("/admin/category", async function (req, res) {
  if (req.method === "GET") {
    try {
      const [categories,] = await db.execute(
        "select * from categories "
      );
      res.render("admin/category-list", {
        title: "category list",
        categories:categories,
        action:req.query.action,
        catid: req.query.catid
      });
    } catch (err) {
      console.log(err);
    }
  }
});

module.exports = router;
