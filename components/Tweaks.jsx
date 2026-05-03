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
          label="Cocktail-/Drinks-Sektion"
          value={tweaks.showCocktails}
          onChange={(v) => setTweak('showCocktails', v)}
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
