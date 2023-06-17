// middleware bir ara yazılımdır 3 parametre alır (res, req ,next )
const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("middleware 1");
  next();
});
app.use((req, res, next) => {
  console.log("middleware 2 ");
  next()
});
app.use((req, res) => {
  res.send("<h1> homapage </h1>");
});

app.listen(4000, () => {
  console.log("listening on port 4000");
});
