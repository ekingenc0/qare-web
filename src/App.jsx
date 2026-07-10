import { useState, useEffect, useRef, useMemo } from 'react'

/* ============================
   Data
============================ */

const NAV_LINKS = [
  { label: 'Hizmetler', href: '#hizmetler' },
  { label: 'Nasıl Çalışır', href: '#nasil' },
  { label: 'SSS', href: '#sss' },
]

const SERVICES = [
  {
    name: 'QR Menü Tasarımı',
    desc: 'Telefondan okut, anında açılsın. Kağıt masrafı yok, baskı derdi yok, fiyat güncellemesi saniyeler.',
    items: ['Markanıza özel tasarım', 'Sınırsız ürün ekleme', 'Tek QR kod, sonsuz güncelleme'],
  },
  {
    name: 'QR Menü + Web Sitesi',
    desc: 'Hem dijital menü hem de kurumsal web siteniz tek pakette. İşletmenizi dijitalde tam konumlandırın.',
    items: ['Profesyonel QR menü', 'Modern kurumsal site', 'Google Maps + Instagram bağlantısı'],
    featured: true,
  },
  {
    name: 'Sadece Web Sitesi',
    desc: 'Menüye ihtiyacınız yoksa, sadece kurumsal web siteniz de yapılır. Aynı özen, aynı kalite.',
    items: ['Özgün tasarım', 'Mobil uyumlu', 'Hızlı yükleme süresi'],
  },
]

const SECTORS = ['Kafe', 'Restoran', 'Kuaför', 'Güzellik Salonu', 'Mağaza', 'Ofis', 'Klinik', 'Pastane', 'Bar', 'Oto Yıkama']

const STEPS = [
  { num: '01', time: '~30 dakika', title: 'Görüşme', desc: 'Ne istediğinizi anlıyoruz. Kısa bir görüşme, sıkıcı form yok.' },
  { num: '02', time: '24 saat', title: 'Tasarım', desc: 'Marka kimliğinize uygun ilk taslağı hazırlıyoruz. Sizden önce, aklınızda canlanır.' },
  { num: '03', time: 'Sınırsız', title: 'Onay', desc: 'Beğenene kadar değiştiyoruz. Revizyon sınırı yok, memnuniyet sınırı yok.' },
  { num: '04', time: 'Aynı gün', title: 'Yayında', desc: 'Onayınız sonrası QR kodlarınız üretilir, menünüz yayına alınır. Hemen kullanırsınız.' },
]

const FAQS = [
  {
    q: 'QR menü nasıl çalışır?',
    a: 'Müşteriniz telefon kamerasıyla QR kodu okutur. Anlık olarak sizin tasarladığımız dijital menü açılır. Kağıt menü yok, yıpranma yok, fiyat değişimi saniyeler içinde.',
  },
  {
    q: 'QR kodu nereye koymalıyız?',
    a: 'Standart uygulama: masalara koymak yerine tek bir giriş noktasına koymak da yeterli. Çoğu müşteri tek noktayı okutur, menüyü telefonunda tutar. İkisi de mümkün, sizin mekanınıza göre birlikte karar veririz.',
  },
  {
    q: 'Fiyat değiştirince QR yenileniyor mu?',
    a: 'Hayır, aynı QR kod geçerli kalır. Siz sadece içeriği değiştirirsiniz (ya da biz değiştiririz), müşteriniz bir sonraki okutmada güncel halini görür.',
  },
  {
    q: 'Kurumsal web sitesi de yapıyor musunuz?',
    a: 'Evet, Pro pakette hem QR menü hem de kurumsal web sitesi tek fiyata geliyor. İsterseniz sadece site de yapılır.',
  },
  {
    q: 'Ne kadar sürede hazır olur?',
    a: 'QR menü tasarımı 24 saat içinde. Kurumsal web sitesi 3-5 iş günü içinde hazırlanır. Acil ise hızlandırılmış planımız var.',
  },
  {
    q: 'Aylık abonelik mi ödeyeceğim?',
    a: 'Hayır. Qare\'nin modeli tek seferlik ödeme. Siteniz ve menünüz sizin. Aylık gizli aidat yok. Premium pakette bakım için 200₺/ay eklenir ama Başlangıç ve Pro tek seferlik.',
  },
]

const TRUST_STATS = [
  { target: 48, suffix: 'saat', label: 'İlk taslak süresi', note: 'Acil ise hızlandırılmış plan var' },
  { target: 100, suffix: '%', label: 'Yasal uyum', note: '2026 şeffaflık yönetmeliğine tam uyumlu' },
  { target: 1, suffix: '×', label: 'Ödeme', note: 'Tek seferlik, aylık aidat yok' },
  { target: 24, suffix: 'sa', label: 'Hızlı Yanıt', note: 'Mesajlarınıza saatler içinde döneriz' },
]

