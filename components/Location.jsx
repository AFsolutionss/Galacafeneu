function Location() {
  const ref = React.useRef(null);
  const D = window.GALA_DATA;
  window.useReveal(ref);

  return (
    <section ref={ref} id="location" className="section alt" style={{ position: 'relative' }}>
      <div className="wrap">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="divider reveal" style={{ marginBottom: 18 }}>
            <span className="line"></span>
            <span className="eyebrow">Finden Sie uns</span>
            <span className="line"></span>
          </div>
          <h2 className="serif reveal reveal-d1" style={{ fontSize: 'clamp(2.6rem, 5vw, 4rem)', color: 'var(--c-cream)' }}>Standort</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 28 }} className="loc-grid">
          <div className="reveal reveal-d1" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--c-accent)', marginBottom: 12 }}>Adresse</div>
              <address style={{ fontStyle: 'normal', color: 'var(--c-cream)', fontSize: 15, lineHeight: 1.7 }}>
                Am Postplatz 4<br />79822 Titisee-Neustadt<br />Baden-Württemberg
              </address>
            </div>
            <div>
              <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--c-accent)', marginBottom: 12 }}>Öffnungszeiten</div>
              <dl>
                {D.hoursDisplay.map(h => (
                  <div key={h.day} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid var(--c-line)', fontSize: 14 }}>
                    <dt style={{ color: 'var(--c-warm-gray)' }}>{h.day}</dt>
                    <dd style={{ color: 'var(--c-cream)', fontVariantNumeric: 'tabular-nums' }}>{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--c-accent)', marginBottom: 12 }}>Anfahrt</div>
              <p style={{ color: 'var(--c-warm-gray)', fontSize: 14, lineHeight: 1.75 }}>
                Direkt am Postplatz<br />Parkplätze in unmittelbarer Nähe<br />Bahnhof Titisee-Neustadt: ca. 5 min
              </p>
            </div>
            <a href={D.brand.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ alignSelf: 'flex-start', borderColor: 'var(--c-accent)', color: 'var(--c-accent)' }}>
              In Google Maps öffnen →
            </a>
          </div>

          <div className="reveal reveal-d2" style={{ position: 'relative', overflow: 'hidden', border: '1px solid var(--c-line)', minHeight: 380 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2674.3538485715508!2d8.2124005!3d47.9101904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4790f3c25f4f227f%3A0x20424a522976716!2sGALA%20Restaurant%20%26%20Lounge!5e0!3m2!1sde!2sde!4v1714000000000!5m2!1sde!2sde"
              style={{ width: '100%', height: '100%', minHeight: 380, border: 0, filter: 'grayscale(0.85) contrast(0.9) brightness(0.85)' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="GALA Standort"
            ></iframe>
            <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'var(--c-accent-tint)', mixBlendMode: 'multiply', pointerEvents: 'none' }}></div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 880px) {
          #location .loc-grid { grid-template-columns: 1fr 2fr; gap: 48px; align-items: stretch; }
        }
      `}</style>
    </section>
  );
}

window.Location = Location;
