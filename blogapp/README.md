# Blog App 
Bu proje, Node.js tabanlı bir uygulamayı içermektedir. Aşağıda proje yapısını ve gerekli adımları bulabilirsiniz.

## Proje Yapısı
Proje ana dizini aşağıdaki dosyaları ve klasörleri içermektedir:

`controllers`: Uygulamanın controller dosyalarını içeren klasör.
`data`: Uygulamanın veritabanı modellerini ve veritabanı bağlantısını içeren dosyaları içeren klasör.
`helpers`: Yardımcı fonksiyonları içeren dosyaları içeren klasör.
`models`: Uygulamanın veritabanı modellerini içeren klasör.
`public`: Uygulamanın genel olarak erişilebilen dosyalarını içeren klasör.
`routes`: Uygulamanın yönlendirme (routing) dosyalarını içeren klasör.
`views`: Uygulamanın görüntü (view) dosyalarını içeren klasör.
`config.js`: Proje yapılandırma ayarlarını içeren dosya.
`index.js`: Uygulamanın ana giriş noktası (entry point) olan dosya.

## Kurulum
1. Proje dosyalarını bilgisayarınıza indirin.
2. Terminali açın ve proje dizinine gidin.
3. Gerekli bağımlılıkları yüklemek için aşağıdaki komutu çalıştırın:
```bash
 npm install

```

```bash
nodemon index.js

```



## Bağımlılıklar



`bootstrap`: ^5.3.0
`ejs`: ^3.1.8
`express`: ^4.18.1
`multer`: ^1.4.5-lts.1
`mysql2`: ^2.3.3
`sequelize`: ^6.32.1
`slugify`: ^1.6.6


### index.js 



```bash 
const path = require("path");
const express = require("express");
const app = express();
app.set("view engine", "ejs");
```
projede ejsi  ayağa kaldırmak için  `app.set("view engine" , "ejs" )` çalıştırıyoruz 

`app.use(express.urlencoded({ extended: false })) `  ifadesi, Express uygulamasında gelen URL kodlu form verilerini çözümlemek için bir ara yazılım tanımlar ve `req.body` nesnesinde form verilerini kullanılabilir hale getirir.


admin ve user yönlendirmeleri için `index.js` içerisine gerekli tnaımlamaları yaptık `app.use()`methodu ile cagırdık 

```bash   
 const userRoutes= require("./routes/user");
 const sequelize = require("./routes/sequelize");

 app.use(sequelize);
app.use(userRoutes);

```

 
Bu projede, Express.js kullanarak statik dosyaları sunmak için "/static" yolunu kullanıyoruz. Statik dosyalarımızı "public" dizinine yerleştiriyoruz. Express uygulamasında "/static" yoluna gelen istekler, "public" dizinindeki ilgili dosyalara yönlendirilir. Örneğin, "/static/css/styles.css" yolunda bir istek yapıldığında, Express.js uygulaması "public/css/styles.css" dosyasını istemciye gönderir. Bu şekilde, CSS, JavaScript veya resim dosyalarını "/static" yolundan ulaşılabilir hale getirebiliriz. aynı şekilde node_modules için de geçerli 

```bash  
 app.use("/libs", express.static(path.join(__dirname, "node_modules")));
 app.use("/static", express.static(path.join(__dirname, "public")));

 ```

 ## Database ve yardımcı modellerin çağrımı 

 ```bash 
 const sequelizeDb = require("./data/sql")
const dummyData = require("./data/dummy-data")
const Category = require("./models/category")
const Blog = require("./models/blog")

 
 ```

1. proje içerisinde sequelize aracılıglya Blog ve Category tabloları arasında çoka çok ilişki kurduk bu ilişkiyi `blogCategories` içeriisne yazdık  

2. anonim bir fonksiyon olusturarak bu fonskiyonu cagırdık  `sequelizeDb.sync({force: true})`database ile baglantı kurulur ve her bir değişiklikte force ederek database sıfırlar `sync()` sequlizeden gelen bir kullanımıdr .
```javascript 

Blog.belongsToMany(Category , {through: "blogCategories"})
Category.belongsToMany(Blog , {through: "blogCategories"})


async function sync(){
  await sequelizeDb.sync({force: true})
   await dummyData();
};
sync();


```

son olarak `app.listen (3000,()=>{})` ile 3000 protunda calıstırdık 

## config.js 


```javascript 
const config = {
    db:{
        host: "localhost",
        user: "root",
        password: "",  
        database: "blogdb"
        
    },
}
module.exports = config

```
1. mysql ile baglantıyı kurmak için oluşturdugumuz model 