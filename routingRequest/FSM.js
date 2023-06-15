var http = require("http");
var fs = require("fs")
var server = http.createServer((request, response) => {
  if (request.url == "/") {
    fs.readFile("./fsm/index.html", (error, html ) =>{
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(html);
        response.end(); 
    })  // asenkron okuma 
    // fs.readFileSync() // senkron okuma yapar burdaki işlem bitmeden altaki satıra gecmez 
    
  } else if (request.url == "/blog") {
     fs.readFile("./fsm/blog.html", (error, html) =>{
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(html);
        response.end();
     })
  } else {
   fs.readFile("./fsm/404.html", (error,html)=>{
    response.writeHead(404, { "Content-Type": "text/html" });
    response.write(html);
     response.end()
   })
  }
});

server.listen(3000);

console.log("server is working");
