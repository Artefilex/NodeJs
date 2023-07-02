# Blog App

Bu proje, MySQL veritabanından veri çekme, ekleme ve silme işlemlerini gerçekleştiren bir Express uygulamasıdır. JavaScript kullanılarak kullanıcı deneyimini artırmak için geliştirilmiştir.

# proje video


[![Proje Videosu](https://img.youtube.com/vi/Fwwn5TUsNbQ/0.jpg)](https://www.youtube.com/watch?v=Fwwn5TUsNbQ)



## Klasör Yapısı

 `db`: Bu klasörde veritabanıyla ilgili dosyalar ve yapılandırmalar bulunur.
- `views`: Bu klasörde kullanıcı arayüzü tasarımında kullanılan EJS şablon dosyaları bulunur.
- `views/admin`: Bu klasör de admin için oluşturulan EJS şablonları bulunur.
- `views/partiels`: Bu klasör de admin user ve default kullanıcı  için oluşturulan EJS parçacıkları bulunur.
- `views/user`: Bu klasör de user için oluşturulan EJS şablonları bulunur.
- `public`: Bu klasörde statik dosyalar (CSS, IMG) bulunur.
- `routes`: Bu klasörde Express yönlendirme dosyaları bulunur.


## Bağımlılıklar
Projenin çalışması için aşağıdaki bağımlılıklara ihtiyaç vardır:
```bash 
  "ejs": "^3.1.8",
    "express": "^4.18.1",
    "express-session": "^1.17.3",
    "multer": "^1.4.5-lts.1",
    "mysql2": "^2.3.3"

```

## Kurulum

1. Proje dosyalarını bilgisayarınıza indirin veya klonlayın.
2. Proje klasörüne gidin: `cd Project`
3. Gerekli bağımlılıkları yüklemek için aşağıdaki komutu çalıştırın:

```bash
   npm install
```

4. Veritabanı yapılandırmasını düzenlemek için `db` klasöründeki dosyaları inceleyin ve gerekli değişiklikleri yapın.
5. Proje kök dizininde aşağıdaki komutu çalıştırarak uygulamayı başlatın:

6. `db` klasörü içerisine bir adet `config.js` yolu oluşturun. içerisine sql bağlantısını yapacak bilgilerinizi girin.

```bash
const config = {
    db:{
        host: "localhost",
        user: "root",
        password: "your-password",
        database: "your database"
    }
}


module.exports = config

```
7. Tarayıcınızda `http://localhost:3000` adresine giderek uygulamayı görüntüleyebilirsiniz.


### tablolar

 mysql 5 tablo içeriyior gerekli sql tablolarını oluşturun `userinfo , contact, nav ,about ,blogs` 


![userinfo table](/Project/public/image/readme/userinfoPNG.PNG){:width="500px" height="300px"}

![blogs table](/Project/public/image/readme/blogs.PNG){:width="500px" height="300px"}
![blogs column](/Project/public/image/readme/blogs2.PNG){:width="500px" height="300px"}
![contact table](/Project/public/image/readme/contact.PNG){:width="500px" height="300px"}

![contact table](/Project/public/image/readme/nav.png){:width="500px" height="300px"}




