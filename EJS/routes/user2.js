const express = require("express");
const router = express.Router();
const userControler = require("../controlers/user");

router.get("/blogs/category/:slug", userControler.blogs_list);

router.get("/blogs/:slug", userControler.blogs_details);

router.get("/blogs", userControler.blogs_list);

router.get("/", userControler.main);

module.exports = router;