/* ============================
   Hero QR Art (logo with effects)
============================ */
function HeroQrArt() {
  return (
    <div className="hero-qr-stage" data-reveal>
      {/* Yumuşak glow halkası */}
      <div className="hero-qr-glow" />
      <div className="hero-qr-glow hero-qr-glow-2" />

      {/* İçeride logo */}
      <div className="hero-qr-logo">
        <img src="/qare-icon-white.png" alt="" className="hero-qr-icon" />

        {/* Etrafta dönen parçacık halkası */}
        <div className="hero-qr-orbit">
          <span className="hero-qr-dot" style={{ top: '6%', left: '50%' }} />
          <span className="hero-qr-dot" style={{ top: '50%', right: '6%' }} />
          <span className="hero-qr-dot" style={{ bottom: '6%', left: '50%' }} />
          <span className="hero-qr-dot" style={{ top: '50%', left: '6%' }} />
        </div>

        {/* Quarter finder squares (köşe kareleri) */}
        <div className="hero-qr-corner hero-qr-corner-tl" />
        <div className="hero-qr-corner hero-qr-corner-tr" />
        <div className="hero-qr-corner hero-qr-corner-bl" />
        <div className="hero-qr-corner hero-qr-corner-br" />
      </div>

      <div className="hero-qr-caption">
        <span className="hero-qr-dot-mini" />
        Müşteriniz bu kareyi görüyor
      </div>
    </div>
  )
}

/* ============================
   Logo
============================ */
function Logo() {
  return (
    <a href="#top" className="logo" aria-label="Qare">
      <img src="/qare-logo-white.png" alt="Qare" className="logo-img" />
    </a>
  )
}

function Counter({ target, suffix }) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)
  const fired = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !fired.current) {
          fired.current = true
          const start = performance.now()
          const dur = 1200
          const tick = (t) => {
            const p = Math.min((t - start) / dur, 1)
            const ease = 1 - Math.pow(1 - p, 3)
            setVal(Math.round(target * ease))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      })
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{val}{suffix}</span>
}

/* ============================
   FAQ Item
============================ */
function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <button className="faq-q" onClick={onToggle} aria-expanded={isOpen}>
        <span>{item.q}</span>
        <span className="faq-icon">+</span>
      </button>
      <div className="faq-a">
        <p>{item.a}</p>
      </div>
    </div>
  )
}

