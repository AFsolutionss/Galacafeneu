function Testimonials({ tweaks }) {
  const ref = React.useRef(null);
  const D = window.GALA_DATA;
  window.useReveal(ref);

  if (!tweaks.showTestimonials) return null;

  const Stars = ({ n }) => (
    <span className="stars" aria-label={`${n} von 5 Sternen`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ opacity: i < n ? 1 : 0.2 }}>★</span>
      ))}
    </span>
  );

  return (
    <section ref={ref} id="testimonials" className="section alt" style={{ position: 'relative' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 36, alignItems: 'flex-end', marginBottom: 40 }} className="testi-head">
          <div>
            <div className="reveal" style={{ marginBottom: 14 }}>
              <span className="eyebrow">Was Gäste sagen</span>
            </div>
            <h2 className="serif reveal reveal-d1" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)', lineHeight: 1.1, color: 'var(--c-cream)' }}>
              5,0 ★ <em style={{ fontStyle: 'italic', color: 'var(--c-accent)' }}>auf Google</em>
            </h2>
          </div>
          <div className="reveal reveal-d2" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Stars n={5} />
              <span className="serif" style={{ fontSize: 18, color: 'var(--c-cream)' }}>5,0</span>
              <span style={{ color: 'var(--c-warm-gray)', fontSize: 13 }}>· 30+ Bewertungen</span>
            </div>
            <span style={{ color: 'var(--c-warm-gray-2)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              Stand: heute
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {D.testimonials.map((t, i) => (
            <figure key={i} className={`quote-card reveal reveal-d${Math.min(i + 1, 4)}`}>
              <span className="quote-mark" aria-hidden="true">"</span>
              <Stars n={t.rating} />
              <blockquote className="serif" style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--c-cream)', marginTop: 16, marginBottom: 24, fontStyle: 'italic', flex: 1 }}>
                {t.text}
              </blockquote>
              <figcaption style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--c-line)', paddingTop: 14 }}>
                <div>
                  <div style={{ color: 'var(--c-cream)', fontSize: 13, fontWeight: 500 }}>{t.name}</div>
                  <div style={{ color: 'var(--c-warm-gray-2)', fontSize: 11, letterSpacing: '0.05em' }}>{t.source} · {t.date}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 720px) {
          #testimonials .testi-head { grid-template-columns: 1fr auto; }
        }
      `}</style>
    </section>
  );
}

window.Testimonials = Testimonials;
