function Footer() {
  const D = window.GALA_DATA;
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: 'var(--c-bg)', borderTop: '1px solid var(--c-line)', paddingTop: 64, paddingBottom: 36 }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 48, marginBottom: 56 }}>
          <div>
            <div className="serif" style={{ fontSize: 28, letterSpacing: '0.18em', color: 'var(--c-accent)', textTransform: 'uppercase', marginBottom: 4 }}>GALA</div>
            <div style={{ fontSize: 9, letterSpacing: '0.32em', color: 'var(--c-warm-gray)', textTransform: 'uppercase', marginBottom: 18 }}>{D.brand.tagline}</div>
            <p style={{ color: 'var(--c-warm-gray)', fontSize: 14, lineHeight: 1.7, maxWidth: 240 }}>
              Restaurant, Bar und Café am Postplatz — ein Ort für jeden Anlass.
            </p>
            <a href={D.brand.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, border: '1px solid var(--c-line-2)', color: 'var(--c-warm-gray)', marginTop: 22, transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--c-accent)'; e.currentTarget.style.color = 'var(--c-accent)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--c-line-2)'; e.currentTarget.style.color = 'var(--c-warm-gray)'; }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--c-accent)', marginBottom: 18 }}>Öffnungszeiten</div>
            <dl>
              {D.hoursDisplay.map(h => (
                <div key={h.day} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid var(--c-line)', fontSize: 13.5 }}>
                  <dt style={{ color: 'var(--c-warm-gray)' }}>{h.day}</dt>
                  <dd style={{ color: 'var(--c-cream)', fontVariantNumeric: 'tabular-nums' }}>{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--c-accent)', marginBottom: 18 }}>Kontakt</div>
            <address style={{ fontStyle: 'normal', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              <span style={{ color: 'var(--c-warm-gray)', fontSize: 14, lineHeight: 1.6 }}>Am Postplatz 4<br />79822 Titisee-Neustadt</span>
              <a href={D.brand.instagramUrl} target="_blank" rel="noopener noreferrer" className="hov-underline" style={{ color: 'var(--c-warm-gray)', fontSize: 14 }}>{D.brand.instagram}</a>
              <a href={D.brand.mapsUrl} target="_blank" rel="noopener noreferrer" className="hov-underline" style={{ color: 'var(--c-warm-gray)', fontSize: 14 }}>Google Maps</a>
            </address>
            <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--c-accent)', marginBottom: 12 }}>Navigation</div>
            <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 12px' }}>
              {D.nav.map(n => (
                <li key={n.href}><a href={n.href} className="hov-underline" style={{ color: 'var(--c-warm-gray)', fontSize: 13 }}>{n.label}</a></li>
              ))}
              <li><a href="#booking" className="hov-underline" style={{ color: 'var(--c-warm-gray)', fontSize: 13 }}>Reservierung</a></li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--c-line)', paddingTop: 24, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16 }}>
          <p style={{ color: 'var(--c-warm-gray-2)', fontSize: 12 }}>© {year} GALA Restaurant · Bar · Café</p>
          <nav style={{ display: 'flex', gap: 24 }}>
            <a href="#" className="hov-underline" style={{ color: 'var(--c-warm-gray-2)', fontSize: 12 }}>Impressum</a>
            <a href="#" className="hov-underline" style={{ color: 'var(--c-warm-gray-2)', fontSize: 12 }}>Datenschutz</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
