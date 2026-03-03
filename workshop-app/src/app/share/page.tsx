"use client";

import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function SharePage() {
  const [url, setUrl] = useState("");
  const [isLocalhost, setIsLocalhost] = useState(false);

  useEffect(() => {
    const origin = window.location.origin;
    const hostname = window.location.hostname;

    if (hostname === "localhost" || hostname === "127.0.0.1") {
      setIsLocalhost(true);
      setUrl("");
    } else {
      setUrl(origin);
    }
  }, []);

  const handleManualIp = (ip: string) => {
    if (ip.trim()) {
      const port = window.location.port;
      setUrl(`http://${ip.trim()}${port ? `:${port}` : ""}`);
    } else {
      setUrl("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 flex flex-col items-center justify-center p-8 text-white">
      <h1 className="text-3xl md:text-5xl font-bold mb-2 text-center">
        AI-workshop för lärare
      </h1>
      <p className="text-blue-200 text-lg md:text-xl mb-10">
        Skanna QR-koden för att delta
      </p>

      {isLocalhost && !url && (
        <div className="bg-blue-800/50 rounded-2xl p-6 mb-8 max-w-md w-full text-center">
          <p className="text-yellow-200 mb-3 text-sm">
            Du öppnade sidan via localhost — kollegorna behöver din IP-adress.
          </p>
          <label className="block text-blue-200 text-sm mb-2">
            Skriv in din IP-adress (t.ex. 192.168.1.42):
          </label>
          <input
            type="text"
            placeholder="192.168.1.42"
            className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 text-center text-xl font-mono focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => handleManualIp(e.target.value)}
          />
          <p className="text-blue-300 text-xs mt-3">
            Tips: Kör <code className="bg-blue-700 px-1 rounded">ipconfig</code> (Windows) eller{" "}
            <code className="bg-blue-700 px-1 rounded">ifconfig</code> (Mac) i terminalen
          </p>
        </div>
      )}

      {url && (
        <>
          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-2xl mb-8">
            <QRCodeSVG
              value={url}
              size={300}
              level="M"
              bgColor="#ffffff"
              fgColor="#1e3a5f"
            />
          </div>

          <div className="bg-blue-800/40 rounded-xl px-8 py-4 mb-8">
            <p className="text-blue-200 text-sm mb-1 text-center">
              Eller gå till:
            </p>
            <p className="text-2xl md:text-4xl font-mono font-bold text-white text-center tracking-wide">
              {url}
            </p>
          </div>
        </>
      )}

      <div className="text-blue-300 text-sm text-center max-w-md">
        <p>Öppna kameran på mobilen och rikta den mot QR-koden.</p>
        <p className="mt-1 opacity-70">
          Alla måste vara anslutna till samma WiFi-nätverk.
        </p>
      </div>
    </div>
  );
}
