import { useEffect, useState } from 'react';

export function useARSupport() {
  const [supported, setSupported] = useState(false);
  const [permission, setPermission] = useState(null);

  useEffect(() => {
    // Check WebXR support
    const checkWebXR = async () => {
      if ('xr' in navigator) {
        const supported = await navigator.xr.isSessionSupported('immersive-ar');
        setSupported(supported);
      }
    };

    // Check camera permissions
    const checkPermissions = async () => {
      try {
        const status = await navigator.permissions.query({ name: 'camera' });
        setPermission(status.state);
        status.onchange = () => setPermission(status.state);
      } catch {
        setPermission('prompt');
      }
    };

    checkWebXR();
    checkPermissions();
  }, []);

  return { 
    webXRSupported: supported,
    cameraPermission: permission,
    requiresMobile: () => {
      return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }
  };
}