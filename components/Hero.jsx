// Hero — warm bistro, scroll-driven burger assembly video

function Hero({ tweaks }) {
  const ref = React.useRef(null);
  const videoRef = React.useRef(null);
  const [loaded, setLoaded] = React.useState(false);
  const [parY, setParY] = React.useState(0);
  const status = window.useOpenStatus();
  const D = window.GALA_DATA;

  React.useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  React.useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        if (y < window.innerHeight) setParY(y * 0.25);

        // Scroll-driven video: map 0 → 120vh to video start → end
        const vid = videoRef.current;
        if (vid && vid.duration) {
          const scrollRange = window.innerHeight * 1.2;
          const progress = Math.min(Math.max(y / scrollRange, 0), 1);
          const targetTime = progress * vid.duration;
          if (Math.abs(vid.currentTime - targetTime) > 0.04) {
            vid.currentTime = targetTime;
          }
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const fadeIn = (delay) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'translateY(0)' : 'translateY(14px)',
    transition: `opacity 1s var(--ease-out-expo) ${delay}s, transform 1s var(--ease-out-expo) ${delay}s`,
  });

  return (
    <section
      ref={ref}
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'var(--c-bg)',
      }}
      className="grain"
    >
      {/* Scroll-driven burger assembly video */}
      <video
        ref={videoRef}
        aria-hidden="true"
        muted
        playsInline
        preload="auto"
        src="video/Gala Explode Burger.mp4"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) translateY(${parY * 0.25}px) scale(${loaded ? 1 : 1.06})`,
          transition: 'transform 1.6s var(--ease-out-expo)',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          filter: 'saturate(1.05)',
          pointerEvents: 'none',
        }}
      />
      {/* Left dark gradient */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            `linear-gradient(to right, var(--c-bg) 0%, var(--c-bg) 30%, color-mix(in oklab, var(--c-bg) 60%, transparent) 52%, color-mix(in oklab, var(--c-bg) 20%, transparent) 75%, transparent 100%)`,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      {/* Bottom fade */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 'auto 0 0 0', height: '24%',
          background: 'linear-gradient(to top, var(--c-bg) 0%, transparent 100%)',
          pointerEvents: 'none', zIndex: 1,
        }}
      />
      {/* Accent ambient */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: 0, left: 0, width: '60%', height: '100%',
          background: 'radial-gradient(ellipse at 25% 60%, var(--c-accent-tint), transparent 65%)',
          opacity: 0.6, pointerEvents: 'none', zIndex: 1,
        }}
      />

      <div className="wrap" style={{ position: 'relative', zIndex: 2, paddingTop: 120, paddingBottom: 80 }}>
        <div style={{ maxWidth: 620 }}>
          {tweaks.showOpenStatus && (
            <div style={{ ...fadeIn(0.2), marginBottom: 28 }}>
              <span className="live-pill">
                <span className={`dot ${status.open ? 'open' : 'closed'}`}></span>
                <span style={{ color: 'var(--c-cream)' }}>{status.label}</span>
              </span>
            </div>
          )}

          <p className="eyebrow" style={{ ...fadeIn(0.1), marginBottom: 20 }}>
            {D.brand.tagline}
          </p>

          <h1
            className="serif"
            style={{
              fontSize: 'clamp(4.5rem, 11vw, 9.5rem)',
              lineHeight: 0.95,
              letterSpacing: '0.04em',
              color: 'var(--c-cream)',
              marginBottom: 24,
              ...fadeIn(0.18),
            }}
          >
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
              color: 'var(--c-cream)', opacity: 0.85,
              marginBottom: 12,
              letterSpacing: '0.02em',
              ...fadeIn(0.5),
            }}
          >
            {D.brand.motto}
          </p>

          <p style={{ fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--c-warm-gray)', marginBottom: 44, ...fadeIn(0.6) }}>
            Am Postplatz · Titisee-Neustadt
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, ...fadeIn(0.7) }}>
            <a href="#booking" className="btn btn-primary">Tisch reservieren</a>
            <a href="#menu" className="btn btn-ghost">Speisekarte ansehen</a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          zIndex: 2, ...fadeIn(1.0),
        }}
      >
        <span style={{ fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--c-warm-gray)' }}>
          Entdecken
        </span>
        <div style={{ width: 1, height: 50, background: 'linear-gradient(to bottom, var(--c-accent), transparent)' }}></div>
      </div>
    </section>
  );
}

window.Hero = Hero;
