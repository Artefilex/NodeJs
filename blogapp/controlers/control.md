## user.js 

Temel gereksinimler 

```bash 
const Blog = require("../models/blog");
const Category = require("../models/category");
const { Op } = require("sequelize");

```

her module için try catch blogunu oluşturuyoruz

#### exports.main için 

1. Blog model üzerinden findAll methodunu kullanarak `where `  bloğunu kullanarak onaylı olan ve anasayfada gösterilecek blogları cekiyoruz. 

2. `raw: true ` parametresi, Sequelize sorgusu sonucunda elde edilen verilerin ham (raw) formatta döndürülmesini sağlar. Bu, model yöntemlerine erişmek yerine, verileri daha düşük seviyeli olarak manipüle etmenizi veya doğrudan bir veri formatında kullanmanızı sağlar. 

3. Örneğin, `blogs` değişkeni içerisindeki veriler, `raw: true` kullanıldığından dolayı doğrudan JSON formatında döner. Bu şekilde, verilere ulaşmak için model yöntemlerini kullanmak zorunda kalmazsınız ve elde ettiğiniz verileri daha düşük seviyeli olarak işleyebilirsiniz.

4. Aynı şekilde  categories içinde yaptık 

```javascript 

  res.render("users/index", {
      title: " blogs app",
      categories: categories,
      blogs: blogs,
      selectedCategory: null,
    });

```
5.  user altında index.ejs üzerine bu parametreleri gönderdik ve render ettik 

#### exports.blogs_list

temel gereksinimler 
```bash
  const size = 2;
  const { page = 0 } = req.query;
  const slug = req.params.slug;
```

1. blogs-listi iki yerde kullandığımız için Blog modeli üzerinden sequelizedan gelen `findAndCountAll()` methodunu kullanıyoruz   

2.  `router.get("/blogs", userControler.blogs_list);` rotası için `where: { confirmation: true } ` sorgusu işlerken 
`router.get("/blogs/category/:slug", userControler.blogs_list); ` için ` include: slug ? { model: Category, where: { url: slug } } : null` sorgusu çalışır 


3. sequelize da gelen `limit` ve `offset ` parametreleri vardır bunlar kısıtlama saglar bir sayfa içerisinde gösterilecek maks parametreyi `limit ` verir `offset` bir sonraki sayfada gösterilecek parametreyi verir bir ötelemedir. 



```javascript 

  const { rows, count } = await Blog.findAndCountAll({
      where: { confirmation: true },
      include: slug ? { model: Category, where: { url: slug } } : null,
      raw: true,
      limit: size,
      offset: page * size,
    });
```

- eger urlden gelen slug varsa Category modelinden url sluga eşitse getirmesi sorgusunu yaptık 

```javascript
 res.render("users/blogs", {
      title: " blogs app",
      categories: categories,
      blogs: rows,
      totalItems: count,
      totalPages: Math.ceil(count / size),
      currentPage: page,
      selectedCategory: slug,
    });

```

sayfaya render ederken gerekli verileri render etik 


#### exports.blogs_details 

burdaki blog sorgusu  için urlden gelen veriyi findOne methodunu kullanarak where sorgusuna url parametresini eşitliyoruz nöylelikle sadece bir tane sorgu dönüyor. 



--------------


## admin.js 

Gereklilikler 

```bash
const Blog = require("../models/blog");
const Category = require("../models/category");
const fs = require("fs");
const { Op } = require("sequelize");
const db = require("../data/sql");
const slugfield = require("../helpers/slugfield");

```


Admin için birçok model kullaandık 


1. requesten gelen method parametrelerini kontrol ediyoruz get ve posta göre ayırıyoruz. 

### Category 


#### exports.category_list 

1. tüm Categorileri `findAll()` methoduyla çektik 
2. blogid ve action parametrelerini alıyoruz duruma göre güncelleme delete update sonucunda oluşak durumları kullanıcıya popup göndermek için kullanıyoruz. 

```javascript 
    res.render("admin/category-list", {
        title: "category list",
        categories: categories,
        action: req.query.action,
        blogid: req.query.blogid,
      });
```

#### exports.category_edit ve exports.category_delete

- Get Sorgusu 

1. ` const catid = req.params.categoryid; ` urlden gelen `categoryid` göre alıyoruz 

2. `const category = await Category.findByPk(catid);` Category üzerinden primarykeye göre gelen id numarasını alıyoruz. 

3. ` const blogs = await category.getBlogs(); ` categoryden gelen getBlogs() methoduyla categoryle eşleşen blogları cagırıyoruz. 

4. eger category geliyorsa aşşagıdaki blogu dönüyoruz   

```javascript 
 return res.render("admin/category-edit", {
          title: "category edit",
          category: category.dataValues,
          blogs: blogs,
          action: req.query.action,
          categoryid: req.query.categoryid,
        })

``` 
5. category yoksa `res.redirect("admin/category");` bloğu çalışıyor. 

- Post Sorgusu 


1. method post olunca request.bodyden gelen categoryid ve name formdan alıyoruz ve bir update komutu çalıştırıyoruz bodyden aldıgımız name ile categorydeki name güncelliyoruz eşleşen id getiriyor  


```javascript
        const catid = req.body.categoryid;
      const header = req.body.name;
      await Category.update(
        { name: header },
        {
          where: {
            id: catid,
          },
        }
      );
      return res.redirect("admin/category?action=edit&catid= " + catid);
```


