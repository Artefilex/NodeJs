const express = require("express")
const router = express.Router()
const products = [
    { id: 1, name: "samsung ", price: 2000 },
    { id: 2, name: "samsung2 ", price: 4000 },
    { id: 3, name: "samsung3 ", price: 5000 },
  ];


router.get("/", (req, res) => {
    res.send(products[0]);
  });


module.exports = router 