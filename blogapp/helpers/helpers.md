iki adet yardımcımız var 

### slugfield.js 

```javascript
const slugify = require("slugify");
const options = {
    replacement: '-',  
    remove: undefined, 
    lower: true,      
    strict: true,   
    locale: 'tr',    
    trim: true   
}

module.exports = function slugField(str){
    return slugify(str ,options)
}

```

- slufield SEO tabanlı urller oluşturmak için işimize yarayan birer metin dönüştürücüdür proje içeirisde dahil ettikten sonra 
`slugField(str){return slugify(str ,options)} ` dışarıya açıyoruz . slugField  bir str parametresi alır ve option da belirtilen parametrelere göre dönüşüm sağlar 

### image-upload.js


Bu kod parçası, dosya yüklemesi (file upload) için multer kütüphanesini kullanarak bir yapılandırma sağlar.

multer kütüphanesi, Express.js ile birlikte kullanılan bir dosya yükleme ara yazılımıdır. 

1. `multer.diskStorage()` fonksiyonu kullanılarak dosya depolama yöntemi yapılandırılır. Bu yöntem, dosyaların hangi dizine kaydedileceğini ve dosya adını nasıl oluşturacağını belirtir.
  - `destination` fonksiyonu, yüklenen dosyaların kaydedileceği dizini belirtir. Bu örnekte, dosyalar `./public/images/` dizinine kaydedilecek.
  - `filename ` fonksiyonu, yüklenen dosyanın yeni bir adını belirlemek için kullanılır. Bu örnekte, yüklenen dosyanın adı, orijinal dosya adının temizlenmiş haline, bir zaman damgası ve orijinal dosya uzantısına dayanarak oluşturulur.
2. `multer()` fonksiyonu kullanılarak `upload` nesnesi oluşturulur ve yapılandırma sağlanır. Bu nesne, dosya yükleme için kullanılacak yapılandırmayı içerir. Bu örnekte, `storage` değeri olarak önceden yapılandırılmış `diskStorage` nesnesi kullanılır.

```javascript 
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    const fileName =
      path.parse(file.originalname).name +
      "-" +
      Date.now() +
      path.extname(file.originalname);
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

module.exports.upload = upload;
```