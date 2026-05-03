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
