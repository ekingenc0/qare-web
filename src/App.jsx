import { useEffect, useMemo, useRef, useState } from 'react'
import './index.css'

const SERVICES = [
  {
    num: '01', title: 'QR Menü',
    desc: 'Kağıt menüyü yasal olarak yeterli, saniyeler içinde açılan bir dijital menüye çeviriyoruz.',
    items: [
      'Markanıza özel tasarım',
      'Telefonda saniyeler içinde açılır',
      'Fiyat/ürün güncellemesi sizde',
      'Baskıya hazır QR + masa etiketi',
    ],
    featured: false,
  },
  {
    num: '02', title: 'QR Menü + Web Sitesi',
    desc: "Menünüzle birlikte işletmenizin Google'da bulunabilir, adres ve saatleriyle profesyonel bir web sitesi.",
    items: [
      'Tek sayfa kurumsal web sitesi',
      'Harita, iletişim, sosyal medya bağlantıları',
      'Mobil uyumludur, hızlı yüklenir',
      'QR menüyle görsel bütünlük',
    ],
    featured: true,
  },
  {
    num: '03', title: 'Yalnızca Web Sitesi',
    desc: 'Yeme-içme dışı işletmeler için sade, profesyonel bir dijital vitrin.',
    items: [
      'Kuaför, mağaza, ofis, klinik…',
      'Hizmet/ürün listesi sayfası',
      "WhatsApp'tan doğrudan iletişim",
      "Google'da bulunabilirlik desteği",
    ],
    featured: false,
  },
]

const STEPS = [
  { num: '01', time: 'İlk 10 dakika', title: 'Görüşme', desc: 'WhatsApp veya yüz yüze — ne iş yaptığınızı ve kim için olduğunu netleştiriyoruz.' },
  { num: '02', time: '24 saat içinde', title: 'Taslak', desc: 'Logo, marka renkleri ve menünüzle ilk taslağı hazırlıyoruz.' },
  { num: '03', time: 'Beğenene kadar', title: 'Onay', desc: 'Her detayı sizinle birlikte düzeltiyoruz. "Mükemmel" deyinceye kadar devam.' },
  { num: '04', time: 'Aynı gün', title: 'Yayında', desc: 'QR kod canlıya alınır, masa etiketleriniz size ulaşır.' },
]

const SECTORS = [
  { icon: '☕', name: 'Kafe & Restoran', desc: 'Kağıt menü maliyetinden ve sürekli baskıdan kurtulun.' },
  { icon: '🏨', name: 'Otel & Butik', desc: 'Oda servisi menüsünden SPA hizmetlerine tek tıkla erişim.' },
  { icon: '✂️', name: 'Kuaför & Güzellik', desc: 'Hizmet listeniz, fiyatlarınız, randevu için tek dokunuş.' },
  { icon: '🛍️', name: 'Mağaza & Butik', desc: 'Kampanyaları, indirim kodlarını, ürünleri dijitalde öne çıkarın.' },
  { icon: '🍷', name: 'Bar & Gece Kulübü', desc: 'Hızlı değişen kokteyl listesini tek bağlantıda güncelleyin.' },
  { icon: '🦷', name: 'Klinik & Sağlık', desc: 'Hizmetler, fiyatlar ve online randevu için profesyonel yüz.' },
]

