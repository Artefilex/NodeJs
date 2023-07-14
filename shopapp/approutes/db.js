const logger = require("../middleware/logger");
const mongoose = require("mongoose");

const dbconnection = require("../config")

module.exports = function(){
    mongoose.connect(dbconnection).then(() => {
        logger.info("mongo db baglantısı kuruldu");
      });
}