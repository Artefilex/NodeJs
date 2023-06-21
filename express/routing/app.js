const express = require("express")

const app = express()

// routing yaparken en özelden en genel routa gideriz 
// mesela sırala / /blog /blog/5 degil tam tersi bir şekilde /blog/5 /blog / 
// olacak sekilde ilerler yoksa ilk dönen response takılı kalır sürekli anasayfa gelir 
 

app.use( "/blogs/:blogid/users/:username", (req ,res) =>{
    console.log(req.params)  // obje döner :blogid degerini ve :usernmae degerini döner 
    console.log(req.params.blogid)
    console.log(req.params.username)
    res.send("blog listesi 5.sayfa")
 })


app.use( "/blogs/:blogid", (req ,res) =>{
    console.log(req.params)  // :blogid degerini döner 
    res.send("blog listesi 5.sayfa")
 })
 app.use( "/blogs", (req ,res) =>{
    res.send("blog listesi ")
 })

app.use( "/", (req ,res) =>{
 res.send("anasayfa")
})

app.listen(3000, ()=>{
    console.log("liste on port 3000")
})