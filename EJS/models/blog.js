const { DataTypes } = require("sequelize");
const sequelize = require("../data/sql");
const Category = require("./category");

const Blog = sequelize.define("blog", {
  blogid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subtitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  main: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  confirmation: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  categoryid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
  
});


 async function sync(){
    await Blog.sync({alter:true})
    // force true verdiğimiz için uygulama her çalıştırıldıgına databasde bu tablo varsa
    // blog tablosunu bulacak ve silecek tekrardan oluşturacak 
    //  uygulama geliştiriken bu yöntem kullanılabilir ancak uygulama yayınlancagı zaman 
    // migrations kullanmak gerekir 
    console.log("blog tablosu eklendı")
 const count = await Blog.count()
 if(count == 0){
    await Blog.create({
        title : "Web geliştirme",
        subtitle: "web geliştrime detay",
        desc: "lorem ipsum sit amet dolar",
        image: "1.jpeg",
        main: true,
        confirmation: true,
       categoryid: 1
    })
 }
    
   
}

sync()

module.exports = Blog;
