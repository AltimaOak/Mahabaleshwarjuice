import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { CategoryId, MenuItem } from '../data/menuData';
import { MENU_ITEMS } from '../data/menuData';
import { CategoryFilter } from '../components/CategoryFilter';
import { QuickOrderModal } from '../components/QuickOrderModal';
import { Info } from 'lucide-react';
import { SwiggyEmblem } from '../components/PartnerLogos';
import { DELIVERY_LINKS, PRICING_DEMAND_NOTE } from '../data/deliveryConfig';
import { useBulkOrder } from '../context/BulkOrderContext';

interface CategoryNotice {
  title: string;
  note: string;
}

// Authentic notices taken directly from the physical printed menu board
const CATEGORY_NOTICES: Partial<Record<CategoryId, CategoryNotice>> = {
  'speciality-dessert': {
    title: 'Preparation Note:',
    note: 'Spl = Cream + Ice Cream + Fruit + Crush • Sitafal Cream is made in Fresh Cream (No Ice-Cream added).',
  },
  'mastani': {
    title: 'Mastani Composition:',
    note: 'Mastani = Milkshake + Icecream + Dryfruit.',
  },
  'smoothies': {
    title: 'Smoothie Note:',
    note: 'Fruit + Ice-cream + Milk + Sugar blended thick. Served with some cream on topping.',
  },
  'special-falooda': {
    title: 'Falooda Note:',
    note: 'No Real Fruit & Noodles added in Falooda. Contains Sabja + Malai + Jelly Cubes + Syrup & Ice Cream.',
  },
  'ice-cream-delight': {
    title: 'Contains:',
    note: 'Fresh Fruits (seasonal) + Fresh Cream + Muesli + Ice Cream + Crush + Jelly Cubes.',
  },
  'fruit-punch': {
    title: 'Whole Fruit Serving:',
    note: 'Muskmelon Punch is served in a whole Muskmelon with fresh melon pieces & dry fruits.',
  },
  'fruit-milkshakes': {
    title: 'Portion Info:',
    note: 'Milk + Fruit + Sugar + Ice blended together. Available in Small & Large.',
  },
  'chocolate-milkshakes': {
    title: 'Portion Info:',
    note: 'Prepared fresh with ice cream. Available in Small & Large.',
  },
  'fresh-fruit-juice': {
    title: 'Juice Counter Note:',
    note: 'Please mention if you want Ice or Sugar when ordering. Consume parcel within 20 mins. No masala added.',
  },
  'soda-blast': {
    title: 'Soda Blast:',
    note: 'All sodas are flavoured sodas made with fresh lemon, mint, and soda fizz.',
  },
  'desserts-shots': {
    title: 'Jamun Shots Recipe:',
    note: 'Jamun + Lemon + Mint Leaves + Chat Masala (₹160 for Two Shots).',
  },
  'ice-cream-scoop': {
    title: 'Ice Cream Scoops:',
    note: '17 authentic flavours @ ₹70 per scoop.',
  },
};

// Genuine notes from the physical menu for specific items
const ITEM_NOTES: Record<string, string> = {
  'sitafal-cream': 'Made in fresh cream only (No ice cream added)',
  'jamun-shots': 'Jamun + Lemon + Mint Leaves + Chat Masala • Two Shots',
  'watermelon-blossom': 'Watermelon juice, watermelon pieces & vanilla ice cream',
  'muskmelon-punch': 'Served in whole muskmelon with fruit pieces & dry fruits',
  'muskmelon-punch-kulfi': 'Served in whole muskmelon with kulfi & dry fruits',
  'muskmelon-punch-vanilla': 'Served in whole muskmelon with vanilla ice cream',
  'muskmelon-punch-rajbhog': 'Served in whole muskmelon with rajbhog ice cream',
  'brownie-pistachio-kunafa': 'Warm brownie topped with pistachio kunafa & ice cream',
  'brownie-redvelvet': 'Warm red velvet brownie served with ice cream',
  'sikandar-sharbat': 'Traditional special sharbat recipe',
};

