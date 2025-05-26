import React from "react";
import { motion } from "framer-motion";


const categories = [
  { id: "Videojuegos", label: "🎮 Videojuegos" },
  { id: "Películas y series", label: "🎬 Películas y series" },
  { id: "Anime, comics y manga", label: "📚 Anime, comics y manga" },
];

const CategorySelector = ({ onSelectCategory }) => {
  return (
    <motion.div
  className="min-h-screen flex flex-col items-center justify-center text-center px-4"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  <motion.h2
    className="text-3xl font-bold mb-6 text-yellow-400"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.2 }}
  >
    Elige una categoría
  </motion.h2>

  <div className="grid gap-4">
    {categories.map((cat) => (
      <motion.button
        key={cat.id}
        onClick={() => onSelectCategory(cat.id)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition"
      >
        {cat.label}
      </motion.button>
    ))}
  </div>
</motion.div>

  );
};

export default CategorySelector;
