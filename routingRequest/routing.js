var http = require("http");

var server = http.createServer((request, response) => {
   if(request.url == "/"){
    response.writeHead(200 , {"Content-Type": "text/html"})
   response.write(`<html>
   <head>
   <title>Anasayfa</title>
   </head>
   <body>
   <h2> Anasayfa</h2>
   </body>
   </html> `)   
   response.end(); 
}
else if (request.url =="/blogs" ){
    response.writeHead(200 , {"Content-Type": "text/html"})
    response.write(`<html>
    <head>
    <title>Blogs</title>
    </head>
    <body>
    <h2> blogs</h2>
    </body>
    </html> `)   
    response.end();
}else{
    response.writeHead(404 , {"Content-Type": "text/html"})
    response.write(`<html>
    <head>
    <title>404 not found error </title>
    </head>
    <body>
    <h2> 404 not found error</h2>
    </body>
    </html> `)   
    response.end();
}
 
});

server.listen(3000);
console.log("Node js 3000 portunda aktif");
