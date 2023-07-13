require("express-async-errors")

const express = require("express");
const router = express.Router();
const { Comment, Product, validateProduct } = require("../models/product");
const auth = require("../middleware/auth");
const isadmin = require("../middleware/isadmin");
const { Error } = require("mongoose");
//   query operatörleri
//eq => equal
//ne => not equal
//gt => greater than
// gte  => greater than or equal
// lt  => les than
// lte  => les than or equal
// in  => [10,20,30] bunlara eşit olan
// nin  => [10,20] hariç
router.get("/", async (req, res,next) => {
  throw new Error("hata oluştu")
  // const products = await Product.find(); //tümünü getir
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
  // const products = await Product.find().populate("category", "name -_id").select("-isActive -_id");

   const products = await Product.find().populate("categories", "name -_id");
   res.send(products);
  
     //logging
 
  // categorye göre sorgulama yaptık populate methodunu kullandık sadece ismi aldık -id yaparak id bilgisini almadık
 
});

router.post("/",auth ,isadmin, async (req, res) => {
 

  if (!req.body.name || req.body.name.length < 3) {
    res.status(400).send("ürün en az 3 karakter olmalı ");
    return;
  }
  const { error } = validateProduct(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    isActive: req.body.isActive,
    categories: req.body.categories,
    comment: req.body.comments,
  });
  try {
    const result = await product.save();
    console.log(result);
    res.send(result)
  } catch (err) {
    console.log(err);
  }

});


router.put("/:id",auth ,isadmin, async (req, res) => {
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
  const product = await Product.findByIdAndUpdate(req.params.id, {
    $set: {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      isActive: req.body.isActive,
      categories: req.body.categories,
    },
  });
  res.send(product);
});
router.delete("/:id",auth ,isadmin , async (req, res) => {
  // const product = await Product.deleteOne({_id: req.params.id})
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return res.status(404).send("sayfa bulunamadı");
  }
  res.send(product);
});

router.get("/:id", async (req, res) => {
  // const id = req.params.id
  // res.send(products[id -1])
  const product = await Product.findOne({ _id: req.params.id })
    .populate("categories", "name -_id")
    .select("-isActive -_id");
  if (!product) {
    return res.status(404).send("error ");
  }
  res.send(product);
});
router.put("/comment/:id",auth ,  async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404).send("ürün yok");
  }
  const comment = new Comment({
    text: req.body.text,
    username: req.body.username,
  });
  product.comments.push(comment);
  const newComment = await product.save();
  res.send(newComment);
});

router.delete("/comment/:id",auth ,  async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).send("Aradığınız ürün bulunamadı.");
  }

  const comment = await product.comments.remove(req.body.commentid)
  if (!comment) { 
    return res.status(404).send("Aradığınız yorum bulunamadı.");
  }
  //  await comment;
    //  console.log(product.comments.id(req.body.commentid))
  const updatedProduct = await product.save();
  res.send(updatedProduct);
});
module.exports = router;

