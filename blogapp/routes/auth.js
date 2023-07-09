const express = require("express")
const router = express.Router()
const authControler = require("../controlers/auth")


router.get("/register", authControler.get_register)

router.post("/register", authControler.post_register)
router.get("/login", authControler.get_login)


router.get("/reset-password",authControler.get_reset)
router.post("/reset-password",authControler.post_reset)


 router.get("/new-password/:token" ,authControler.get_newpassword)
 router.post("/new-password",authControler.post_newpassword)
router.post("/login",authControler.post_login)

router.get("/logout", authControler.get_logout)


module.exports = router