export type Service = {
  slug: string;
  titleTr: string;
  titleEn: string;
  summaryTr: string;
  summaryEn: string;
  description: string;
  features: string[];
  timeline: string;
  price: number;
  priceLabel: string;
  icon: "code" | "mobile" | "web" | "ai" | "product";
  faq: {
    question: string;
    answer: string;
  }[];
};

export const services: Service[] = [
  {
    slug: "custom-software-development",
    titleTr: "Özel Yazılım Geliştirme",
    titleEn: "Custom Software Development",
    summaryTr:
      "Şirket süreçlerinize özel CRM, panel, entegrasyon, otomasyon ve operasyonel yazılım çözümleri geliştiriyoruz.",
    summaryEn:
      "Custom platforms, back-office tools, integrations, automation, and operational software built around your workflows.",
    description:
      "İş süreçlerinize göre tasarlanan özel yazılım hizmeti; analiz, kapsam dokümanı, arayüz geliştirme, backend geliştirme, entegrasyon, test ve canlıya alma çalışmalarını kapsar. Hizmet, operasyonel verimlilik sağlayan yönetim panelleri, CRM modülleri, raporlama ekranları ve üçüncü parti sistem bağlantıları için uygundur.",
    features: [
      "İhtiyaç analizi ve teknik kapsam dokümanı",
      "Web tabanlı yönetim paneli veya operasyon aracı",
      "Veritabanı tasarımı ve backend geliştirme",
      "API ve üçüncü parti sistem entegrasyonları",
      "Test, canlıya alma ve temel kullanım dokümantasyonu",
    ],
    timeline: "İlk teslimat 4-8 hafta içinde planlanır.",
    price: 25000,
    priceLabel: "₺25.000",
    icon: "code",
    faq: [
      {
        question: "Bu paket hangi işletmeler için uygundur?",
        answer:
          "Manuel süreçlerini dijitalleştirmek, ekip içi operasyonlarını takip etmek veya mevcut sistemlerini entegre etmek isteyen şirketler için uygundur.",
      },
      {
        question: "Fiyata bakım dahil mi?",
        answer:
          "Başlangıç fiyatına proje teslimi, canlıya alma ve teslim sonrası temel düzeltmeler dahildir. Sürekli bakım ayrıca planlanır.",
      },
    ],
  },
  {
    slug: "mobile-app-development",
    titleTr: "Mobil Uygulama Geliştirme",
    titleEn: "Mobile App Development",
    summaryTr:
      "iOS ve Android için performanslı, ölçeklenebilir ve kullanıcı odaklı mobil ürünler geliştiriyoruz.",
    summaryEn:
      "High-performance mobile products for iOS and Android with scalable architecture and polished UX.",
    description:
      "Mobil uygulama geliştirme hizmeti; ürün kapsamı, kullanıcı akışları, iOS ve Android uygulama geliştirme, backend bağlantıları, test süreci ve mağaza yayına hazırlık çalışmalarını içerir. Kurumsal uygulamalar, müşteri uygulamaları ve MVP ürünleri için satın alınabilir başlangıç paketidir.",
    features: [
      "Mobil uygulama kapsam analizi",
      "iOS ve Android uyumlu uygulama geliştirme",
      "API bağlantıları ve kullanıcı hesap akışları",
      "Temel bildirim, form ve içerik ekranları",
      "Test ve mağaza yayına hazırlık desteği",
    ],
    timeline: "İlk teslimat 6-10 hafta içinde planlanır.",
    price: 40000,
    priceLabel: "₺40.000",
    icon: "mobile",
    faq: [
      {
        question: "Uygulama hem iOS hem Android için mi hazırlanır?",
        answer:
          "Evet. Başlangıç paketi, kapsamı netleştirilen ekranlar için iOS ve Android uyumlu geliştirme planıyla hazırlanır.",
      },
      {
        question: "App Store ve Google Play hesapları dahil mi?",
        answer:
          "Mağaza hesapları müşteriye aittir. Yayına hazırlık desteği verilir; hesap ücretleri ve mağaza politikası sorumlulukları müşteriye aittir.",
      },
    ],
  },
  {
    slug: "web-solutions",
    titleTr: "Web Çözümleri",
    titleEn: "Web Solutions",
    summaryTr:
      "Kurumsal web siteleri, müşteri portalları, ödeme uyumlu akışlar ve ölçeklenebilir web uygulamaları kuruyoruz.",
    summaryEn:
      "Corporate websites, customer portals, payment-ready flows, and scalable web applications.",
    description:
      "Web çözümleri hizmeti; kurumsal web sitesi, servis tanıtım sayfaları, müşteri portalları, form akışları ve ödeme uyumlu web arayüzleri için tasarım, geliştirme, test ve yayına alma çalışmalarını kapsar.",
    features: [
      "Kurumsal web arayüzü ve sayfa yapısı",
      "Responsive frontend geliştirme",
      "İletişim, sipariş veya satın alma akışları",
      "Temel SEO ve performans düzenlemeleri",
      "Yayına alma ve teknik teslim dokümanı",
    ],
    timeline: "İlk teslimat 2-5 hafta içinde planlanır.",
    price: 15000,
    priceLabel: "₺15.000",
    icon: "web",
    faq: [
      {
        question: "Bu hizmet e-ticaret sitesi kurulumunu kapsar mı?",
        answer:
          "Başlangıç paketi servis ve kurumsal web akışları içindir. Tam e-ticaret kapsamı ürün sayısı, ödeme, kargo ve entegrasyon detaylarına göre ayrıca fiyatlandırılır.",
      },
      {
        question: "Alan adı ve hosting dahil mi?",
        answer:
          "Alan adı ve hosting üçüncü parti maliyetlerdir. Kurulum ve yayına alma desteği hizmet kapsamına dahil edilebilir.",
      },
    ],
  },
  {
    slug: "ai-solutions",
    titleTr: "Yapay Zeka Çözümleri",
    titleEn: "AI Solutions",
    summaryTr:
      "İş akışlarını hızlandıran, veriden değer üreten ve karar süreçlerini güçlendiren AI sistemleri kuruyoruz.",
    summaryEn:
      "AI systems that accelerate workflows, extract value from data, and strengthen decision-making.",
    description:
      "Yapay zeka çözümleri hizmeti; iş akışı analizi, veri hazırlığı, AI destekli otomasyon, chatbot veya karar destek prototipi, entegrasyon ve test çalışmalarını içerir. Amaç, ölçülebilir bir iş sürecini daha hızlı ve kontrollü hale getirmektir.",
    features: [
      "AI kullanım senaryosu ve süreç analizi",
      "Veri yapısı ve entegrasyon planı",
      "Chatbot, otomasyon veya karar destek prototipi",
      "Model/API entegrasyonu ve güvenlik kontrolleri",
      "Test, ölçümleme ve kullanım yönergeleri",
    ],
    timeline: "İlk teslimat 3-7 hafta içinde planlanır.",
    price: 30000,
    priceLabel: "₺30.000",
    icon: "ai",
    faq: [
      {
        question: "Yapay zeka modeli sıfırdan mı geliştiriliyor?",
        answer:
          "Başlangıç paketi genellikle güvenilir model/API entegrasyonları ve iş akışı otomasyonuna odaklanır. Özel model eğitimi ayrıca kapsamlandırılır.",
      },
      {
        question: "Veri gizliliği nasıl ele alınır?",
        answer:
          "Proje kapsamında kullanılacak veri türleri belirlenir, erişim sınırları netleştirilir ve entegrasyon buna göre yapılandırılır.",
      },
    ],
  },
  {
    slug: "production-payment-test",
    titleTr: "Canlı Ödeme Testi",
    titleEn: "Production Payment Test",
    summaryTr:
      "Canlıya geçmeden önce üretim ödeme akışını doğrulamak için kullanılan geçici bir hizmettir.",
    summaryEn:
      "Temporary service used only for verifying the production payment flow before launch.",
    description:
      "Bu hizmet, canlı (production) ortamda iyzico ödeme akışının uçtan uca doğru çalıştığını teyit etmek amacıyla geçici olarak kataloğa eklenmiştir. Gerçek bir teslimat kapsamı içermez ve üretim ödeme doğrulaması tamamlandıktan sonra kataloğdan kaldırılacaktır.",
    features: [
      "Üretim ödeme akışının uçtan uca doğrulanması",
      "Geçici katalog kaydı — teslimat kapsamı içermez",
    ],
    timeline: "Bu kayıt geçicidir; teslimat süreci bulunmamaktadır.",
    price: 50,
    priceLabel: "₺50",
    icon: "product",
    faq: [
      {
        question: "Bu hizmet gerçek bir teslimat içeriyor mu?",
        answer:
          "Hayır. Bu kayıt yalnızca üretim ödeme akışının doğrulanması amacıyla geçici olarak eklenmiştir ve doğrulama tamamlandığında kataloğdan kaldırılacaktır.",
      },
    ],
  },
  {
    slug: "digital-product-development",
    titleTr: "Dijital Ürün Geliştirme",
    titleEn: "Digital Product Development",
    summaryTr:
      "Ürün fikrinden canlı yayına kadar keşif, UX, mimari, geliştirme, test ve bakım süreçlerini yönetiyoruz.",
    summaryEn:
      "Discovery, UX, architecture, development, testing, launch, and support for digital products.",
    description:
      "Dijital ürün geliştirme hizmeti; ürün fikrinin doğrulanması, MVP kapsamı, kullanıcı deneyimi, teknik mimari, geliştirme, test, yayına alma ve sonraki iterasyon planını kapsayan uçtan uca satın alınabilir başlangıç paketidir.",
    features: [
      "Ürün keşfi ve MVP kapsam planı",
      "Kullanıcı akışları ve temel UX çıktıları",
      "Frontend, backend ve entegrasyon geliştirme",
      "Test, yayına alma ve ilk iterasyon planı",
      "Teslim sonrası önceliklendirme oturumu",
    ],
    timeline: "İlk teslimat 5-9 hafta içinde planlanır.",
    price: 20000,
    priceLabel: "₺20.000",
    icon: "product",
    faq: [
      {
        question: "MVP kapsamı nasıl belirlenir?",
        answer:
          "Satın alma sonrası kickoff toplantısında hedef kullanıcı, kritik özellikler ve ilk sürüm çıktıları netleştirilir.",
      },
      {
        question: "Ürün tasarımı da dahil mi?",
        answer:
          "Başlangıç paketi temel kullanıcı akışları ve arayüz yönlendirmelerini içerir. Kapsamlı UI tasarım sistemi ayrıca fiyatlandırılır.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
