const express = require("express");
const router = express.Router();
const adminControler = require("../controlers/admin");
const imageUpload = require("../helpers/image-upload");

const isModerator = require("../middlewares/is_moderator");
const isAdmin = require("../middlewares/is_admin");

router.all(
  "/admin/blogs/create",
  imageUpload.upload.single("image"),
 isModerator,
  adminControler.blog_create
);
router.all("/admin/blogs/delete/:blogid",isModerator, adminControler.blog_delete);
router.all(
  "/admin/blogs/:blogid",
  imageUpload.upload.single("image"),
 isModerator,
  adminControler.blog_edit
);
router.all("/admin/blogs",isModerator, adminControler.blog_list);

router.post("/admin/category/remove", isAdmin, adminControler.category_remove);
router.all("/admin/category/create", isAdmin, adminControler.category_create);
router.all(
  "/admin/category/delete/:catid",
  isAdmin,
  adminControler.category_delete
);
router.all("/admin/category/:categoryid",  isAdmin, adminControler.category_edit);
router.all("/admin/category",  isAdmin, adminControler.category_list);

router.get("/admin/roles" ,  isAdmin, adminControler.get_roles);
router.get("/admin/roles/:roleid" ,  isAdmin, adminControler.get_roles_edit);
router.post("/admin/roles/remove" ,  isAdmin, adminControler.roles_remove);
router.post("/admin/roles/:roleid" ,  isAdmin, adminControler.post_roles_edit);

router.get("/admin/users" ,  isAdmin, adminControler.get_users);
router.get("/admin/users/:userid" ,  isAdmin, adminControler.get_users_edit);
router.post("/admin/users/:userid" ,  isAdmin, adminControler.post_users_edit);



module.exports = router;
