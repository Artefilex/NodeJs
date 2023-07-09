const nodemail = require("nodemailer")

const config = require("../config")

let transporter = nodemail.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    port:587,
    tls:{
        ciphers: "SSLv3"
    },
    auth: {   
        user: config.email.username,
        pass: config.email.password
      }
   
  });



const sendmail = async (mailDetails, cb) =>{
    try{
    const info = await transporter.sendMail(mailDetails)
    cb(info)
    }
    catch(err){
        console.log(err)
    }
}

module.exports = sendmail