const PLANS = [
  {
    name: 'Başlangıç',
    price: '1.250₺',
    priceNote: 'tek seferlik',
    items: [
      'Tek sayfa QR menü',
      'Markanıza uygun QR tasarımı',
      'Baskıya hazır dosya',
      'Sınırsız ürün/fiyat ekleme',
    ],
    popular: false, cta: 'btn-outline', label: 'Demek ki hızlı başlamak istiyorsunuz.',
  },
  {
    name: 'Pro',
    price: '2.900₺',
    priceNote: 'tek seferlik',
    items: [
      'QR menü + tek sayfa kurumsal site',
      'Harita, saatler, sosyal medya bağlantıları',
      'Mobil uyumlu, hızlı tasarım',
      'Masa etiketleri dahil',
      '1 ay boyunca ücretsiz revizyon',
    ],
    popular: true, cta: 'btn-primary', label: 'İşletmenizin tüm dijital yüzeyleri.',
  },
  {
    name: 'Premium',
    price: '2.900₺',
    priceSuffix: '+ 200₺/ay',
    priceNote: 'kurulum + bakım',
    items: [
      'Pro paketin tüm özellikleri',
      'Aylık içerik/fiyat güncellemesi',
      'Instagram görsel desteği',
      'Öncelikli destek, 24 saat dönüş',
    ],
    popular: false, cta: 'btn-outline', label: 'Sürekli güncel kalmak isteyenler için.',
  },
]

const VAADES = [
  { big: '0,8', em: 's', title: 'Açılış Süresi', desc: 'Telefon kamerası QR\'ı okuttuktan sonra menü açılır.' },
  { big: '01', em: 'Ocak 2026', title: 'Yasal Hazır', desc: 'Menü Şeffaflığı Yönetmeliği ile %100 uyumlu.' },
  { big: '24', em: 'sa', title: 'İlk Taslak', desc: 'Görüşmeden 24 saat içinde yayına hazır taslak.' },
  { big: '∞', em: '', title: 'Sınırsız Revizyon', desc: 'Beğenmediğiniz her detayı, sınır olmadan değiştiririz.' },
]

const FAQS = [
  {
    q: 'QR menü gerçekten yasal zorunluluk mu?',
    a: "Evet. 1 Ocak 2026'dan itibaren Türkiye'de yeme-içme işletmeleri için dijital/QR menü bulundurmak yasal zorunluluk. Kağıt menü tek başına yeterli kabul edilmiyor. Cezai risk altına girmeden geçmenin en kısa yolu: tek seferlik kurulumla tam uyumlu bir dijital menü.",
  },
  {
    q: '10 dakikada başlayabilir miyiz?',
    a: "Evet. WhatsApp'tan işletmenizin adını, birkaç fotoğrafını ve varsa logonuzu gönderdiğiniz an başlıyoruz. Görüşme 10 dakika sürer; sonrası bize ait.",
  },
  {
    q: 'Fiyatları / ürünleri kendim güncelleyebilir miyim?',
    a: "Evet. Size basit bir panel veya link üzerinden güncelleme yöntemi gösteriyoruz. İsterseniz Premium pakette aylık güncellemeleri biz üstleniyoruz.",
  },
  {
    q: 'Aylık ödeme zorunlu mu?',
    a: 'Hayır. Başlangıç ve Pro paketler tek seferlik ödemedir. Premium paketteki aylık bakım isteğe bağlıdır — beğenmezseniz tek seferlik pakete geçeriz, söz.',
  },
  {
    q: 'Sadece web sitesi de yaptırabilir miyim, menü olmadan?',
    a: 'Evet. Kuaför, mağaza, klinik, ofis gibi menüsü olmayan işletmeler için sade bir kurumsal web sitesi paketimiz de var. Aynı özen, aynı garanti.',
  },
  {
    q: 'Beğenmezsem ne olur?',
    a: '"Mükemmel" deyene kadar çalışırız. Sınırsız revizyon dahil. Sonuçta sizin markanız — siz mutlu olmadan biz teslim etmeyiz.',
  },
]

/* ------------ Helpers ------------ */
function Logo() {
  return (
    <a href="#top" className="logo" aria-label="Qare anasayfa">
      <img src="/qare-logo-white.png" alt="Qare" className="logo-img" />
    </a>
  )
}

