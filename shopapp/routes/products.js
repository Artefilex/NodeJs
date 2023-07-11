const express = require("express")
const router = express.Router()


const { Product, validateProduct} = require("../models/product") 

 

router.get("/", async (req, res) => {
   const products = await Product.find(); //tümünü getir
  // const products = await Product.find({price:4000 , isActive : true}) // price 4000 isActive true olanı getirir
  // const products = await Product.find({isActive: true}).limit(1).select({name: 1,price: 1}); //sadece name ve fiyatı aktif olan 1 kaydı alır
  res.send(products)
  });
  
  router.post("/",  async (req, res) => {
    if(!req.body.name || req.body.name.length < 3){
        res.status(400).send("ürün en az 3 karakter olmalı ")
        return
     }
    const { error } = validateProduct(req.body);
    if (error) {
     return res.status(400).send(error.details[0].message);
    }
    const product= new Product({
      name: req.body.name,
      price: req.body.price,
      description:  req.body.description,
      imageUrl: req.body.imageUrl,
      isActive: req.body.isActive
    })
    try{
      const result =  await product.save()
      console.log(result);
     }
     catch(err){
       console.log(err);
     }
  });
  router.put("/:id", (req, res) => {
    //id e göre ürün alma
    const product = products.find((p) => p.id == req.params.id);
    if (!product) {
      res.status(404).send("error ");
    }
    //  validate
    const result = validateProduct(req.body);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }
    product.name = req.body.name;
    product.price = req.body.price;
  
    res.send(product);
  });
  router.delete("/:id", (req, res) => {
    const product = products.find((p) => p.id == req.params.id);
    if (!product) {
      return res.status(404).send("sayfa bulunamadı");
    }
    const index = products.indexOf(product);
    products.splice(index, 1);
    res.send(product);
  });
  
  router.get("/:id", async (req, res) => {
    const id = req.params.id
    res.send(products[id -1])
    const product = await Product.findOne({_id : req.params.id })
    if (!product) {
      return res.status(404).send("error ");
    }
    res.send(product);
  });
  

  module.exports = router