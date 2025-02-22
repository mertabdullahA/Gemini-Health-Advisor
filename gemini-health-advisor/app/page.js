"use client";

import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [inputText, setInputText] = useState("");
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false); // Yüklenme durumu
  const [isClient, setIsClient] = useState(false); // Hydration için flag

  useEffect(() => {
    setIsClient(true);
  }, []);

  const sil = () => {
    setInputText("");
    setResponseText("");
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!inputText.trim()) return;

    setLoading(true); // Yüklenme durumunu başlat
    setResponseText(""); // Önceki cevabı temizle

    try {
      const res = await axios.post("http://localhost:8000/api/gemini/", {
        user_input: inputText,
      });

      setResponseText(res.data.response);
    } catch (error) {
      console.error("Hata oluştu:", error);
      setResponseText("Bir hata oluştu, tekrar deneyin.");
    } finally {
      setLoading(false); // Yüklenme durumunu kapat
    }
  };

  if (!isClient) return null; // Server render sırasında UI render etme

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-red-500">
        Sağlık Tavsiye Uygulaması
      </h1>
      <textarea
        className="w-full max-w-lg p-2 border rounded-md text-black"
        placeholder="Hastalıklarını gir..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Yükleniyor..." : "Tavsiye Al"}
        </button>
        <button
          onClick={sil}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Sil
        </button>
      </div>

      {loading && (
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Yükleniyor...
        </p>
      )}

      {responseText && !loading && (
        <div className="mt-4 p-6 bg-white shadow-md rounded-md max-w-4xl">
          <h2 className="font-bold text-lg text-blue-500">
            Gemini'nin Tavsiyesi:
          </h2>
          <p className="text-black">{responseText}</p>
        </div>
      )}
    </div>
  );
}

export default App;