function QrArt() {
  // 21×21 modüllü standart QR pattern. Üç köşe bulucu (finder pattern) + data
  // modülleri (pseudorandom). Hücreler soldan-sağa, yukarıdan-aşağıya tek tek
  // "taranıyor" hissiyle belirir; üstten geçen scan ışını bunu pekiştirir.
  const SIZE = 21

  // Basit ama QR'ı andıran pattern üretici — köşe bulucular her zaman aynı,
  // ortadaki modüller bir seeded "rastgele" pattern ile dolu.
  const isFinder = (r, c) => {
    const inSquare = (tr, tc) =>
      r >= tr && r < tr + 7 && c >= tc && c < tc + 7
    if (inSquare(0, 0) || inSquare(0, 14) || inSquare(14, 0)) {
      const lr = r - (inSquare(0, 0) ? 0 : inSquare(0, 14) ? 0 : 14)
      const lc = c - (inSquare(0, 0) ? 0 : inSquare(0, 14) ? 14 : 0)
      // 7×7 finder: dış çerçeve + iç dolu kare + arada boşluk
      const edge = lr === 0 || lr === 6 || lc === 0 || lc === 6
      const core = lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4
      return edge || core
    }
    return null
  }

  const isTiming = (r, c) => {
    if (r === 6 && c >= 8 && c <= 12) return (c % 2 === 0)
    if (c === 6 && r >= 8 && r <= 12) return (r % 2 === 0)
    return null
  }

  const cells = useMemo(() => {
    const out = []
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        const f = isFinder(r, c)
        if (f !== null) {
          out.push({ r, c, on: f, kind: 'finder' })
          continue
        }
        const t = isTiming(r, c)
        if (t !== null) {
          out.push({ r, c, on: t, kind: 'timing' })
          continue
        }
        // Pseudorandom data (deterministic)
        const seed = ((r * 31 + c * 17 + 7) ^ (r * c)) >>> 0
        const on = (seed % 100) < 48
        out.push({ r, c, on, kind: 'data' })
      }
    }
    return out
  }, [])

  return (
    <div className="qr-stage" aria-hidden="true">
      <div className="qr-frame">
        <div className="qr-scan" />
        <div className="qr-grid">
          {cells.map((cell) => (
            <span
              key={`${cell.r}-${cell.c}`}
              className={`qr-cell ${cell.kind} ${cell.on ? 'on' : ''}`}
              style={{ animationDelay: `${(cell.r * SIZE + cell.c) * 6}ms` }}
            />
          ))}
        </div>
      </div>
      <div className="qr-caption">
        <span className="dot" /> Müşteriniz bu kareyi görüyor
      </div>
    </div>
  )
}

function FAQItem({ item, index, isOpen, onClick }) {
  const answerRef = useRef(null)
  const maxHeight = isOpen && answerRef.current
    ? `${answerRef.current.scrollHeight}px`
    : '0px'
  return (
    <div className={`faq-item${isOpen ? ' open' : ''}`}>
      <button
        id={`faq-q-${index}`}
        className="faq-q"
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={`faq-a-${index}`}
      >
        {item.q}
        <span className="plus" aria-hidden="true">+</span>
      </button>
      <div
        id={`faq-a-${index}`}
        className="faq-a"
        style={{ maxHeight }}
        role="region"
        aria-labelledby={`faq-q-${index}`}
      >
        <p ref={answerRef}>{item.a}</p>
      </div>
    </div>
  )
}

function VaadeItem({ big, em, title, desc, delay = 0 }) {
  // count-up animasyonu için sadece sayısal / ikonik değerler için bir efekt
  return (
    <div className="vaade" style={{ transitionDelay: `${delay}ms` }}>
      <div className="big">{big}{em && <em>{em}</em>}</div>
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  )
}

