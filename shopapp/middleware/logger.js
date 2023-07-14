const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint } = format;
const database = require("../config")
require("winston-mongodb")
const logger =createLogger({
     level: "debug",
     format: combine(
       timestamp({format: "MMM--DD-YY HH:mm:ss" }),
       prettyPrint()
     ),
    transports: [
        new transports.Console(),
        new transports.File({filename: "logs/logs.log" , leve:"error"  ,maxFiles: "3d"}),
        new transports.File({filename: "logs/exceptions.log", level: "error", handleExceptions: true,handleRejections: true , maxFiles: "3d"} ),
        new transports.MongoDB({
            level:"error",
            db: database,
            options:{
                useUnifiedTopology: true 
            },
            collection:"server_logs"
        })
        // new winston.transport.File({filename: "logs.log"})
    ]
})


// process.on("uncaughtException", (err) =>{
//     console.log(err.message)
//     logger.error(err.message)
//   })
//   process.on("unhandledRejection", (err) =>{
//     console.log(err.message)
//     logger.error(err.message)
//   })

module.exports = logger