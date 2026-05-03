// ===== components/SubpageHero.jsx =====
// Compact intro band for subpages (speisekarte, drinks).
// Title left, optional summary right. No video, no scroll-scrub.

function SubpageHero({ eyebrow, title, italic, summary, meta, heroImage }) {
  const ref = React.useRef(null);
  const [loaded, setLoaded] = React.useState(false);
  window.useReveal(ref);

  React.useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      ref={ref}
      className="grain"
      style={{
        position: 'relative',
        background: 'var(--c-bg)',
        paddingTop: 'clamp(140px, 18vh, 200px)',
        paddingBottom: 'clamp(48px, 8vh, 96px)',
        overflow: 'hidden',
      }}>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 80% 20%, var(--c-accent-tint), transparent 60%)',
          opacity: 0.55, pointerEvents: 'none',
        }}></div>

      {/* Hero image with entrance animation */}
      {heroImage && (
        <div aria-hidden="true" style={{
          position: 'absolute', right: '-5%', top: '50%',
          width: 'clamp(300px, 38vw, 520px)', height: 'clamp(300px, 38vw, 520px)',
          transform: loaded ? 'translateY(-50%) scale(1)' : 'translateY(-45%) scale(0.85)',
          opacity: loaded ? 0.35 : 0,
          filter: loaded ? 'brightness(0.7) saturate(0.9)' : 'brightness(0.2) saturate(0.3)',
          transition: 'all 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none', zIndex: 0,
        }}>
          <img src={heroImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }} />
        </div>
      )}

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div className="subpage-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32, alignItems: 'flex-end' }}>
          <div>
            <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <span style={{ width: 36, height: 1, background: 'var(--c-accent)' }}></span>
              <span className="eyebrow">{eyebrow}</span>
            </div>
            <h1
              className="serif reveal reveal-d1"
              style={{
                fontSize: 'clamp(3.2rem, 8vw, 6.4rem)',
                lineHeight: 0.98,
                letterSpacing: '0.01em',
                color: 'var(--c-cream)',
                margin: 0,
              }}>
              {title}{italic && <><br /><em style={{ fontStyle: 'italic', color: 'var(--c-accent)' }}>{italic}</em></>}
            </h1>
            {meta && (
              <p className="reveal reveal-d2" style={{ marginTop: 22, fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--c-warm-gray)' }}>
                {meta}
              </p>
            )}
          </div>
          {summary && (
            <p className="reveal reveal-d2 serif" style={{ fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', lineHeight: 1.65, color: 'var(--c-warm-gray)', maxWidth: 460, fontStyle: 'italic', margin: 0 }}>
              {summary}
            </p>
          )}
        </div>
      </div>
      <style>{`
        @media (min-width: 880px) {
          .subpage-hero-grid { grid-template-columns: 1.5fr 1fr; gap: 64px; }
        }
      `}</style>
    </section>
  );
}

window.SubpageHero = SubpageHero;


// ===== components/MenuPage.jsx =====
// Full speisekarte — typographic listing, no images, all categories visible.
// Sticky in-page anchors on the left (desktop), simple section flow on mobile.

function MenuPage() {
  const ref = React.useRef(null);
  const D = window.GALA_DATA;
  window.useReveal(ref);

  const [active, setActive] = React.useState(D.menu[0].id);

  // Track which section is in view (closest to top within a band).
  React.useEffect(() => {
    const onScroll = () => {
      const offsets = D.menu.map(c => {
        const el = document.getElementById('cat-' + c.id);
        if (!el) return { id: c.id, top: Infinity };
        return { id: c.id, top: el.getBoundingClientRect().top - 140 };
      });
      const above = offsets.filter(o => o.top <= 0);
      const next = above.length ? above[above.length - 1].id : offsets[0].id;
      setActive(next);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section ref={ref} id="speisekarte" className="section" style={{ position: 'relative' }}>
      <div className="wrap">
        <div className="menupage-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 48 }}>
          {/* Sticky category nav */}
          <aside className="menupage-aside reveal">
            <div style={{ position: 'sticky', top: 120 }}>
              <div style={{ fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--c-warm-gray-2)', marginBottom: 18, paddingBottom: 14, borderBottom: '1px solid var(--c-line)' }}>
                Kategorien
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
                {D.menu.map((c, i) => {
                  const isActive = active === c.id;
                  return (
                    <li key={c.id}>
                      <a
                        href={'#cat-' + c.id}
                        className="menupage-cat-link"
                        data-active={isActive}
                        style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          gap: 14,
                          padding: '11px 0',
                          fontSize: 14,
                          color: isActive ? 'var(--c-cream)' : 'var(--c-warm-gray)',
                          transition: 'color 0.25s, padding 0.25s',
                          paddingLeft: isActive ? 14 : 0,
                          position: 'relative',
                        }}>
                        <span
                          aria-hidden="true"
                          style={{
                            position: 'absolute', left: 0, top: '50%',
                            transform: 'translateY(-50%)',
                            width: isActive ? 8 : 0, height: 1,
                            background: 'var(--c-accent)',
                            transition: 'width 0.3s var(--ease-out-quart)',
                          }}></span>
                        <span className="serif" style={{ fontSize: 11, color: 'var(--c-warm-gray-2)', fontVariantNumeric: 'tabular-nums', letterSpacing: '0.05em' }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span style={{ flex: 1 }}>{c.label}</span>
                        <span style={{ fontSize: 10, color: 'var(--c-warm-gray-2)', fontVariantNumeric: 'tabular-nums' }}>
                          {c.items.length}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
              <div style={{ marginTop: 28, paddingTop: 22, borderTop: '1px solid var(--c-line)' }}>
                <div style={{ fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--c-warm-gray-2)', marginBottom: 12 }}>Tisch buchen</div>
                <a href="GALA Webseite.html#booking" className="hov-underline" style={{ fontSize: 13, color: 'var(--c-accent)', letterSpacing: '0.05em' }}>
                  Reservierung anfragen →
                </a>
              </div>
            </div>
          </aside>

          {/* Categories list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 72 }}>
            {D.menu.map((cat, ci) => (
              <div key={cat.id} id={'cat-' + cat.id} style={{ scrollMarginTop: 120 }}>
                <div className="reveal" style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 32, borderBottom: '1px solid var(--c-line-2)', paddingBottom: 18 }}>
                  <span className="serif" style={{ fontSize: 13, color: 'var(--c-accent)', fontVariantNumeric: 'tabular-nums', letterSpacing: '0.1em' }}>
                    {String(ci + 1).padStart(2, '0')}
                  </span>
                  <h2 className="serif" style={{ fontSize: 'clamp(2rem, 3.8vw, 2.8rem)', color: 'var(--c-cream)', lineHeight: 1.1, margin: 0 }}>
                    {cat.label}
                  </h2>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' }}>
                  {cat.items.map((item, ii) => (
                    <li
                      key={item.name}
                      className={`menupage-row reveal reveal-d${Math.min(ii + 1, 4)}`}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr auto',
                        gap: 24,
                        alignItems: 'baseline',
                        padding: '20px 0',
                        borderBottom: '1px solid var(--c-line)',
                      }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 6 }}>
                          <h3 className="serif" style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)', color: 'var(--c-cream)', lineHeight: 1.25, margin: 0 }}>
                            {item.name}
                          </h3>
                          <span aria-hidden="true" style={{ flex: 1, minWidth: 24, height: 1, background: 'var(--c-line)', alignSelf: 'center', marginTop: 6 }}></span>
                        </div>
                        <p style={{ fontSize: 13.5, color: 'var(--c-warm-gray)', lineHeight: 1.65, maxWidth: 620, margin: 0 }}>
                          {item.description}
                        </p>
                      </div>
                      <span className="serif" style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)', color: 'var(--c-accent)', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', alignSelf: 'baseline' }}>
                        {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <p style={{ marginTop: 8, color: 'var(--c-warm-gray-2)', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', textAlign: 'center', borderTop: '1px solid var(--c-line)', paddingTop: 32 }}>
              Vollständige Karte vor Ort · Änderungen vorbehalten · Alle Preise inkl. MwSt.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 980px) {
          .menupage-grid { grid-template-columns: 240px 1fr; gap: 80px; align-items: flex-start; }
        }
        @media (max-width: 979px) {
          .menupage-aside { display: none; }
        }
      `}</style>
    </section>
  );
}

window.MenuPage = MenuPage;


// ===== components/DrinksPage.jsx =====
// Full drinks list — typographic, three groups, no images.

function DrinksPage() {
  const ref = React.useRef(null);
  const D = window.GALA_DATA;
  window.useReveal(ref);

  return (
    <section ref={ref} id="drinks" className="section" style={{ position: 'relative' }}>
      <div className="wrap">
        <div className="drinkspage-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 48 }}>
          {/* Side intro */}
          <aside className="drinkspage-aside reveal" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ position: 'sticky', top: 120, display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--c-warm-gray-2)', marginBottom: 16, paddingBottom: 14, borderBottom: '1px solid var(--c-line)' }}>
                  Aus der Bar
                </div>
                <p style={{ color: 'var(--c-warm-gray)', lineHeight: 1.75, fontSize: 14 }}>
                  Kaffee, Tee, Softdrinks, Säfte, Bier, Wein, Cocktails, Longdrinks, Shots und Sekt — unsere komplette Getränkekarte.
                </p>
              </div>
              <div>
                <div style={{ fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--c-warm-gray-2)', marginBottom: 12 }}>Standards</div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {['Segafredo Kaffee', 'Regionale Biere', 'Cocktails & Longdrinks', 'Wein & Sekt'].map(t => (
                    <li key={t} style={{ color: 'var(--c-cream)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span aria-hidden="true" style={{ width: 5, height: 5, background: 'var(--c-accent)', borderRadius: 999 }}></span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ paddingTop: 22, borderTop: '1px solid var(--c-line)' }}>
                <div style={{ fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--c-warm-gray-2)', marginBottom: 12 }}>Auch da</div>
                <a href="speisekarte.html" className="hov-underline" style={{ display: 'block', fontSize: 13, color: 'var(--c-cream)', marginBottom: 6 }}>Speisekarte →</a>
                <a href="GALA Webseite.html#booking" className="hov-underline" style={{ display: 'block', fontSize: 13, color: 'var(--c-accent)' }}>Reservierung anfragen →</a>
              </div>
            </div>
          </aside>

          {/* Groups */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
            {D.cocktails.map((group, gi) => (
              <div key={group.group} className="reveal" id={'group-' + group.group.toLowerCase()} style={{ scrollMarginTop: 120 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 28, borderBottom: '1px solid var(--c-line-2)', paddingBottom: 18 }}>
                  <span className="serif" style={{ fontSize: 13, color: 'var(--c-accent)', fontVariantNumeric: 'tabular-nums', letterSpacing: '0.1em' }}>
                    {String(gi + 1).padStart(2, '0')}
                  </span>
                  <h2 className="serif" style={{ fontSize: 'clamp(2rem, 3.8vw, 2.8rem)', color: 'var(--c-cream)', lineHeight: 1.1, margin: 0 }}>
                    {group.group}
                  </h2>
                  <span aria-hidden="true" style={{ flex: 1, height: 1, background: 'var(--c-line)' }}></span>
                  <span style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--c-warm-gray-2)' }}>
                    {group.items.length} Drinks
                  </span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' }}>
                  {group.items.map((item, ii) => (
                    <li
                      key={item.name}
                      className={`reveal reveal-d${Math.min(ii + 1, 4)}`}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr auto',
                        gap: 24,
                        alignItems: 'baseline',
                        padding: '18px 0',
                        borderBottom: '1px solid var(--c-line)',
                      }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 5 }}>
                          <h3 className="serif" style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)', color: 'var(--c-cream)', lineHeight: 1.25, margin: 0 }}>
                            {item.name}
                          </h3>
                          <span aria-hidden="true" style={{ flex: 1, minWidth: 24, height: 1, background: 'var(--c-line)', alignSelf: 'center', marginTop: 6 }}></span>
                        </div>
                        <p style={{ fontSize: 13, color: 'var(--c-warm-gray)', lineHeight: 1.65, margin: 0, letterSpacing: '0.01em' }}>
                          {item.description}
                        </p>
                      </div>
                      <span className="serif" style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)', color: 'var(--c-accent)', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
                        {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <p style={{ marginTop: 8, color: 'var(--c-warm-gray-2)', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', textAlign: 'center', borderTop: '1px solid var(--c-line)', paddingTop: 32 }}>
              Verantwortungsvoller Genuss · Kein Ausschank an unter 18-Jährige · Alle Preise inkl. MwSt.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 980px) {
          .drinkspage-grid { grid-template-columns: 260px 1fr; gap: 80px; align-items: flex-start; }
        }
        @media (max-width: 979px) {
          .drinkspage-aside { display: none; }
        }
      `}</style>
    </section>
  );
}

window.DrinksPage = DrinksPage;


// ===== Subpage Tweaks (no Cocktails toggle) =====
// Lightweight tweaks for subpages — accent + surface only.
function SubpageTweaks() {
  const [tweaks, setTweak] = window.useTweaks(window.GALA_TWEAKS);

  React.useEffect(() => {
    document.documentElement.dataset.accent = tweaks.accent;
    document.documentElement.dataset.surface = tweaks.surface;
    document.documentElement.dataset.headerSerif = tweaks.headerSerif;
  }, [tweaks.accent, tweaks.surface, tweaks.headerSerif]);

  React.useEffect(() => {
    window.__galaTweaks = tweaks;
    window.dispatchEvent(new CustomEvent('gala-tweaks', { detail: tweaks }));
  }, [tweaks]);

  return (
    <window.TweaksPanel title="Tweaks">
      <window.TweakSection title="Richtung">
        <window.TweakRadio
          label="Akzentfarbe"
          value={tweaks.accent}
          onChange={(v) => setTweak('accent', v)}
          options={[
            { value: 'terracotta', label: 'Terrakotta' },
            { value: 'olive', label: 'Olive' },
            { value: 'brass', label: 'Messing' },
          ]}
        />
        <window.TweakRadio
          label="Oberfläche"
          value={tweaks.surface}
          onChange={(v) => setTweak('surface', v)}
          options={[
            { value: 'charcoal', label: 'Charcoal' },
            { value: 'cream', label: 'Creme' },
          ]}
        />
      </window.TweakSection>
      <window.TweakSection title="Inhalte">
        <window.TweakToggle
          label="Live Geöffnet/Geschlossen"
          value={tweaks.showOpenStatus}
          onChange={(v) => setTweak('showOpenStatus', v)}
        />
      </window.TweakSection>
    </window.TweaksPanel>
  );
}

window.GalaSubpageTweaks = SubpageTweaks;
