// ===== components/Navbar.jsx =====
// Navbar — fixed top bar with live open status

function Navbar({ tweaks }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const status = window.useOpenStatus();
  const D = window.GALA_DATA;

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {document.body.style.overflow = '';};
  }, [open]);

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        padding: scrolled ? '14px 0' : '22px 0',
        transition: 'padding 0.45s var(--ease-out-quart)'
      }}
      className={scrolled ? 'glass' : ''}>
      
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
        <a href="index.html" aria-label="GALA" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span className="serif" style={{ fontSize: 26, letterSpacing: '0.18em', color: 'var(--c-accent)', textTransform: 'uppercase' }}>
            GALA
          </span>
          <span className="gala-logo-sub" style={{ fontSize: 9, letterSpacing: '0.32em', color: 'var(--c-warm-gray)', marginTop: 3, textTransform: 'uppercase' }}>
            {D.brand.tagline}
          </span>
        </a>

        <nav className="desktop-nav" style={{ display: 'none' }}>
          {D.nav.map((n) => {
            const isHome = !window.location.pathname.match(/speisekarte|drinks/);
            const href = (isHome && n.href.includes('index.html')) ? n.href.replace('index.html', '') : n.href;
            return <a key={n.href} href={href} className="hov-underline" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--c-cream)', opacity: 0.7 }}>
              {n.label}
            </a>;
          })}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {tweaks.showOpenStatus &&
          <span className="live-pill" style={{ display: 'none' }} data-shown="lg">
              <span className={`dot ${status.open ? 'open' : 'closed'}`}></span>
              <span style={{ color: 'var(--c-cream)' }}>{status.label}</span>
            </span>
          }
          <a href="index.html#booking" className="btn btn-ghost" style={{ borderColor: 'var(--c-accent)', color: 'var(--c-accent)', padding: '10px 18px' }}>
            Reservieren
          </a>
          <button
            className="mobile-toggle"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: 8 }}>
            
            <span style={{ width: 22, height: 1.5, background: 'var(--c-cream)', transition: 'transform 0.3s', transform: open ? 'rotate(45deg) translate(4px,5px)' : '' }}></span>
            <span style={{ width: 22, height: 1.5, background: 'var(--c-cream)', opacity: open ? 0 : 1, transition: 'opacity 0.2s' }}></span>
            <span style={{ width: 22, height: 1.5, background: 'var(--c-cream)', transition: 'transform 0.3s', transform: open ? 'rotate(-45deg) translate(4px,-5px)' : '' }}></span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="mobile-menu-grid" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
        <div>
          <nav className="glass" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {tweaks.showOpenStatus &&
            <span className="live-pill" style={{ alignSelf: 'flex-start', marginBottom: 10 }}>
                <span className={`dot ${status.open ? 'open' : 'closed'}`}></span>
                <span style={{ color: 'var(--c-cream)' }}>{status.label}</span>
              </span>
            }
            {D.nav.map((n) => {
              const isHome = !window.location.pathname.match(/speisekarte|drinks/);
              const href = (isHome && n.href.includes('index.html')) ? n.href.replace('index.html', '') : n.href;
              return <a key={n.href} href={href} onClick={() => setOpen(false)} style={{ padding: '14px 0', borderBottom: '1px solid var(--c-line)', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-cream)', opacity: 0.75 }}>
                {n.label}
              </a>;
            })}
            <a href="index.html#booking" onClick={() => setOpen(false)} className="btn btn-primary" style={{ marginTop: 14 }}>
              Tisch reservieren
            </a>
          </nav>
        </div>
      </div>

      <style>{`
        .gala-logo-sub, .desktop-nav a { white-space: nowrap; }
        @media (min-width: 1080px) {
          .desktop-nav { display: flex !important; align-items: center; gap: 24px; }
          .mobile-toggle { display: none !important; }
          [data-shown="lg"] { display: inline-flex !important; }
        }
        @media (max-width: 1079px) {
          .mobile-menu-grid { display: grid; }
        }
      `}</style>
    </header>);

}

window.Navbar = Navbar;


// ===== components/Hero.jsx =====
// Hero — warm bistro, static cinematic with subtle parallax

