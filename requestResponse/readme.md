


Bu kod bloğunda basit bir HTTP sunucusu oluşturulmuş ve isteklere yanıt verilmiştir. İşleyiş aşağıdaki gibidir:

1. İlgili modülün import edilmesi:

 - http modülü, HTTP sunucusu oluşturmak için kullanılır.

2. Sunucu oluşturma:

 - http.createServer() fonksiyonu ile bir HTTP sunucusu oluşturulur.
 - Sunucu, bir callback fonksiyon alır ve her istek için bu callback fonksiyonu çalıştırır. 
 - Callback fonksiyonu, request (istek) ve response (yanıt) parametrelerini alır.

3. Yanıtın hazırlanması:

 - İstek yapılan her seferde çalışan callback fonksiyonunda, yanıtla ilgili işlemler yapılır.
 - İlk olarak, response.setHeader() fonksiyonu ile "Content-Type" başlığı "text/html" olarak ayarlanır.
 - Ardından, response.statusCode ile durum kodu 200 (başarılı) olarak belirlenir.
 - response.statusMessage ile durum mesajı "OK" olarak belirlenir.

4. Yanıtın oluşturulması:

 - response.write() fonksiyonu ile yanıt içeriği oluşturulur. İlgili HTML etiketleri yazılmıştır.
 - Birden fazla response.write() ifadesi kullanarak yanıt içeriği eklenebilir.

5. Yanıtın tamamlanması:

 - response.end() fonksiyonu ile yanıt tamamlanır ve istemciye gönderilir.
 
6. Sunucunun dinlemeye başlaması:

 - server.listen(3000) ifadesi ile sunucu 3000 numaralı bağlantı noktasını dinlemeye başlar.

Bu kod bloğu, tarayıcıda http://localhost:3000 adresine gidildiğinde, "ana sayfa" ve "urunler" metinlerini içeren bir HTML yanıtı döndürür. Bu basit örnekte, tek bir URL için sabit bir yanıt oluşturulmuştur.