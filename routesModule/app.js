const http = require("http");
// bir onceki fs modülü kullanımını ana code blogunu karmasıklastırmamak için 
// route.js içerisine attık module.exports ile dışarıya aktardık 
const routesHandler = require("./routes");


const server = http.createServer(routesHandler);

server.listen(3000);

console.log("server listen 3000  port ");