/* ------------ App ------------ */
export default function App() {
  const [openIndex, setOpenIndex] = useState(0)

  // Reveal on scroll için basit observer
  useEffect(() => {
    if (typeof window === 'undefined') return
    const els = document.querySelectorAll('[data-reveal]')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.12 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const sections = useMemo(() => ({
    hizmetler: 'Hizmetler',
    surec: 'Nasıl Çalışır',
    sektorler: 'Sektörler',
    fiyat: 'Fiyatlandırma',
    sss: 'SSS',
    iletisim: 'İletişim',
  }), [])

  return (
    <>
      <a className="skip-link visually-hidden" href="#main">İçeriğe geç</a>

      <header>
        <div className="nav">
          <Logo />
          <nav className="links mobile-hide" aria-label="Ana gezinme">
            {Object.entries(sections).slice(0, 4).map(([id, label]) => (
              <a key={id} href={`#${id}`}>{label}</a>
            ))}
          </nav>
          <a href="#iletisim" className="btn btn-primary">İletişime Geç</a>
        </div>
      </header>

      <main id="main">
        {/* HERO */}
        <section className="hero" id="top">
          <div className="wrap">
            <div data-reveal>
              <span className="eyebrow">2026 Menü Şeffaflığı Yönetmeliği yürürlükte</span>
              <h1>
                İşletmeniz artık bir <span className="ul"><em>karede</em></span>.
              </h1>
              <p className="lead">
                Qare, kafe ve restorandan kuaföre, mağazadan ofise her işletme için
                QR menü ve kurumsal web sitesini birlikte kurar. Tek seferlik kurulum,
                markanıza yakışır tasarım, yasal olarak sağlam zemin.
              </p>
              <div className="hero-ctas">
                <a href="#iletisim" className="btn btn-primary">WhatsApp'tan Yazın</a>
                <a href="#hizmetler" className="btn btn-outline">Hizmetleri İncele</a>
              </div>
              <div className="hero-fine">İlk görüşme 10 dakika · Kurulum 24 saat · Sınırsız revizyon</div>
            </div>
            <div data-reveal>
              <QrArt />
            </div>
          </div>
        </section>

        {/* LAW BANNER */}
        <div className="law-banner">
          <div className="wrap">
            <p>
              <strong>2026 itibariyle tüm yeme-içme işletmeleri için dijital/QR menü yasal zorunluluk.</strong>{' '}
              Cezai risk almadan, markanıza uygun bir çözümle bugün geçin.
            </p>
            <a href="#iletisim">Hemen başlayın →</a>
          </div>
        </div>

        {/* VAATLER */}
        <section className="vaades">
          <div className="wrap">
            <div className="vaades-grid" data-reveal>
              {VAADES.map((v, i) => <VaadeItem key={v.title} {...v} delay={i * 80} />)}
            </div>
          </div>
        </section>

        {/* HIZMETLER */}
        <section id="hizmetler" className="divider">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Hizmetler</span>
              <h2>İki ihtiyaç, tek çözüm ortağı.</h2>
              <p>İster sadece menünüzü dijitalleştirin, ister işletmenizin tüm dijital yüzeylerini baştan kuralım — ihtiyacınıza göre üç şekilde çalışıyoruz.</p>
            </div>
            <div className="services-grid">
              {SERVICES.map((s) => (
                <article key={s.num} className={`service-card${s.featured ? ' featured' : ''}`} data-reveal>
                  <span className="service-num">{s.num}</span>
                  <h3>{s.title}</h3>
                  <p className="muted">{s.desc}</p>
                  <ul>{s.items.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SEKTÖRLER */}
        <section id="sektorler" className="divider">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Sektörler</span>
              <h2>Sizin işinize özel kurulmuş.</h2>
              <p>Her sektörün müşterisi farklı davranır. Biz de tasarımı, içeriği ve hatta renkleri ona göre düşünüyoruz.</p>
            </div>
            <div className="sectors-grid">
              {SECTORS.map((s) => (
                <article key={s.name} className="sector-card" data-reveal>
                  <div className="sector-icon" aria-hidden="true">{s.icon}</div>
                  <h4>{s.name}</h4>
                  <p>{s.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SÜREÇ */}
        <section id="surec" className="divider">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Nasıl Çalışır</span>
              <h2>Görüşmeden yayına, dört adım.</h2>
              <p>Sürecin her adımında siz sadece onay veriyorsunuz; tasarım, içerik ve kurulumu biz üstleniyoruz.</p>
            </div>
            <div className="process">
              {STEPS.map((s) => (
                <article key={s.num} className="step" data-reveal>
                  <div className="step-num">{s.num}</div>
                  <span className="time">{s.time}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FİYATLANDIRMA */}
        <section id="fiyat" className="divider">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Fiyatlandırma</span>
              <h2>Tek seferlik kurulum, aylık aboneliğe zorlamıyoruz.</h2>
              <p>Aylık yazılım aboneliği yerine bir defaya mahsus kurulum ücreti — isterseniz uygun fiyatlı bakım desteği.</p>
            </div>
            <div className="pricing-grid">
              {PLANS.map((plan) => (
                <article key={plan.name} className={`price-card${plan.popular ? ' popular' : ''}`} data-reveal>
                  <h3>{plan.name}</h3>
                  <div className="price">
                    {plan.price} {plan.priceSuffix && <span>{plan.priceSuffix}</span>}
                  </div>
                  <div className="price-note">{plan.priceNote}</div>
                  <ul>{plan.items.map((item) => <li key={item}>{item}</li>)}</ul>
                  <a href="#iletisim" className={`btn ${plan.cta}`}>Bunu İstiyorum</a>
                </article>
              ))}
            </div>
            <div className="pricing-foot">Gizli ücret yok · Koşulsuz memnuniyet · Sözleşme yok</div>
          </div>
        </section>

        {/* SÖZÜMÜZ */}
        <section className="pledge">
          <div className="wrap">
            <div className="pledge-card" data-reveal>
              <div className="pledge-mark" aria-hidden="true">∞</div>
              <div>
                <h3>"Mükemmel" deyene kadar.</h3>
                <p>
                  Beğenmediğiniz her detayı değiştiririz. Sınırsız revizyon, koşulsuz memnuniyet.
                  Bize inanmanız için söz vermiyoruz — teslim ettiğimiz işe inanacaksınız.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* KURUCU */}
        <section className="founder divider">
          <div className="wrap">
            <div className="founder-card" data-reveal>
              <div className="founder-avatar" aria-hidden="true">E</div>
              <div>
                <blockquote>
                  QR menü, küçük işletmenin en düşük maliyetli dijital dönüşümü.
                  Bunu herkes için erişilebilir kılmak istedik.
                </blockquote>
                <div className="sig">
                  <span className="sig-name">Ekrem</span>
                  <span className="sig-role">Kurucu · Qare</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SSS */}
        <section id="sss" className="divider">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Sıkça Sorulan Sorular</span>
              <h2>Aklınıza takılanlar.</h2>
              <p>Sorularınız önce siz sorun, biz cevaplayalım — ilk altı soru karar vermek için yeterli.</p>
            </div>
            <div className="faq-list">
              {FAQS.map((item, i) => (
                <FAQItem
                  key={item.q}
                  item={item}
                  index={i}
                  isOpen={openIndex === i}
                  onClick={() => setOpenIndex((prev) => (prev === i ? null : i))}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section" id="iletisim">
          <div className="wrap" data-reveal>
            <h2>İşletmenizi bir karede toplayalım.</h2>
            <p>Ücretsiz bir örnek görmek ya da sorularınızı sormak için yazın, 24 saat içinde dönüş yapalım.</p>
            <div className="hero-ctas">
              <a href="https://wa.me/905000000000" className="btn btn-primary">WhatsApp: +90 500 000 00 00</a>
              <a href="mailto:info@qare.com.tr" className="btn btn-outline">info@qare.com.tr</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div className="footer-grid">
            <Logo />
            <div className="footer-links">
              <a href="#hizmetler">Hizmetler</a>
              <a href="#fiyat">Fiyatlandırma</a>
              <a href="#sss">SSS</a>
              <a href="https://instagram.com/qare" target="_blank" rel="noreferrer">Instagram</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Qare. Tüm hakları saklıdır.</span>
            <span>QR menü ve kurumsal web sitesi çözümleri.</span>
          </div>
        </div>
      </footer>
    </>
  )
}
