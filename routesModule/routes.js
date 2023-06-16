
var fs = require("fs");

const routesHandler = (request, response) => {
  if (request.url == "/") {
    fs.readFile("index.html", (error, html) => {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(html);
      response.end();
    });
  } else if (request.url == "/blog") {
    fs.readFile("blog.html", (error, html) => {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(html);
      response.end();
    });
  } else if (request.url == "/create" && request.method == "POST") {
    const data = []; 
    request.on("data", (chunk) => {
      // console.log(chunk)
      data.push(chunk);  
    
    });
    request.on("end", () => {
      const result = Buffer.concat(data).toString(); // datayı buffer aracılıgıyla stringe cevirdik 
      console.log(result);
      const parseData = result.split("=")[1]; // result degerimizi split ederek sadece dönen veriyi aldık 
      console.log(parseData);

      fs.appendFile("blog.txt", parseData, (err) => {
        if (err) {
          console.log(err);
        } else {
          response.statusCode = 302;
          response.setHeader("Location", "/");
          response.end();
        }
      });
    });

    
  } else if (request.url == "/create") {
    fs.readFile("create.html", (error, html) => {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(html);
      response.end();
    });
  } else {
    fs.readFile("error.html", (error, html) => {
      response.writeHead(404, { "Content-Type": "text/html" });
      response.write(html);
      response.end();
    });
  }
};

module.exports = routesHandler
