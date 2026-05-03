function Menu() {
  const [active, setActive] = React.useState('snacks');
  const [visible, setVisible] = React.useState(true);
  const ref = React.useRef(null);
  const D = window.GALA_DATA;
  window.useReveal(ref);

  const switchTab = (id) => {
    if (id === active) return;
    setVisible(false);
    setTimeout(() => { setActive(id); setVisible(true); }, 180);
  };

  const current = D.menu.find(c => c.id === active);

  return (
    <section ref={ref} id="menu" className="section alt grain" style={{ position: 'relative' }}>
      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="divider reveal" style={{ marginBottom: 18 }}>
            <span className="line"></span>
            <span className="eyebrow">Was wir servieren</span>
            <span className="line"></span>
          </div>
          <h2 className="serif reveal reveal-d1" style={{ fontSize: 'clamp(2.6rem, 5vw, 4rem)', color: 'var(--c-cream)' }}>
            Speisekarte
          </h2>
          <p className="reveal reveal-d2" style={{ marginTop: 14, color: 'var(--c-warm-gray)', fontSize: 14, letterSpacing: '0.05em' }}>
            Burger · Hot Dogs · Schnitzel · Snacks · Desserts
          </p>
        </div>

        <div role="tablist" className="reveal reveal-d1" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginBottom: 44 }}>
          {D.menu.map(c => (
            <button
              key={c.id}
              role="tab"
              aria-selected={active === c.id}
              onClick={() => switchTab(c.id)}
              className="tab"
            >
              {c.label}
            </button>
          ))}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 18,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.22s var(--ease-out-quart), transform 0.22s var(--ease-out-quart)',
          }}
        >
          {current.items.map(item => (
            <article key={item.name} className="dish-card">
              {item.img && (
                <div className="img-wrap">
                  <div className="img-fallback">{item.name}</div>
                  <div style={{ backgroundImage: `url('${item.img}')` }}></div>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,18,16,0.6), transparent 50%)' }}></div>
                </div>
              )}
              <div style={{ padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'flex-start', marginBottom: 8 }}>
                  <h3 className="serif" style={{ fontSize: 18, lineHeight: 1.25, color: 'var(--c-cream)' }}>{item.name}</h3>
                  <span style={{ color: 'var(--c-accent)', fontSize: 14, fontWeight: 500, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', paddingTop: 2 }}>{item.price}</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--c-warm-gray)', lineHeight: 1.65 }}>{item.description}</p>
              </div>
            </article>
          ))}
        </div>

        <p style={{ textAlign: 'center', marginTop: 44, color: 'var(--c-warm-gray-2)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase' }}>
          Vollständige Karte vor Ort · Änderungen vorbehalten · Alle Preise inkl. MwSt.
        </p>
      </div>
    </section>
  );
}

window.Menu = Menu;
