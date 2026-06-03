import type { LegalSection } from "./components/LegalPage";
import { company } from "./company";

export const legalContent: Record<string, { title: string; description: string; sections: LegalSection[] }> = {
  kvkk: {
    title: "KVKK Aydınlatma Metni",
    description:
      "Bu aydınlatma metni, Pharos Teknoloji tarafından sunulan web sitesi, mobil uygulama ve Petsupo dahil dijital platformlarda kişisel verilerin nasıl işlendiğini açıklar.",
    sections: [
      {
        heading: "Veri Sorumlusu",
        paragraphs: [
          `6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri sorumlusu ${company.name} olup iletişim bilgilerimiz bu sayfada yer almaktadır.`,
        ],
        items: [
          `Unvan: ${company.name}`,
          `Adres: ${company.address}`,
          `Telefon: ${company.phone}`,
          `E-posta: ${company.email}`,
          `MERSIS: ${company.mersis}`,
          `Vergi No: ${company.taxNumber}`,
        ],
      },
      {
        heading: "Toplanan Veri Kategorileri",
        paragraphs: [
          "Platformun kullanımına, talep edilen hizmete ve kullanıcının verdiği izinlere göre kişisel veriler doğrudan kullanıcıdan, cihazlardan, ödeme altyapılarından, iş ortaklarından ve otomatik sistemlerden toplanabilir.",
        ],
        items: [
          "Kimlik ve iletişim verileri: ad soyad, e-posta adresi, telefon numarası, hesap bilgileri.",
          "Konum verileri: randevu, taksi, yakın hizmet sağlayıcı veya teslimat benzeri özellikler için kullanıcının açık iznine bağlı yaklaşık veya hassas konum bilgileri.",
          "Medya ve cihaz izinleri: galeri, kamera ve mikrofon erişimiyle yüklenen fotoğraf, video, ses veya benzeri kullanıcı içerikleri.",
          "Evcil hayvan verileri: pet adı, tür, ırk, yaş, sağlık notları, bakım tercihleri, randevu geçmişi ve kullanıcı tarafından eklenen diğer pet bilgileri.",
          "İşlem ve ödeme metadataları: abonelik tipi, ödeme durumu, fatura/işlem referansı, iade ve uyuşmazlık kayıtları. Kart bilgileri Pharos tarafından saklanmaz; ödeme sağlayıcısının güvenli altyapısı üzerinden işlenir.",
          "Kullanım verileri: IP adresi, cihaz bilgisi, oturum kayıtları, hata logları, çerezler, analiz olayları ve güvenlik kayıtları.",
        ],
      },
      {
        heading: "Veri Toplama Yöntemleri",
        paragraphs: [
          "Veriler web formları, mobil uygulama ekranları, hesap oluşturma ve kimlik doğrulama süreçleri, randevu ve sipariş işlemleri, ödeme adımları, destek talepleri, çerezler, SDK'lar, log kayıtları ve kullanıcı tarafından yüklenen içerikler aracılığıyla elektronik ortamda toplanır.",
          "Firebase altyapısı kullanıldığında veriler ve teknik kayıtlar, Firebase'in Avrupa bölgesindeki sunucularında işlenebilir veya saklanabilir. Kullanılan hizmetin niteliğine göre yedekleme, güvenlik, hata izleme ve performans kayıtları da bu altyapıda tutulabilir.",
        ],
      },
      {
        heading: "İşleme Amaçları",
        items: [
          "Hesap oluşturma, oturum açma, kimlik doğrulama ve kullanıcı güvenliğini sağlama.",
          "Abonelik, randevu, pazar yeri, dijital ürün ve hizmet işlemlerini yürütme.",
          "Veteriner, kuaför, taksi sağlayıcısı, otel ve diğer işletmelerle kullanıcı taleplerini eşleştirme.",
          "Ödeme, faturalama, iade, iptal ve uyuşmazlık süreçlerini yönetme.",
          "Kullanıcı destek taleplerini cevaplama ve iletişim yürütme.",
          "Platform güvenliğini sağlama, kötüye kullanımı önleme ve hata kayıtlarını inceleme.",
          "Hizmet kalitesini ölçme, analiz yapma, ürün geliştirme ve performans iyileştirme.",
          "Yasal yükümlülükleri yerine getirme ve yetkili kurum taleplerini karşılama.",
        ],
      },
      {
        heading: "Hukuki Sebepler ve Aktarımlar",
        paragraphs: [
          "Kişisel veriler; sözleşmenin kurulması veya ifası, hukuki yükümlülüklerin yerine getirilmesi, meşru menfaat, bir hakkın tesisi veya korunması ve gerekli hallerde açık rıza hukuki sebeplerine dayanılarak işlenir.",
          "Veriler, hizmetin sunulması için ödeme kuruluşları, barındırma ve bulut hizmet sağlayıcıları, Firebase ve benzeri teknik altyapı sağlayıcıları, analiz ve hata izleme araçları, hizmet sağlayıcı işletmeler, yetkili kamu kurumları ve hukuki danışmanlarla sınırlı olarak paylaşılabilir.",
        ],
      },
      {
        heading: "Saklama Süresi",
        paragraphs: [
          "Kişisel veriler işleme amacının gerektirdiği süre boyunca ve ilgili mevzuatta öngörülen zamanaşımı, muhasebe, vergi, tüketici hukuku, sözleşme ve bilgi güvenliği yükümlülükleri süresince saklanır. Amaç ortadan kalktığında veriler silinir, yok edilir veya anonim hale getirilir.",
        ],
      },
      {
        heading: "İlgili Kişi Hakları",
        paragraphs: [
          "KVKK'nın 11. maddesi kapsamında kullanıcılar kişisel verilerinin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işleme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme, aktarılan üçüncü kişileri bilme, eksik veya yanlış verilerin düzeltilmesini isteme, silme veya yok etme talep etme, aktarımların bildirilmesini isteme, otomatik işlem sonucuna itiraz etme ve zarara uğranması halinde giderim talep etme haklarına sahiptir.",
        ],
      },
      {
        heading: "Başvuru ve İletişim",
        paragraphs: [
          `KVKK kapsamındaki talepler ${company.email} adresine, yazılı başvuru yoluyla şirket adresimize veya mevzuatta kabul edilen diğer yöntemlerle iletilebilir. Başvurularda kimlik doğrulaması için gerekli bilgiler talep edilebilir ve talepler yasal süreler içinde sonuçlandırılır.`,
        ],
      },
    ],
  },
  privacy: {
    title: "Gizlilik Politikası",
    description:
      "Bu politika, Pharos Teknoloji web sitesi ve dijital platformlarında gizlilik, güvenlik, çerezler, analiz, kimlik doğrulama ve hesap silme süreçlerini açıklar.",
    sections: [
      {
        heading: "Kapsam",
        paragraphs: [
          "Bu Gizlilik Politikası, Pharos Teknoloji tarafından sunulan web sitesi, mobil uygulamalar, Petsupo platformu, dijital ürünler, abonelikler, randevu ve pazar yeri hizmetleri için geçerlidir.",
        ],
      },
      {
        heading: "Çerezler",
        paragraphs: [
          "Web sitesinde oturumun çalışması, güvenlik, tercihlerin hatırlanması, performans ölçümü ve kullanım analizleri için çerezler ve benzeri teknolojiler kullanılabilir. Zorunlu çerezler hizmetin sunulması için gereklidir; analitik ve tercih çerezleri kullanıcı ayarlarına göre yönetilebilir.",
        ],
      },
      {
        heading: "Analitik",
        paragraphs: [
          "Platform performansını, sayfa görüntülemelerini, özellik kullanımını, hata kayıtlarını ve dönüşüm metriklerini anlamak için analitik araçları kullanılabilir. Analitik veriler ürün geliştirme, güvenlik ve hizmet kalitesi amaçlarıyla değerlendirilir.",
        ],
      },
      {
        heading: "Kimlik Doğrulama",
        paragraphs: [
          "Hesap açma ve oturum açma süreçlerinde e-posta, telefon, tek kullanımlık doğrulama kodları, cihaz ve oturum kayıtları işlenebilir. Şüpheli erişimleri önlemek için güvenlik kayıtları tutulabilir.",
        ],
      },
      {
        heading: "Ödeme Sistemleri",
        paragraphs: [
          "Abonelik, randevu, dijital ürün ve pazar yeri ödemeleri yetkili ödeme sağlayıcıları üzerinden yürütülür. Pharos kart numarası ve CVV gibi hassas ödeme bilgilerini kendi sistemlerinde saklamaz. İşlem referansı, ödeme durumu, fatura bilgisi, iade kaydı ve uyuşmazlık metadataları operasyonel ve yasal amaçlarla tutulabilir.",
        ],
      },
      {
        heading: "Kullanıcı Tarafından Oluşturulan İçerik",
        paragraphs: [
          "Kullanıcılar profil, pet bilgileri, fotoğraf, video, yorum, mesaj, randevu notu veya destek talebi gibi içerikler ekleyebilir. Kullanıcı, yüklediği içeriklerin hukuka uygun olmasından ve üçüncü kişilerin haklarını ihlal etmemesinden sorumludur.",
        ],
      },
      {
        heading: "Üçüncü Taraf Hizmetler",
        paragraphs: [
          "Platform; barındırma, Firebase, analiz, hata izleme, ödeme, bildirim, harita, iletişim ve hizmet sağlayıcı entegrasyonları gibi üçüncü taraf hizmetlerden yararlanabilir. Bu hizmetler yalnızca gerekli teknik ve operasyonel amaçlarla veri işleyebilir.",
        ],
      },
      {
        heading: "Güvenlik",
        paragraphs: [
          "Pharos, yetkisiz erişim, veri kaybı, kötüye kullanım ve hizmet kesintilerini azaltmak için makul teknik ve idari güvenlik tedbirleri uygular. İnternet üzerinden veri iletiminin tamamen risksiz olmadığı dikkate alınmalıdır.",
        ],
      },
      {
        heading: "Hesap Silme Talebi",
        paragraphs: [
          `Kullanıcılar hesap silme taleplerini uygulama içindeki ilgili alandan veya ${company.email} adresine e-posta göndererek iletebilir. Talep doğrulandıktan sonra hesap kapatılır; yasal yükümlülükler, açık uyuşmazlıklar, ödeme kayıtları, güvenlik logları ve mevzuat gereği saklanması gereken veriler ilgili süreler boyunca muhafaza edilebilir.`,
        ],
      },
    ],
  },
  terms: {
    title: "Kullanım Şartları",
    description:
      "Bu kullanım şartları, Pharos Teknoloji ve Petsupo dahil dijital platformların kullanımına ilişkin hak ve yükümlülükleri düzenler.",
    sections: [
      {
        heading: "Kabul ve Kapsam",
        paragraphs: [
          "Web sitesini, mobil uygulamayı veya platform hizmetlerini kullanan herkes bu Kullanım Şartları'nı kabul etmiş sayılır. Bu şartlar abonelikler, randevular, pazar yeri işlemleri, dijital ürünler ve destek hizmetleri için geçerlidir.",
        ],
      },
      {
        heading: "Kullanıcı Sorumlulukları",
        items: [
          "Hesap bilgilerinin doğru, güncel ve eksiksiz tutulması.",
          "Giriş bilgilerinin gizli tutulması ve yetkisiz kullanımların bildirilmesi.",
          "Pet, randevu, ödeme, adres, konum ve iletişim bilgilerinin hukuka uygun paylaşılması.",
          "Platformun üçüncü kişilerin haklarını ihlal edecek veya hizmet güvenliğini zedeleyecek şekilde kullanılmaması.",
        ],
      },
      {
        heading: "Platform Kullanım Kuralları",
        items: [
          "Sahte hesap, yanıltıcı bilgi, dolandırıcılık, taciz, spam, zararlı yazılım veya tersine mühendislik faaliyetleri yasaktır.",
          "Kullanıcı içerikleri hukuka, ahlaka, fikri mülkiyet haklarına ve platform kurallarına uygun olmalıdır.",
          "Randevu ve pazar yeri işlemlerinde kullanıcılar seçtikleri hizmet sağlayıcıların koşullarına ve uygulama içi bilgilendirmelere uymalıdır.",
        ],
      },
      {
        heading: "Hesap Askıya Alma ve Sonlandırma",
        paragraphs: [
          "Pharos; güvenlik riski, hukuka aykırı kullanım, ödeme sorunu, üçüncü kişi hak ihlali, yanıltıcı bilgi, kötüye kullanım veya bu şartların ihlali halinde hesabı geçici veya kalıcı olarak askıya alma, erişimi sınırlama ya da hizmeti sonlandırma hakkını saklı tutar.",
        ],
      },
      {
        heading: "Abonelik Şartları",
        paragraphs: [
          "Abonelikler seçilen plan, süre, fiyat ve yenileme koşullarına göre uygulanır. Kullanıcı, aboneliği başlatmadan önce gösterilen ücretleri ve ödeme dönemlerini kabul eder. Abonelik iptalleri bir sonraki dönem için geçerli olur; yürürlükteki dönem için iade hakkı İptal ve İade Politikası'na göre değerlendirilir.",
        ],
      },
      {
        heading: "Pazar Yeri ve Hizmet Sınırlamaları",
        paragraphs: [
          "Pharos, Petsupo gibi platformlarda kullanıcılarla veteriner, kuaför, taksi sağlayıcısı, otel ve diğer işletmeleri buluşturan teknoloji sağlayıcı ve aracı platform rolündedir. Hizmetin fiili ifası, fiyatlandırma detayları, uygunluk, lisans, kalite ve sonuçlarından ilgili hizmet sağlayıcı sorumludur.",
        ],
      },
      {
        heading: "Sorumluluk Sınırları",
        paragraphs: [
          "Platform kesintisiz, hatasız veya her kullanıcı beklentisine uygun çalışacağını garanti etmez. Pharos, yürürlükteki hukukun izin verdiği ölçüde dolaylı zararlar, kar kaybı, veri kaybı, üçüncü taraf hizmetleri, hizmet sağlayıcı davranışları ve kullanıcı kaynaklı hatalardan sorumlu tutulamaz.",
        ],
      },
    ],
  },
  "distance-sales": {
    title: "Mesafeli Satış Sözleşmesi",
    description:
      "Bu sözleşme, Pharos Teknoloji platformları üzerinden sunulan abonelik, randevu, pazar yeri hizmeti ve dijital ürün işlemleri için genel mesafeli satış hükümlerini açıklar.",
    sections: [
      {
        heading: "Taraflar",
        paragraphs: [
          `Satıcı veya sağlayıcı: ${company.name}. Alıcı veya kullanıcı: Platform üzerinden abonelik, randevu, dijital ürün veya pazar yeri hizmeti satın alan gerçek ya da tüzel kişi.`,
        ],
      },
      {
        heading: "Konu",
        paragraphs: [
          "Bu sözleşme, elektronik ortamda kurulan ve dijital hizmetler, abonelikler, randevu rezervasyonları, pazar yeri hizmetleri ve dijital ürünlerin satın alınmasına ilişkin tarafların hak ve yükümlülüklerini düzenler.",
        ],
      },
      {
        heading: "Hizmet ve Ürün Bilgileri",
        items: [
          "Abonelikler: Kullanıcıya belirli süre veya dönem boyunca sunulan dijital özellikler ve hizmet paketleri.",
          "Randevular: Veteriner, kuaför, bakım, taksi, otel veya benzeri hizmet sağlayıcılarla oluşturulan tarih ve saat bazlı rezervasyonlar.",
          "Pazar yeri hizmetleri: Kullanıcı ile bağımsız işletme veya profesyonelleri buluşturan platform işlemleri.",
          "Dijital ürünler: Uygulama içi içerikler, dijital planlar, raporlar, yazılım özellikleri, online hizmetler veya elektronik olarak teslim edilen benzeri ürünler.",
        ],
      },
      {
        heading: "Fiyat, Ödeme ve Teslimat",
        paragraphs: [
          "Hizmetin fiyatı, vergiler, ödeme dönemi, teslim veya ifa zamanı satın alma ekranında gösterilir. Ödeme, platformda sunulan ödeme altyapısı üzerinden tamamlanır. Dijital ürün ve aboneliklerde teslimat elektronik erişim sağlanmasıyla; randevularda ise rezervasyon onayı ve hizmet sağlayıcının ifasıyla gerçekleşir.",
        ],
      },
      {
        heading: "Cayma Hakkı",
        paragraphs: [
          "Cayma hakkı, satın alınan hizmetin niteliğine ve yürürlükteki tüketici mevzuatına göre değerlendirilir. Kullanıcının onayıyla elektronik ortamda anında ifasına başlanan dijital içerik veya dijital hizmetlerde, ifa başladıktan sonra cayma hakkı sınırlanabilir. Belirli tarihli randevu ve rezervasyonlarda iptal koşulları hizmet sağlayıcı veya platform tarafından satın alma öncesinde bildirilen kurallara göre uygulanır.",
        ],
      },
      {
        heading: "Abonelikler",
        paragraphs: [
          "Abonelikler satın alma ekranında belirtilen dönemlerde yenilenebilir. Kullanıcı aboneliğini uygulama mağazası, ödeme sağlayıcı paneli veya platform içi hesap alanından iptal edebilir. İptal, aksi belirtilmedikçe mevcut dönemin sonuna kadar erişimi sürdürür ve sonraki yenilemeyi durdurur.",
        ],
      },
      {
        heading: "Pazar Yeri İşlemleri",
        paragraphs: [
          "Pazar yeri modelinde Pharos, teknoloji altyapısı ve aracı platform sağlar. Fiili hizmet, randevu uygunluğu, mesleki kararlar, hizmet kalitesi, yasal izinler ve işletme kaynaklı iadeler ilgili hizmet sağlayıcı tarafından yönetilir. Pharos, kullanıcı deneyimini korumak için destek ve uyuşmazlık yönetimi süreçleri sunabilir.",
        ],
      },
      {
        heading: "Uyuşmazlık ve Başvuru",
        paragraphs: [
          `Kullanıcılar soru ve taleplerini ${company.email} adresine iletebilir. Tüketici sıfatıyla yapılan işlemlerde kullanıcılar yürürlükteki mevzuatta öngörülen tüketici hakem heyeti veya tüketici mahkemesi yollarına başvurabilir.`,
        ],
      },
    ],
  },
  refund: {
    title: "İptal ve İade Politikası",
    description:
      "Bu politika, abonelik iptalleri, randevu iptalleri, iade koşulları, iade edilmeyen durumlar ve ödeme uyuşmazlıkları için uygulanır.",
    sections: [
      {
        heading: "Abonelik İptali",
        paragraphs: [
          "Kullanıcılar aboneliklerini uygulama mağazası, ödeme sağlayıcı hesabı veya platform içi hesap ayarları üzerinden iptal edebilir. İptal işlemi, aksi belirtilmedikçe bir sonraki yenileme dönemini durdurur ve mevcut dönem sonuna kadar erişim devam eder.",
        ],
      },
      {
        heading: "Randevu İptali",
        paragraphs: [
          "Randevu iptalleri, seçilen hizmet sağlayıcının takvimi, hizmet türü ve satın alma öncesinde gösterilen iptal koşullarına göre değerlendirilir. Geç iptal, randevuya gelmeme veya hizmet sağlayıcının hazırlık maliyeti doğurduğu durumlarda ücret kesintisi uygulanabilir.",
        ],
      },
      {
        heading: "İade Senaryoları",
        items: [
          "Hizmetin teknik hata nedeniyle hiç sunulamaması ve makul sürede giderilememesi.",
          "Mükerrer ödeme alınması.",
          "Hizmet sağlayıcının onaylı randevuyu yerine getirmemesi ve alternatif çözüm sunulamaması.",
          "Platform tarafından açıkça hatalı fiyatlandırma veya işlem yapılması.",
          "Yürürlükteki mevzuat kapsamında iade hakkı doğuran diğer haller.",
        ],
      },
      {
        heading: "İade Edilmeyen Durumlar",
        items: [
          "Kullanıcının onayıyla erişime açılan ve kullanılmaya başlanan dijital içerik veya dijital hizmetler.",
          "Mevcut abonelik döneminde kullanılmış süre veya özellikler.",
          "Randevuya gelmeme, geç iptal veya kullanıcı kaynaklı eksik/yanlış bilgi nedeniyle ifa edilemeyen hizmetler.",
          "Üçüncü taraf hizmet sağlayıcının kendi koşullarında iade dışı olduğu satın alma öncesinde bildirilen işlemler.",
          "Kampanya, promosyon veya deneme haklarının nakde çevrilmesi talepleri.",
        ],
      },
      {
        heading: "İade Süreci",
        paragraphs: [
          `İade talepleri işlem bilgileriyle birlikte ${company.email} adresine iletilebilir. Talep incelenirken kullanıcı kimliği, ödeme kaydı, hizmet durumu, randevu geçmişi, sağlayıcı yanıtı ve teknik kayıtlar dikkate alınır. Onaylanan iadeler ödeme sağlayıcısının işlem sürelerine göre aynı ödeme yöntemine aktarılır.`,
        ],
      },
      {
        heading: "Ödeme Uyuşmazlıkları",
        paragraphs: [
          "Kullanıcı, kart sahibi itirazı veya chargeback başlatmadan önce destek kanalı üzerinden başvuru yapmalıdır. Pharos, ödeme kuruluşları ve hizmet sağlayıcılarla birlikte uyuşmazlık kayıtlarını inceleyebilir; kötüye kullanım veya haksız itiraz halinde hesabı sınırlandırma hakkını saklı tutar.",
        ],
      },
    ],
  },
  cookies: {
    title: "Çerez Politikası",
    description:
      "Bu politika, Pharos Teknoloji web sitesinde kullanılan zorunlu, analitik ve tercih çerezlerinin amaçlarını açıklar.",
    sections: [
      {
        heading: "Çerez Nedir?",
        paragraphs: [
          "Çerezler, web sitesi ziyaret edildiğinde tarayıcıya veya cihaza kaydedilen küçük veri dosyalarıdır. Benzer teknolojiler yerel depolama, piksel, SDK ve oturum tanımlayıcılarını içerebilir.",
        ],
      },
      {
        heading: "Zorunlu Çerezler",
        paragraphs: [
          "Zorunlu çerezler web sitesinin güvenli ve temel fonksiyonlarıyla çalışması için gereklidir. Oturum yönetimi, form güvenliği, yük dengeleme, dil veya güvenlik tercihleri gibi amaçlarla kullanılabilir ve devre dışı bırakılmaları hizmetin çalışmasını etkileyebilir.",
        ],
      },
      {
        heading: "Analitik Çerezler",
        paragraphs: [
          "Analitik çerezler ziyaretçi sayısı, sayfa görüntüleme, trafik kaynağı, performans, hata ve etkileşim verilerini anlamak için kullanılabilir. Bu veriler siteyi iyileştirmek ve kullanıcı deneyimini ölçmek amacıyla değerlendirilir.",
        ],
      },
      {
        heading: "Tercih Çerezleri",
        paragraphs: [
          "Tercih çerezleri kullanıcının dil, bölge, görünüm veya önceki seçimlerini hatırlamak için kullanılabilir. Bu çerezler kullanıcı deneyimini kişiselleştirmeye yardımcı olur.",
        ],
      },
      {
        heading: "Çerez Yönetimi",
        paragraphs: [
          "Kullanıcılar tarayıcı ayarlarından çerezleri silebilir, engelleyebilir veya belirli çerez türleri için uyarı alabilir. Zorunlu olmayan çerezler için sunulan tercih mekanizmaları üzerinden seçimler güncellenebilir.",
        ],
      },
    ],
  },
  "platform-disclaimer": {
    title: "Platform Sorumluluk Beyanı",
    description:
      "Bu beyan, Petsupo ve Pharos platformlarının hizmet sağlayıcılar karşısındaki aracı teknoloji sağlayıcı rolünü açıklar.",
    sections: [
      {
        heading: "Platform Sağlayıcı Rolü",
        paragraphs: [
          "Petsupo ve Pharos, kullanıcıların veterinerler, pet kuaförleri, taksi sağlayıcıları, oteller, mağazalar ve diğer işletmelerle dijital ortamda iletişim kurmasına, randevu veya işlem oluşturmasına yardımcı olan teknoloji platformlarıdır.",
          "Pharos, platform altyapısı, yazılım, listeleme, rezervasyon, ödeme akışı, bildirim ve destek araçları sağlayabilir; ancak platformda yer alan bağımsız hizmet sağlayıcıların fiili hizmetlerinin doğrudan sağlayıcısı değildir.",
        ],
      },
      {
        heading: "Hizmet Sağlayıcı Sorumluluğu",
        paragraphs: [
          "Veterinerler, kuaförler, taksi sağlayıcıları, oteller, işletmeler ve diğer profesyoneller kendi lisansları, izinleri, mesleki kararları, hizmet kalitesi, fiyatlandırmaları, çalışanları, ekipmanları, hijyen koşulları, teslimatları ve kullanıcıyla kurdukları hizmet ilişkisi bakımından sorumludur.",
        ],
      },
      {
        heading: "Aracı Teknoloji Sağlayıcı",
        paragraphs: [
          "Pharos ve Petsupo, kullanıcı ile hizmet sağlayıcı arasındaki ilişkiyi kolaylaştıran aracı teknoloji sağlayıcıdır. Platformda gösterilen uygunluk, puan, yorum, fiyat, süre ve hizmet açıklamaları hizmet sağlayıcılardan, kullanıcılardan veya entegrasyonlardan gelebilir ve zaman içinde değişebilir.",
        ],
      },
      {
        heading: "Sınırlamalar",
        paragraphs: [
          "Pharos, yürürlükteki hukukun izin verdiği ölçüde, bağımsız hizmet sağlayıcıların hatalı teşhis, tedavi, bakım, taşıma, konaklama, gecikme, iptal, eksik ifa, fiyat uyuşmazlığı veya kullanıcıya verdiği zararlardan doğrudan sorumlu değildir. Platform, uyuşmazlıkların çözümü için destek süreçleri sunabilir ancak hizmet sağlayıcının yasal sorumluluğunu üstlenmez.",
        ],
      },
      {
        heading: "Kullanıcı Değerlendirmesi",
        paragraphs: [
          "Kullanıcılar hizmet almadan önce sağlayıcının lisansını, uzmanlığını, koşullarını, fiyatını, iptal politikasını ve hizmete uygunluğunu değerlendirmelidir. Acil sağlık veya güvenlik durumlarında doğrudan yetkili profesyoneller, acil servisler veya ilgili kamu kurumlarıyla iletişime geçilmelidir.",
        ],
      },
    ],
  },
};
