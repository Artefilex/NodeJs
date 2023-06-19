# EJS (Embedded JavaScript)

- EJS bir şablon motorudur ve JavaScript dilini kullanarak HTML şablonlarını oluşturmayı sağlar. EJS, sunucu tarafında çalışır ve veriye dayalı HTML içeriği oluşturmanın daha kolay ve esnek bir yolunu sağlar.

- EJS, dinamik web uygulamaları geliştirmek için sıklıkla kullanılan bir araçtır

- Örneğin, bir EJS şablonunda, döngüler ve koşullar kullanarak verilere dayalı bir liste oluşturabilir veya dinamik olarak değişen verileri görüntüleyebilirsiniz. EJS, veri işleme, şablonlama ve sunucu tarafında HTML oluşturma konularında güçlü bir araçtır.

---

#### Giriş

1. projeyi dört ana başlıga böldük html sayfalarının yer aldıgı views static dosyaların oldugu public yönlendirmelerin yapıldıgı routes ve ana index.js
2. views dosyasını da admin users ve partials olarak böldük
3. partiels içerisinde süreklilik gösteren birçok sayfada kullandıgımız dinamik ve static dosyalara böldük

---

```bash
    #   package.json
    {
  "dependencies": {
    "bootstrap": "^5.3.0",
    "ejs": "^3.1.8",
    "express": "^4.18.1"
  }



```

#### Proje detay

1. dosya uzantılarımız artık html yerine .ejs olacak şekilde beliyoruz
2. ejs birçok avantaj saglıyor bunlardan birisi parçalara ayırdıgımız html içeriklerini birçok yerde kullanabiliyoruz

```bash
# örnek nav.ejs
   <nav class="navbar navbar-dark bg-primary navbar-expand-lg">
    <div class="container">
      <a href="/" class="navbar-brand">Blogapp</a>
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a href="/blogs" class="nav-link">Blog Listesi</a>
        </li>
      </ul>
    </div>
  </nav>
```

```bash
    #   index.ejs içerisindeki kullanım
      <%- include('../partials/nav.ejs') %>

```

eğer ejs ile dinamik olarak kullandıgımız bir array , obje ,veri varsa ve bunu parsellemişsek ejsinc içerisine parametre olarak gecmek zorundayız

```bash
    #   index.ejs içerisindeki kullanım
      <%- include('../partials/item.ejs',blogs) %>

```

burdaki blogs parametresi temsil ettigi

```bash
  <% blogs.forEach(element => { %>
    <% if (element.main) { %>
  <div class="card mb-3">
    <div class="row">
      <div class="col-md-4">
        <img
          src="/static/images/<%=element.image%>"
          class="img-fluid"
          alt=""
        />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title"><%= element.title %></h5>
          <p class="card-text"><%= element.description %></p>
        </div>
      </div>
    </div>
  </div>
  <% } %>
<% }); %>

```

burdaki ejsforeach döngüsünde karsılık geliyor

3. ejs kullanımı temel olarak <% %> arasına girilen parametre ve degerler iler olur bir aşşağı satıra inerken tekrar acıp kapatmak zorundayız bu tagları

#### Genel inceleme index.js

proje içerisinde ejs kullanabilmek için öncelikle express ile uygulamamızı başlatıyoruz

```bash
    #   index.js
    const express = require("express");
    const app = express();
    const path = require("path");
```

daha sonra ejs view engine ile cagırıyoruz

```bash
    #   index.js

  app.set("view engine", "ejs");

```

proje içerisinde admin ve user için kullandıgımız rotaları yolları routes klasörünun altındaki user.js ve admin.js den cekiyoruz

```bash
    #   index.js
 const userRoutes = require("./routes/user");
 const adminRoutes = require("./routes/admin");


 app.use("/admin", adminRoutes);
 app.use(userRoutes); 

```
```bash
    #   user.js 
    #  artık dosyalarımızı burda express.Router ile dısarıya atıyoruz 

    const router = express.Router(); 

  router.use( "/", function(req, res) {
    res.render("users/index",data);
}); 

```

burda önemli olan en özelden  en genele dogru cagırmak js de oldugu mantık gibi en özel en üstte cagrılır. 

daha sonra static dosyalarımızı aktif ediyoruz projede bunlara takma isimler vererek (/libs ve /static)  olarak kullanım kollaylıgı saglıyoruz. 

örn: 
```bash

app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));
```
burdaki localde bulunan static dosyalarının projeye dahil edilmesini saglıyoruz yoksa calısmazlar networkde görüntülenmezler . en son olarak 3000 portunda calıstırıyoruz 






------------------------



# mySQL kullanımı 
1.  mySQL üzerinden bir database oluşturduk create database ile 
2. tablo eklemesi yaptık  duruma göre degerlerini ve verilerini ekledik basit birer sql cümlleri ile ama manuel girdik verilieri 

```bash 
INSERT INTO `blogapp`.`blok` (`baslik`, `description`, `image`, `mainpage`, `onay`) VALUES ('Sıfırdan İleri Seviye Modern Javascript Dersleri ES7+ ', 'Modern javascript dersleri ile (ES6 & ES7+) Nodejs, Angular, React ve VueJs için sağlam bir temel oluşturun.', '3.jpg', '1', '1')	
```


3. aplly ile ekledikten sonra vscode geldik 

4. npm i mysql2 indirdik veri tabanıyla baglantı kuracak paketimiz 

5. pateimizi cagırdık sql baglantı kuracak parametreleri congif.js içerisine attık 

```bash 
 const mysql = require("mysql2")
 const config = require("./config") 

```

```bash 
const config = {
    db:{
        host: "localhost",
        user: "root",
        password: "",
        database:"blogapp"
    },
}

module.exports = config

```

6. config.js içerisinde öncelikle host bilgisini kullanıcıyı passwordü ve kullanacagımız bilgileri dogru bir şekilde girdik 

7. connection diye bir değişken oluşturum mysql üzerinde createConnection kullanarak database istek gönderdik 


```bash 
let connection = mysql.createConnection( config.db
)

```

8. son olarak databaseden connection.query methodu ile kullanacagımız tabloyu  select * from tablename methoduyla cevirdik ve geriye bir callback döndük eger error varsa error gösterecek yoksa direkt sonuca erişim saglayabilecegiz  

```bash 
connection.connect((err)=>{
    if(err){
       return  console.log(err)
    }
    connection.query("select * from blok" , (err, result)=>{
       console.log(result)
    })
  
        console.log("mysql server baglantısı yapıldı ")
    

} )

```

en son sonuc bize bir array içerisinde obje olarak döndü 