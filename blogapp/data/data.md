### sql.js 

1. Gereksinimler 

```bash 

const config = require("../config");
const Sequelize = require("sequelize");

```
2. Sequlize aracılıgıyla yeni bir sequlize oluştrurduk 

3. `sequelize` örneği oluşturulurken, `config.db.database`, `config.db.user`, `config.db.password` ve `config.db.host ` gibi yapılandırma bilgileri kullanılır. Bu bilgiler, MySQL veritabanı bağlantısının yapılandırmasını belirtir.

4. `define` seçeneği kullanılarak model tanımlamalarında kullanılan varsayılan ayarlar belirlenir. Bu örnekte, `{ timestamps:false } ` ayarlanarak model tablolarında otomatik tarih alanlarının eklenmesi engellenir.


5. `connect` adında bir async fonksiyon tanımlanır. Bu fonksiyon, veritabanı bağlantısını oluşturur ve bağlantıyı test eder. `sequelize.authenticate() `metodu kullanılarak bağlantı doğrulanır. 

```javascript

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  {
    dialect: "mysql",
    host: config.db.host,
    define:{
      timestamps: false
    }
  }
);
```

-----------

### dummy-data.js 

1. Gereksinimler 

```bash 

const Category = require("../models/category");
const Blog = require("../models/blog");
const slugField = require("../helpers/slugfield")

```


2. Çağırım 

async bir populate fonksiyonu oluşturarak test kodlarımızı oluşturuyoruz. 

sequlizedan gelen bir count parametresini Category cagırarak databasede bilig olup olmadıgını kontrol ediyoruz 
`  const count = await Category.count(); ` eğer burdan gelen count degeri sıfırsa tekrardan test kodları oluşturuluyor.

```javascript 
   const categories = await Category.bulkCreate([
      { name: "Web Geliştirme" ,url: slugField("Web Geliştirme") },
      { name: "Mobil Geliştirme",url: slugField("Mobil Geliştirme") },
      { name: "Programlama",url: slugField("Programlama") },
    ]);

```
1. Category içinde bulkCreate methodu ile toplu kayıtlar oluşturuyoruz slugField kütüphanesi ile de name parametesini url ceviriyoruz 

aynı işlemleri bloglar için de yapıyoruz 

``` javascript 

    await categories[0].addBlog(blogs[0]) 
    await categories[0].addBlog(blogs[1])
    await categories[0].addBlog(blogs[2])
    await categories[0].addBlog(blogs[3])
    await categories[0].addBlog(blogs[4])
    await categories[0].addBlog(blogs[5])
    await categories[0].addBlog(blogs[6])
  
    await categories[1].addBlog(blogs[2])
    await categories[1].addBlog(blogs[3])
    await categories[1].addBlog(blogs[0])
    await blogs[0].addCategory(categories[1]) 
```
2. categoryler arası ilişkiyi burda kurduk 


