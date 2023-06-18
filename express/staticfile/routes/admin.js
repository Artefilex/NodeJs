const express = require("express")
const path = require("path")
const route = express.Router()


route.use( "/blog/create" ,(req ,res) =>{
   res.sendFile(path.join(__dirname, "../views/admin", "blog-create.html"))
})
route.use( "/blog/:blogid" ,(req ,res) =>{
    res.sendFile(path.join(__dirname, "../views/admin", "blog-edit.html"))
 })
route.use("/blog", (req, res)=>{
   res.sendFile(path.join(__dirname, "../views/admin", "blog-list.html" ))
})


//  sıralama her zaman önemli unutma 




module.exports = route