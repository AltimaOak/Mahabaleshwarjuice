import React, { useState, useEffect } from 'react';
import type { MenuItem } from '../data/menuData';
import { X, Info, Clock } from 'lucide-react';
import { SwiggyLogo, ZomatoLogo } from './PartnerLogos';
import { DELIVERY_LINKS, PRICING_DEMAND_NOTE } from '../data/deliveryConfig';

interface QuickOrderModalProps {
  item: MenuItem | null;
  selectedSizeNote?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickOrderModal: React.FC<QuickOrderModalProps> = ({
  item,
  selectedSizeNote,
  isOpen,
  onClose,
}) => {
  const isMilkshake =
    item?.category === 'fruit-milkshakes' || item?.category === 'chocolate-milkshakes';
  const hasDualSize = !!(item?.priceSmall && item?.priceLarge);

  // Active portion choice
  const [portion, setPortion] = useState<string>('');

  useEffect(() => {
    if (selectedSizeNote) {
      setPortion(selectedSizeNote);
    } else if (hasDualSize) {
      setPortion(isMilkshake ? '250ml' : 'Small');
    } else if (item?.portionNote) {
      setPortion(item.portionNote);
    } else {
      setPortion('Regular');
    }
  }, [item, selectedSizeNote, hasDualSize, isMilkshake]);

  if (!isOpen || !item) return null;

  // Accurate price computation based on chosen portion / add-on
  const getComputedPrice = (): number => {
    const pLower = portion.toLowerCase();
    if (pLower.includes('extra ice cream')) {
      return (item.priceSmall || item.price250ml || item.price || 0) + 30;
    }
    if (pLower.includes('large') || pLower.includes('350ml')) {
      return item.priceLarge || item.price350ml || item.price || 0;
    }
    if (pLower.includes('small') || pLower.includes('250ml')) {
      return item.priceSmall || item.price250ml || item.price || 0;
    }
    return item.price || item.priceSmall || item.price250ml || 0;
  };

  const itemPrice = getComputedPrice();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-earth-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white w-full max-w-[390px] rounded-2xl sm:rounded-3xl shadow-2xl border border-cream-300 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Compact Red Header */}
        <div className="bg-[#B91C1C] px-4 py-3 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="/images/logo.png" 
              alt="" 
              className="w-7 h-7 object-contain bg-white/10 rounded-full p-0.5"
            />
            <div>
              <h3 className="font-heading font-extrabold text-sm sm:text-base leading-tight">
                Order Online
              </h3>
              <p className="text-[10px] text-white/85 font-medium leading-none mt-0.5">
                Mahabaleshwar Juice Center
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-4.5 space-y-3.5">
          
