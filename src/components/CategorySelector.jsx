import React from "react";

const categories = [
  { id: "Videojuegos", label: "🎮 Videojuegos" },
  { id: "Películas y series", label: "🎬 Películas y series" },
  { id: "Anime, comics y manga", label: "📚 Anime, comics y manga" },
];

const CategorySelector = ({ onSelectCategory }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-3xl font-bold mb-6 text-yellow-400">Elige una categoría</h2>
      <div className="grid gap-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition"
            onClick={() => onSelectCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
