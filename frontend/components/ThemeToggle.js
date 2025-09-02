import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme') === 'dark';
    setEnabled(saved);
    document.documentElement.classList.toggle('dark', saved);
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <button className="toggle" onClick={toggle} aria-label="Toggle theme">
      {enabled ? '🌙' : '☀️'}
    </button>
  );
}
