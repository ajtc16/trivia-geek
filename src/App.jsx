import React, { useState } from "react";
import CategorySelector from "./components/CategorySelector";
import Quiz from "./components/Quiz";


const App = () => {
  const [screen, setScreen] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleStart = () => {
    setScreen("category");
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setScreen("quiz"); // Aquí luego cargaremos las preguntas
  };

  return (
    <>
      {screen === "home" && (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-yellow-400">¿Qué tan geek eres?</h1>
          <p className="mb-8 text-lg">Pon a prueba tus conocimientos en videojuegos, películas, anime y más.</p>
          <button
            onClick={handleStart}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            Comenzar
          </button>
        </div>
      )}

      {screen === "category" && <CategorySelector onSelectCategory={handleCategorySelect} />}

      {screen === "quiz" && (
        <Quiz
          category={selectedCategory}
          onBack={() => {
            setScreen("home");
            setSelectedCategory(null);
          }}
        />
      )}

    </>
  );
};

export default App;