export const Products: React.FC = () => {
  const { openBulkOrder } = useBulkOrder();
  const [searchParams] = useSearchParams();
  const initialCat = (searchParams.get('category') as CategoryId) || 'all';

  const [activeCategory, setActiveCategory] = useState<CategoryId>(initialCat);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const cat = searchParams.get('category') as CategoryId;
    if (cat) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  // Order Modal State
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedSizeNote, setSelectedSizeNote] = useState<string | undefined>(undefined);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Filtered Items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        (item.marathiName && item.marathiName.includes(query)) ||
        item.categoryName.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleOrder = (item: MenuItem, sizeNote?: string) => {
    setSelectedItem(item);
    setSelectedSizeNote(sizeNote);
    setIsOrderModalOpen(true);
  };

  const currentNotice = CATEGORY_NOTICES[activeCategory];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6">

      {/* Search & Category Filter */}
      <CategoryFilter
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Pre-Order & Bulk Order (9+ Items) Clean Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-leaf-50 border border-leaf-200 text-xs">
        <div className="text-leaf-950">
          <span className="font-bold">Party / Bulk Orders (9+ items):</span>{' '}
          <span className="text-leaf-800">
            Pre-order directly with your nearest branch for advance preparation and scheduled pickup.
          </span>
        </div>
        <button
          type="button"
          onClick={() => openBulkOrder()}
          className="self-start sm:self-auto px-3.5 py-1.5 rounded-lg bg-[#2C8B33] hover:bg-[#23732A] text-white font-bold text-xs shadow-2xs whitespace-nowrap transition-colors cursor-pointer"
        >
          Pre-Order / Bulk
        </button>
      </div>

      {/* Authentic Menu Board Notice Banner (Only shown if available for current category) */}
      {currentNotice && (
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs sm:text-sm">
          <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold mr-1">{currentNotice.title}</strong>
            <span>{currentNotice.note}</span>
          </div>
        </div>
      )}

      {/* Items Count & Status Bar */}
      <div className="flex items-center justify-between border-b border-cream-300 pb-2 text-xs text-earth-600">
        <div>
          Showing <strong className="text-earth-900 font-bold">{filteredItems.length}</strong> items
          {searchQuery && <span> for "{searchQuery}"</span>}
        </div>
        <div className="text-earth-500 font-medium hidden sm:block">
          Mahabaleshwar Juice Center • Outlet Menu Rates
        </div>
      </div>

      {/* ========================================================
          FLAGSHIP SHOWCASE: SPL STRAWBERRY CREAM (FIRST LARGE, THEN SMALL)
          ======================================================== */}
      {(activeCategory === 'all' || activeCategory === 'speciality-dessert' || searchQuery.toLowerCase().includes('straw') || searchQuery.toLowerCase().includes('cream')) && (
        <div className="bg-white rounded-2xl border border-strawberry-300 p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cream-200 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-strawberry-100 text-strawberry-800 text-[11px] font-extrabold uppercase tracking-wide">
                  Signature Speciality #1 ⭐
                </span>
                <span className="text-xs text-leaf-800 font-bold hidden sm:inline">
                  स्पेशल स्ट्रॉबेरी क्रीम
                </span>
              </div>
              <h2 className="font-heading font-black text-lg sm:text-xl text-earth-900 mt-1">
                Spl Strawberry Cream
              </h2>
              <p className="text-xs sm:text-sm text-earth-600">
                Fresh Mahabaleshwar strawberries layered with rich dairy cream, vanilla ice cream, and strawberry crush.
              </p>
            </div>
            <div className="text-left sm:text-right shrink-0">
              <span className="text-[11px] text-earth-500 font-semibold block">Serving Sizes:</span>
              <span className="text-xs font-black text-earth-900">
                1st: <strong className="text-strawberry-700">Large (₹380)</strong> • 2nd: <strong className="text-earth-800">Small (₹190)</strong>
              </span>
            </div>
          </div>

          {/* 2 Cards: First is Large, then Small */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            
            {/* 1. FIRST: LARGE PORTION */}
            <div className="bg-cream-50/90 hover:bg-white rounded-xl border border-strawberry-200 hover:border-strawberry-400 p-3 sm:p-3.5 flex flex-row items-center gap-3.5 transition-all shadow-2xs hover:shadow-xs group">
              {/* Small & Attractive Photo - Whole Image Visible */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border border-strawberry-200 bg-white shrink-0 shadow-2xs flex items-center justify-center p-1">
                <img
                  src="/images/strawberry_cream_large.jpg"
                  alt="Spl Strawberry Cream - Large Portion"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-xs"
                />
                <span className="absolute top-1.5 left-1.5 bg-[#B91C1C] text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-xs leading-none z-10">
                  1. Large
                </span>
              </div>

              {/* Details & Button */}
              <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
                <div>
                  <div className="flex items-baseline justify-between gap-1">
                    <h3 className="font-heading font-bold text-sm sm:text-base text-earth-900 leading-snug">
                      Large Portion
                    </h3>
                    <span className="text-base font-black text-[#B91C1C] shrink-0">₹380</span>
                  </div>
                  <span className="text-[10px] text-strawberry-700 font-semibold block">Sundae Glass Serving</span>
                  <p className="text-[11px] text-earth-600 line-clamp-2 leading-relaxed mt-0.5">
                    Tall glass loaded with strawberries, dairy cream, ice cream & syrup.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const strawberryItem = MENU_ITEMS.find((i) => i.id === 'spl-strawberry-cream');
                    if (strawberryItem) handleOrder(strawberryItem, 'Large');
                  }}
                  className="mt-2 w-full py-1.5 px-3 rounded-lg bg-strawberry-600 hover:bg-strawberry-700 text-white font-bold text-xs shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Order Large (₹380)</span>
                </button>
              </div>
            </div>

            {/* 2. THEN: SMALL PORTION */}
            <div className="bg-cream-50/90 hover:bg-white rounded-xl border border-cream-300 hover:border-cream-400 p-3 sm:p-3.5 flex flex-row items-center gap-3.5 transition-all shadow-2xs hover:shadow-xs group">
              {/* Small & Attractive Photo - Whole Image Visible */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border border-cream-300 bg-white shrink-0 shadow-2xs flex items-center justify-center p-1">
                <img
                  src="/images/strawberry_cream_small.jpg"
                  alt="Spl Strawberry Cream - Small Portion"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-xs"
                />
                <span className="absolute top-1.5 left-1.5 bg-earth-800 text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-xs leading-none z-10">
                  2. Small
                </span>
              </div>

              {/* Details & Button */}
              <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
                <div>
                  <div className="flex items-baseline justify-between gap-1">
                    <h3 className="font-heading font-bold text-sm sm:text-base text-earth-900 leading-snug">
                      Small Portion
                    </h3>
                    <span className="text-base font-black text-earth-900 shrink-0">₹190</span>
                  </div>
                  <span className="text-[10px] text-earth-600 font-semibold block">Classic Cup Serving</span>
                  <p className="text-[11px] text-earth-600 line-clamp-2 leading-relaxed mt-0.5">
                    Classic cup packed with fresh strawberries folded into pure dairy cream.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const strawberryItem = MENU_ITEMS.find((i) => i.id === 'spl-strawberry-cream');
                    if (strawberryItem) handleOrder(strawberryItem, 'Small');
                  }}
                  className="mt-2 w-full py-1.5 px-3 rounded-lg bg-earth-800 hover:bg-earth-900 text-white font-bold text-xs shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Order Small (₹190)</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-cream-300 p-6 space-y-3">
          <h3 className="font-heading font-bold text-base text-earth-900">
            No items found for "{searchQuery}"
          </h3>
          <p className="text-earth-600 text-xs sm:text-sm max-w-sm mx-auto">
            Try searching for strawberry, mango, sitafal, oreo, mastani, or falooda.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="px-4 py-2 rounded-lg bg-strawberry-600 text-white font-bold text-xs hover:bg-strawberry-700 transition-colors"
          >
            Show All Items
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-cream-300 shadow-2xs overflow-hidden">

          {/* Outlet Menu Header Bar */}
          <div className="bg-cream-100 px-4 sm:px-6 py-3 border-b border-cream-200 flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-earth-900">
                Menu Board Rates
              </h3>
              <p className="text-[11px] sm:text-xs text-earth-600">
                Freshly prepared at Kolbad, Vasant Vihar & Mulund West
              </p>
            </div>
          </div>

          {/* ========================================================
              1. MOBILE VIEW (md:hidden): Clean, Readable, Direct Prices
              ======================================================== */}
          <div className="block md:hidden divide-y divide-cream-200">
            {filteredItems.map((item) => {
              const hasDualSize = item.priceSmall !== undefined && item.priceLarge !== undefined;
              const specialNote = ITEM_NOTES[item.id];

              return (
                <div key={`mob-${item.id}`} className="p-3.5 space-y-2 hover:bg-cream-50/50 transition-colors">

                  {/* Name + Marathi + Category Tag */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-heading font-bold text-sm text-earth-900 leading-snug">
                        {item.name}
                      </h4>
                      {item.marathiName && (
                        <span className="text-xs text-leaf-700 font-medium block">
                          {item.marathiName}
                        </span>
                      )}
                    </div>

                    <span className="px-2 py-0.5 rounded bg-cream-100 text-earth-700 text-[11px] font-semibold whitespace-nowrap shrink-0">
                      {item.categoryName}
                    </span>
                  </div>

                  {/* Authentic Item Note (if specific to this item) */}
                  {specialNote && (
                    <p className="text-[11px] text-earth-600 bg-cream-50 p-1.5 rounded border border-cream-200">
                      {specialNote}
                    </p>
                  )}

                  {/* Pricing Actions */}
                  {hasDualSize ? (
                    <div className="pt-1.5 border-t border-cream-200 space-y-1.5">
                      {item.id === 'spl-strawberry-cream' ? (
                        /* FIRST LARGE THEN SMALL with preview images */
                        <div className="grid grid-cols-2 gap-2">
                          {/* 1. Large */}
                          <button
                            onClick={() => handleOrder(item, 'Large')}
                            type="button"
                            className="flex items-center gap-2 p-2 rounded-lg bg-strawberry-50 hover:bg-strawberry-100 border border-strawberry-300 transition-colors text-left"
                          >
                            <img
                              src="/images/strawberry_cream_large.jpg"
                              alt="Large"
                              className="w-10 h-10 rounded-lg object-contain bg-white p-0.5 border border-cream-300 shrink-0"
                            />
                            <div className="min-w-0">
                              <span className="text-[11px] text-strawberry-900 font-bold block leading-tight">
                                1. Large
                              </span>
                              <span className="text-xs font-black text-[#B91C1C]">
                                ₹{item.priceLarge}
                              </span>
                            </div>
                          </button>

                          {/* 2. Small */}
                          <button
                            onClick={() => handleOrder(item, 'Small')}
                            type="button"
                            className="flex items-center gap-2 p-2 rounded-lg bg-cream-100 hover:bg-cream-200 border border-cream-300 transition-colors text-left"
                          >
                            <img
                              src="/images/strawberry_cream_small.jpg"
                              alt="Small"
                              className="w-10 h-10 rounded-lg object-contain bg-white p-0.5 border border-cream-300 shrink-0"
                            />
                            <div className="min-w-0">
                              <span className="text-[11px] text-earth-800 font-bold block leading-tight">
                                2. Small
                              </span>
                              <span className="text-xs font-black text-earth-900">
                                ₹{item.priceSmall}
                              </span>
                            </div>
                          </button>
                        </div>
                      ) : (
                        /* Regular dual-size items: Large first then Small for consistency */
                        <div className="grid grid-cols-2 gap-2">
                          {/* Large */}
                          <button
                            onClick={() => handleOrder(item, 'Large')}
                            type="button"
                            className="flex items-center justify-between p-2 rounded-lg bg-cream-100 hover:bg-cream-200 border border-cream-300 transition-colors text-left"
                          >
                            <span className="text-xs text-earth-700 font-semibold">
                              Large
                            </span>
                            <span className="text-xs font-black text-earth-900">
                              ₹{item.priceLarge || item.price350ml}
                            </span>
                          </button>

                          {/* Small */}
                          <button
                            onClick={() => handleOrder(item, 'Small')}
                            type="button"
                            className="flex items-center justify-between p-2 rounded-lg bg-cream-100 hover:bg-cream-200 border border-cream-300 transition-colors text-left"
                          >
                            <span className="text-xs text-earth-700 font-semibold">
                              Small
                            </span>
                            <span className="text-xs font-black text-earth-900">
                              ₹{item.priceSmall || item.price250ml}
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Single-Price Item */
                    <div className="pt-1.5 border-t border-cream-200 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-black text-earth-900">
                          ₹{item.price || item.priceSmall || item.price250ml}
                        </span>
                        {item.portionNote && (
                          <span className="text-[11px] font-medium text-earth-600 bg-cream-100 px-2 py-0.5 rounded">
                            {item.portionNote}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleOrder(item, item.portionNote)}
                        type="button"
                        className="px-4 py-1.5 rounded-lg bg-strawberry-600 hover:bg-strawberry-700 text-white font-bold text-xs shadow-2xs transition-colors"
                      >
                        Order
                      </button>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

          {/* ========================================================
              2. DESKTOP VIEW (hidden md:block): Crisp, Clear Table
              ======================================================== */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-cream-100/90 text-earth-800 text-xs uppercase font-bold tracking-wider border-b border-cream-200">
                <tr>
                  <th scope="col" className="px-5 py-3">Item Name</th>
                  <th scope="col" className="px-4 py-3">Category</th>
                  <th scope="col" className="px-4 py-3 text-right">Large</th>
                  <th scope="col" className="px-4 py-3 text-right">Small</th>
                  <th scope="col" className="px-4 py-3 text-center">Serving / Note</th>
                  <th scope="col" className="px-5 py-3 text-center">Order</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-200">
                {filteredItems.map((item) => {
                  const hasDualSize = item.priceSmall !== undefined && item.priceLarge !== undefined;
                  const specialNote = ITEM_NOTES[item.id];

                  return (
                    <tr key={`desk-${item.id}`} className="hover:bg-cream-50 transition-colors">
                      <td className="px-5 py-3 text-earth-900">
                        <div className="flex items-center gap-3">
                          {item.imageLarge && (
                            <img
                              src={item.imageLarge}
                              alt={item.name}
                              className="w-11 h-11 rounded-xl object-contain bg-white p-0.5 border border-cream-300 shrink-0 shadow-2xs"
                            />
                          )}
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-earth-900">{item.name}</span>
                              {item.tag && (
                                <span className="text-[10px] font-extrabold text-strawberry-700 bg-strawberry-50 px-1.5 py-0.2 rounded border border-strawberry-200">
                                  {item.tag}
                                </span>
                              )}
                            </div>
                            {item.marathiName && (
                              <span className="block text-xs text-leaf-700 font-medium">
                                {item.marathiName}
                              </span>
                            )}
                            {specialNote && (
                              <span className="block text-xs text-earth-500 font-normal mt-0.5">
                                {specialNote}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-xs font-medium text-earth-600 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-cream-100 text-earth-700 text-[11px] font-semibold">
                          {item.categoryName}
                        </span>
                      </td>

                      {/* Large */}
                      <td className="px-4 py-3 text-right font-extrabold text-earth-900 whitespace-nowrap">
                        {item.priceLarge || item.price350ml ? (
                          <button
                            type="button"
                            onClick={() => handleOrder(item, 'Large')}
                            className="hover:text-strawberry-700 hover:underline cursor-pointer"
                            title="Click to Order Large"
                          >
                            ₹{item.priceLarge || item.price350ml}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleOrder(item, item.portionNote)}
                            className="hover:text-strawberry-700 hover:underline cursor-pointer"
                            title="Click to Order"
                          >
                            ₹{item.price || item.priceSmall || item.price250ml}
                          </button>
                        )}
                      </td>

                      {/* Small */}
                      <td className="px-4 py-3 text-right font-extrabold text-earth-900 whitespace-nowrap">
                        {hasDualSize ? (
                          <button
                            type="button"
                            onClick={() => handleOrder(item, 'Small')}
                            className="hover:text-strawberry-700 hover:underline cursor-pointer"
                            title="Click to Order Small"
                          >
                            ₹{item.priceSmall || item.price250ml}
                          </button>
                        ) : (
                          <span className="text-earth-400 font-normal">—</span>
                        )}
                      </td>

                      {/* Serving / Note */}
                      <td className="px-4 py-3 text-center text-xs whitespace-nowrap text-earth-600">
                        {hasDualSize ? (
                          <span className="font-semibold text-earth-800">Large & Small</span>
                        ) : (
                          <span className="text-leaf-800 bg-leaf-50 px-2 py-0.5 rounded border border-leaf-200 font-medium">
                            {item.portionNote || 'Standard'}
                          </span>
                        )}
                      </td>

                      {/* Order Button */}
                      <td className="px-5 py-3 text-center whitespace-nowrap">
                        {hasDualSize ? (
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleOrder(item, 'Large')}
                              type="button"
                              className="px-2.5 py-1 rounded-md bg-[#B91C1C] hover:bg-[#991B1B] text-white font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                              title="Order Large"
                            >
                              Large
                            </button>
                            <button
                              onClick={() => handleOrder(item, 'Small')}
                              type="button"
                              className="px-2.5 py-1 rounded-md bg-earth-800 hover:bg-earth-900 text-white font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                              title="Order Small"
                            >
                              Small
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleOrder(item, item.portionNote)}
                            type="button"
                            className="px-3.5 py-1 rounded-md bg-[#B91C1C] hover:bg-[#991B1B] text-white font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                          >
                            Order
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* Online Delivery Banner */}
      <div className="bg-cream-200 rounded-xl p-5 border border-cream-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div>
          <h4 className="font-heading font-bold text-sm sm:text-base text-earth-900">
            Order Online for Doorstep Delivery
          </h4>
          <p className="text-earth-600 text-xs mt-0.5">
            Order directly on Swiggy & Zomato for fast doorstep delivery.
          </p>
          <p className="text-[11px] text-earth-500 mt-1">
            * {PRICING_DEMAND_NOTE}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0 flex-wrap justify-center sm:justify-start">
          <a
            href={DELIVERY_LINKS.swiggy}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-lg bg-[#FC8019] hover:bg-[#E57313] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
            title="Order Mahabaleshwar Juice on Swiggy"
          >
            <SwiggyEmblem className="w-3.5 h-3.5 fill-white text-white" />
            <span>Order on Swiggy</span>
          </a>
          <a
            href={DELIVERY_LINKS.zomato}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-lg bg-[#E23744] hover:bg-[#C92532] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
            title="Order Mahabaleshwar Juice on Zomato"
          >
            <span>Order on Zomato</span>
          </a>
        </div>
      </div>

      {/* Quick Order Modal */}
      <QuickOrderModal
        item={selectedItem}
        selectedSizeNote={selectedSizeNote}
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />

    </div>
  );
};