function Hero({ tweaks }) {
  const ref = React.useRef(null);
  const [loaded, setLoaded] = React.useState(false);
  const [progress, setProgress] = React.useState(0); // 0..1 across the 200vh hero
  const sectionRef = React.useRef(null);
  const videoRef = React.useRef(null);
  const status = window.useOpenStatus();
  const D = window.GALA_DATA;


  React.useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Scroll-scrub: drives both progress (for CSS) and video.currentTime if loaded.
  React.useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const sec = sectionRef.current;
        if (!sec) return;
        const scrolled = window.scrollY - sec.offsetTop;
        const scrollable = Math.max(1, sec.offsetHeight - window.innerHeight);
        const p = Math.max(0, Math.min(1, scrolled / scrollable));
        setProgress(p);
        if (videoRef.current && videoRef.current.duration) {
          videoRef.current.currentTime = p * videoRef.current.duration;
        }

      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const fadeIn = (delay) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'translateY(0)' : 'translateY(14px)',
    transition: `opacity 1s var(--ease-out-expo) ${delay}s, transform 1s var(--ease-out-expo) ${delay}s`
  });

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: 'relative',
        height: '200vh',
        background: 'var(--c-bg)'
      }}
      className="grain">
      
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      {/* Right-side hero image */}
      <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: "url('img/hero-interior.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `scale(${loaded ? 1 + progress * 0.06 : 1.06}) translateY(${progress * -30}px)`,
            transition: loaded ? 'transform 0.3s linear' : 'transform 1.6s var(--ease-out-expo)',
            filter: `saturate(1.05) brightness(${1 - progress * 0.15})`,
            zIndex: 0,
            opacity: 0
          }} />
        
      {/* Darkening overlay over media */}
      <div
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, background: 'rgba(20,18,16,0.45)', pointerEvents: 'none', zIndex: 1 }} />
        
      {/* Left dark gradient */}
      <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
            `linear-gradient(to right, rgba(20,18,16,0.7) 0%, rgba(20,18,16,0.4) 50%, transparent 100%)`,
            pointerEvents: 'none',
            zIndex: 1
          }} />
        
      {/* Bottom fade */}
      <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 'auto 0 0 0', height: '24%',
            background: 'linear-gradient(to top, var(--c-bg) 0%, transparent 100%)',
            pointerEvents: 'none', zIndex: 1
          }} />
        
      {/* Accent ambient */}
      <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: 0, left: 0, width: '60%', height: '100%',
            background: 'radial-gradient(ellipse at 25% 60%, var(--c-accent-tint), transparent 65%)',
            opacity: 0.6, pointerEvents: 'none', zIndex: 1
          }} />
        

      <div className="wrap" style={{ position: 'relative', zIndex: 2, paddingTop: 120, paddingBottom: 80 }}>
        <div style={{ maxWidth: 620 }}>
          {tweaks.showOpenStatus &&
            <div style={{ ...fadeIn(0.2), marginBottom: 28 }}>
              <span className="live-pill">
                <span className={`dot ${status.open ? 'open' : 'closed'}`}></span>
                <span style={{ color: 'var(--c-cream)' }}>{status.label}</span>
              </span>
            </div>
            }

          <p className="eyebrow" style={{ ...fadeIn(0.1), marginBottom: 20 }}>
            {D.brand.tagline}
          </p>

          <h1
              className="serif"
              style={{
                fontSize: 'clamp(4.5rem, 11vw, 9.5rem)',
                lineHeight: 0.95,
                letterSpacing: '0.04em',

                marginBottom: 24,
                ...fadeIn(0.18), color: "rgb(255, 255, 255)"
              }}>
              
            GALA
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, ...fadeIn(0.4) }} aria-hidden="true">
            <div style={{ width: 50, height: 1, background: 'var(--c-accent)', opacity: 0.6 }}></div>
            <div style={{ width: 5, height: 5, background: 'var(--c-accent)', borderRadius: 999 }}></div>
            <div style={{ width: 50, height: 1, background: 'var(--c-accent)', opacity: 0.6 }}></div>
          </div>

          <p
              className="serif"
              style={{
                fontStyle: 'italic',
                fontSize: 'clamp(1.2rem, 2.4vw, 1.6rem)',
                opacity: 0.85,
                marginBottom: 12,
                letterSpacing: '0.02em',
                ...fadeIn(0.5), color: "rgb(255, 255, 255)"
              }}>
              
            {D.brand.motto}
          </p>

          <p style={{ fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--c-warm-gray)', marginBottom: 44, ...fadeIn(0.6) }}>
            Am Postplatz · Titisee-Neustadt
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, ...fadeIn(0.7) }}>
            <a href="#booking" className="btn btn-primary">Tisch reservieren</a>
            <a href="speisekarte.html" className="btn btn-ghost">Speisekarte ansehen</a>
          </div>

          <a href="https://www.instagram.com/galarestaurantbar/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 28, ...fadeIn(0.85) }} className="hov-underline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--c-accent)' }}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
            <span style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--c-warm-gray)' }}>@galarestaurantbar</span>
          </a>
        </div>
      </div>


        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <video
            ref={videoRef}
            src="video/Hero Video Clean.mp4"
            muted
            playsInline
            preload="auto"
            style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}
          />
        </div>
      </div>
    </section>);

}

