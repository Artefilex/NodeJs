const express = require("express");
const router = express.Router();
const adminControler = require("../controlers/admin");
const imageUpload = require("../helpers/image-upload");
const isAuth = require("../middlewares/auth");

router.all(
  "/admin/blogs/create",
  imageUpload.upload.single("image"),
  isAuth,
  adminControler.blog_create
);
router.all("/admin/blogs/delete/:blogid", isAuth, adminControler.blog_delete);
router.all(
  "/admin/blogs/:blogid",
  imageUpload.upload.single("image"),
  isAuth,
  adminControler.blog_edit
);
router.all("/admin/blogs", isAuth, adminControler.blog_list);

router.post("/admin/category/remove", isAuth, adminControler.category_remove);
router.all("/admin/category/create", isAuth, adminControler.category_create);
router.all(
  "/admin/category/delete/:catid",
  isAuth,
  adminControler.category_delete
);
router.all("/admin/category/:categoryid", isAuth, adminControler.category_edit);
router.all("/admin/category", isAuth, adminControler.category_list);

router.get("/admin/roles" , isAuth, adminControler.get_roles);
router.get("/admin/roles/:roleid" , isAuth, adminControler.get_roles_edit);
router.post("/admin/roles/remove" , isAuth, adminControler.roles_remove);
router.post("/admin/roles/:roleid" , isAuth, adminControler.post_roles_edit);

router.get("/admin/users" , isAuth, adminControler.get_users);
router.get("/admin/users/:userid" , isAuth, adminControler.get_users_edit);
router.post("/admin/users/:userid" , isAuth, adminControler.post_users_edit);



module.exports = router;
