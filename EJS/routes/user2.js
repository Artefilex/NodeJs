const express = require("express");
const router = express.Router();
const userControler = require("../controlers/user");

router.use("/blogs/category/:categoryid", userControler.blogs_by_category);

router.use("/blogs/:blogid", userControler.blogs_details);

router.use("/blogs", userControler.blogs);

router.use("/", userControler.main);

module.exports = router;
