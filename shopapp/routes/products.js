const express = require("express")
const router = express.Router()
const Joi = require("joi");
const products = [
    { id: 1, name: "samsung ", price: 2000 },
    { id: 2, name: "samsung2 ", price: 4000 },
    { id: 3, name: "samsung3 ", price: 5000 },
  ];

router.get("/", (req, res) => {
    res.send(products);
  });
  
  router.post("/", (req, res) => {
    // if(!req.body.name || req.body.name.length < 3){
    //     res.status(400).send("ürün en az 3 karakter olmalı ")
    //     return
    //  }
    const { error } = validateProduct(req.body);
    if (error) {
      return res.status(400).send(result.error.details[0].message);
    }
    const product = {
      id: products.length + 1,
      name: req.body.name,
      price: req.body.price,
    };
    products.push(product);
    res.send(product);
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
  
  router.get("/:id", (req, res) => {
    // const id = req.params.id
    // res.send(products[id -1])
    const product = products.find((p) => p.id == req.params.id);
    if (!product) {
      return res.status(404).send("error ");
    }
    res.send(product);
  });
  
  function validateProduct(product) {
    const schema = new Joi.object({
      name: Joi.string().min(3).max(30).required(),
      price: Joi.number().required(),
    });
    return schema.validate(product);
  }

  module.exports = router