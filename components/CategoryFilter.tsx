import React from 'react';

interface CategoryFilterProps {
  categories: { [key: string]: string };
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex gap-2 sm:gap-3 overflow-x-auto p-2 -mx-2">
        {Object.entries(categories).map(([key, value]) => (
          <button
            key={key}
            onClick={() => onSelectCategory(key)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 whitespace-nowrap ${
              selectedCategory === key
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
            }`}
            aria-pressed={selectedCategory === key}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;