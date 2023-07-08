const express = require("express");
const router = express.Router();
const adminControler = require("../controlers/admin");
const imageUpload = require("../helpers/image-upload");
const isAuth = require("../middlewares/auth")


router.all(
  "/admin/blogs/create",
  imageUpload.upload.single("image"),
  isAuth ,
  adminControler.blog_create
);

router.all("/admin/blogs/delete/:blogid", isAuth , adminControler.blog_delete);

router.all(
  "/admin/blogs/:blogid",
  imageUpload.upload.single("image"),
  isAuth ,
  adminControler.blog_edit
);

router.all("/admin/blogs",  isAuth , adminControler.blog_list);



router.post("/admin/category/remove",  isAuth , adminControler.category_remove);
router.all("/admin/category/create",  isAuth , adminControler.category_create);


router.all("/admin/category/delete/:catid",  isAuth , adminControler.category_delete);

router.all("/admin/category/:categoryid",  isAuth , adminControler.category_edit);



router.all("/admin/category",  isAuth , adminControler.category_list);

module.exports = router;
