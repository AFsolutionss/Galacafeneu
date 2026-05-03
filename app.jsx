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
        <window.Cocktails tweaks={tweaks} />
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
