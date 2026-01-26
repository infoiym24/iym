import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface CookieSettings {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieConsentContextType {
  settings: CookieSettings;
  hasConsented: boolean;
  showBanner: boolean;
  updateSettings: (newSettings: CookieSettings) => void;
  acceptAll: () => void;
  acceptNecessaryOnly: () => void;
  openSettings: () => void;
  closeBanner: () => void;
}

const defaultSettings: CookieSettings = {
  necessary: true,
  functional: false,
  analytics: false, // Analytics standardmäßig aus
  marketing: false,
};

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

const COOKIE_CONSENT_KEY = 'iym_cookie_consent';
const COOKIE_SETTINGS_KEY = 'iym_cookie_settings';

// GA4 Measurement ID
const GA4_MEASUREMENT_ID = 'G-KJ0BGK49YS';

export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<CookieSettings>(defaultSettings);
  const [hasConsented, setHasConsented] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  // Load GA4 script only when analytics consent is given
  const loadGoogleAnalytics = useCallback(() => {
    // Check if already loaded
    if (document.querySelector(`script[src*="googletagmanager.com/gtag"]`)) {
      return;
    }

    // Load gtag.js
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: unknown[]) {
        window.dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', GA4_MEASUREMENT_ID, {
        anonymize_ip: true,
        cookie_flags: 'SameSite=None;Secure',
      });
      
      // Make gtag available globally
      (window as unknown as { gtag: typeof gtag }).gtag = gtag;
    };
  }, []);

  // Remove GA4 if consent is revoked
  const removeGoogleAnalytics = useCallback(() => {
    // Remove GA script
    const gaScript = document.querySelector(`script[src*="googletagmanager.com/gtag"]`);
    if (gaScript) {
      gaScript.remove();
    }

    // Delete GA cookies
    const cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
      const cookieName = cookie.split('=')[0].trim();
      if (cookieName.startsWith('_ga') || cookieName.startsWith('_gid') || cookieName.startsWith('_gat')) {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
      }
    });

    // Clear dataLayer
    window.dataLayer = [];
  }, []);

  // Check consent and load GA4 accordingly
  useEffect(() => {
    if (settings.analytics && hasConsented) {
      loadGoogleAnalytics();
    } else {
      removeGoogleAnalytics();
    }
  }, [settings.analytics, hasConsented, loadGoogleAnalytics, removeGoogleAnalytics]);

  // Load saved consent on mount
  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    const savedSettings = localStorage.getItem(COOKIE_SETTINGS_KEY);

    if (savedConsent === 'true' && savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsedSettings, necessary: true });
        setHasConsented(true);
        setShowBanner(false);
      } catch {
        setShowBanner(true);
      }
    } else {
      // No consent yet - show banner
      setShowBanner(true);
    }
  }, []);

  const saveConsent = (newSettings: CookieSettings) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    localStorage.setItem(COOKIE_SETTINGS_KEY, JSON.stringify(newSettings));
    setSettings(newSettings);
    setHasConsented(true);
    setShowBanner(false);
  };

  const updateSettings = (newSettings: CookieSettings) => {
    const finalSettings = { ...newSettings, necessary: true };
    saveConsent(finalSettings);
  };

  const acceptAll = () => {
    const allAccepted: CookieSettings = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    saveConsent(allAccepted);
  };

  const acceptNecessaryOnly = () => {
    const necessaryOnly: CookieSettings = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    saveConsent(necessaryOnly);
  };

  const openSettings = () => {
    // Navigate to cookie settings page
    window.location.href = '/cookie-einstellungen';
  };

  const closeBanner = () => {
    setShowBanner(false);
  };

  return (
    <CookieConsentContext.Provider
      value={{
        settings,
        hasConsented,
        showBanner,
        updateSettings,
        acceptAll,
        acceptNecessaryOnly,
        openSettings,
        closeBanner,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
};

// Type declarations for window
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}
