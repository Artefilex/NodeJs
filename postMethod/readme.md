Bu kod bloğu, bir HTTP sunucusu oluşturarak farklı URL'ler için farklı işlemler yapmaktadır. İşleyiş aşağıdaki gibi özetlenebilir:

1. İlgili modüllerin import edilmesi:

 - http modülü, HTTP sunucusu oluşturmak için kullanılır.
 - fs modülü, dosya işlemleri için kullanılır.

2. Sunucu oluşturma:

 - http.createServer() fonksiyonu ile bir HTTP sunucusu oluşturulur.
 - Sunucu, bir callback fonksiyon alır ve her istek için bu callback  fonksiyonu çalıştırır.

 - Callback fonksiyonu, request (istek) ve response (yanıt) parametrelerini alır.

3. URL yönlendirmeleri:

 - İlk olarak, kök ("/") URL'sine gelen istekler için bir işlem yapılır.
 - fs.readFile() fonksiyonu kullanılarak "index.html" dosyası okunur ve ilgili yanıt oluşturulur.
 - "/blog" URL'sine gelen istekler için benzer bir işlem yapılır, bu sefer "blog.html" dosyası okunur ve ilgili yanıt oluşturulur.
 - "/create" URL'sine gelen istekler için iki durum kontrol edilir:
 - Eğer istek metod "POST" ise, gelen veri okunur ve "blog.txt" dosyasına eklenir. Ardından, istemciye 302 yönlendirme yapılır ve başlangıç sayfasına dönülür.
 - Eğer istek metod "POST" değilse, "create.html" dosyası okunur ve ilgili yanıt oluşturulur.
 - Diğer tüm URL'ler için (herhangi bir eşleşme olmadığında) "error.html" dosyası okunur ve 404 hata yanıtı oluşturulur.

4. Sunucunun dinlemeye başlaması:

 - server.listen(3000) ifadesi ile sunucu 3000 numaralı bağlantı noktasını dinlemeye başlar.


Bu kod bloğu, farklı URL'lere göre farklı HTML sayfalarının yanıt olarak döndürülmesini sağlar. Ayrıca, "/create" URL'sine yapılan "POST" isteklerinde gelen verinin "blog.txt" dosyasına eklenmesi ve ardından başlangıç sayfasına yönlendirme yapılması sağlanır. 


--------------
 request.on metodu, bir olay dinleyicisi (event listener) eklemek için kullanılan bir HTTP isteği nesnesi üzerinde bir yöntemdir. Bu kod bloğunda request nesnesi üzerindeki "end" olayını dinleyerek, isteğin verilerinin tamamen alındığı noktada bir olayı tetiklemektedir.

Yani request.on("end", callback) ifadesi, "end" olayı gerçekleştiğinde çalışacak olan bir callback fonksiyonu tanımlar. "end" olayı, isteğin veri alımını tamamladığı zaman tetiklenir.

Kod bloğunda request.on("end", () => { ... }) ile tanımlanan callback fonksiyonu, isteğin verilerini birleştirerek işlemektedir. İlgili adımlar şu şekildedir:

1. Verilerin birleştirilmesi:

 - Buffer.concat(data) ifadesi ile data adlı bir dizi içerisinde   biriktirilen veriler birleştirilir.
 - Buffer.concat() fonksiyonu, verilen tamponları birleştirerek yeni bir tampon oluşturur.

2. Verinin dönüştürülmesi:

 - Buffer.concat(data).toString() ifadesi, birleştirilen tamponun stringe dönüştürülmesini sağlar.
 - .toString() fonksiyonu, bir tamponu stringe çevirir.

3. Verinin ayrıştırılması:

 - result.split("=")[1] ifadesi, string verinin "=" karakterine göre ayrıştırılmasını ve ikinci parçanın (index 1) alınmasını sağlar.
 - split("=") fonksiyonu, stringi "=" karakterine göre böler ve bir dizi döndürür.

4. Dosyaya verinin eklenmesi:

 - fs.appendFile() fonksiyonu kullanılarak "blog.txt" dosyasına parseData değişkenindeki veri eklenir.
 - Hata durumunda hata konsola yazdırılır.
 - Başarılı bir şekilde eklendiyse, yanıtın durum kodu 302 (Yönlendirme) olarak ayarlanır ve "Location" başlığı "/" olarak ayarlanır.
 - Son olarak, yanıt tamamlanır ve istemciye gönderilir.
 - Bu kod bloğu, HTTP isteğinin "end" olayını dinleyerek, isteğin verilerinin tamamını alır, işler ve bir dosyaya ekler. Bu örnekte, "POST" isteği ile gönderilen verinin "=" karakterine göre ayrıştırılması ve "blog.txt" dosyasına eklenmesi gerçekleştirilmektedir. 



 --------

 #### Buffer Nedir 

 Buffer, Node.js'de verilerin geçici olarak depolanmasını ve manipüle edilmesini sağlayan bir sınıftır. Veriler, özellikle ikili veriler (binary data) veya karakter dizileri gibi belirli formatlarda depolanmak istendiğinde kullanılır.

Buffer sınıfı, bellekte bir tampon oluşturarak verileri içinde depolar. Bu tampon, önceden belirlenmiş bir boyuta sahip olabilir veya dinamik olarak genişleyebilir. Buffer, özellikle ağ üzerinden veri iletiminde veya dosya işlemlerinde sıkça kullanılır.

Buffer nesnesi, çeşitli işlemler yapmak için bir dizi yönteme sahiptir. Bunlar arasında verilerin okunması, yazılması, dönüştürülmesi ve manipüle edilmesi gibi işlemler yer alır. Örneğin, Buffer üzerinde .toString() metoduyla bir tamponun içeriği stringe dönüştürülebilir veya .write() metoduyla bir tampona veri yazılabilir.

Node.js'nin Buffer sınıfı, özellikle veri dönüşümleri, ağ işlemleri, dosya okuma/yazma gibi senaryolarda kullanıcıya esneklik sağlar. Ancak, dikkatli kullanılması gereken bir yapıdır. Buffer, bellek yönetimi ve bellek sınırları konularında dikkatli olunması gereken bir konudur. Büyük tamponlar veya hatalı kullanım, bellek sızıntılarına veya performans sorunlarına neden olabilir. Bu yüzden Buffer'ı dikkatlice kullanmak ve bellek yönetimini doğru bir şekilde yapmak önemlidir.