window.Hero = Hero;


// ===== components/About.jsx =====
function About() {
  const ref = React.useRef(null);
  window.useReveal(ref);

  return (
    <section ref={ref} id="about" className="section grain" style={{ position: 'relative' }}>
      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div className="divider reveal" style={{ marginBottom: 56 }}>
          <span className="line"></span>
          <span className="eyebrow">Unsere Geschichte</span>
          <span className="line"></span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 64 }} className="about-grid">
          <div>
            <h2 className="serif reveal" style={{ fontSize: 'clamp(2.6rem, 5vw, 4rem)', lineHeight: 1.08, marginBottom: 28, color: 'var(--c-cream)' }}>
              Genuss am <em style={{ fontStyle: 'italic', color: 'var(--c-accent)' }}>Postplatz</em>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, color: 'var(--c-warm-gray)', lineHeight: 1.75, fontSize: 15 }}>
              <p className="reveal reveal-d1">
                GALA in Titisee-Neustadt verbindet Restaurant, Bar und Café unter einem Dach — eine moderne Adresse für gutes Essen, ausgewählte Drinks und entspannte Stunden mit Freunden.
              </p>
              <p className="reveal reveal-d2">
                Frischer Segafredo-Kaffee, handgemachte Burger, saisonale Küche und handgefertigte Cocktails — sorgfältig zubereitet aus Zutaten, hinter denen wir stehen.
              </p>
              <p className="reveal reveal-d3">
                Mittwoch bis Montag geöffnet · Dienstag Ruhetag.
              </p>
            </div>

            <div className="reveal reveal-d3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 48, paddingTop: 36, borderTop: '1px solid var(--c-line)' }}>
              {[
              { num: '12:00', label: 'Geöffnet ab' },
              { num: '02:00', label: 'Sa bis' },
              { num: '5,0★', label: '30+ Bewertungen' }].
              map((s) =>
              <div key={s.label}>
                  <div className="serif" style={{ color: 'var(--c-accent)', fontSize: 'clamp(1.4rem, 2.6vw, 1.9rem)', marginBottom: 6 }}>
                    {s.num}
                  </div>
                  <div style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--c-warm-gray)' }}>
                    {s.label}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Image collage */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
            { img: 'img/about-night.jpg', label: 'Restaurant & Café', title: 'Küche', href: 'speisekarte.html', mt: 0 },
            { img: 'img/about-day.jpg', label: 'Bar & Lounge', title: 'Drinks', href: 'drinks.html', mt: 40 }].
            map((c, i) =>
            <a key={i} href={c.href} className={`reveal reveal-d${i + 1} img-zoom`} style={{ position: 'relative', aspectRatio: '3/4', marginTop: c.mt, overflow: 'hidden', display: 'block', textDecoration: 'none' }}>
                <div className="img-fallback">{c.title}</div>
                <div className="img-inner" style={{ position: 'absolute', inset: 0, backgroundImage: `url('${c.img}')`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.82) saturate(1.05)' }}></div>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,18,16,0.92), transparent 55%)' }}></div>
                <div style={{ position: 'absolute', left: 18, right: 18, bottom: 18 }}>
                  <div className="eyebrow" style={{ color: 'var(--c-accent-soft)', marginBottom: 6 }}>{c.label}</div>
                  <div className="serif" style={{ fontSize: 20, color: 'var(--c-cream)' }}>{c.title}</div>
                </div>
              </a>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 880px) {
          #about .about-grid { grid-template-columns: 1fr 1fr; gap: 96px; align-items: center; }
        }
      `}</style>
    </section>);

}

window.About = About;


// ===== components/Menu.jsx =====
// Teaser pointing to the standalone Speisekarte subpage — with burger reveal animation.
function Menu() {
  const ref = React.useRef(null);
  const sceneRef = React.useRef(null);
  const [progress, setProgress] = React.useState(0);
  window.useReveal(ref);

  React.useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0 when bottom of element enters viewport, 1 when top reaches center
        const raw = 1 - (rect.top - vh * 0.3) / (vh * 0.6);
        setProgress(Math.max(0, Math.min(1, raw)));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const p = progress;
  const cubic = (x) => 1 - Math.pow(1 - x, 3);
  const ep = cubic(p);

  return (
    <section ref={ref} id="menu" className="section alt grain" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div ref={sceneRef} className="menu-teaser-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 48, alignItems: 'center' }}>
          {/* Text content */}
          <div style={{ textAlign: 'center' }}>
            <div className="divider reveal" style={{ marginBottom: 22, justifyContent: 'center' }}>
              <span className="line"></span>
              <span className="eyebrow">Was wir servieren</span>
              <span className="line"></span>
            </div>
            <h2 className="serif reveal reveal-d1" style={{ fontSize: 'clamp(2.6rem, 5vw, 4rem)', color: 'var(--c-cream)', lineHeight: 1.08, marginBottom: 22 }}>
              Speisekarte<br /><em style={{ fontStyle: 'italic', color: 'var(--c-accent)' }}>am Postplatz</em>
            </h2>
            <p className="reveal reveal-d2" style={{ color: 'var(--c-warm-gray)', fontSize: 16, lineHeight: 1.75, marginBottom: 18 }}>
              Burger · Hot Dogs · Schnitzel · Snacks · Salate · Desserts · Extras.
            </p>
            <p className="reveal reveal-d2" style={{ color: 'var(--c-warm-gray-2)', fontSize: 13, lineHeight: 1.7, marginBottom: 36, maxWidth: 540, marginLeft: 'auto', marginRight: 'auto' }}>
              Saisonal ergänzt, frisch zubereitet — die vollständige Karte mit allen Preisen findest du auf unserer Speisekarten-Seite.
            </p>
            <div className="reveal reveal-d3" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
              <a href="speisekarte.html" className="btn btn-primary">Zur Speisekarte</a>
              <a href="drinks.html" className="btn btn-ghost">Drinks ansehen</a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 880px) {
          .menu-teaser-grid { grid-template-columns: 1fr 1.2fr !important; gap: 64px !important; }
          .menu-teaser-grid > div:last-child { text-align: left !important; }
          .menu-teaser-grid .divider { justify-content: flex-start !important; }
          .menu-teaser-grid .reveal.reveal-d3 { justify-content: flex-start !important; }
        }
      `}</style>
    </section>);

}

