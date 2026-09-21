import React, { useState, useEffect } from 'react';
import type { MenuItem } from '../data/menuData';
import { X, Info, Phone, MessageCircle, Plus, Minus, MapPin, Check, Sparkles } from 'lucide-react';
import { SwiggyLogo, ZomatoLogo } from './PartnerLogos';
import { DELIVERY_LINKS, PRICING_DEMAND_NOTE } from '../data/deliveryConfig';
import { STORE_LOCATIONS } from '../data/storeLocations';
import { useBulkOrder } from '../context/BulkOrderContext';

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
  const { openBulkOrder } = useBulkOrder();
  const hasDualSize = !!(item?.priceSmall && item?.priceLarge);

  // Active portion choice & quantity
  const [portion, setPortion] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedBranchId, setSelectedBranchId] = useState<string>('thane-vasant-vihar');

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      if (selectedSizeNote) {
        setPortion(selectedSizeNote);
      } else if (hasDualSize) {
        setPortion('Large'); // Default to flagship Large
      } else if (item?.portionNote) {
        setPortion(item.portionNote);
      } else {
        setPortion('Standard');
      }
    }
  }, [isOpen, item, selectedSizeNote, hasDualSize]);

  if (!isOpen || !item) return null;

  // Selected branch object
  const selectedBranch =
    STORE_LOCATIONS.find((b) => b.id === selectedBranchId) || STORE_LOCATIONS[1];

  // Accurate unit price computation based on chosen portion
  const getUnitPrice = (): number => {
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

  const unitPrice = getUnitPrice();
  const totalPrice = unitPrice * quantity;

  // Generate 1-click WhatsApp order URL
  const generateWhatsAppUrl = () => {
    const cleanPhone = selectedBranch.phone.replace(/\D/g, '');
    const lines = [
      `*New Order - Mahabaleshwar Juice Center* 🍓`,
      `📍 Outlet: *${selectedBranch.name}*`,
      `🥤 Item: *${item.name}*${item.marathiName ? ` (${item.marathiName})` : ''}`,
      hasDualSize ? `📏 Portion: *${portion}*` : (item.portionNote ? `Serving: *${item.portionNote}*` : ''),
      `🔢 Quantity: *${quantity}*`,
      `💰 Total: *₹${totalPrice}* (₹${unitPrice} each)`,
      ``,
      `Please confirm my order and let me know the preparation/pickup time!`,
    ].filter(Boolean);

    return `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-earth-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white w-full max-w-md rounded-2xl sm:rounded-3xl shadow-2xl border border-cream-300 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="bg-[#B91C1C] px-4 sm:px-5 py-3 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img 
              src="/images/logo.png" 
              alt="Logo" 
              className="w-8 h-8 object-contain bg-white/10 rounded-full p-0.5"
            />
            <div>
              <h3 className="font-heading font-extrabold text-sm sm:text-base leading-tight">
                Order Fresh Item
              </h3>
              <p className="text-[10px] text-white/85 font-medium leading-none mt-0.5">
                Mahabaleshwar Juice Center • Outlet Counter
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
        <div className="p-4 sm:p-5 space-y-4 max-h-[85vh] overflow-y-auto">
          
          {/* Selected Item Visual Box */}
          <div className="p-3 sm:p-3.5 bg-cream-50 rounded-2xl border border-cream-200 space-y-3">
            
            {/* Visual Photo (if item has photo) or Premium Themed Header */}
            {(item.imageLarge || item.image) ? (
              <div className="relative w-full h-32 sm:h-36 rounded-xl overflow-hidden border border-cream-200 bg-white shadow-2xs flex items-center justify-center p-1.5">
                <img
                  src={
                    portion.toLowerCase().includes('small')
                      ? (item.imageSmall || item.imageLarge || item.image)
                      : (item.imageLarge || item.image)
                  }
                  alt={`${item.name} - ${portion}`}
                  className="w-full h-full object-contain drop-shadow-xs transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                  {portion.toLowerCase().includes('small') ? 'Small Serving' : 'Large Serving'}
                </div>
                {item.tag && (
                  <div className="absolute top-2 right-2 bg-[#B91C1C] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                    {item.tag}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between pb-1">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2C8B33] bg-leaf-50 px-2.5 py-0.5 rounded-full border border-leaf-200">
                  <Sparkles className="w-3 h-3 text-[#2C8B33]" />
                  {item.categoryName}
                </span>
                {item.tag && (
                  <span className="text-[10px] font-extrabold text-strawberry-700 bg-strawberry-50 px-2 py-0.5 rounded-full border border-strawberry-200">
                    {item.tag}
                  </span>
                )}
              </div>
            )}

            {/* Title & Price Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h4 className="font-heading font-black text-base sm:text-lg text-earth-900 leading-snug">
                  {item.name}
                </h4>
                {item.marathiName && (
                  <p className="text-xs font-semibold text-leaf-700 mt-0.5">
                    {item.marathiName}
                  </p>
                )}
                {item.description && (
                  <p className="text-[11px] text-earth-600 line-clamp-2 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
              <div className="text-right shrink-0 bg-white px-3 py-1.5 rounded-xl border border-cream-200 shadow-2xs">
                <span className="text-[9px] text-earth-500 font-bold block uppercase tracking-wide">Rate</span>
                <span className="text-lg sm:text-xl font-black text-[#B91C1C] leading-none">
                  ₹{unitPrice}
                </span>
              </div>
            </div>

            {/* Size Switcher (if dual size) */}
            {hasDualSize && (
              <div className="pt-2 border-t border-cream-200 space-y-1.5">
                <span className="text-[10px] font-bold text-earth-600 uppercase tracking-wider block">
                  Select Size / Portion:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPortion('Large')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      portion.toLowerCase().includes('large')
                        ? 'bg-[#B91C1C] text-white border-[#B91C1C] shadow-xs'
                        : 'bg-white text-earth-800 border-cream-300 hover:bg-cream-100'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {portion.toLowerCase().includes('large') && <Check className="w-3.5 h-3.5" />}
                      Large
                    </span>
                    <span>₹{item.priceLarge || item.price350ml}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPortion('Small')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      portion.toLowerCase().includes('small')
                        ? 'bg-[#B91C1C] text-white border-[#B91C1C] shadow-xs'
                        : 'bg-white text-earth-800 border-cream-300 hover:bg-cream-100'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {portion.toLowerCase().includes('small') && <Check className="w-3.5 h-3.5" />}
                      Small
                    </span>
                    <span>₹{item.priceSmall || item.price250ml}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Quantity Stepper & Subtotal Row */}
            <div className="pt-2 border-t border-cream-200 flex items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-earth-600 uppercase tracking-wider block">
                  Quantity:
                </span>
                <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-cream-300 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-7 h-7 rounded-lg bg-cream-100 hover:bg-cream-200 active:bg-cream-300 flex items-center justify-center text-earth-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-heading font-black text-sm text-earth-900 w-7 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded-lg bg-cream-100 hover:bg-cream-200 active:bg-cream-300 flex items-center justify-center text-earth-800 transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-earth-500 uppercase tracking-wide block">
                  Total Amount
                </span>
                <div className="flex items-baseline justify-end gap-1">
                  <span className="font-heading font-black text-2xl text-[#B91C1C]">
                    ₹{totalPrice}
                  </span>
                  {quantity > 1 && (
                    <span className="text-[11px] text-earth-500 font-medium">
                      ({quantity} × ₹{unitPrice})
                    </span>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Outlet Branch Selection */}
          <div className="space-y-1.5">
            <label htmlFor="modal-branch-select" className="flex items-center justify-between text-[11px] font-bold text-earth-700 uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#B91C1C]" />
                Select Nearest Outlet:
              </span>
              <span className="text-[10px] text-[#2C8B33] font-bold normal-case">
                Open Daily 11 AM - 12 AM
              </span>
            </label>
            <select
              id="modal-branch-select"
              value={selectedBranchId}
              onChange={(e) => setSelectedBranchId(e.target.value)}
              className="w-full bg-white border border-cream-300 rounded-xl px-3 py-2.5 text-xs font-bold text-earth-900 focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/20 focus:border-[#B91C1C] cursor-pointer shadow-2xs transition-all"
            >
              {STORE_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name} • Tel: {loc.phone}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-earth-500 leading-tight px-1">
              📍 {selectedBranch.address}
            </p>
          </div>

          {/* Primary Action 1: Instant WhatsApp Order */}
          <div className="space-y-2 pt-1">
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] active:bg-[#1DA851] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <MessageCircle className="w-5 h-5 fill-white text-white shrink-0" />
              <span>Order via WhatsApp (₹{totalPrice})</span>
            </a>

            {/* Primary Action 2: Direct Call */}
            <a
              href={`tel:${selectedBranch.phone}`}
              className="w-full py-2.5 px-3 rounded-xl border border-cream-300 bg-white hover:bg-cream-50 active:bg-cream-100 text-earth-900 font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#B91C1C] fill-[#B91C1C]" />
              <span>Call {selectedBranch.name.split('(')[0].trim()} ({selectedBranch.phone})</span>
            </a>
          </div>

          {/* Doorstep Delivery Section: Swiggy & Zomato */}
          <div className="pt-2 border-t border-cream-200 space-y-1.5">
            <span className="text-[10px] font-bold text-earth-500 uppercase tracking-wider block text-center">
              — Or Order Doorstep Delivery via Partner Apps —
            </span>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={DELIVERY_LINKS.swiggy}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white hover:bg-orange-50/60 border border-cream-300 hover:border-[#FC8019] text-earth-900 transition-all shadow-2xs group cursor-pointer"
                title="Order on Swiggy"
              >
                <SwiggyLogo className="h-5 w-auto" />
                <span className="text-xs font-bold group-hover:text-[#FC8019] transition-colors">
                  Swiggy
                </span>
              </a>

              <a
                href={DELIVERY_LINKS.zomato}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white hover:bg-red-50/60 border border-cream-300 hover:border-[#E23744] text-earth-900 transition-all shadow-2xs group cursor-pointer"
                title="Order on Zomato"
              >
                <ZomatoLogo className="h-4 w-auto" />
                <span className="text-xs font-bold group-hover:text-[#E23744] transition-colors">
                  Zomato
                </span>
              </a>
            </div>
          </div>

          {/* Party / Bulk Order Notice */}
          <div className="p-2.5 rounded-xl bg-leaf-50 border border-leaf-200 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-xs font-bold text-leaf-900 leading-tight">
                Party or 9+ Items?
              </p>
              <p className="text-[10px] text-leaf-700">
                Pre-order in advance for scheduled pickup
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                openBulkOrder(item, portion);
              }}
              className="px-2.5 py-1.5 rounded-lg bg-[#2C8B33] hover:bg-[#23732A] text-white font-bold text-xs shadow-2xs whitespace-nowrap shrink-0 transition-colors cursor-pointer"
            >
              Bulk Order (9+)
            </button>
          </div>

          {/* Pricing Notice */}
          <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 flex items-start gap-2 text-[11px] text-amber-900 leading-snug">
            <Info className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <strong className="font-semibold">Note:</strong> {PRICING_DEMAND_NOTE}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
