// Hooks: reveal-on-scroll, live-open status

function useReveal(ref) {
  React.useEffect(() => {
    const root = ref?.current || document;
    const els = root.querySelectorAll('.reveal');
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ref]);
}

// Returns { open, label, nextChange, todayLabel }
function useOpenStatus() {
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const hours = window.GALA_DATA.hours;
  const dow = now.getDay(); // 0=Sun ... 6=Sat
  // Map JS dow -> our hours array (Mon=0)
  const idx = (dow + 6) % 7;
  const today = hours[idx];
  const nowMin = now.getHours() * 60 + now.getMinutes();

  let open = false;
  let closeAt = null;

  if (today.open != null) {
    const openMin = today.open * 60;
    const closeMin = today.close * 60; // can be > 24*60 (after midnight)
    if (closeMin > 24 * 60) {
      // open today, closes after midnight
      if (nowMin >= openMin) { open = true; closeAt = closeMin; }
    } else {
      if (nowMin >= openMin && nowMin < closeMin) { open = true; closeAt = closeMin; }
    }
  }

  // Also handle "after midnight" carry-over from previous day
  if (!open) {
    const prevIdx = (idx + 6) % 7;
    const prev = hours[prevIdx];
    if (prev.open != null && prev.close > 24 * 60) {
      const prevCloseToday = prev.close - 24 * 60; // in this day's minutes
      if (nowMin < prevCloseToday * 60 / 60) { // (it's already minutes)
        // close in minutes-of-this-day
        if (nowMin < prevCloseToday * 60) {
          // simpler: if now is before prevCloseToday hours-as-minutes
        }
      }
      // simplified: prev.close=26 means closes at 02:00 next day
      const prevCloseMinThisDay = (prev.close - 24) * 60;
      if (nowMin < prevCloseMinThisDay) {
        open = true;
        closeAt = prevCloseMinThisDay;
      }
    }
  }

  let label;
  if (open) {
    const closeH = Math.floor(closeAt / 60);
    const closeM = closeAt % 60;
    const dispH = closeH >= 24 ? closeH - 24 : closeH;
    label = `Geöffnet · bis ${String(dispH).padStart(2,'0')}:${String(closeM).padStart(2,'0')}`;
  } else {
    // find next opening
    let next = null;
    for (let i = 0; i < 7; i++) {
      const checkIdx = (idx + i) % 7;
      const h = hours[checkIdx];
      if (h.open == null) continue;
      if (i === 0 && nowMin < h.open * 60) {
        next = { day: 'heute', open: h.open };
        break;
      }
      if (i === 1) { next = { day: 'morgen', open: h.open }; break; }
      if (i > 1) { next = { day: h.day, open: h.open }; break; }
    }
    label = next
      ? `Geschlossen · öffnet ${next.day} ${String(next.open).padStart(2,'0')}:00`
      : 'Geschlossen';
  }

  return { open, label, today };
}

window.useReveal = useReveal;
window.useOpenStatus = useOpenStatus;
