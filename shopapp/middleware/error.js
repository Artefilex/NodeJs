const logger = require("../middleware/logger")

module.exports= (err,req,res,next)=>{
    // logging
    // logger.log("error",err.message)
    logger.error(err.message,err)
    res.status(500).send("hata oluştu")
    
  }