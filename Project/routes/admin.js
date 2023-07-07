const db = require("../db/sql");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/image"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.basename(file.originalname);
    const fileRoute = file.fieldname + "-" + uniqueSuffix + extension;
    cb(null, fileRoute);
  },
});

const upload = multer({ storage: storage });

const admin = (req, res, next) => {
  if (req.session.isAdmin) {
    next();
  } else {
    res.redirect("/");
  }
};

router.delete("/blogs/:blogId", async (req, res) => {
  try {
    const blogId = req.params.blogId;

    // MySQL sorgusuyla ilgili blogun silinmesi
    const deleteQuery = "DELETE FROM blogs WHERE blogid = ?";
    await db.execute(deleteQuery, [blogId]);

    // Başarılı yanıt dönme
    res.sendStatus(200);
  } catch (error) {
    console.error("Blog silinirken bir hata oluştu:", error);
    // Hata yanıtı dönme
    res.sendStatus(500);
  }
});

router.use("/blogs/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const [blog] = await db.execute("select * from blogs where blogid=?", [id]);
    const [blogs] = await db.execute(
      "SELECT * FROM blogs WHERE blogid != ? ORDER BY RAND() LIMIT 7",
      [id]
    );
    const [nav] = await db.execute("SELECT * FROM nav");
    const [contact] = await db.execute("SELECT * FROM contact");

    const selectedBlog = blog[0];
    if (blog) {
      return res.render("user/blog-details", {
        blog: selectedBlog,
        nav: nav,
        contact: contact,
        req: req,
        blogs: blogs,
        isAdmin: req.session.isAdmin || false,
        isUser: req.session.isUser || false,
      });
    }

    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

router.use("/blogs", async (req, res) => {
  try {
    const [blogs] = await db.execute("SELECT * FROM blogs where blog = 1");
    const [nav] = await db.execute("SELECT * FROM nav");
    const [contact] = await db.execute("SELECT * FROM contact");

    res.render("user/blogs", {
      title: "Our  Users",
      blogs: blogs,
      nav: nav,
      req: req,
      contact: contact,
      isAdmin: req.session.isAdmin || false,
      isUser: req.session.isUser || false,
    });
  } catch (err) {
    console.log(err);
  }
});
router.all("/admin/create",
  admin,
  upload.single("createImg"),
  async (req, res) => {
    if (req.method === "GET") {
      // GET isteği işleme
      const [nav] = await db.execute("SELECT * FROM nav");
      const [contact] = await db.execute("SELECT * FROM contact");
      const [blogs] = await db.execute("SELECT * FROM blogs");

      res.render("admin/create-blogs", {
        nav: nav,
        contact: contact,
        blogs: blogs,
        isAdmin: req.session.isAdmin || false,
        isUser: req.session.isUser || false,
      });
    } else if (req.method === "POST") {
      // POST isteği işleme
      try {
        // Form verilerini alın
        const createTitle = req.body.createTitle;
        const createDescr = req.body.createDesc;
        const createMain = req.body.createMain === "on" || false;
        const createBlog = req.body.createBlog === "on" || false;
        const createImg = path.basename(req.file.filename);

        // SQL sorgusu ve değerleri
        const insertQuery = `INSERT INTO blogs (title, descr, main, blog, image) VALUES (?, ?, ?, ?, ?)`;
        const values = [
          createTitle,
          createDescr,
          createMain,
          createBlog,
          createImg,
        ];

        // Veritabanına ekleme işlemi
        await db.execute(insertQuery, values);
        res.redirect("/admin/create");
      } catch (err) {
        console.log("Veritabanına ekleme hatası: ", err);
        res.status(500).send("Internal Server Error");
      }
    }
  }
);

router.get("/admin/dashboard", admin, async (req, res) => {
  const [nav] = await db.execute("Select * From nav");
  const [blogs] = await db.execute("Select * From blogs");
  const [users] = await db.execute(
    "SELECT * FROM userinfo WHERE username != 'admin'"
  );
  const [contact] = await db.execute("Select * From  contact");
  res.render("admin/dashbord", {
    nav: nav,
    blogs: blogs,
    users: users,
    contact: contact,
    isAdmin: req.session.isAdmin || false,
    isUser: req.session.isUser || false,
  });
});

module.exports = router;
