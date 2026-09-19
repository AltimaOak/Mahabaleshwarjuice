import React from 'react';
import type { CategoryId } from '../data/menuData';
import { CATEGORIES } from '../data/menuData';
import { Search } from 'lucide-react';

interface CategoryFilterProps {
  activeCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="space-y-5">
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-earth-900">
            Our Menu & Rates
          </h2>
          <p className="text-earth-600 text-xs sm:text-sm mt-0.5">
            Fresh fruit creams, thick mastani, smoothies, falooda, juices, and shakes.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-earth-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search menu (e.g. sitafal, strawberry, mango)..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-cream-300 rounded-lg text-sm text-earth-900 placeholder-earth-400 focus:outline-none focus:ring-2 focus:ring-strawberry-500 focus:border-transparent shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-earth-500 hover:text-earth-800"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Pills (Clean, minimal, responsive) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {CATEGORIES.map((category) => {
          const isSelected = activeCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              type="button"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-colors border ${
                isSelected
                  ? 'bg-strawberry-600 text-white border-strawberry-600 shadow-2xs'
                  : 'bg-white text-earth-700 border-cream-300 hover:bg-cream-100 hover:text-earth-900'
              }`}
            >
              <span>{category.label}</span>
              <span className={`text-[11px] px-1.5 py-0.5 rounded font-semibold ${
                isSelected ? 'bg-strawberry-700 text-white' : 'bg-cream-100 text-earth-600'
              }`}>
                {category.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
