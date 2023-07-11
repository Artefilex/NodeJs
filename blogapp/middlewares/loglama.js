module.exports = (err, req,res ,next) =>{
    console.log("erorr" , err.message); 
    // loglama yapabilirsin hatayı yaklayarak winston kütüphanesinden
    // admin maile yollayabilirz erroru
    next(err)
  }