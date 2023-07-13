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
        new transports.File({filename: "logs.log" , leve:"error"}),
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

module.exports = logger