var http = require("http");
var fs = require("fs");

var server = http.createServer((request, response) => {
  if (request.url == "/") {
    fs.readFile("index.html", (error, html) => {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(html);
      response.end();
    });
  } 
  else if (request.url == "/blog") {
    fs.readFile("blog.html", (error, html) => {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(html);
      response.end();
    });
  } 
  else if (request.url == "/create" && request.method == "POST") {
    const data = []; 
    request.on("data", (chunk) => {
      // console.log(chunk)
      data.push(chunk);  
      // chunk diye bahsettigimiz olay aslında bir bilgi parcasıdır ve 
      // bunlar büyük datalar oldugu zaman  parçalar halinde gitmelidir
      // Stream, verilerin bir noktadan diğerine sürekli olarak akmasını sağlayan bir kavramdır.
      // Chunk, stream'deki verilerin küçük parçalarıdır.
      // Buffer, stream'lerdeki verilerin geçici olarak depolandığı bellek alanıdır.                    
    });
    request.on("end", () => {
      const result = Buffer.concat(data).toString(); 
      // datayı buffer aracılıgıyla stringe cevirdik 

      console.log(result);

      const parseData = result.split("=")[1]; 

      // result degerimizi split ederek sadece dönen veriyi aldık 
    

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

    // fs.appendFile ile bir blog.txt yaptık 3 parametre alıyor bir oluşturlucak file
    // iki inputtan gelen veri üç error eger error yoksa bir yönlendirme işlemi yaparak
    // response status code 302 cektik setHeader ile location verip anasayfaya gectik
    //  yukardan assagıya okuma yaptık sebebi post methodu olunca cıksın diye
  } 
  else if (request.url == "/create") {
    fs.readFile("create.html", (error, html) => {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(html);
      response.end();
    });
  }
  else {
    fs.readFile("error.html", (error, html) => {
      response.writeHead(404, { "Content-Type": "text/html" });
      response.write(html);
      response.end();
    });
  }
});

server.listen(3000);

console.log("server listen 3000  port ");
