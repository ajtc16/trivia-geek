import React, { useEffect, useState } from "react";

const Quiz = ({ category, onBack }) => {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetch("/data/trivia_questions.json")
      .then((res) => res.json())
      .then((data) => {
        const set = data["¿Qué tan geek eres?"][category];
        setQuestions(set);
      });
  }, [category]);

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
    return (
        <div className="text-center p-4 flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-3xl text-yellow-400 font-bold mb-4">¡Resultado!</h2>
        <p className="mb-4 text-white text-lg">
            Obtuviste <strong>{score}</strong> de <strong>{questions.length}</strong> respuestas correctas.
        </p>

        <div className="mt-6 flex flex-col items-center space-y-2">
            <p className="text-white">Comparte tu puntaje:</p>
            <a
                href={`https://wa.me/?text=¡Jugué la trivia "¿Qué tan geek eres?" y saqué ${score} de ${questions.length}! Pruébala aquí: https://tusitio.vercel.app`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            >
                Compartir por WhatsApp
            </a>
        </div>


        <a
            href="https://tutienda.com" // <-- CAMBIA ESTE LINK POR TU TIENDA / RED
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-lg transition mb-4"
        >
            Consigue tu camiseta geek 🎮
        </a>

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
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold text-yellow-300 mb-2">
        {category} - Pregunta {index + 1} de {questions.length}
      </h2>
      <p className="text-white text-lg mb-4">{current.question}</p>
      <div className="grid gap-3">
        {current.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded transition"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
