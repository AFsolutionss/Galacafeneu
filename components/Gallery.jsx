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
    { src: 'img/gallery-1.jpg',  label: 'Hot Dogs' },
    { src: 'img/gallery-4.jpg',  label: 'Chicken' },
    { src: 'img/gallery-7.png',  label: 'Ambiente' },
    { src: 'img/gallery-10.png', label: 'Details' },
    { src: 'img/gallery-2.jpg',  label: 'Mozzarella' },
    { src: 'img/gallery-5.jpg',  label: 'Trüffel' },
    { src: 'img/gallery-8.png',  label: 'Bar' },
    { src: 'img/gallery-11.png', label: 'Abend' },
    { src: 'img/gallery-3.jpg',  label: 'Cheese' },
    { src: 'img/gallery-6.jpg',  label: 'Süßkartoffel' },
    { src: 'img/gallery-9.png',  label: 'Lounge' },
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
