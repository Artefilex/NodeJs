const express = require("express");

const app = express(); // bizim  için express bir uygulama oluşturacak

// app.use()   response ve requstleri use methoduyla ele alabiliyoruz
// nodemon kurduk bunu da devDependencies olarak attık sadece gelistirme için var 
//  npx nodemon diyterek calıstırdık farklı bir js izlencekse npx nodemon file.js 
app.use((request, response) => {
  
    response.end("aho");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