window.Menu = Menu;


// ===== components/Cocktails.jsx =====
function Cocktails({ tweaks }) {
  const ref = React.useRef(null);
  const D = window.GALA_DATA;
  window.useReveal(ref);

  if (!tweaks.showCocktails) return null;

  return (
    <section ref={ref} id="cocktails" className="section grain" style={{ position: 'relative' }}>
      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 48, alignItems: 'flex-start' }} className="cocktails-grid">
          <div>
            <div className="reveal" style={{ marginBottom: 18 }}>
              <span className="eyebrow">Drinks · Bar</span>
            </div>
            <h2 className="serif reveal reveal-d1" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)', lineHeight: 1.1, color: 'var(--c-cream)', marginBottom: 24 }}>
              Cocktails &<br /><em style={{ fontStyle: 'italic', color: 'var(--c-accent)' }}>Lounge-Klassiker</em>
            </h2>
            <p className="reveal reveal-d2" style={{ color: 'var(--c-warm-gray)', lineHeight: 1.75, fontSize: 15, maxWidth: 380, marginBottom: 28 }}>Handgemachte Cocktails von unserer Bar — Klassiker, Signature-Drinks und alkoholfreie Alternativen.

            </p>
            <div className="reveal reveal-d3" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Ice-cold Glassware', 'Hand-Cut Ice', 'Saisonale Zutaten', 'Local Spirits'].map((t) =>
              <span key={t} style={{ padding: '6px 12px', border: '1px solid var(--c-line-2)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--c-warm-gray)' }}>{t}</span>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            {D.cocktails.map((group, gi) =>
            <div key={group.group} className={`reveal reveal-d${Math.min(gi + 1, 3)}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                  <span className="serif" style={{ fontSize: 22, color: 'var(--c-cream)' }}>{group.group}</span>
                  <span style={{ flex: 1, height: 1, background: 'var(--c-line)' }}></span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {group.items.map((item) =>
                <li key={item.name} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'baseline' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                          <span className="serif" style={{ fontSize: 17, color: 'var(--c-cream)' }}>{item.name}</span>
                          <span style={{ flex: 1, minWidth: 30, height: 1, background: 'var(--c-line)', alignSelf: 'center', marginTop: 6 }}></span>
                        </div>
                        <p style={{ fontSize: 12.5, color: 'var(--c-warm-gray)', marginTop: 4, letterSpacing: '0.01em' }}>{item.description}</p>
                      </div>
                      <span style={{ color: 'var(--c-accent)', fontSize: 14, fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>{item.price}</span>
                    </li>
                )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 880px) {
          #cocktails .cocktails-grid { grid-template-columns: 0.85fr 1.15fr; gap: 88px; }
        }
      `}</style>
    </section>);

}

