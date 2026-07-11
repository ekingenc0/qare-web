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
    icon: 'QR',
    tag: 'Hızlı & Pratik',
    name: 'QR Menü Tasarımı',
    desc: 'Telefondan okut, anında açılsın. Kağıt masrafı yok, baskı derdi yok.',
    items: ['Markanıza özel tasarım', 'Sınırsız ürün güncelleme', 'Tek QR kod, sonsuz kullanım'],
  },
  {
    icon: '★',
    tag: 'En Çok Tercih Edilen',
    name: 'QR Menü + Web Sitesi',
    desc: 'Hem dijital menü hem kurumsal site tek pakette. İşletmenizi dijitalde tam konumlandırın.',
    items: ['Profesyonel QR menü', 'Modern kurumsal web sitesi', 'Google Maps + Instagram bağlantısı'],
    featured: true,
  },
  {
    icon: '◐',
    tag: 'Sade & Etkili',
    name: 'Sadece Web Sitesi',
    desc: 'Menüye ihtiyacınız yoksa, kurumsal web sitenizi yaparız. Aynı özen, aynı kalite.',
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
   Hero Phone (Aurora Kitchen demo)
============================ */
const AURORA_MENU = [
  {
    key: 'icecek', label: 'İçecekler',
    items: [
      { name: 'Çay', desc: '2 kcal', price: '40₺', old: '35₺', tag: 'AI' },
      { name: 'Türk Kahvesi', desc: '5 kcal', price: '45₺' },
      { name: 'Ayran', desc: '60 kcal', price: '30₺', old: '25₺', tag: 'AI' },
      { name: 'Filtre Kahve', desc: 'Sıcak', price: '60₺' },
    ],
  },
  {
    key: 'corba', label: 'Çorbalar',
    items: [
      { name: 'Mercimek Çorbası', desc: '180 kcal', price: '120₺', tag: 'Yeni' },
      { name: 'Günün Çorbası', desc: 'Sezonluk', price: '95₺' },
    ],
  },
  {
    key: 'yemek', label: 'Yemekler',
    items: [
      { name: 'Kuzu Tandır', desc: '482 orders', price: '320₺', tag: 'Top' },
      { name: 'Levrek Buğulama', desc: '367 orders', price: '285₺' },
      { name: 'Truf Risotto', desc: '294 orders', price: '240₺' },
    ],
  },
  {
    key: 'tatli', label: 'Tatlılar',
    items: [
      { name: 'Sütlaç', desc: '110 kcal', price: '75₺' },
      { name: 'Cheesecake', desc: 'Frambuaz', price: '145₺' },
    ],
  },
]

function HeroPhone() {
  const [tab, setTab] = useState('icecek')
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const current = AURORA_MENU.find(t => t.key === tab)?.items || []

  return (
    <div className="hero-phone" ref={ref}>
      <div className="hero-phone-frame">
        <div className="hero-phone-notch" />
        <div className="hero-phone-screen">
          <div className="hp-statusbar">
            <span>9:41</span>
            <span className="hp-status-icons">● ● ●</span>
          </div>
          <div className="hp-content">
            <div className="hp-brand-row">
              <div>
                <div className="hp-brand">Aurora Kitchen</div>
                <div className="hp-sub">Beyoğlu · açık</div>
              </div>
              <div className="hp-lang">TR</div>
            </div>

            <div className={`hp-featured ${visible ? 'in' : ''}`}>
              <div className="hp-featured-tag">Popüler · AI öneri</div>
              <div className="hp-featured-name">Kuzu Tandır</div>
              <div className="hp-featured-desc">8 saat fırın, közde sebze, pilav</div>
              <div className="hp-featured-bottom">
                <span className="hp-featured-price">320₺</span>
                <span className="hp-featured-btn">Ekle</span>
              </div>
            </div>

            <div className="hp-tabs">
              {AURORA_MENU.map(t => (
                <button key={t.key} className={`hp-tab ${tab === t.key ? 'active' : ''}`} onClick={() => setTab(t.key)}>
                  {t.label}
                </button>
              ))}
            </div>

            <div className="hp-items">
              {current.map((it, i) => (
                <div key={it.name} className={`hp-item ${visible ? 'in' : ''}`} style={{ transitionDelay: visible ? `${0.1 + i * 0.05}s` : '0s' }}>
                  <div className="hp-item-info">
                    <div className="hp-item-name">
                      {it.name}
                      {it.tag && <span className={`hp-item-tag ${it.tag === 'AI' ? 'ai' : ''}`}>{it.tag}</span>}
                    </div>
                    <div className="hp-item-desc">{it.desc}</div>
                  </div>
                  <div className="hp-item-price-col">
                    {it.old && <span className="hp-item-old">{it.old}</span>}
                    <span className="hp-item-price">{it.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============================
   Hero Sector Tabs
============================ */
const HERO_SECTORS = [
  { key: 'restoran', title: 'Restoranınızın dijital vitrini. Yeniden tanımlandı.', icon: '🍽️' },
  { key: 'cafe', title: 'Cafenizin dijital atmosferi. Her fincanın hakkı.', icon: '☕' },
  { key: 'bar', title: 'Barınızın gece dili. Her yudumun karakteri.', icon: '🍸' },
  { key: 'otel', title: 'Otelinizin misafir deneyimi. Odadan lobiye.', icon: '🏨' },
]

function HeroSectorTabs({ active, onChange }) {
  return (
    <div className="hero-sectors">
      {HERO_SECTORS.map(s => (
        <button key={s.key} className={`hero-sector-btn ${active === s.key ? 'active' : ''}`} onClick={() => onChange(s.key)}>
          <span className="hero-sector-icon">{s.icon}</span>
          <span className="hero-sector-label">{s.key.charAt(0).toUpperCase() + s.key.slice(1)}</span>
        </button>
      ))}
    </div>
  )
}

/* ============================
   Logo
============================ */
function Logo() {
  return (
    <a href="#top" className="logo" aria-label="Qare">
      <img src="/qare_logo_full_black.png" alt="Qare" className="logo-img" />
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
  const [sector, setSector] = useState('restoran')
  const heroSector = HERO_SECTORS.find(s => s.key === sector)

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
              <div className="hero-eyebrow">Premium QR menü platformu. Mobilde hızlı, çok dilli, yapay zekâ destekli.</div>

              <h1>{heroSector?.title}</h1>

              <HeroSectorTabs active={sector} onChange={setSector} />

              <div className="hero-ctas">
                <a href="#iletisim" className="btn btn-accent">İletişime Geç</a>
                <a href="#ozellikler" className="btn btn-outline">Özellikleri İncele</a>
              </div>
            </div>

            <HeroPhone />
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
                  <div className="service-top">
                    <div className="service-icon" aria-hidden="true">{s.icon}</div>
                    <span className="service-tag">{s.tag}</span>
                  </div>
                  <h3>{s.name}</h3>
                  <p>{s.desc}</p>
                  <ul className="service-list">
                    {s.items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                  <a href="#iletisim" className={`service-cta ${s.featured ? 'primary' : ''}`}>
                    {s.featured ? 'Paketi İncele' : 'Bilgi Al'} <span className="cta-arrow">→</span>
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

        {/* AI Asistanı Section */}
        <section className="ai-section">
          <div className="wrap">
            <div className="section-head" data-reveal style={{ textAlign: 'center', margin: '0 auto 60px' }}>
              <span className="eyebrow">Yapay Zekâ</span>
              <h2>Sadece menü değil. En yetenekli çalışanınız.</h2>
              <p>3 asistan, tek ekip. Siz işinizi yönetirken Qare menünüzü yönetir.</p>
            </div>
            <div className="ai-grid">
              <div className="ai-card glass" data-reveal data-reveal-idx={0}>
                <div className="ai-icon" style={{ background: 'rgba(200,107,74,0.12)' }}>📸</div>
                <h3>Görsel Asistanı</h3>
                <p className="ai-sub">Mekanınızın ajansı</p>
                <p>9 yemek türü × 6 stil = 54 profesyonel kombinasyon. Telefonunuzdaki karanlık kareye bile ışık verir.</p>
                <div className="ai-tag">Yemek pikselde aynı</div>
              </div>
              <div className="ai-card glass" data-reveal data-reveal-idx={1}>
                <div className="ai-icon" style={{ background: 'rgba(74,222,128,0.12)' }}>✍️</div>
                <h3>İçerik Asistanı</h3>
                <p className="ai-sub">Markanızın editörü</p>
                <p>32 dile profesyonel çeviri. Misafir Türkçe konuşmasa bile menünüz anadili gibi okunur.</p>
                <div className="ai-tag">32 dil</div>
              </div>
              <div className="ai-card glass" data-reveal data-reveal-idx={2}>
                <div className="ai-icon" style={{ background: 'rgba(168,85,247,0.12)' }}>🥗</div>
                <h3>Beslenme Asistanı</h3>
                <p className="ai-sub">Misafirin sağlık danışmanı</p>
                <p>Her yemekte kalori, alerjen bilgisi otomatik. AI önerir, operatör onaylar, misafir tabaktan önce bilir.</p>
                <div className="ai-tag">Son söz mutfakta</div>
              </div>
            </div>
          </div>
        </section>

        {/* Analytics Dashboard */}
        <section className="analytics-section">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Analiz</span>
              <h2>Menünüz size anlatıyor. Veriyle büyüyün.</h2>
              <p>4.812 tarama, 3.247 benzersiz ziyaret — son 30 gün. Tüm veriler gerçek.</p>
            </div>
            <div className="analytics-grid">
              <div className="kpi-card glass" data-reveal>
                <div className="kpi-label">Toplam Tarama</div>
                <div className="kpi-value">4.812</div>
                <div className="kpi-delta up">+18%</div>
              </div>
              <div className="kpi-card glass" data-reveal data-reveal-idx={1}>
                <div className="kpi-label">Benzersiz Ziyaret</div>
                <div className="kpi-value">3.247</div>
                <div className="kpi-delta up">+12%</div>
              </div>
              <div className="kpi-card glass" data-reveal data-reveal-idx={2}>
                <div className="kpi-label">Ort. Oturum</div>
                <div className="kpi-value">2:34</div>
                <div className="kpi-delta">dakika</div>
              </div>
              <div className="kpi-card glass" data-reveal data-reveal-idx={3}>
                <div className="kpi-label">Pik Saat</div>
                <div className="kpi-value">20:00</div>
                <div className="kpi-delta">Cmt</div>
              </div>
            </div>

            <div className="analytics-charts">
              <div className="chart-card glass" data-reveal>
                <div className="chart-head">
                  <h4>Son 7 Gün Tarama</h4>
                  <span className="chart-tag">+24%</span>
                </div>
                <div className="chart-bars">
                  {[60, 75, 88, 72, 95, 110, 130].map((h, i) => (
                    <div key={i} className="bar-col">
                      <div className="bar" style={{ height: `${h}%` }} />
                      <span className="bar-label">{['Pzt','Sal','Çar','Per','Cum','Cmt','Paz'][i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="chart-card glass" data-reveal data-reveal-idx={1}>
                <div className="chart-head">
                  <h4>En Çok Taranan 5 Ürün</h4>
                </div>
                <div className="top-products">
                  {[
                    { name: 'Kuzu Tandır', count: 482, max: 500 },
                    { name: 'Levrek Buğulama', count: 367, max: 500 },
                    { name: 'Truf Risotto', count: 294, max: 500 },
                    { name: 'Aurora Spritz', count: 218, max: 500 },
                    { name: 'Chef Salata', count: 156, max: 500 },
                  ].map((p, i) => (
                    <div key={p.name} className="top-product">
                      <span className="top-rank">{i + 1}</span>
                      <span className="top-name">{p.name}</span>
                      <div className="top-bar"><div className="top-fill" style={{ width: `${(p.count / p.max) * 100}%` }} /></div>
                      <span className="top-count">{p.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="ai-insights glass" data-reveal>
              <div className="ai-insights-head">
                <span className="ai-dot"></span>
                <h4>AI Önerileri</h4>
              </div>
              <div className="ai-insights-grid">
                <div className="insight">
                  <span className="insight-tag warn">Zaman Fırsatı</span>
                  <p>Pzt 17–19 arası doluluk %38 düşük. Pazartesi saatlerinde özel indirim düşünün.</p>
                </div>
                <div className="insight">
                  <span className="insight-tag info">Dil Açığı</span>
                  <p>İngilizce menüde 3 ürünün çevirisi eksik. Çok dilli turist ilginizi kaçırıyor.</p>
                </div>
                <div className="insight">
                  <span className="insight-tag bad">Teşhis</span>
                  <p>Tatlılar bölümü ziyaretçilerin sadece %4'ünde ilgi uyandırıyor. Görsel güncelleyin.</p>
                </div>
                <div className="insight">
                  <span className="insight-tag good">Keşif</span>
                  <p>Kuzu Tandır siparişlerinin %43'ünde Aurora Spritz birlikte alınıyor. Combo önerin.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WhatsApp Assistant */}
        <section className="wa-section">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <span className="eyebrow">Yeni · 2026.7</span>
              <h2>WhatsApp'tan, tek cümleyle güncelleyin.</h2>
              <p>AI öğrenir, siz onaylarsınız. Mesaj at, menün değişsin.</p>
            </div>
            <div className="wa-layout">
              <div className="wa-phone glass" data-reveal>
                <div className="wa-phone-frame">
                  <div className="wa-phone-notch"></div>
                  <div className="wa-phone-screen">
                    <div className="wa-header">
                      <div className="wa-avatar">Q</div>
                      <div className="wa-name">Qare Asistan</div>
                      <span className="wa-status">çevrimiçi</span>
                    </div>
                    <div className="wa-chat">
                      <div className="wa-msg user">Çay fiyatını 40 yap</div>
                      <div className="wa-msg ai">
                        Çay 35₺ → 40₺. Onay?
                        <div className="wa-actions">
                          <button className="wa-confirm">Onayla</button>
                          <button className="wa-undo">İptal</button>
                        </div>
                      </div>
                      <div className="wa-msg user">Ayran'ı 30 yap</div>
                      <div className="wa-msg user">Tüm içeceklere %10 zam</div>
                      <div className="wa-msg ai success">✓ 4 ürün güncellendi. Yayında.</div>
                      <div className="wa-msg user">Menüye 120₺ mercimek çorbası ekle</div>
                      <div className="wa-msg ai">
                        "Mercimek Çorbası · 120₺" eklendi.
                        <div className="wa-actions">
                          <button className="wa-confirm">Ekle</button>
                          <button className="wa-undo">İptal</button>
                        </div>
                      </div>
                      <div className="wa-msg user">geri al</div>
                      <div className="wa-msg ai success">↺ Son işlem geri alındı.</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="wa-features">
                {[
                  { t: 'Hız', d: 'Ortalama yanıt süresi 5 saniye.', i: '⚡' },
                  { t: 'Kontrol', d: 'Her değişiklik önce onayınızı alır. Son söz sizin.', i: '✓' },
                  { t: 'Geri Al', d: '"Geri al" yazınca tüm işlemi geri alır.', i: '↺' },
                ].map((f, i) => (
                  <div key={f.t} className="wa-feature glass" data-reveal data-reveal-idx={i}>
                    <div className="wa-feature-icon">{f.i}</div>
                    <h4>{f.t}</h4>
                    <p>{f.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise */}
        <section className="enterprise-section">
          <div className="wrap">
            <div className="section-head" data-reveal style={{ textAlign: 'center' }}>
              <span className="eyebrow">Çoklu Şube & Kurumsal</span>
              <h2>Bir menü, yüzlerce şube. Merkezden yönetin.</h2>
              <p>Zincir restoranlar, oteller ve franchise'lar için tek kontrol paneli.</p>
            </div>
            <div className="enterprise-grid">
              {[
                'Marriott', 'Hilton', 'Doubletree', 'Ramada', 'Crowne Plaza', 'Richmond',
                'Exedra', 'Viking Hotels', 'Cappamasa', 'Karakedi', 'Caldis', 'Lilith',
                'Depaul', 'April', 'NUAR', 'ZUZU',
              ].map((brand, i) => (
                <div key={brand} className="enterprise-logo glass" data-reveal data-reveal-idx={i % 4}>
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="pricing-rebuild-section">
          <div className="wrap">
            <div className="section-head" data-reveal style={{ textAlign: 'center' }}>
              <span className="eyebrow">Fiyatlandırma</span>
              <h2>Şeffaf fiyat, sürpriz yok.</h2>
              <p>İlk 30 gün içinde beğenmezseniz, ödediğinizin tamamını iade ediyoruz.</p>
            </div>
            <div className="pricing-rebuild-grid">
              <div className="pricing-rebuild-card glass" data-reveal data-reveal-idx={0}>
                <div className="prc-name">Temel</div>
                <div className="prc-price">5.000₺<span>/yıl</span></div>
                <div className="prc-note">Tek mekan için</div>
                <ul className="prc-list">
                  <li>QR menü tasarımı</li>
                  <li>32 dil çeviri</li>
                  <li>Yapay zekâ içerik önerisi</li>
                  <li>Sınırsız ürün</li>
                  <li>7/24 destek</li>
                </ul>
                <a href="#iletisim" className="btn btn-outline">Başlayın</a>
              </div>
              <div className="pricing-rebuild-card popular glass" data-reveal data-reveal-idx={1}>
                <div className="prc-popular">En Çok Tercih Edilen</div>
                <div className="prc-name">Gelişmiş</div>
                <div className="prc-price">10.000₺<span>/yıl</span></div>
                <div className="prc-note">Multi-outlet, otel, zincir</div>
                <ul className="prc-list">
                  <li>Temel paketteki her şey</li>
                  <li>Çoklu şube yönetimi</li>
                  <li>Gelişmiş analitik</li>
                  <li>AI asistan entegrasyonu</li>
                  <li>Öncelikli destek</li>
                </ul>
                <a href="#iletisim" className="btn btn-accent">Hemen Başlayın</a>
              </div>
              <div className="pricing-rebuild-card glass" data-reveal data-reveal-idx={2}>
                <div className="prc-name">Enterprise</div>
                <div className="prc-price">Özel<span>Teklif</span></div>
                <div className="prc-note">500+ şube veya 5+ özel lokasyon</div>
                <ul className="prc-list">
                  <li>Tüm özellikler dahil</li>
                  <li>Özel API erişimi</li>
                  <li>Atanmış müşteri başarısı yöneticisi</li>
                  <li>Özel SLA'lar</li>
                </ul>
                <a href="#iletisim" className="btn btn-outline">İletişime Geç</a>
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
