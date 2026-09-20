import React, { useState } from 'react';
import type { MenuItem } from '../data/menuData';
import { Phone } from 'lucide-react';

interface ProductCardProps {
  item: MenuItem;
  onOrderClick?: (item: MenuItem, size?: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ item, onOrderClick }) => {
  const [selectedSize, setSelectedSize] = useState<'250ml' | '350ml'>('250ml');
  const [withIceCream, setWithIceCream] = useState<boolean>(false);

  const hasDualSize = item.price250ml !== undefined && item.price350ml !== undefined;
  
  let currentPrice = item.price || 0;
  if (hasDualSize) {
    currentPrice = selectedSize === '250ml' ? (item.price250ml || 0) : (item.price350ml || 0);
    if (withIceCream && item.withIceCreamPrice) {
      currentPrice += 30;
    }
  }

  const handleOrder = () => {
    if (onOrderClick) {
      onOrderClick(item, hasDualSize ? `${selectedSize}${withIceCream ? ' + Ice Cream' : ''}` : undefined);
    } else {
      window.location.href = 'tel:9967997522';
    }
  };

  // Category Accent Border & Tag
  const getCategoryStyles = () => {
    switch (item.category) {
      case 'fruit-milkshakes':
        return {
          indicator: 'bg-strawberry-500',
          badge: 'bg-strawberry-50 text-strawberry-700 border-strawberry-200',
        };
      case 'chocolate-milkshakes':
        return {
          indicator: 'bg-amber-700',
          badge: 'bg-amber-50 text-amber-800 border-amber-200',
        };
      case 'fresh-fruit-juice':
        return {
          indicator: 'bg-leaf-600',
          badge: 'bg-leaf-50 text-leaf-800 border-leaf-200',
        };
      case 'soda-blast':
        return {
          indicator: 'bg-sky-600',
          badge: 'bg-sky-50 text-sky-800 border-sky-200',
        };
      case 'ice-cream-scoop':
        return {
          indicator: 'bg-menuyellow-500',
          badge: 'bg-menuyellow-50 text-menuyellow-800 border-menuyellow-300',
        };
      default:
        return {
          indicator: 'bg-strawberry-500',
          badge: 'bg-cream-100 text-earth-800 border-cream-200',
        };
    }
  };

  const { indicator, badge } = getCategoryStyles();

  return (
    <div className="bg-white rounded-xl border border-cream-300 p-5 hover:border-strawberry-400 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
      
      <div>
        {/* Header: Category Tag & Special Marker */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${indicator}`} />
            <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${badge}`}>
              {item.categoryName}
            </span>
          </div>

          {item.tag && (
            <span className="text-[10px] font-bold text-strawberry-700 bg-strawberry-50 px-2 py-0.5 rounded border border-strawberry-200">
              {item.tag}
            </span>
          )}
        </div>

        {/* Product Title */}
        <h3 className="font-heading font-bold text-lg text-earth-900 leading-snug">
          {item.name}
        </h3>

        {/* Marathi Name */}
        {item.marathiName && (
          <p className="text-xs font-semibold text-leaf-700 mt-0.5 mb-2">
            {item.marathiName}
          </p>
        )}

        {/* Description */}
        <p className="text-xs sm:text-sm text-earth-600 leading-relaxed line-clamp-2 mb-4">
          {item.description}
        </p>
      </div>

      {/* Pricing & Size Controls */}
      <div className="space-y-3 pt-3 border-t border-cream-200">
        
        {/* Size Selection (Milkshakes) */}
        {hasDualSize && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-earth-600">Portion:</span>
              <div className="flex items-center gap-1 bg-cream-100 p-0.5 rounded-lg border border-cream-200">
                <button
                  type="button"
                  onClick={() => setSelectedSize('250ml')}
                  className={`px-2.5 py-1 rounded font-bold text-xs transition-colors ${
                    selectedSize === '250ml'
                      ? 'bg-strawberry-600 text-white shadow-2xs'
                      : 'text-earth-700 hover:text-earth-900'
                  }`}
                >
                  250ml • ₹{item.price250ml}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSize('350ml')}
                  className={`px-2.5 py-1 rounded font-bold text-xs transition-colors ${
                    selectedSize === '350ml'
                      ? 'bg-strawberry-600 text-white shadow-2xs'
                      : 'text-earth-700 hover:text-earth-900'
                  }`}
                >
                  350ml • ₹{item.price350ml}
                </button>
              </div>
            </div>

            {item.withIceCreamPrice && (
              <label className="flex items-center justify-between text-xs text-earth-700 bg-cream-50 p-2 rounded-lg border border-cream-200 cursor-pointer hover:bg-cream-100">
                <span className="flex items-center gap-1.5 font-medium">
                  <input
                    id={`ice-cream-addon-${item.id}`}
                    name={`ice-cream-addon-${item.id}`}
                    type="checkbox"
                    checked={withIceCream}
                    onChange={(e) => setWithIceCream(e.target.checked)}
                    className="rounded text-strawberry-600 focus:ring-strawberry-500 w-3.5 h-3.5"
                  />
                  Add Ice-Cream Scoop
                </span>
                <span className="font-bold text-leaf-700">+₹30</span>
              </label>
            )}
          </div>
        )}

        {/* Pricing Row */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-[10px] font-bold text-earth-400 uppercase tracking-wider block">
              Price
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-heading font-black text-2xl text-earth-900">
                ₹{currentPrice}
              </span>
              {hasDualSize && (
                <span className="text-xs text-earth-500 font-medium">
                  ({selectedSize})
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleOrder}
            type="button"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-strawberry-600 hover:bg-strawberry-700 active:bg-strawberry-800 text-white font-bold text-xs sm:text-sm shadow-2xs transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Order</span>
          </button>
        </div>

      </div>

    </div>
  );
};
