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
              Ein Ort, <em style={{ fontStyle: 'italic', color: 'var(--c-accent)' }}>zwei Welten</em>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, color: 'var(--c-warm-gray)', lineHeight: 1.75, fontSize: 15 }}>
              <p className="reveal reveal-d1">
                GALA am Postplatz in Titisee-Neustadt vereint Restaurant und Lounge Bar unter einem Dach — tagsüber entspannt genießen, nachts ausgelassen feiern.
              </p>
              <p className="reveal reveal-d2">
                Frischer Segafredo-Kaffee, handgemachte Burger und saisonale Küche begleiten den Tag. Mit einbrechender Dunkelheit verwandelt sich das GALA in eine lebendige Lounge mit handgefertigten Cocktails und ausgewählten Drinks.
              </p>
              <p className="reveal reveal-d3">
                Von Mittwoch bis Montag geöffnet — samstags bis 02:00 Uhr. Dienstags geschlossen.
              </p>
            </div>

            <div className="reveal reveal-d3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 48, paddingTop: 36, borderTop: '1px solid var(--c-line)' }}>
              {[
                { num: '12:00', label: 'Geöffnet ab' },
                { num: '02:00', label: 'Sa bis' },
                { num: '5,0★', label: '30+ Bewertungen' },
              ].map(s => (
                <div key={s.label}>
                  <div className="serif" style={{ color: 'var(--c-accent)', fontSize: 'clamp(1.4rem, 2.6vw, 1.9rem)', marginBottom: 6 }}>
                    {s.num}
                  </div>
                  <div style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--c-warm-gray)' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Day/Night cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { img: 'img/about-day.jpg', label: 'Morgen & Mittag', title: 'Restaurant & Café', chip: '☀ Tag', mt: 0 },
              { img: 'img/about-night.jpg', label: 'Abend & Nacht', title: 'Bar & Lounge', chip: '☾ Nacht', mt: 40 },
            ].map((c, i) => (
              <div key={i} className={`reveal reveal-d${i+1} img-zoom`} style={{ position: 'relative', aspectRatio: '3/4', marginTop: c.mt, overflow: 'hidden' }}>
                <div className="img-fallback">{c.title}</div>
                <div className="img-inner" style={{ position: 'absolute', inset: 0, backgroundImage: `url('${c.img}')`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.78) saturate(1.05)' }}></div>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,18,16,0.95), transparent 60%)' }}></div>
                <div style={{ position: 'absolute', top: 16, left: 16 }}>
                  <span className="day-night-chip" style={{ background: 'rgba(20,18,16,0.7)', backdropFilter: 'blur(8px)' }}>{c.chip}</span>
                </div>
                <div style={{ position: 'absolute', left: 18, right: 18, bottom: 18 }}>
                  <div className="eyebrow" style={{ color: 'var(--c-accent-soft)', marginBottom: 6 }}>{c.label}</div>
                  <div className="serif" style={{ fontSize: 20, color: 'var(--c-cream)' }}>{c.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 880px) {
          #about .about-grid { grid-template-columns: 1fr 1fr; gap: 96px; align-items: center; }
        }
      `}</style>
    </section>
  );
}

window.About = About;
