import { useEffect, useState } from 'react';

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const install = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  if (!deferredPrompt) return null;

  return (
    <button 
      onClick={install}
      className="fixed bottom-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-full z-50 shadow-lg"
    >
      Install AR App
    </button>
  );
}