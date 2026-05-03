// ===== components/Booking.jsx =====
function Booking() {
  const ref = React.useRef(null);
  const D = window.GALA_DATA;
  window.useReveal(ref);

  const [form, setForm] = React.useState({
    name: '', email: '', phone: '', date: '', time: '', guests: '2', message: '',
  });
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);

  const today = new Date().toISOString().slice(0, 10);

  const validate = (f) => {
    const e = {};
    if (!f.name.trim()) e.name = 'Bitte Name eingeben';
    if (!f.email.trim()) e.email = 'Bitte E-Mail eingeben';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) e.email = 'E-Mail-Format prüfen';
    if (!f.date) e.date = 'Bitte Datum wählen';
    else if (f.date < today) e.date = 'Datum liegt in der Vergangenheit';
    else {
      // Tuesday closed
      const d = new Date(f.date + 'T12:00');
      if (d.getDay() === 2) e.date = 'Dienstags geschlossen';
    }
    if (!f.time) e.time = 'Bitte Uhrzeit wählen';
    else {
      const [h, m] = f.time.split(':').map(Number);
      const mins = h * 60 + (m || 0);
      if (mins < 12 * 60 || mins > 23 * 60) e.time = 'Reservierungen 12:00 – 23:00';
    }
    if (f.phone && !/^[+\d\s()/-]{6,}$/.test(f.phone)) e.phone = 'Telefonformat prüfen';
    return e;
  };

  const onChange = (e) => {
    const next = { ...form, [e.target.name]: e.target.value };
    setForm(next);
    if (touched[e.target.name]) setErrors(validate(next));
  };
  const onBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
    setErrors(validate(form));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    setTouched({ name: 1, email: 1, phone: 1, date: 1, time: 1 });
    if (Object.keys(errs).length === 0) setSubmitted(true);
  };

  const fieldClass = (n) => 'field' + (errors[n] && touched[n] ? ' invalid' : '');

  return (
    <section ref={ref} id="booking" className="section grain" style={{ position: 'relative' }}>
      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 56 }} className="book-grid">
          <div>
            <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
              <span style={{ width: 36, height: 1, background: 'var(--c-accent)' }}></span>
              <span className="eyebrow">Reservierung</span>
            </div>
            <h2 className="serif reveal reveal-d1" style={{ fontSize: 'clamp(2.6rem, 5vw, 4rem)', lineHeight: 1.1, color: 'var(--c-cream)', marginBottom: 24 }}>
              Tisch<br /><em style={{ fontStyle: 'italic', color: 'var(--c-accent)' }}>reservieren</em>
            </h2>
            <p className="reveal reveal-d2" style={{ color: 'var(--c-warm-gray)', lineHeight: 1.75, fontSize: 14.5, maxWidth: 380, marginBottom: 36 }}>
              Planen Sie Ihren Besuch im GALA am Postplatz. Für Gruppen und besondere Anlässe kontaktieren Sie uns direkt — wir antworten innerhalb von 24 Stunden.
            </p>

            <div className="reveal reveal-d3">
              <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--c-warm-gray-2)', marginBottom: 14 }}>Öffnungszeiten</div>
              <dl>
                {D.hoursDisplay.map(h => (
                  <div key={h.day} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid var(--c-line)' }}>
                    <dt style={{ color: 'var(--c-warm-gray)', fontSize: 14 }}>{h.day}</dt>
                    <dd style={{ color: 'var(--c-cream)', fontSize: 14, fontVariantNumeric: 'tabular-nums' }}>{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="card reveal reveal-d1" style={{ padding: 28 }}>
            {submitted ? (
              <div role="status" aria-live="polite" style={{ textAlign: 'center', padding: '36px 12px' }}>
                <div className="serif" style={{ fontSize: 48, color: 'var(--c-accent)', marginBottom: 16 }}>✓</div>
                <h3 className="serif" style={{ fontSize: 24, color: 'var(--c-cream)', marginBottom: 10 }}>Vielen Dank, {form.name.split(' ')[0] || 'lieber Gast'}!</h3>
                <p style={{ color: 'var(--c-warm-gray)', fontSize: 14, lineHeight: 1.7 }}>
                  Ihre Anfrage für <strong style={{ color: 'var(--c-cream)' }}>{form.guests} {form.guests === '1' ? 'Person' : 'Personen'}</strong> am{' '}
                  <strong style={{ color: 'var(--c-cream)' }}>{form.date}</strong> um <strong style={{ color: 'var(--c-cream)' }}>{form.time}</strong> ist eingegangen.
                  Wir bestätigen innerhalb von 24 Stunden.
                </p>
                <button onClick={() => { setSubmitted(false); setForm({ name:'',email:'',phone:'',date:'',time:'',guests:'2',message:'' }); setTouched({}); setErrors({}); }} style={{ marginTop: 28, fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--c-accent)' }} className="hov-underline">
                  Neue Anfrage
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: 14 }}>
                  <div>
                    <label htmlFor="name" className="field-label">Name *</label>
                    <input id="name" name="name" type="text" autoComplete="name" placeholder="Ihr Name" value={form.name} onChange={onChange} onBlur={onBlur} className={fieldClass('name')} />
                    {errors.name && touched.name && <div className="field-error">{errors.name}</div>}
                  </div>
                  <div>
                    <label htmlFor="email" className="field-label">E-Mail *</label>
                    <input id="email" name="email" type="email" autoComplete="email" placeholder="ihre@email.de" value={form.email} onChange={onChange} onBlur={onBlur} className={fieldClass('email')} />
                    {errors.email && touched.email && <div className="field-error">{errors.email}</div>}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: 14 }}>
                  <div>
                    <label htmlFor="phone" className="field-label">Telefon</label>
                    <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+49 …" value={form.phone} onChange={onChange} onBlur={onBlur} className={fieldClass('phone')} />
                    {errors.phone && touched.phone && <div className="field-error">{errors.phone}</div>}
                  </div>
                  <div>
                    <label htmlFor="guests" className="field-label">Personen</label>
                    <select id="guests" name="guests" value={form.guests} onChange={onChange} className="field" style={{ appearance: 'none', cursor: 'pointer' }}>
                      {['1','2','3','4','5','6','7','8','9','10+'].map(n => (
                        <option key={n} value={n} style={{ background: 'var(--c-bg-2)', color: 'var(--c-cream)' }}>
                          {n} {n === '1' ? 'Person' : 'Personen'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: 14 }}>
                  <div>
                    <label htmlFor="date" className="field-label">Datum *</label>
                    <input id="date" name="date" type="date" min={today} value={form.date} onChange={onChange} onBlur={onBlur} className={fieldClass('date')} style={{ colorScheme: 'dark' }} />
                    {errors.date && touched.date && <div className="field-error">{errors.date}</div>}
                  </div>
                  <div>
                    <label htmlFor="time" className="field-label">Uhrzeit *</label>
                    <input id="time" name="time" type="time" min="12:00" max="23:00" value={form.time} onChange={onChange} onBlur={onBlur} className={fieldClass('time')} style={{ colorScheme: 'dark' }} />
                    {errors.time && touched.time && <div className="field-error">{errors.time}</div>}
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="field-label">Anmerkungen</label>
                  <textarea id="message" name="message" rows={3} placeholder="Besondere Wünsche, Allergien, Anlässe …" value={form.message} onChange={onChange} className="field" style={{ resize: 'none' }}></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px 28px', marginTop: 4 }}>
                  Anfrage senden
                </button>
                <p style={{ textAlign: 'center', color: 'var(--c-warm-gray-2)', fontSize: 10, letterSpacing: '0.05em' }}>
                  Pflichtfelder mit * · Daten werden vertraulich behandelt
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 880px) {
          #booking .book-grid { grid-template-columns: 0.85fr 1.15fr; gap: 80px; align-items: flex-start; }
        }
      `}</style>
    </section>
  );
}

window.Booking = Booking;


// ===== components/Location.jsx =====
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


// ===== components/Footer.jsx =====
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
              <li><a href="GALA Webseite.html#booking" className="hov-underline" style={{ color: 'var(--c-warm-gray)', fontSize: 13 }}>Reservierung</a></li>
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


// ===== components/Testimonials.jsx =====
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

        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Fade edges */}
          <div aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, zIndex: 2, background: 'linear-gradient(to right, var(--c-bg-alt), transparent)', pointerEvents: 'none' }}></div>
          <div aria-hidden="true" style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, zIndex: 2, background: 'linear-gradient(to left, var(--c-bg-alt), transparent)', pointerEvents: 'none' }}></div>

          <div className="testi-marquee" style={{ display: 'flex', gap: 14, minWidth: '200%' }}>
            {[...D.testimonials, ...D.testimonials, ...D.testimonials, ...D.testimonials].map((t, i) => (
              <figure key={i} className="quote-card" style={{ flex: '0 0 320px', margin: 0 }}>
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


// ===== components/Tweaks.jsx =====
// Tweaks panel — switches accent color, surface, optional sections

function Tweaks() {
  const [tweaks, setTweak] = window.useTweaks(window.GALA_TWEAKS);

  // Apply tweaks to <html>
  React.useEffect(() => {
    document.documentElement.dataset.accent = tweaks.accent;
    document.documentElement.dataset.surface = tweaks.surface;
    document.documentElement.dataset.headerSerif = tweaks.headerSerif;
  }, [tweaks.accent, tweaks.surface, tweaks.headerSerif]);

  // Expose tweaks for components that need them
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
        <window.TweakToggle
          label="Testimonials"
          value={tweaks.showTestimonials}
          onChange={(v) => setTweak('showTestimonials', v)}
        />
      </window.TweakSection>
    </window.TweaksPanel>
  );
}

window.GalaTweaks = Tweaks;


// ===== app.jsx =====
// App root

function App() {
  const [tweaks, setTweaks] = React.useState(window.GALA_TWEAKS);

  React.useEffect(() => {
    const onTw = (e) => setTweaks({ ...e.detail });
    window.addEventListener('gala-tweaks', onTw);
    return () => window.removeEventListener('gala-tweaks', onTw);
  }, []);

  // Apply initial dataset
  React.useEffect(() => {
    document.documentElement.dataset.accent = tweaks.accent;
    document.documentElement.dataset.surface = tweaks.surface;
    document.documentElement.dataset.headerSerif = tweaks.headerSerif;
  }, []);

  return (
    <>
      <window.Navbar tweaks={tweaks} />
      <main>
        <window.Hero tweaks={tweaks} />
        <window.About />
        <window.Menu />
        <window.Gallery />
        <window.Testimonials tweaks={tweaks} />
        <window.Booking />
        <window.Location />
      </main>
      <window.Footer />
      <window.GalaTweaks />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

