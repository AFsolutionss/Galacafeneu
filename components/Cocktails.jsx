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
            <p className="reveal reveal-d2" style={{ color: 'var(--c-warm-gray)', lineHeight: 1.75, fontSize: 15, maxWidth: 380, marginBottom: 28 }}>
              Handgemachte Cocktails von unserer Bar — Klassiker, Signature-Drinks und alkoholfreie Alternativen. Ab 18:00 Uhr verwandelt sich GALA in eine warme, einladende Lounge.
            </p>
            <div className="reveal reveal-d3" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Ice-cold Glassware', 'Hand-Cut Ice', 'Saisonale Zutaten', 'Local Spirits'].map(t => (
                <span key={t} style={{ padding: '6px 12px', border: '1px solid var(--c-line-2)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--c-warm-gray)' }}>{t}</span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            {D.cocktails.map((group, gi) => (
              <div key={group.group} className={`reveal reveal-d${Math.min(gi + 1, 3)}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                  <span className="serif" style={{ fontSize: 22, color: 'var(--c-cream)' }}>{group.group}</span>
                  <span style={{ flex: 1, height: 1, background: 'var(--c-line)' }}></span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {group.items.map(item => (
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
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 880px) {
          #cocktails .cocktails-grid { grid-template-columns: 0.85fr 1.15fr; gap: 88px; }
        }
      `}</style>
    </section>
  );
}

window.Cocktails = Cocktails;
