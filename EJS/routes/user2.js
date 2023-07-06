const express = require("express");
const router = express.Router();
const userControler = require("../controlers/user");

router.use("/blogs/category/:slug", userControler.blogs_by_category);

router.use("/blogs/:slug", userControler.blogs_details);

router.use("/blogs", userControler.blogs_list);

router.use("/", userControler.main);

module.exports = router;
