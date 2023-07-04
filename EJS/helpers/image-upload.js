// const multer = require("multer");
// const path = require("path")
// const storage = multer.diskStorage({
//     // destination konum bilgisi cb = callback 
//     destination: (req ,res ,cb) =>{
//       cb(null, "./public/images/")
//     },
//     filename: (req ,res ,cb) =>{
//         const fileName = path.parse(file.originalname).name + "-" + Date.now() + path.extname(file.originalname);
//         cb(null, fileName);
       
//     }
// })
// const upload = multer({storage :storage})

//  module.exports.upload = upload


 const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
        const fileName = path.parse(file.originalname).name + "-" + Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

module.exports.upload = upload;