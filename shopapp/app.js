const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("./middleware/logger");

require("./approutes/routes")(app)
require("./approutes/db")();

if(process.env.NODE_ENV == "production"){
  require("./approutes/production")(app)
}

app.use(
  cors({
    origin: "*", // dizi göndericeksen ["ab.com", "bcd.com"],
    methods: ["GET", "POST"],
  })
);

const port = process.env.PORT || 3000;

// console.log(config.get("name"));
app.listen(port, () => {
  logger.info(`listing on port ${port} `);
});
