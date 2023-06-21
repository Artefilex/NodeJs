## FS modüle kullanımı 

Bu kod bloğunda bir HTTP sunucusu oluşturulmuş ve üç farklı URL yönlendirmesi yapılmış. İşleyiş aşağıdaki gibidir:

1. İlgili modüllerin import edilmesi:

 - http modülü, HTTP sunucusu oluşturmak için kullanılır.
 - fs modülü, dosya işlemleri için kullanılır.
 
2. Sunucu oluşturma:

 - http.createServer() fonksiyonu ile bir HTTP sunucusu oluşturulur.
 - Sunucu, bir callback fonksiyon alır ve her istek için bu callback fonksiyonu çalıştırır.
 - Callback fonksiyonu, request (istek) ve response (yanıt) parametrelerini alır.
 
3. Yönlendirmelerin tanımlanması:

 - İlk olarak, kök ("/") URL'sine gelen istekler için bir işlem yapılır.
 - fs.readFile() fonksiyonu kullanılarak ./fsm/index.html dosyası okunur.
 - Okuma işlemi tamamlandığında, response.writeHead() fonksiyonu ile yanıt başlığı ayarlanır ve durum kodu 200 (başarılı) olarak belirlenir.
 - Ardından, response.write() fonksiyonu ile okunan HTML içeriği yanıta yazılır.
 - Son olarak, response.end() fonksiyonu ile yanıt tamamlanır ve istemciye gönderilir.

4. Diğer URL yönlendirmeleri:

 - "/blog" URL'sine gelen istekler için benzer bir işlem yapılır, ancak bu sefer ./fsm/blog.html dosyası okunur ve  ilgili yanıt oluşturulur.
 - Diğer tüm URL'ler için (herhangi bir eşleşme olmadığında) "404 Not Found" hatası döndürülür. Bunun için ./fsm/404.html dosyası okunur ve ilgili yanıt oluşturulur.

5. Sunucunun dinlemeye başlaması:

 - server.listen(3000) ifadesi ile sunucu 3000 numaralı bağlantı noktasını dinlemeye başlar.


Bu kod bloğunda bir HTTP sunucusu oluşturulmuş ve üç farklı URL yönlendirmesi yapılmış. İşleyiş aşağıdaki gibidir:

İlgili modüllerin import edilmesi:

http modülü, HTTP sunucusu oluşturmak için kullanılır.
fs modülü, dosya işlemleri için kullanılır.
Sunucu oluşturma:

http.createServer() fonksiyonu ile bir HTTP sunucusu oluşturulur.
Sunucu, bir callback fonksiyon alır ve her istek için bu callback fonksiyonu çalıştırır.
Callback fonksiyonu, request (istek) ve response (yanıt) parametrelerini alır.
Yönlendirmelerin tanımlanması:

İlk olarak, kök ("/") URL'sine gelen istekler için bir işlem yapılır.
fs.readFile() fonksiyonu kullanılarak ./fsm/index.html dosyası okunur.
Okuma işlemi tamamlandığında, response.writeHead() fonksiyonu ile yanıt başlığı ayarlanır ve durum kodu 200 (başarılı) olarak belirlenir.
Ardından, response.write() fonksiyonu ile okunan HTML içeriği yanıta yazılır.
Son olarak, response.end() fonksiyonu ile yanıt tamamlanır ve istemciye gönderilir.
Diğer URL yönlendirmeleri:

"/blog" URL'sine gelen istekler için benzer bir işlem yapılır, ancak bu sefer ./fsm/blog.html dosyası okunur ve ilgili yanıt oluşturulur.
Diğer tüm URL'ler için (herhangi bir eşleşme olmadığında) "404 Not Found" hatası döndürülür. Bunun için ./fsm/404.html dosyası okunur ve ilgili yanıt oluşturulur.
Sunucunun dinlemeye başlaması:

server.listen(3000) ifadesi ile sunucu 3000 numaralı bağlantı noktasını dinlemeye başlar.
Konsola mesaj yazdırma:

"server is working" mesajı konsola yazdırılır, sunucunun başarıyla çalıştığını belirtir.
Bu kod bloğu, bir web sunucusunu çalıştırarak farklı URL'lere göre farklı içeriklerin döndürülmesini sağlar. Kök URL ("/") için index.html, "/blog" URL'i için blog.html ve diğer tüm URL için de 404.html çalıştırlır. 

temel routing işlemleri için dosya yönlendirmeleri yaptık. 