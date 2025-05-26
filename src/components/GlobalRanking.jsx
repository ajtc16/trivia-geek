import React, { useEffect, useState } from "react";

const categories = [
  "Videojuegos",
  "Películas y series",
  "Anime, comics y manga",
];

const GlobalRanking = ({ onBack }) => {
  const [scoresByCategory, setScoresByCategory] = useState({});

  useEffect(() => {
    const updatedScores = {};
    categories.forEach((cat) => {
      const key = `${cat}-scores`;
      updatedScores[cat] = JSON.parse(localStorage.getItem(key) || "[]");
    });
    setScoresByCategory(updatedScores);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-yellow-400 text-center mb-6">
        🏆 Ranking Global por Categoría
      </h1>

      {categories.map((cat) => {
        const scores = scoresByCategory[cat] || [];
        return (
          <div key={cat} className="mb-8">
            <h2 className="text-2xl text-pink-400 font-semibold mb-2">{cat}</h2>
            <ul className="bg-gray-800 rounded-lg shadow p-4 space-y-2">
              {scores.length === 0 ? (
                <li className="text-gray-400">Sin datos aún</li>
              ) : (
                scores.map((s, i) => (
                  <li key={i} className="flex justify-between">
                    <span>
                      {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`} - {s.name} ({s.date})
                    </span>
                    <span className="text-yellow-300 font-bold">{s.score} pts</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        );
      })}

      <div className="text-center mt-8">
        <button
          onClick={onBack}
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded transition"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default GlobalRanking;