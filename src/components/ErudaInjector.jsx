import React, { useEffect } from 'react';

const ErudaInjector = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//cdn.jsdelivr.net/npm/eruda';
    script.onload = () => {
      window.eruda.init();
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      if (window.eruda) {
        window.eruda.destroy();
      }
    };
  }, []);

  return null;
};

export default ErudaInjector;