#### exports.category_create 

category tasarlamak için formdan gelen catname parametresini alıp `Category.create({name: name })` methodunu kullanarak catname categoryinin name eşitledik 


#### exports.category_remove 

 Categoryinin altındaki bir blogun category ile ilişkisini kesmek icin blogid ve categori id degerlerini aldık ve bir query yazdık  eşleşme varsa gerekli blog ilişkisini kestik 


## Blog 

#### exports.blog_list
sadece get methodunu kullanarak basit sorgularımızı yazdık blog içerisinden tüm blogları cektik id title ve image bilgisini aldık sadece altında da Category modelinin name parametresini cagırdık 


#### exports.blog_delete   

bir veriyi silmek için `blog.destroy()` methodunu kullandık geriye kalan işlemler hemen hemen aynı . 



#### exports.blog_create 

- GET method 

1. tüm kategorileri alarak blog-create.ejs içerisindeki formda oluşturduk 

- POST method 

1. gerekli parametreleri form içerisinden aşşağıdaki degişkenlerle alıyoruz. 

```javascript 

      const title = req.body.header;
      const subtitle = req.body.subtitle;
      const desc = req.body.desc;
      const image = req.file.filename;
     
      const main = req.body.main == "on" ? 1 : 0;
      const onay = req.body.onay == "on" ? 1 : 0; 
```

2. Blog.create methodunu kullanarak yeni blog içerine gerekli parametreleri eşleştirerek gönderiyoruz url parametresini skugfield ile title değişkeninden alıyoruz. 

```javascript 

  await Blog.create({
        title: title,
        url: slugfield(title),
        subtitle: subtitle,
        desc: desc,
        image: image,
        main: main,
        confirmation: onay 
      });
```


3. son olarak action parametresini create olarak gönderiyoruz 

```bash 
  res.redirect("/admin/blogs?action=create");
```

#### exports.blog_edit

İlk olarak, gelen isteğin metodunu kontrol eder. Eğer metod "GET" ise, belirtilen blogun düzenleme sayfasını oluşturmak için gerekli işlemleri gerçekleştirir.

1. `req.method === "GET"` ifadesi ile isteğin metodunu kontrol eder.
2. ` req.params.blogid` ile URL'den alınan "blogid" parametresini alır ve blogid değişkenine atar.
3. ` try-catch` bloğu ile hata yönetimi başlatılır.
4. `Blog.findOne()` metodu kullanılarak blogid değerine sahip blogu veritabanında bulur.
5. ` where` nesnesi kullanarak sorgunun koşullarını belirtir.
6. `include` nesnesi ile ilgili kategoriyi dahil eder ve sadece  kategori id değerlerini alır.
7. `const categories = await Category.findAll();` ile tüm kategorileri alır.
8. Eğer blog bulunursa, "admin/blog-edit" şablonunu kullanarak blog düzenleme sayfasını oluşturur.
9. ` res.render()` ile şablonu render eder ve şablona blog ve categories verilerini aktarır.
10.  Eğer blog bulunamazsa, "/admin/blogs" sayfasına yönlendirme yapar.
Hata durumunda catch bloğu içinde hata mesajını konsola yazdırır.




Eğer istek metod "POST" ise, form verilerini alarak belirtilen blogu güncellemek için gerekli işlemleri gerçekleştirir.

1. `req.method === "POST"` ifadesi ile isteğin metodunu kontrol eder.
2. Formdan gelen verileri ilgili değişkenlere atar.
3. `blogid, header, subtitle, desc, main, onay, categorieIds, url, image` gibi değişkenler form verilerini temsil eder.
4. Eğer dosya yüklendi ise, eski resmi siler ve yeni dosya adını alır. Eğer dosya yüklendiyse (req.file mevcut ise), image değişkeni yeni dosya adıyla güncellenir ve eski resim dosyası fs.unlink() ile silinir.

```javascript

fs.unlink("./public/images/" + req.body.image, (err) => {
  });
```

5. `Blog.findOne()` metodu kullanılarak blogid değerine sahip blogu veritabanında bulur.
6. `where` nesnesi ile sorgunun koşullarını belirtir.
7. `include` nesnesi ile ilgili kategoriyi dahil eder ve sadece kategori `id` değerlerini alır.
8. Eğer blog bulunursa, güncelleme işlemlerini gerçekleştirir.
9. Blogun alanlarını günceller ve yeni değerlerini atar.
10. Kategorileri günceller. Mevcut kategorileri kaldırır ve seçilen kategorileri ekler.
11. Güncellenen blogu kaydeder.
12. Son olarak, "/admin/blogs?action=edit&blogid=" ile güncelleme işleminin yapıldığı sayfaya yönlendirme yapar.

13. slugfield(url) işlevi kullanılarak url değeri slug formatına dönüştürülür.
14. Kategori kimliklerinin varlığına göre ilgili kategoriler güncellenir. Önce mevcut kategoriler kaldırılır, ardından seçilen kategoriler eklenir.
15. Güncellenen blog kaydedilir (blog.save()).



## auth controler 

kullancı auth bilgisi ilk etapta cokkie içersinde sakladık güvensiz  
ikinci etapta session belek üzerinde sakladık  daha güvenli ama bellek yiyor 
3. olarak database de saklamak bellek yormaz 