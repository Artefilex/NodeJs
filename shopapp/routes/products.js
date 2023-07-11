const express = require("express")
const router = express.Router()
const { Product, validateProduct} = require("../models/product") 


//   query operatörleri 
//eq => equal 
//ne => not equal 
//gt => greater than 
// gte  => greater than or equal 
// lt  => les than 
// lte  => les than or equal 
// in  => [10,20,30] bunlara eşit olan 
// nin  => [10,20] hariç  
router.get("/", async (req, res) => {
    const products = await Product.find(); //tümünü getir
  // const products = await Product.find({price:4000 , isActive : true}) // price 4000 isActive true olanı getirir
  // const products = await Product.find({isActive: true}).limit(1).select({name: 1,price: 1}); //sadece name ve fiyatı aktif olan 1 kaydı alır
  // const products = await Product.find({price: {$eq: 4000 }}); // 4000 eşit 
  // const products = await Product.find({price: {$ne: 4000}}); // 4000 eşit olmayanlar dönecke
  // const products = await Product.find({price: {$gt: 4000}}); // 4000 büyük olan 
  // const products = await Product.find({price: {$gte: 4000}}); // 4000 eşit ve büyük 
  // const products = await Product.find({price: {$lt: 4000}}); // 4000 küçük olan gelecek 
  // const products = await Product.find({price: {$lte: 4000}}); // 4000 küçük olan  ve eşit olan gelecek 
  // const products = await Product.find({price: {$in: [4000,1000]}}); // fiyatı  4000 ve 10000 e eşit olanlar gelecek  
  // const products = await Product.find({price: {$gte: 4000, $lte: 10000}}); // 10000 den kücük 4000 büyükleri getirecek
  
  // startwith
  // const products = await Product.find({name: /^iphone/ }); 
  // endwith 
  // const products = await Product.find({name: /iphone$/ }); 
  // contains 
// const products = await Product.find({name: /.*iphone.*/i }); 
  
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

  router.put("/:id",async (req, res) => {
    // // query first - findby id 
    // // save
    // const product = await  Product.findById({_id : req.params.id })
    // if (!product) {
    //   res.status(404).send("error ");
    // }
    // //  validate
    // const {error} = validateProduct(req.body);
    // if (error) {
    //   return res.status(400).send(error.details[0].message);
    // }
    // product.name = req.body.name;
    // product.price = req.body.price;
    // product.description = req.body.description;
    // product.imageUrl = req.body.imageUrl;
    // product.isActive = req.body.isActive;

    // const productUpdate =  await product.save()
    // res.send(productUpdate);

    // update
    
  // const result =  await  Product.update({_id: req.params.id},{
  //     $set: {
  //      name:  req.body.name,
  //      price:  req.body.price,
  //      description:  req.body.description,
  //      imageUrl:  req.body.imageUrl,
  //      isActive:  req.body.isActive, 
  //     }
  //   })


  // findbyıdandupdate
  const product =  await  Product.findByIdAndUpdate( req.params.id,{
    $set: {
     name:  req.body.name,
     price:  req.body.price,
     description:  req.body.description,
     imageUrl:  req.body.imageUrl,
     isActive:  req.body.isActive, 
    }
  })
    res.send(product)
  });
  router.delete("/:id", async (req, res) => {
    // const product = await Product.deleteOne({_id: req.params.id})
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).send("sayfa bulunamadı");
    }
     res.send(product)
  });
  
  router.get("/:id", async (req, res) => {
    // const id = req.params.id
    // res.send(products[id -1])
    const product = await Product.findOne({_id : req.params.id })
    if (!product) {
      return res.status(404).send("error ");
    }
    res.send(product);
  });
  

  module.exports = router