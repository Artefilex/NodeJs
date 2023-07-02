const express = require("express")
const db = require("../db/sql");
const register = require("./register");
const login = require("./login");
const router = express.Router() 

router.use("/blogs/:id", async ( req,res) =>{
  const id = req.params.id;
  try{
   
    const [blog,] = await db.execute("select * from blogs where blogid=?", [id])  
    const [blogs,] = await db.execute("SELECT * FROM blogs WHERE blogid != ? ORDER BY RAND() LIMIT 7", [id]);
    const [nav,] = await db.execute("SELECT * FROM nav")
    const [contact, ] = await db.execute("SELECT * FROM contact")
 
    
   const selectedBlog = blog[0]
    if(blog){
     return res.render("user/blog-details",{
       blog:selectedBlog,
       nav:nav,
       contact:contact,
       req: req,
       blogs: blogs,
       isAdmin: req.session.isAdmin || false,
       isUser:  req.session.isUser || false
     })
    }
    
    res.redirect("/")
  }
  catch (err){
   console.log(err)
  }
})

router.use("/blogs", async (req,res) =>{
  try{
    const [blogs,] = await db.execute("SELECT * FROM blogs where blog = 1");
    const [nav,] = await db.execute("SELECT * FROM nav")
    const [contact, ] = await db.execute("SELECT * FROM contact")
    
   res.render("user/blogs",{
    title: "Our  Users",
    blogs: blogs,
    nav:nav,
    req:req,
    contact:contact,
    isAdmin: req.session.isAdmin || false,
    isUser:  req.session.isUser || false
   })  
  }
  catch (err) {
   console.log(err)
  }
} )

router.use("/about" , async (req, res) =>{
  try{
    const [nav, ] = await db.execute("select * from nav")
    const [contact, ] = await db.execute("select * from contact ")
    const [about, ] = await db.execute("select * from about")

     res.render("user/about",{
      nav:nav,
      contact: contact,
      req:req,
      about: about,
      isAdmin: req.session.isAdmin || false,
      isUser:  req.session.isUser || false
     })
  }
  catch(err){
    console.log(err)
  }

})
router.get("/login",async (req, res) => {
 try{
  const [nav,] = await db.execute("Select * From nav")
  const [contact,] = await db.execute("Select * From contact")
 
  res.render("user/login",{
    nav:nav,
    contact:contact,
    isAdmin: req.session.isAdmin || false,
    isUser:  req.session.isUser || false
  })  
 }
 catch (err){
  console.log(err)
 }
} )
router.post("/login", login)

router.get("/join", async(req,res)=>{
  try {
    const [nav,] = await db.execute("SELECT * FROM nav");
   const [contact,] = await db.execute("Select * From  contact")
  
    res.render("user/join", {
      title: "Blogs and Navbar",
      nav: nav,
      contact: contact,
      isAdmin: req.session.isAdmin || false,
      isUser:  req.session.isUser || false
    });
  
  } catch (err) {
    console.error("Veritabanına ekleme hatası: ", err);
    res.send("Kayıt işlemi sırasında bir hata oluştu.");
  }


} )
router.post("/join", register )


router.get("/", async (req, res) => {
  try {
    const [blogs,] = await db.execute("SELECT * FROM blogs ORDER BY RAND() LIMIT 6");
    const [nav,] = await db.execute("SELECT * FROM nav");
    const [contact, ] = await db.execute("SELECT * FROM contact");

    res.render("user/index", {
      title: "Blogs and Navbar",
      blogs: blogs,
      nav: nav,
      req: req,
      contact: contact,
      isAdmin: req.session.isAdmin || false,
      isUser:  req.session.isUser || false
    });
  } catch (err) {
    console.log(err);
  }
});





module.exports = router