window.Cocktails = Cocktails;


// ===== components/Gallery.jsx =====
function GalleryItem({ item, onClick, delay }) {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const visible = inView && loaded;

  return (
    <button
      ref={ref}
      onClick={onClick}
      className="gallery-item"
      aria-label={`${item.label} — vergrößern`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      <img src={item.src} alt={item.label} loading="lazy" onLoad={() => setLoaded(true)} />
      <div className="gallery-label"><span>{item.label}</span></div>
    </button>
  );
}

function Gallery() {
  const ref = React.useRef(null);
  window.useReveal(ref);

  const allImages = [
    { src: 'img/gallery-7.png',  label: 'Ambiente' },
    { src: 'img/gallery-8.png',  label: 'Bar' },
    { src: 'img/gallery-9.png',  label: 'Lounge' },
    { src: 'img/gallery-10.png', label: 'Details' },
    { src: 'img/gallery-11.png', label: 'Abend' },
    { src: 'img/gallery-12.png', label: 'Terrasse' },
  ];

  const cols = [[], [], []];
  allImages.forEach((img, i) => cols[i % 3].push({ ...img, globalIdx: i }));

  const [lightbox, setLightbox] = React.useState(null);

  React.useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox((l) => (l + 1) % allImages.length);
      if (e.key === 'ArrowLeft') setLightbox((l) => (l - 1 + allImages.length) % allImages.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [lightbox]);

  return (
    <section ref={ref} id="gallery" className="section" style={{ position: 'relative' }}>
      <div className="wrap">
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div className="divider reveal" style={{ marginBottom: 18 }}>
            <span className="line"></span>
            <span className="eyebrow">Einblicke</span>
            <span className="line"></span>
          </div>
          <h2 className="serif reveal reveal-d1" style={{ fontSize: 'clamp(2.6rem, 5vw, 4rem)', color: 'var(--c-cream)' }}>
            Galerie
          </h2>
          <a className="reveal reveal-d2 hov-underline" href={window.GALA_DATA.brand.instagramUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: 14, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--c-accent)' }}>
            @galarestaurantbar →
          </a>
        </div>

        <div className="gallery-masonry">
          {cols.map((col, ci) => (
            <div key={ci} className="gallery-col">
              {col.map((item, rowIdx) => (
                <GalleryItem
                  key={item.globalIdx}
                  item={item}
                  onClick={() => setLightbox(item.globalIdx)}
                  delay={ci * 80 + rowIdx * 60}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(20,18,16,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          role="dialog"
          aria-modal="true"
        >
          <button onClick={() => setLightbox(null)} aria-label="Schließen" style={{ position: 'absolute', top: 24, right: 24, color: 'var(--c-cream)', fontSize: 28, padding: 8 }}>×</button>
          <button onClick={(e) => { e.stopPropagation(); setLightbox((l) => (l - 1 + allImages.length) % allImages.length); }} aria-label="Vorheriges" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--c-cream)', fontSize: 32, padding: 12 }}>‹</button>
          <button onClick={(e) => { e.stopPropagation(); setLightbox((l) => (l + 1) % allImages.length); }} aria-label="Nächstes" style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--c-cream)', fontSize: 32, padding: 12 }}>›</button>
          <img onClick={(e) => e.stopPropagation()} src={allImages[lightbox].src} alt={allImages[lightbox].label} style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain' }} />
        </div>
      )}
    </section>
  );
}

window.Gallery = Gallery;