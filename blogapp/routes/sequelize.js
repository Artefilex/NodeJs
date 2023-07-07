const express = require("express");
const router = express.Router();
const adminControler = require("../controlers/admin");
const imageUpload = require("../helpers/image-upload");



router.all(
  "/admin/blogs/create",
  imageUpload.upload.single("image"),
  adminControler.blog_create
);

router.all("/admin/blogs/delete/:blogid", adminControler.blog_delete);

router.all(
  "/admin/blogs/:blogid",
  imageUpload.upload.single("image"),
  adminControler.blog_edit
);

router.all("/admin/blogs", adminControler.blog_list);



router.post("/admin/category/remove", adminControler.category_remove);
router.all("/admin/category/create", adminControler.category_create);


router.all("/admin/category/delete/:catid", adminControler.category_delete);

router.all("/admin/category/:categoryid", adminControler.category_edit);



router.all("/admin/category", adminControler.category_list);

module.exports = router;
