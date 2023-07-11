const express = require("express");
const app = express();
const homeRouter = require("./routes/home")
const productRouter = require("./routes/products")
const cors = require("cors")
// http methods get, post put delete
app.use(express.json());

// app.use((req, res, next)=>{
//    res.setHeader("Access-Control-Allow-Origin","*"); 
//    //client tarafından gelen fetc requestden Cors hatası almamak için headerı set ettik tüm sayfaalrdan gelen istekler erişembilecek

//    res.setHeader("Acces-Control-Allow-Methods", "GET POST")
// //    clienten gelen sayfalar hem post hem  get talebinde bulunabilecek ilgili api üzerinden 
//    next()
// })
app.use(cors({
    origin: "*", // dizi göndericeksen ["ab.com", "bcd.com"],
    methods:["GET", "POST"]

}))
app.use(homeRouter)
app.use("/api/product", productRouter)

app.listen(3000, () => {
  console.log("listing on port 3000");
});
