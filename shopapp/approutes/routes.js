const categoryRouter = require("../routes/categories");
const error = require("../middleware/error");
const userRouter = require("../routes/user");
const homeRouter = require("../routes/home" );
const productRouter = require("../routes/products");
const express = require("express");

module.exports = function(app)
{
app.use(express.json());
app.use(homeRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/user", userRouter);
app.use(error);
}