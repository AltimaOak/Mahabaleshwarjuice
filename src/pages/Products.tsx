import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { CategoryId, MenuItem } from '../data/menuData';
import { MENU_ITEMS } from '../data/menuData';
import { CategoryFilter } from '../components/CategoryFilter';
import { QuickOrderModal } from '../components/QuickOrderModal';
import { Info } from 'lucide-react';
import { SwiggyEmblem } from '../components/PartnerLogos';
import { DELIVERY_LINKS, PRICING_DEMAND_NOTE } from '../data/deliveryConfig';

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
    title: 'Smoothie Note (350ml):',
    note: 'Fruit + Ice-cream + Milk + Sugar blended thick. Served with some cream on topping.',
  },
  'special-falooda': {
    title: 'Falooda Note:',
    note: 'No Real Fruit & Noodles added in Falooda. Contains Sabja + Malai + Jelly Cubes + Syrup & Ice Cream.',
  },
  'ice-cream-delight': {
    title: 'Contains (350ml):',
    note: 'Fresh Fruits (seasonal) + Fresh Cream + Muesli + Ice Cream + Crush + Jelly Cubes.',
  },
  'fruit-punch': {
    title: 'Whole Fruit Serving:',
    note: 'Muskmelon Punch is served in a whole Muskmelon with fresh melon pieces & dry fruits.',
  },
  'fruit-milkshakes': {
    title: 'Portion Info:',
    note: 'Milk + Fruit + Sugar + Ice blended together. Available in 250ml & 350ml (With Ice-Cream).',
  },
  'chocolate-milkshakes': {
    title: 'Portion Info:',
    note: 'Prepared fresh with ice cream. Available in 250ml & 350ml (With Ice-Cream).',
  },
  'fresh-fruit-juice': {
    title: 'Juice Counter Note:',
    note: 'Please mention if you want Ice or Sugar when ordering. Consume parcel within 20 mins. No masala added.',
  },
  'soda-blast': {
    title: 'Soda Blast (350ml):',
    note: 'All sodas are flavoured sodas made with fresh lemon, mint, and soda fizz.',
  },
  'desserts-shots': {
    title: 'Jamun Shots Recipe:',
    note: 'Jamun + Lemon + Mint Leaves + Chat Masala (Rs. 160 for Two Shots, 70ml).',
  },
  'ice-cream-scoop': {
    title: 'Ice Cream Scoops:',
    note: '17 authentic flavours @ ₹70 per scoop.',
  },
};

// Genuine notes from the physical menu for specific items
const ITEM_NOTES: Record<string, string> = {
  'sitafal-cream': 'Made in fresh cream only (No ice cream added) • 300ml',
  'jamun-shots': 'Jamun + Lemon + Mint Leaves + Chat Masala • Two Shots (70ml)',
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
              const isMilkshake =
                item.category === 'fruit-milkshakes' || item.category === 'chocolate-milkshakes';
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
                      <div className="grid grid-cols-2 gap-2">
                        {/* Small / 250ml */}
                        <button
                          onClick={() => handleOrder(item, isMilkshake ? '250ml' : 'Small')}
                          type="button"
                          className="flex items-center justify-between p-2 rounded-lg bg-cream-100 hover:bg-cream-200 border border-cream-300 transition-colors text-left"
                        >
                          <span className="text-xs text-earth-700 font-medium">
                            {isMilkshake ? '250ml' : 'Small'}
                          </span>
                          <span className="text-xs font-black text-earth-900">
                            ₹{item.priceSmall}
                          </span>
                        </button>

                        {/* Large / 350ml */}
                        <button
                          onClick={() => handleOrder(item, isMilkshake ? '350ml (With Ice-Cream)' : 'Large')}
                          type="button"
                          className="flex items-center justify-between p-2 rounded-lg bg-cream-100 hover:bg-cream-200 border border-cream-300 transition-colors text-left"
                        >
                          <span className="text-xs text-earth-700 font-medium">
                            {isMilkshake ? '350ml (Ice Cream)' : 'Large'}
                          </span>
                          <span className="text-xs font-black text-earth-900">
                            ₹{item.priceLarge}
                          </span>
                        </button>
                      </div>
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
                  <th scope="col" className="px-4 py-3 text-right">Small / 250ml</th>
                  <th scope="col" className="px-4 py-3 text-right">Large / 350ml</th>
                  <th scope="col" className="px-4 py-3 text-center">Serving / Note</th>
                  <th scope="col" className="px-5 py-3 text-center">Order</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-200">
                {filteredItems.map((item) => {
                  const isMilkshake =
                    item.category === 'fruit-milkshakes' || item.category === 'chocolate-milkshakes';
                  const hasDualSize = item.priceSmall !== undefined && item.priceLarge !== undefined;
                  const specialNote = ITEM_NOTES[item.id];

                  return (
                    <tr key={`desk-${item.id}`} className="hover:bg-cream-50 transition-colors">
                      <td className="px-5 py-3 text-earth-900">
                        <div>
                          <span className="font-bold text-earth-900">{item.name}</span>
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
                      </td>

                      <td className="px-4 py-3 text-xs font-medium text-earth-600 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-cream-100 text-earth-700 text-[11px] font-semibold">
                          {item.categoryName}
                        </span>
                      </td>

                      {/* Small / 250ml or Single Rate */}
                      <td className="px-4 py-3 text-right font-extrabold text-earth-900 whitespace-nowrap">
                        ₹{item.priceSmall || item.price250ml || item.price}
                      </td>

                      {/* Large / 350ml */}
                      <td className="px-4 py-3 text-right font-extrabold text-earth-900 whitespace-nowrap">
                        {item.priceLarge || item.price350ml ? (
                          `₹${item.priceLarge || item.price350ml}`
                        ) : (
                          <span className="text-earth-400 font-normal">—</span>
                        )}
                      </td>

                      {/* Serving / Note */}
                      <td className="px-4 py-3 text-center text-xs whitespace-nowrap text-earth-600">
                        {hasDualSize ? (
                          <span>{isMilkshake ? '250ml & 350ml (Ice Cream)' : 'Small & Large'}</span>
                        ) : (
                          <span className="text-leaf-800 bg-leaf-50 px-2 py-0.5 rounded border border-leaf-200 font-medium">
                            {item.portionNote || 'Standard'}
                          </span>
                        )}
                      </td>

                      {/* Order Button */}
                      <td className="px-5 py-3 text-center whitespace-nowrap">
                        <button
                          onClick={() => handleOrder(item)}
                          type="button"
                          className="px-3 py-1 rounded-md bg-strawberry-600 hover:bg-strawberry-700 text-white font-bold text-xs transition-colors"
                        >
                          Order
                        </button>
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