/* ============================
   App
============================ */
export default function App() {
  const [openFaq, setOpenFaq] = useState(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            const delay = parseInt(e.target.dataset.revealDelay || 0, 10)
            setTimeout(() => e.target.classList.add('is-in'), delay)
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach((el, i) => {
      const idx = parseInt(el.dataset.revealIdx || 0, 10)
      el.dataset.revealDelay = String(idx * 80)
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <a href="#main" className="skip-link">İçeriğe geç</a>

      {/* Background glow */}
      <div className="bg-glow" aria-hidden="true">
        <div className="bg-glow-orb bg-glow-orb-1" />
        <div className="bg-glow-orb bg-glow-orb-2" />
      </div>

      {/* Header */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`} aria-label="Ana navigasyon">
        <Logo />
        <div className="nav-links">
          {NAV_LINKS.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </div>
        <a href="#iletisim" className="btn btn-accent nav-cta">İletişime Geç</a>
      </nav>

      <main id="main">
        {/* Hero */}
        <section className="hero" id="top" data-reveal>
          <div className="wrap">
            <div className="hero-content">
              <h1>İşletmenizin <em>dijital vitrini.</em><br />Yeniden tanımlandı.</h1>
              <p className="lead">
                Qare, kafe ve restorandan kuaföre, mağazadan ofise her işletme için QR menü ve web sitesini birlikte kurar. Markanıza yakışan, hızlı ve yasaya uygun bir dijital deneyim.
              </p>
              <div className="hero-ctas">
                <a href="#iletisim" className="btn btn-accent">İletişime Geç</a>
                <a href="#hizmetler" className="btn btn-outline">Hizmetleri İncele</a>
              </div>
            </div>

            <HeroQrArt />
          </div>
        </section>

        {/* Trust stats */}
        <section className="trust-section">
          <div className="wrap">
            <div className="trust-grid">
              {TRUST_STATS.map((s) => (
                <div key={s.label} className="trust-stat" data-reveal>
                  <div className="trust-num">
                    <Counter target={s.target} suffix={s.suffix} />
                  </div>
                  <div className="trust-label">{s.label}</div>
                  <div className="trust-note">{s.note}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="hizmetler">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Hizmetler</span>
              <h2>İşletmeniz için ne yapıyoruz?</h2>
            </div>
            <div className="services-grid">
              {SERVICES.map((s, i) => (
                <div key={s.name} className={`service-card glass ${s.featured ? 'featured' : ''}`} data-reveal data-reveal-idx={i}>
                  <div>
                    <h3>{s.name}</h3>
                    <p>{s.desc}</p>
                  </div>
                  <ul className="service-list">
                    {s.items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                  <a href="#iletisim" className={`btn ${s.featured ? 'btn-accent' : 'btn-outline'}`}>
                    {s.featured ? 'Paketi İncele' : 'Bilgi Al'}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Marquee */}
        <section className="marquee-section">
          <div className="wrap">
            <div className="marquee-label" data-reveal>
              <span className="eyebrow">Kimler için</span>
              <h2>Her işletme için bir Qare.</h2>
            </div>
          </div>
          <div className="marquee-track" aria-hidden="true">
            {[...SECTORS, ...SECTORS].map((s, i) => (
              <span key={i} className="marquee-item">
                {s}<span className="marquee-sep">·</span>
              </span>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section id="nasil">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Nasıl Çalışır</span>
              <h2>Dört adımda işiniz hazır.</h2>
            </div>
            <div className="steps-grid">
              {STEPS.map((step, i) => (
                <div key={step.num} className="step-card" data-reveal data-reveal-idx={i}>
                  <div className="step-num">{step.num}</div>
                  <span className="step-time">{step.time}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Qare */}
        <section>
          <div className="wrap">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Neden Qare</span>
              <h2>Yeni kurulan ama özenli bir ekip.</h2>
              <p>Her müşteriye, büyük bir ajansın değil, kendi işiymiş gibi yaklaşan bir çalışma şekli.</p>
            </div>
            <div className="why-grid">
              <div className="why-card glass" data-reveal data-reveal-idx={0}>
                <div className="why-icon" aria-hidden="true">⚡</div>
                <h4>Kişisel İlgi</h4>
                <p>Her projeyi kendim yönetiyorum. Tasarımınızın arkasında ajans değil, doğrudan iletişim kurabileceğiniz bir kişi var.</p>
              </div>
              <div className="why-card glass" data-reveal data-reveal-idx={1}>
                <div className="why-icon" aria-hidden="true">📱</div>
                <h4>Hızlı İletişim</h4>
                <p>Saatler içinde yanıt. Bir iş günü bekleyeceğiniz "kurumsal destek hattı" değiliz, gerçek kişilerle konuşursunuz.</p>
              </div>
              <div className="why-card glass" data-reveal data-reveal-idx={2}>
                <div className="why-icon" aria-hidden="true">🔄</div>
                <h4>Sınırsız Revizyon</h4>
                <p>Beğenmediğiniz her detayı değiştiriyoruz. Memnun olana kadar revize ediyoruz, sınır yok.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="sss">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Sıkça Sorulan Sorular</span>
              <h2>Aklınıza takılanlar.</h2>
            </div>
            <div className="faq-list">
              {FAQS.map((item, i) => (
                <FAQItem
                  key={item.q}
                  item={item}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="iletisim" className="cta-section">
          <div className="wrap">
            <div className="section-head" data-reveal style={{ textAlign: 'center', margin: '0 auto 24px' }}>
              <span className="eyebrow">Başlayalım</span>
              <h2>İşletmenizi bir karede toplayalım.</h2>
              <p className="lead">İlk görüşme ücretsiz. İhtiyacınızı dinler, size özel teklif hazırlarız.</p>
            </div>
            <div className="cta-buttons" data-reveal>
              <a href="#iletisim" className="btn btn-accent">İletişime Geç</a>
              <a href="mailto:hello@qare.app" className="btn btn-outline">E-posta Gönder</a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="wrap">
          <div className="footer-grid">
            <Logo />
            <div className="footer-links">
              <a href="#hizmetler">Hizmetler</a>
              <a href="#sss">SSS</a>
              <a href="https://instagram.com/qare" target="_blank" rel="noreferrer">Instagram</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Qare. Tüm hakları saklıdır.</span>
            <span>QR menü &amp; kurumsal web sitesi çözümleri</span>
          </div>
        </div>
      </footer>
    </>
  )
}
