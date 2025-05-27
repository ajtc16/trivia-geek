import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const categories = [
  "Videojuegos",
  "Películas y series",
  "Anime, comics y manga",
];

const GlobalRanking = ({ onBack }) => {
  const [scoresByCategory, setScoresByCategory] = useState({});

  useEffect(() => {
    const fetchScores = async () => {
      const result = {};
      for (const cat of categories) {
        const { data, error } = await supabase
          .from("scores")
          .select("name, score, created_at")
          .eq("category", cat)
          .order("score", { ascending: false })
          .limit(5);

        if (!error) {
          result[cat] = data;
        } else {
          console.error("Error fetching scores for", cat, error);
        }
      }
      setScoresByCategory(result);
    };

    fetchScores();
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-300 p-6 font-arcade">
      <h1 className="text-2xl md:text-3xl text-yellow-400 text-center mb-6">
        🏆 Ranking Global por Categoría
      </h1>

      {categories.map((cat) => {
        const scores = scoresByCategory[cat] || [];
        return (
          <div key={cat} className="mb-8">
            <h2 className="text-xl text-pink-400 mb-2">{cat}</h2>
            <ul className="bg-gray-900 rounded-lg shadow p-4 space-y-2">
              {scores.length === 0 ? (
                <li className="text-gray-500">Sin datos aún</li>
              ) : (
                scores.map((s, i) => (
                  <li key={i} className="flex justify-between">
                    <span>
                      {i === 0
                        ? "🥇"
                        : i === 1
                        ? "🥈"
                        : i === 2
                        ? "🥉"
                        : `#${i + 1}`} - {s.name} ({s.created_at})
                    </span>
                    <span className="text-yellow-300">{s.score} pts</span>
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
          className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded transition"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default GlobalRanking;