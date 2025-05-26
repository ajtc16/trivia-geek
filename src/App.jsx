import React, { useState } from "react";
import CategorySelector from "./components/CategorySelector";
import Quiz from "./components/Quiz";
import GlobalRanking from "./components/GlobalRanking";

import { motion } from "framer-motion";




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
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 text-yellow-400"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          ¿Qué tan geek eres?
        </motion.h1>

        <motion.p
          className="mb-8 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Pon a prueba tus conocimientos en videojuegos, películas, anime y más.
        </motion.p>

        <motion.button
          onClick={handleStart}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Comenzar
        </motion.button>

        <button
          onClick={() => setScreen("ranking")}
          className="mt-4 text-sm text-yellow-300 underline hover:text-yellow-100"
        >
          Ver ranking global
        </button>
      </motion.div>
    )}

    {screen === "category" && (
      <CategorySelector onSelectCategory={handleCategorySelect} />
    )}

    {screen === "quiz" && (
      <Quiz
        category={selectedCategory}
        onBack={() => {
          setScreen("home");
          setSelectedCategory(null);
        }}
      />
    )}

    {screen === "ranking" && (
      <GlobalRanking onBack={() => setScreen("home")} />
    )}
  </>
);


};

export default App;
