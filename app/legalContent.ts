import type { LegalSection } from "./components/LegalPage";
import { company } from "./company";
import { services } from "./services";

const serviceNameList = services.map((service) => service.titleTr).join(", ");

export const legalContent: Record<string, { title: string; description: string; sections: LegalSection[] }> = {
  kvkk: {
    title: "KVKK Aydınlatma Metni",
    description:
      "Bu aydınlatma metni, Pharos Teknoloji'nin web sitesi, iletişim formu ve satın alma/ödeme süreçlerinde kişisel verilerin nasıl işlendiğini açıklar.",
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
          "Web sitesi üzerinden yalnızca iletişim formu ve satın alma/ödeme adımlarında paylaştığınız veriler işlenir. Pharos, kullanıcı hesabı veya giriş sistemi işletmez; veriler doğrudan sizin doldurduğunuz formlardan toplanır.",
        ],
        items: [
          "İletişim formu verileri: ad soyad, e-posta adresi, telefon numarası (opsiyonel), ilgilenilen hizmet, bütçe aralığı (opsiyonel) ve proje mesajınız.",
          "Satın alma/fatura verileri: ad soyad, e-posta, telefon, fatura adresi, şehir, ülke, posta kodu ve kimlik/vergi numarası (TC Kimlik, pasaport veya vergi numarası — müşteri tipine göre).",
          "Ödeme verileri: kart numarası ve CVV gibi hassas ödeme bilgileri Pharos tarafından hiçbir şekilde saklanmaz; ödeme iyzico'nun güvenli ödeme altyapısı üzerinden doğrudan işlenir. Pharos yalnızca işlem referansı, ödeme durumu ve tutar bilgisini tutar.",
          "Teknik veriler: web sitesi altyapısını sağlayan barındırma ve bulut hizmetleri (Firebase/Google Cloud) tarafından tutulan standart erişim ve güvenlik kayıtları.",
        ],
      },
      {
        heading: "Veri Toplama Yöntemleri",
        paragraphs: [
          "Veriler, iletişim formu ve satın alma formu aracılığıyla elektronik ortamda doğrudan sizin tarafınızdan girilerek toplanır.",
          "Form verileri Firebase/Firestore altyapısında saklanır; ödeme işlemleri iyzico'nun sunucularında gerçekleştirilir.",
        ],
      },
      {
        heading: "İşleme Amaçları",
        items: [
          "İletişim formu talebinizi değerlendirmek ve size dönüş yapmak.",
          "Satın alınan hizmet için sözleşme, fatura ve teslim sürecini yürütmek.",
          "Ödeme işlemini iyzico üzerinden güvenli şekilde gerçekleştirmek.",
          "Yasal yükümlülükleri (fatura, muhasebe, vergi mevzuatı) yerine getirmek.",
          "Web sitesi güvenliğini sağlamak ve kötüye kullanımı önlemek.",
        ],
      },
      {
        heading: "Hukuki Sebepler ve Aktarımlar",
        paragraphs: [
          "Kişisel veriler; sözleşmenin kurulması veya ifası, hukuki yükümlülüklerin yerine getirilmesi ve meşru menfaat hukuki sebeplerine dayanılarak işlenir.",
          "Veriler; ödeme işlemi için iyzico, barındırma ve veri depolama için Firebase/Google Cloud, ve yasal yükümlülük halinde yetkili kamu kurumları ile sınırlı olarak paylaşılabilir.",
        ],
      },
      {
        heading: "Saklama Süresi",
        paragraphs: [
          "Kişisel veriler işleme amacının gerektirdiği süre boyunca ve ilgili mevzuatta öngörülen zamanaşımı, muhasebe, vergi ve sözleşme yükümlülükleri süresince saklanır. Amaç ortadan kalktığında veriler silinir, yok edilir veya anonim hale getirilir.",
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
      "Bu politika, Pharos Teknoloji web sitesinde gizlilik, çerezler, iletişim formu, ödeme süreci ve güvenlik uygulamalarını açıklar.",
    sections: [
      {
        heading: "Kapsam",
        paragraphs: [
          "Bu Gizlilik Politikası, Pharos Teknoloji'nin kurumsal web sitesi, iletişim formu ve hizmet satın alma/ödeme akışı için geçerlidir.",
        ],
      },
      {
        heading: "Çerezler",
        paragraphs: [
          "Web sitesi, çerez onay tercihinizi hatırlamak için tarayıcınızın yerel depolama alanını kullanır. Bunun dışında zorunlu olmayan çerez veya analiz aracı kullanılmamaktadır; bu politika, ileride analiz veya benzer araçlar eklenmesi halinde güncellenecektir.",
        ],
      },
      {
        heading: "İletişim Formu",
        paragraphs: [
          "İletişim formunda paylaştığınız ad, e-posta, telefon, ilgilenilen hizmet, bütçe ve mesaj bilgileri talebinizi değerlendirmek ve size dönüş yapmak amacıyla Firestore veritabanında saklanır.",
        ],
      },
      {
        heading: "Ödeme Sistemleri",
        paragraphs: [
          "Hizmet satın alma ödemeleri iyzico'nun güvenli ödeme altyapısı üzerinden yürütülür. Pharos kart numarası ve CVV gibi hassas ödeme bilgilerini kendi sistemlerinde saklamaz. İşlem referansı, ödeme durumu ve fatura bilgisi operasyonel ve yasal amaçlarla tutulabilir.",
        ],
      },
      {
        heading: "Üçüncü Taraf Hizmetler",
        paragraphs: [
          "Web sitesi; barındırma ve veritabanı için Firebase/Google Cloud, ödeme için iyzico hizmetlerinden yararlanır. Bu hizmetler yalnızca gerekli teknik ve operasyonel amaçlarla veri işler.",
        ],
      },
      {
        heading: "Güvenlik",
        paragraphs: [
          "Pharos, yetkisiz erişim, veri kaybı ve kötüye kullanımı azaltmak için makul teknik ve idari güvenlik tedbirleri uygular. İnternet üzerinden veri iletiminin tamamen risksiz olmadığı dikkate alınmalıdır.",
        ],
      },
      {
        heading: "Verilerinize Erişim Talebi",
        paragraphs: [
          `Paylaştığınız verilere erişim, düzeltme veya silme talepleriniz için ${company.email} adresinden bizimle iletişime geçebilirsiniz.`,
        ],
      },
    ],
  },
  terms: {
    title: "Kullanım Şartları",
    description:
      "Bu kullanım şartları, Pharos Teknoloji web sitesinin ve hizmet satın alma sürecinin kullanımına ilişkin hak ve yükümlülükleri düzenler.",
    sections: [
      {
        heading: "Kabul ve Kapsam",
        paragraphs: [
          "Web sitesini kullanan veya iletişim formu ile satın alma akışı üzerinden Pharos Teknoloji'den hizmet talep eden herkes bu Kullanım Şartları'nı kabul etmiş sayılır.",
        ],
      },
      {
        heading: "Sunulan Hizmetler",
        paragraphs: [
          `Pharos Teknoloji; ${serviceNameList} başta olmak üzere, özel yazılım geliştirme hizmetleri sunar. Web sitesinde gösterilen paketler, daha kapsamlı bir mühendislik ortaklığı için başlangıç noktalarıdır; nihai kapsam ve fiyat, ücretsiz ön görüşme sonrası netleştirilir.`,
        ],
      },
      {
        heading: "Kullanıcı Sorumlulukları",
        items: [
          "İletişim formu ve satın alma formunda paylaşılan bilgilerin doğru, güncel ve eksiksiz olması.",
          "Proje kapsamı ve gereksinimlerin mümkün olduğunca net şekilde iletilmesi.",
          "Fatura ve ödeme bilgilerinin hukuka uygun şekilde paylaşılması.",
        ],
      },
      {
        heading: "Hizmet Süreci",
        paragraphs: [
          "Süreç; talep formu, ücretsiz ön görüşme, kapsam ve fiyat teklifinin onayı, güvenli ödeme ve proje kickoff adımlarını izler. Teslim süreleri, onaylanan teklifte belirtilen zaman planına göre uygulanır.",
        ],
      },
      {
        heading: "Sözleşme İlişkisi",
        paragraphs: [
          "Ödeme sonrası hizmet kapsamı, teslim planı ve tarafların yükümlülükleri ayrıca bir sözleşme ile netleştirilir. Bu Kullanım Şartları, taraflar arasında ayrıca imzalanan sözleşme hükümlerinin yerine geçmez.",
        ],
      },
      {
        heading: "Sorumluluk Sınırları",
        paragraphs: [
          "Pharos, sözleşmede belirtilen kapsam ve standartlar dahilinde hizmet sunmayı taahhüt eder. Yürürlükteki hukukun izin verdiği ölçüde, sözleşme kapsamı dışındaki kullanımlardan veya kullanıcı kaynaklı hatalı bilgi/gereksinimlerden doğan sonuçlardan Pharos sorumlu tutulamaz.",
        ],
      },
    ],
  },
  "distance-sales": {
    title: "Mesafeli Satış Sözleşmesi",
    description:
      "Bu sözleşme, Pharos Teknoloji web sitesi üzerinden satın alınan yazılım geliştirme hizmeti paketleri için genel mesafeli satış hükümlerini açıklar.",
    sections: [
      {
        heading: "Taraflar",
        paragraphs: [
          `Satıcı: ${company.name}. Alıcı: Web sitesi üzerinden hizmet paketi satın alan gerçek ya da tüzel kişi.`,
        ],
        items: [
          `Unvan: ${company.name}`,
          `Adres: ${company.address}`,
          `Telefon: ${company.phone}`,
          `E-posta: ${company.email}`,
        ],
      },
      {
        heading: "Konu",
        paragraphs: [
          "Bu sözleşme, elektronik ortamda kurulan ve web sitesinde listelenen yazılım geliştirme hizmeti paketlerinin satın alınmasına ilişkin tarafların hak ve yükümlülüklerini düzenler.",
        ],
      },
      {
        heading: "Hizmet Bilgileri",
        paragraphs: [
          `Satın alınabilecek hizmetler: ${serviceNameList}. Her hizmetin kapsamı, dahil olan özellikler ve teslim süresi ilgili hizmet detay sayfasında belirtilir.`,
        ],
      },
      {
        heading: "Fiyat, Ödeme ve Teslimat",
        paragraphs: [
          "Hizmetin başlangıç fiyatı ve teslim süresi, satın alma öncesinde web sitesinde açıkça gösterilir. Ödeme, iyzico güvenli ödeme altyapısı üzerinden tamamlanır. Ödeme sonrası proje kickoff toplantısı ile teslim süreci başlar.",
        ],
      },
      {
        heading: "Cayma Hakkı",
        paragraphs: [
          "Kullanıcının onayıyla ifasına başlanan bir hizmetin niteliğine göre cayma hakkının uygulanma şekli değişebilir. Ödeme sonrası proje kickoff toplantısı yapılmadan önce iletilen cayma talepleri değerlendirilir; kickoff sonrası başlayan iş için cayma hakkı, yürürlükteki tüketici mevzuatına göre sınırlanabilir.",
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
      "Bu politika, Pharos Teknoloji hizmet paketi satın alımlarında iptal, iade koşulları ve ödeme uyuşmazlıkları için uygulanır.",
    sections: [
      {
        heading: "Ödeme Öncesi İptal",
        paragraphs: [
          "Ücretsiz ön görüşme ve teklif aşamasında herhangi bir ücret alınmaz; bu aşamada iptal serbesttir.",
        ],
      },
      {
        heading: "Ödeme Sonrası İptal",
        paragraphs: [
          "Ödeme tamamlandıktan ve proje kickoff toplantısı yapılmadan önce iletilen iptal talepleri tam iade ile sonuçlandırılır. Kickoff toplantısı yapılmış ve geliştirme süreci başlamış projelerde, o ana kadar tamamlanan iş göz önünde bulundurularak kısmi iade değerlendirilir.",
        ],
      },
      {
        heading: "İade Senaryoları",
        items: [
          "Hizmetin teknik hata nedeniyle hiç sunulamaması ve makul sürede giderilememesi.",
          "Mükerrer ödeme alınması.",
          "Platform tarafından açıkça hatalı fiyatlandırma veya işlem yapılması.",
          "Yürürlükteki mevzuat kapsamında iade hakkı doğuran diğer haller.",
        ],
      },
      {
        heading: "İade Edilmeyen Durumlar",
        items: [
          "Kickoff toplantısı sonrası tamamlanmış geliştirme çalışması karşılığı ödemeler.",
          "Kullanıcı kaynaklı eksik veya yanlış proje bilgisi/gereksinimi nedeniyle oluşan gecikmeler.",
        ],
      },
      {
        heading: "İade Süreci",
        paragraphs: [
          `İade talepleri işlem bilgileriyle birlikte ${company.email} adresine iletilebilir. Talep incelenirken ödeme kaydı ve proje durumu dikkate alınır. Onaylanan iadeler, iyzico'nun işlem sürelerine göre aynı ödeme yöntemine aktarılır.`,
        ],
      },
      {
        heading: "Ödeme Uyuşmazlıkları",
        paragraphs: [
          "Kullanıcı, kart sahibi itirazı veya chargeback başlatmadan önce destek kanalı üzerinden başvuru yapmalıdır. Pharos, iyzico ile birlikte uyuşmazlık kayıtlarını inceleyebilir.",
        ],
      },
    ],
  },
  cookies: {
    title: "Çerez Politikası",
    description:
      "Bu politika, Pharos Teknoloji web sitesinde kullanılan çerez ve benzeri depolama teknolojilerinin amaçlarını açıklar.",
    sections: [
      {
        heading: "Çerez Nedir?",
        paragraphs: [
          "Çerezler, web sitesi ziyaret edildiğinde tarayıcıya veya cihaza kaydedilen küçük veri dosyalarıdır. Bu sayfa, tarayıcı yerel depolama alanı (localStorage) gibi benzer teknolojileri de kapsar.",
        ],
      },
      {
        heading: "Kullanılan Depolama Teknolojileri",
        paragraphs: [
          "Web sitesi şu anda yalnızca çerez onay tercihinizi hatırlamak için tarayıcınızın yerel depolama alanını kullanır. Bunun dışında analiz, reklam veya izleme amaçlı çerez kullanılmamaktadır.",
        ],
      },
      {
        heading: "Zorunlu Depolama",
        paragraphs: [
          "Çerez onay tercihinizin hatırlanması, tercihinizi her ziyarette tekrar sormamak için gereklidir ve web sitesinin temel çalışması için zorunludur.",
        ],
      },
      {
        heading: "Gelecekteki Değişiklikler",
        paragraphs: [
          "Web sitesine ileride analiz veya benzer araçlar eklenmesi halinde bu politika güncellenecek ve eklenen araçlar burada açıkça belirtilecektir.",
        ],
      },
      {
        heading: "Yönetim",
        paragraphs: [
          "Kullanıcılar tarayıcı ayarlarından yerel depolama verilerini ve çerezleri silebilir.",
        ],
      },
    ],
  },
  "platform-disclaimer": {
    title: "Hizmet Sağlayıcı Bilgilendirmesi",
    description:
      "Bu sayfa, Pharos Teknoloji'nin web sitesinde sunulan hizmetler karşısındaki rolünü açıklar.",
    sections: [
      {
        heading: "Doğrudan Hizmet Sağlayıcı",
        paragraphs: [
          "Pharos Teknoloji, web sitesinde listelenen yazılım geliştirme hizmetlerini kendi mühendislik ekibiyle doğrudan sunan bir yazılım geliştirme şirketidir. Pharos, kullanıcıları bağımsız üçüncü taraf hizmet sağlayıcılarla buluşturan bir aracı pazar yeri platformu değildir.",
        ],
      },
      {
        heading: "Sorumluluk",
        paragraphs: [
          "Satın alınan her hizmetin kapsamı, teslim süreci ve sonuçlarından doğrudan Pharos Teknoloji sorumludur; bu sorumluluk, ödeme sonrası hazırlanan sözleşme ve teklif ile netleştirilir.",
        ],
      },
      {
        heading: "İletişim",
        paragraphs: [
          `Bu sayfa hakkında sorularınız için ${company.email} adresinden bizimle iletişime geçebilirsiniz.`,
        ],
      },
    ],
  },
};
