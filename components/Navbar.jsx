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
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        padding: scrolled ? '14px 0' : '22px 0',
        transition: 'padding 0.45s var(--ease-out-quart)',
      }}
      className={scrolled ? 'glass' : ''}
    >
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
        <a href="#" aria-label="GALA" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span className="serif" style={{ fontSize: 26, letterSpacing: '0.18em', color: 'var(--c-accent)', textTransform: 'uppercase' }}>
            GALA
          </span>
          <span style={{ fontSize: 9, letterSpacing: '0.32em', color: 'var(--c-warm-gray)', marginTop: 3, textTransform: 'uppercase' }}>
            {D.brand.tagline}
          </span>
        </a>

        <nav className="desktop-nav" style={{ display: 'none' }}>
          {D.nav.map(n => (
            <a key={n.href} href={n.href} className="hov-underline" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--c-cream)', opacity: 0.7 }}>
              {n.label}
            </a>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {tweaks.showOpenStatus && (
            <span className="live-pill" style={{ display: 'none' }} data-shown="lg">
              <span className={`dot ${status.open ? 'open' : 'closed'}`}></span>
              <span style={{ color: 'var(--c-cream)' }}>{status.label}</span>
            </span>
          )}
          <a href="#booking" className="btn btn-ghost" style={{ borderColor: 'var(--c-accent)', color: 'var(--c-accent)', padding: '10px 18px' }}>
            Reservieren
          </a>
          <button
            className="mobile-toggle"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: 8 }}
          >
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
            {tweaks.showOpenStatus && (
              <span className="live-pill" style={{ alignSelf: 'flex-start', marginBottom: 10 }}>
                <span className={`dot ${status.open ? 'open' : 'closed'}`}></span>
                <span style={{ color: 'var(--c-cream)' }}>{status.label}</span>
              </span>
            )}
            {D.nav.map(n => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} style={{ padding: '14px 0', borderBottom: '1px solid var(--c-line)', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-cream)', opacity: 0.75 }}>
                {n.label}
              </a>
            ))}
            <a href="#booking" onClick={() => setOpen(false)} className="btn btn-primary" style={{ marginTop: 14 }}>
              Tisch reservieren
            </a>
          </nav>
        </div>
      </div>

      <style>{`
        @media (min-width: 920px) {
          .desktop-nav { display: flex !important; align-items: center; gap: 28px; }
          .mobile-toggle { display: none !important; }
          [data-shown="lg"] { display: inline-flex !important; }
        }
        @media (max-width: 919px) {
          .mobile-menu-grid { display: grid; }
        }
      `}</style>
    </header>
  );
}

window.Navbar = Navbar;