          {/* Selected Item Card */}
          <div className="p-3 bg-cream-50 rounded-xl border border-cream-200 space-y-2">
            <div className="flex items-start justify-between gap-2.5">
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-[#2C8B33] uppercase tracking-wider block">
                  {item.categoryName}
                </span>
                <h4 className="font-heading font-bold text-sm sm:text-base text-earth-900 leading-snug truncate">
                  {item.name}
                </h4>
                {item.marathiName && (
                  <p className="text-[11px] font-semibold text-leaf-700">
                    {item.marathiName}
                  </p>
                )}
              </div>
              <div className="text-right shrink-0 bg-white px-2.5 py-1 rounded-lg border border-cream-200 shadow-2xs">
                <span className="text-[9px] text-earth-500 font-bold block uppercase tracking-wide">Rate</span>
                <span className="text-base sm:text-lg font-black text-[#B91C1C] leading-none">
                  ₹{itemPrice}
                </span>
              </div>
            </div>

            {/* If dual size, let user pick/switch portion */}
            {hasDualSize && (
              <div className="pt-1.5 border-t border-cream-200 flex items-center gap-2">
                <span className="text-[10px] font-bold text-earth-600 uppercase shrink-0">
                  Size:
                </span>
                <div className="grid grid-cols-2 gap-1.5 flex-1">
                  <button
                    type="button"
                    onClick={() => setPortion(isMilkshake ? '250ml' : 'Small')}
                    className={`py-1 px-2 rounded-lg border text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      portion.includes('250ml') || portion.includes('Small')
                        ? 'bg-[#B91C1C] text-white border-[#B91C1C] shadow-2xs'
                        : 'bg-white text-earth-800 border-cream-300 hover:bg-cream-100'
                    }`}
                  >
                    <span>{isMilkshake ? '250ml' : 'Small'}</span>
                    <span>₹{item.priceSmall}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPortion(isMilkshake ? '350ml (With Ice-Cream)' : 'Large')}
                    className={`py-1 px-2 rounded-lg border text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      portion.includes('350ml') || portion.includes('Large')
                        ? 'bg-[#B91C1C] text-white border-[#B91C1C] shadow-2xs'
                        : 'bg-white text-earth-800 border-cream-300 hover:bg-cream-100'
                    }`}
                  >
                    <span>{isMilkshake ? '350ml' : 'Large'}</span>
                    <span>₹{item.priceLarge}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Single portion item note */}
            {!hasDualSize && item.portionNote && (
              <div className="pt-1 border-t border-cream-200 flex items-center justify-between text-[11px]">
                <span className="text-earth-600 font-medium">Standard Serving:</span>
                <span className="font-bold text-leaf-800 bg-leaf-50 px-2 py-0.5 rounded border border-leaf-200">
                  {item.portionNote}
                </span>
              </div>
            )}
          </div>

          {/* Section: Home Delivery (Swiggy & Zomato side by side) */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-earth-600 uppercase tracking-wider block">
              Order Online for Doorstep Delivery
            </span>
            <div className="grid grid-cols-2 gap-2">
              {/* Swiggy Card */}
              <a
                href={DELIVERY_LINKS.swiggy}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-white hover:bg-orange-50/60 border border-cream-300 hover:border-[#FC8019] text-earth-900 transition-all shadow-2xs group cursor-pointer"
                title="Order on Swiggy"
              >
                <div className="h-6 flex items-center justify-center mb-1">
                  <SwiggyLogo className="h-5 w-auto" />
                </div>
                <span className="text-xs font-extrabold text-earth-900 group-hover:text-[#FC8019] transition-colors leading-tight">
                  Order on Swiggy
                </span>
                <span className="text-[9px] text-earth-500 font-medium mt-0.5">
                  Doorstep Delivery
                </span>
              </a>

              {/* Zomato Card */}
              <a
                href={DELIVERY_LINKS.zomato}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-white hover:bg-red-50/60 border border-cream-300 hover:border-[#E23744] text-earth-900 transition-all shadow-2xs group cursor-pointer"
                title="Order on Zomato"
              >
                <div className="h-6 flex items-center justify-center mb-1">
                  <ZomatoLogo className="h-5 w-auto" />
                </div>
                <span className="text-xs font-extrabold text-earth-900 group-hover:text-[#E23744] transition-colors leading-tight">
                  Order on Zomato
                </span>
                <span className="text-[9px] text-earth-500 font-medium mt-0.5">
                  Doorstep Delivery
                </span>
              </a>
            </div>
          </div>

          {/* Pricing Notice */}
          <div className="p-2.5 rounded-xl bg-amber-50/90 border border-amber-200 flex items-start gap-2 text-[11px] text-amber-900 leading-snug">
            <Info className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <strong className="font-semibold">Note:</strong> {PRICING_DEMAND_NOTE}
            </p>
          </div>

          {/* Timings & Freshness Note */}
          <div className="pt-2 border-t border-cream-200 flex items-center justify-between text-[11px] text-earth-600">
            <span className="flex items-center gap-1 font-medium">
              <Clock className="w-3 h-3 text-[#2C8B33]" />
              <span>11:00 AM – 12:00 AM Daily</span>
            </span>
            <span className="text-[#B91C1C] font-bold text-[10px] uppercase tracking-wide">
              Freshly Made to Order
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
