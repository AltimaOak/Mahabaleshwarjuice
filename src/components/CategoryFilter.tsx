import React from 'react';
import type { CategoryId } from '../data/menuData';
import { CATEGORIES } from '../data/menuData';
import { Search, ChevronDown, Filter } from 'lucide-react';

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
    <div className="space-y-4 sm:space-y-5">
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
            id="menu-search-input"
            name="searchQuery"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search menu (e.g. sitafal, strawberry, mango)..."
            aria-label="Search menu"
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-cream-300 rounded-lg text-sm text-earth-900 placeholder-earth-400 focus:outline-none focus:ring-2 focus:ring-[#B91C1C] focus:border-transparent shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-earth-500 hover:text-earth-800 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Mobile View: Category Dropdown */}
      <div className="sm:hidden space-y-1.5">
        <label
          htmlFor="mobile-category-dropdown"
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-earth-700"
        >
          <Filter className="w-3.5 h-3.5 text-[#B91C1C]" />
          <span>Select Category</span>
        </label>
        <div className="relative">
          <select
            id="mobile-category-dropdown"
            name="category"
            value={activeCategory}
            onChange={(e) => onSelectCategory(e.target.value as CategoryId)}
            className="w-full appearance-none pl-3.5 pr-10 py-2.5 bg-white border border-cream-300 focus:border-[#B91C1C] rounded-xl text-xs font-bold text-earth-900 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/20 transition-all cursor-pointer"
          >
            {CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label} ({category.count} items)
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-earth-500">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Desktop & Tablet View: Category Pills */}
      <div className="hidden sm:flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {CATEGORIES.map((category) => {
          const isSelected = activeCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              type="button"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-colors border cursor-pointer ${
                isSelected
                  ? 'bg-[#B91C1C] text-white border-[#B91C1C] shadow-2xs'
                  : 'bg-white text-earth-700 border-cream-300 hover:bg-cream-100 hover:text-earth-900'
              }`}
            >
              <span>{category.label}</span>
              <span
                className={`text-[11px] px-1.5 py-0.5 rounded font-semibold ${
                  isSelected ? 'bg-[#991B1B] text-white' : 'bg-cream-100 text-earth-600'
                }`}
              >
                {category.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
