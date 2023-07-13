const express = require("express");
const app = express();
const config = require("config")
const cors = require("cors");
const mongoose = require("mongoose");
const connectDb = require("./config");
const categoryRouter = require("./routes/categories");
const error = require("./middleware/error")
const userRouter = require("./routes/user")
const homeRouter = require("./routes/home");
const productRouter = require("./routes/products");

// http methods get, post put delete
app.use(express.json());

// app.use((req, res, next)=>{
//    res.setHeader("Access-Control-Allow-Origin","*");
//    //client tarafından gelen fetc requestden Cors hatası almamak için headerı set ettik tüm sayfaalrdan gelen istekler erişembilecek

//    res.setHeader("Acces-Control-Allow-Methods", "GET POST")
// //    clienten gelen sayfalar hem post hem  get talebinde bulunabilecek ilgili api üzerinden
//    next()
// })
app.use(
  cors({
    origin: "*", // dizi göndericeksen ["ab.com", "bcd.com"],
    methods: ["GET", "POST"],
  })
);

app.use(homeRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/user", userRouter);


const databaseConnect = async () => {
  try {
    await mongoose.connect(connectDb);
    console.log("mongodb baglandı");
  } catch (err) {
    console.log(err);
  }
};
databaseConnect();
app.use(error)

// // console.log(process.env.NODE_ENV);
// // console.log(app.get("env"));
// if(app.get("env") == "development"){
//   console.log("development")
// }else{
//   console.log("production")
// }

const port = process.env.PORT || 3000

console.log(config.get("name"));
app.listen(port, () => {
  console.log(`listing on port ${port} `);
});
