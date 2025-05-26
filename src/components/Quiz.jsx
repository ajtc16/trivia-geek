import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Quiz = ({ category, onBack }) => {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [highscore, setHighscore] = useState(0);
  const [playerName, setPlayerName] = useState("");

    useEffect(() => {
    fetch("/data/trivia_questions.json")
        .then((res) => res.json())
        .then((data) => {
        const fullSet = data["¿Qué tan geek eres?"][category] || [];
        const shuffled = fullSet.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 10);
        setQuestions(selected);
        });
    }, [category]);


  useEffect(() => {
    if (showResult) {
      let name = playerName;
      if (!name) {
        name = prompt("¿Cuál es tu nombre o apodo para el ranking?") || "Anónimo";
        setPlayerName(name);
      }

      const prevScore = Number(localStorage.getItem(`${category}-highscore`) || 0);
      if (score > prevScore) {
        localStorage.setItem(`${category}-highscore`, score);
      }
      setHighscore(Math.max(score, prevScore));

      const scoreKey = `${category}-scores`;
      const prevScores = JSON.parse(localStorage.getItem(scoreKey) || "[]");
      const newEntry = {
        name,
        score,
        date: new Date().toLocaleString(),
      };
      const updated = [newEntry, ...prevScores]
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
      localStorage.setItem(scoreKey, JSON.stringify(updated));
    }
  }, [showResult]);

  const handleAnswer = (option) => {
    const correct = questions[index].answer;
    if (option === correct) {
      setScore((prev) => prev + 1);
    }

    if (index + 1 < questions.length) {
      setIndex((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  if (!questions.length) return <p className="text-white">Cargando...</p>;

  if (showResult) {
    const scoreKey = `${category}-scores`;
    const scores = JSON.parse(localStorage.getItem(scoreKey) || "[]");

    return (
      <div className="text-center p-4 flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-3xl text-yellow-400 font-bold mb-4">¡Resultado!</h2>
        <p className="mb-4 text-white text-lg">
          Obtuviste <strong>{score}</strong> de <strong>{questions.length}</strong> respuestas correctas.
        </p>
        <p className="mb-4 text-sm text-gray-300">
          Tu mejor puntaje en esta categoría: <strong>{highscore}</strong>
        </p>

        <div className="mt-6 text-left max-w-sm w-full mx-auto">
          <h3 className="text-yellow-400 text-lg font-bold mb-2">Top 5 de esta categoría</h3>
          <ul className="bg-gray-800 rounded-lg shadow-lg p-4 space-y-2 text-white text-sm">
            {scores.map((s, i) => (
              <li key={i} className="flex justify-between">
                <span>
                  {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`} - {s.name} ({s.date})
                </span>
                <span className="font-bold text-yellow-300">{s.score} pts</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-col items-center space-y-2">
          <p className="text-white">Comparte tu puntaje:</p>
          <a
            href={`https://wa.me/?text=¡Jugué la trivia "¿Qué tan geek eres?" y saqué ${score} de ${questions.length}! Pruébala aquí: https://trivia-geek.vercel.app/`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          >
            Compartir por WhatsApp
          </a>
        </div>

        <button
  disabled
  className="bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transition mb-4 opacity-50 cursor-not-allowed"
  title="Muy pronto disponible"
>
  Consigue tu camiseta geek 🎮 (próximamente)
</button>

        <button
          onClick={onBack}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition"
        >
          Volver al inicio
        </button>

        <a
          href="https://ko-fi.com/eltoniogeek"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-sm text-white underline hover:text-yellow-400"
        >
          ¿Te gustó la trivia? Invítame un café ☕
        </a>
      </div>
    );
  }

  const current = questions[index];

  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center px-4 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold text-yellow-300 mb-2">
        {category} - Pregunta {index + 1} de {questions.length}
      </h2>

      <p className="text-white text-lg mb-4">{current.question}</p>

      <div className="grid gap-3 w-full max-w-md">
        {current.options.map((option) => (
          <motion.button
            key={option}
            onClick={() => handleAnswer(option)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded transition"
          >
            {option}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Quiz;