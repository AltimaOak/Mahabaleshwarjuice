import React, { useState, useEffect, useMemo } from 'react';
import { 
  STORE_LOCATIONS, 
  type StoreLocation 
} from '../data/storeLocations';
import { 
  MENU_ITEMS, 
  type MenuItem,
  type CategoryId 
} from '../data/menuData';
import { 
  type BulkOrderItem, 
  type BulkOrderFormData, 
  MIN_BULK_ITEMS,
  getBranchById,
  getTotalItemCount,
  getTotalAmount,
  createWhatsAppOrderLink
} from '../utils/bulkOrderUtils';
import { useBulkOrder } from '../context/BulkOrderContext';
import { 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  Send, 
  ShoppingBag, 
  Search, 
  Clock, 
  Calendar,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const CATEGORY_TABS: { id: CategoryId | 'all'; label: string }[] = [
  { id: 'all', label: 'All Items' },
  { id: 'speciality-dessert', label: 'Creams' },
  { id: 'fruit-milkshakes', label: 'Fruit Shakes' },
  { id: 'chocolate-milkshakes', label: 'Chocolate' },
  { id: 'mastani', label: 'Mastani' },
  { id: 'fresh-fruit-juice', label: 'Juices' },
  { id: 'special-falooda', label: 'Falooda' },
  { id: 'smoothies', label: 'Smoothies' },
  { id: 'ice-cream-delight', label: 'Ice Cream' },
  { id: 'soda-blast', label: 'Soda' },
];

export const BulkOrderModal: React.FC = () => {
  const { isOpen, closeBulkOrder, prefillItem, prefillPortion } = useBulkOrder();

  // Branch Selection
  const [selectedBranchId, setSelectedBranchId] = useState<string>(STORE_LOCATIONS[0].id);
  const currentBranch: StoreLocation = getBranchById(selectedBranchId);

  // Category & Filter
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected portion per item id (defaults to Small / 250ml if dual size)
  const [itemPortions, setItemPortions] = useState<Record<string, string>>({});

  // Order Items
  const [orderItems, setOrderItems] = useState<BulkOrderItem[]>([
    {
      id: 'spl-mango-cream-Large',
      name: 'Spl Mango Cream',
      marathiName: 'स्पेशल मॅंगो क्रीम',
      categoryName: 'Our Speciality (Dessert)',
      portion: 'Large',
      unitPrice: 400,
      quantity: 5,
    },
    {
      id: 'spl-strawberry-cream-Large',
      name: 'Spl Strawberry Cream',
      marathiName: 'स्पेशल स्ट्रॉबेरी क्रीम',
      categoryName: 'Our Speciality (Dessert)',
      portion: 'Large',
      unitPrice: 380,
      quantity: 4,
    },
  ]);

  // Customer & Pickup Details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pickupDate, setPickupDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [pickupTime, setPickupTime] = useState('18:30');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // If prefilled item was passed (e.g. from a product card)
  useEffect(() => {
    if (prefillItem && isOpen) {
      const isMilkshake =
        prefillItem.category === 'fruit-milkshakes' || prefillItem.category === 'chocolate-milkshakes';
      const portion =
        prefillPortion ||
        (prefillItem.priceSmall && prefillItem.priceLarge
          ? isMilkshake
            ? '250ml'
            : 'Small'
          : prefillItem.portionNote || 'Standard');

      let unitPrice = prefillItem.price || prefillItem.priceSmall || prefillItem.price250ml || 0;
      if (portion.toLowerCase().includes('large') || portion.toLowerCase().includes('350ml')) {
        unitPrice = prefillItem.priceLarge || prefillItem.price350ml || unitPrice;
      }

      const itemKey = `${prefillItem.id}-${portion}`;
      setOrderItems((prev) => {
        const existing = prev.find((i) => i.id === itemKey);
        if (existing) {
          return prev.map((i) => (i.id === itemKey ? { ...i, quantity: i.quantity + 1 } : i));
        }
        return [
          ...prev,
          {
            id: itemKey,
            name: prefillItem.name,
            marathiName: prefillItem.marathiName,
            categoryName: prefillItem.categoryName,
            portion,
            unitPrice,
            quantity: 9,
          },
        ];
      });
    }
  }, [prefillItem, prefillPortion, isOpen]);

  // Filtered menu items for browsing
  const visibleMenuItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCat = activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        (item.marathiName && item.marathiName.includes(q)) ||
        item.categoryName.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  if (!isOpen) return null;

  const totalCount = getTotalItemCount(orderItems);
  const totalAmount = getTotalAmount(orderItems);
  const isBulkQualified = totalCount >= MIN_BULK_ITEMS;

  // Portion choice
  const getChosenPortion = (item: MenuItem): string => {
    if (itemPortions[item.id]) {
      return itemPortions[item.id];
    }
    if (item.id === 'spl-strawberry-cream') {
      return 'Large'; // Rule: first is large then small
    }
    if (item.priceSmall && item.priceLarge) {
      const isMilkshake =
        item.category === 'fruit-milkshakes' || item.category === 'chocolate-milkshakes';
      return isMilkshake ? '250ml' : 'Small';
    }
    return item.portionNote || 'Standard';
  };

  // Price for chosen portion
  const getChosenPrice = (item: MenuItem, portion: string): number => {
    const pLower = portion.toLowerCase();
    if (pLower.includes('large') || pLower.includes('350ml')) {
      return item.priceLarge || item.price350ml || item.price || 0;
    }
    if (pLower.includes('small') || pLower.includes('250ml')) {
      return item.priceSmall || item.price250ml || item.price || 0;
    }
    return item.price || item.priceSmall || item.price250ml || 0;
  };

  // Quantity of item currently in cart
  const getQuantityInOrder = (item: MenuItem, portion: string): number => {
    const key = `${item.id}-${portion}`;
    const found = orderItems.find((i) => i.id === key);
    return found ? found.quantity : 0;
  };

  // Modify quantity
  const handleModifyQuantity = (item: MenuItem, portion: string, delta: number) => {
    const key = `${item.id}-${portion}`;
    const unitPrice = getChosenPrice(item, portion);

    setOrderItems((prev) => {
      const existing = prev.find((i) => i.id === key);
      if (existing) {
        const nextQty = existing.quantity + delta;
        if (nextQty <= 0) {
          return prev.filter((i) => i.id !== key);
        }
        return prev.map((i) => (i.id === key ? { ...i, quantity: nextQty } : i));
      } else if (delta > 0) {
        return [
          ...prev,
          {
            id: key,
            name: item.name,
            marathiName: item.marathiName,
            categoryName: item.categoryName,
            portion,
            unitPrice,
            quantity: 1,
          },
        ];
      }
      return prev;
    });
  };

  const handleRemoveItem = (key: string) => {
    setOrderItems((prev) => prev.filter((i) => i.id !== key));
  };

  const formData: BulkOrderFormData = {
    branchId: selectedBranchId,
    customerName: customerName.trim() || 'Customer',
    customerPhone: customerPhone.trim() || '',
    pickupDate,
    pickupTime,
    specialInstructions: specialInstructions.trim(),
    items: orderItems,
  };

  const whatsappLink = createWhatsAppOrderLink(formData);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-150">
      <div className="relative bg-white w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-cream-300 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* ========================================================
            HEADER: COMPACT & CLEAN
            ======================================================== */}
        <div className="bg-[#B91C1C] text-white px-4 py-3 sm:px-6 sm:py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-white shrink-0" />
            <div>
              <h2 className="font-heading font-extrabold text-sm sm:text-base leading-tight">
                Bulk Pre-Order (9+ Items)
              </h2>
              <p className="text-[11px] text-white/90">
                Counter pickup at {currentBranch.name.split('(')[0].trim()}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeBulkOrder}
            className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ========================================================
            VERTICAL SCROLLABLE BODY (SINGLE CONTINUOUS FLOW)
            ======================================================== */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-4 text-earth-900">

          {/* 1. PICKUP BRANCH SELECTOR */}
          <div className="bg-cream-100 p-3 rounded-xl border border-cream-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-earth-800 uppercase tracking-wide">
                Select Pickup Branch:
              </span>
              <span className="text-[11px] font-semibold text-leaf-800">
                📞 {currentBranch.phone}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {STORE_LOCATIONS.map((b) => {
                const isSelected = selectedBranchId === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setSelectedBranchId(b.id)}
                    className={`py-2 px-1.5 rounded-lg text-center transition-all text-xs font-bold truncate cursor-pointer ${
                      isSelected
                        ? 'bg-[#B91C1C] text-white shadow-2xs'
                        : 'bg-white text-earth-800 border border-cream-300 hover:bg-cream-50'
                    }`}
                  >
                    {b.name.split('(')[0].trim()}
                  </button>
                );
              })}
            </div>

            <p className="text-[11px] text-earth-600">
              📍 {currentBranch.address}
            </p>
          </div>

          {/* 2. SELECTED ITEMS LIST (HIGH VISIBILITY, FULL WIDTH, CLEAR) */}
          <div className="bg-cream-50 rounded-2xl border-2 border-cream-300 p-3 sm:p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-extrabold text-sm sm:text-base text-earth-900">
                  Your Selected Items ({totalCount})
                </h3>
                <p className="text-[11px] text-earth-500">
                  Adjust quantities or delete items below
                </p>
              </div>

              {/* Threshold Status Badge */}
              <div
                className={`flex items-center gap-1 text-xs font-extrabold px-2.5 py-1 rounded-full ${
                  isBulkQualified
                    ? 'bg-leaf-100 text-leaf-900 border border-leaf-300'
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}
              >
                {isBulkQualified ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2C8B33]" />
                    <span>✓ 9+ Items Ready</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Add {MIN_BULK_ITEMS - totalCount} more for bulk</span>
                  </>
                )}
              </div>
            </div>

            {/* Selected Items Cards List */}
            {orderItems.length === 0 ? (
              <div className="py-6 text-center text-xs text-earth-500 italic bg-white rounded-xl border border-cream-200">
                No items added yet. Click <strong className="text-leaf-700 font-bold">+ Add</strong> from the menu items below.
              </div>
            ) : (
              <div className="space-y-2">
                {orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 sm:p-3 bg-white rounded-xl border border-cream-200 shadow-2xs flex items-center justify-between gap-2"
                  >
                    {/* Item Details */}
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      {item.id.includes('spl-strawberry-cream') && (
                        <img
                          src={item.portion.toLowerCase().includes('small') ? '/images/strawberry_cream_small.jpg' : '/images/strawberry_cream_large.jpg'}
                          alt={item.name}
                          className="w-9 h-9 rounded-lg object-contain bg-white p-0.5 border border-cream-300 shrink-0"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-xs sm:text-sm text-earth-900 truncate">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-earth-500">
                          {item.portion !== 'Standard' && (
                            <span className="font-semibold text-leaf-800 bg-leaf-50 px-1.5 py-0.2 rounded mr-1">
                              {item.portion}
                            </span>
                          )}
                          ₹{item.unitPrice} each
                        </p>
                      </div>
                    </div>

                    {/* Stepper + Subtotal + Delete */}
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-cream-100 rounded-lg border border-cream-300 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => {
                            const found = MENU_ITEMS.find((m) => item.id.startsWith(m.id));
                            if (found) handleModifyQuantity(found, item.portion, -1);
                          }}
                          className="px-2 py-1 text-earth-700 hover:bg-cream-200 cursor-pointer"
                          title="Decrease"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 font-black text-xs sm:text-sm text-earth-900 min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const found = MENU_ITEMS.find((m) => item.id.startsWith(m.id));
                            if (found) handleModifyQuantity(found, item.portion, 1);
                          }}
                          className="px-2 py-1 text-earth-700 hover:bg-cream-200 cursor-pointer"
                          title="Increase"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line Subtotal */}
                      <span className="font-heading font-black text-xs sm:text-sm text-[#B91C1C] min-w-[55px] text-right">
                        ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                      </span>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-1 rounded text-strawberry-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Subtotal Banner */}
            <div className="pt-2 flex items-center justify-between text-xs font-bold text-earth-800 border-t border-cream-200">
              <span>Items in order: {totalCount}</span>
              <span className="text-sm sm:text-base font-heading font-black text-[#B91C1C]">
                Subtotal: ₹{totalAmount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* 3. ADD MORE ITEMS TO YOUR ORDER (VERTICAL BROWSING) */}
          <div className="bg-white rounded-2xl border border-cream-300 p-3 sm:p-4 space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
              <h3 className="font-heading font-bold text-xs sm:text-sm text-earth-900">
                + Add More Menu Items:
              </h3>
              <p className="text-[11px] text-earth-500">
                Click size and press <strong>+ Add</strong>
              </p>
            </div>

            {/* Search Filter */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-earth-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search menu items (e.g. mango cream, sitafal, strawberry shake)..."
                className="w-full pl-8 pr-7 py-1.5 rounded-lg bg-cream-50 border border-cream-300 text-xs focus:bg-white focus:border-[#B91C1C] outline-none text-earth-900"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] font-bold text-earth-500"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar text-xs">
              {CATEGORY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-2.5 py-1 rounded-full whitespace-nowrap text-[11px] font-bold transition-all cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-[#B91C1C] text-white shadow-2xs'
                      : 'bg-cream-100 text-earth-700 hover:bg-cream-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Items List (Vertically scrollable menu catalog) */}
            <div className="max-h-56 overflow-y-auto divide-y divide-cream-150 pr-1">
              {visibleMenuItems.length === 0 ? (
                <div className="py-8 text-center text-xs text-earth-500">
                  No items found for "{searchQuery}".
                </div>
              ) : (
                visibleMenuItems.map((item) => {
                  const hasDualSize = item.priceSmall !== undefined && item.priceLarge !== undefined;
                  const isMilkshake =
                    item.category === 'fruit-milkshakes' || item.category === 'chocolate-milkshakes';
                  const activePortion = getChosenPortion(item);
                  const activePrice = getChosenPrice(item, activePortion);
                  const qtyInOrder = getQuantityInOrder(item, activePortion);

                  return (
                    <div
                      key={item.id}
                      className="py-2 flex items-center justify-between gap-2 hover:bg-cream-50/70 px-1 rounded-lg transition-colors"
                    >
                      {/* Thumbnail for items with images */}
                      {(item.imageLarge || item.image) && (
                        <img
                          src={activePortion.toLowerCase().includes('small') ? (item.imageSmall || item.image) : (item.imageLarge || item.image)}
                          alt={item.name}
                          className="w-10 h-10 object-contain bg-white p-0.5 rounded-lg border border-cream-300 shrink-0"
                        />
                      )}

                      {/* Item Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-xs sm:text-sm text-earth-900 leading-snug">
                            {item.name}
                          </h4>
                          {item.marathiName && (
                            <span className="text-[10px] sm:text-[11px] text-leaf-800 font-medium truncate hidden sm:inline">
                              • {item.marathiName}
                            </span>
                          )}
                        </div>

                        {/* Portion selector if dual size */}
                        {hasDualSize ? (
                          item.id === 'spl-strawberry-cream' ? (
                            /* FIRST LARGE THEN SMALL */
                            <div className="flex items-center gap-1 mt-1">
                              <button
                                type="button"
                                onClick={() =>
                                  setItemPortions((prev) => ({
                                    ...prev,
                                    [item.id]: 'Large',
                                  }))
                                }
                                className={`px-1.5 py-0.5 rounded text-[10px] font-bold border transition-all cursor-pointer ${
                                  activePortion.includes('Large')
                                    ? 'bg-[#B91C1C] text-white border-[#B91C1C]'
                                    : 'bg-cream-100 text-earth-700 border-cream-300 hover:bg-cream-200'
                                }`}
                              >
                                Large (₹{item.priceLarge})
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setItemPortions((prev) => ({
                                    ...prev,
                                    [item.id]: 'Small',
                                  }))
                                }
                                className={`px-1.5 py-0.5 rounded text-[10px] font-bold border transition-all cursor-pointer ${
                                  activePortion.includes('Small')
                                    ? 'bg-[#B91C1C] text-white border-[#B91C1C]'
                                    : 'bg-cream-100 text-earth-700 border-cream-300 hover:bg-cream-200'
                                }`}
                              >
                                Small (₹{item.priceSmall})
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 mt-1">
                              <button
                                type="button"
                                onClick={() =>
                                  setItemPortions((prev) => ({
                                    ...prev,
                                    [item.id]: isMilkshake ? '250ml' : 'Small',
                                  }))
                                }
                                className={`px-1.5 py-0.5 rounded text-[10px] font-bold border transition-all cursor-pointer ${
                                  activePortion.includes('Small') || activePortion.includes('250ml')
                                    ? 'bg-[#B91C1C] text-white border-[#B91C1C]'
                                    : 'bg-cream-100 text-earth-700 border-cream-300 hover:bg-cream-200'
                                }`}
                              >
                                {isMilkshake ? '250ml' : 'Small'} (₹{item.priceSmall})
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setItemPortions((prev) => ({
                                    ...prev,
                                    [item.id]: isMilkshake ? '350ml' : 'Large',
                                  }))
                                }
                                className={`px-1.5 py-0.5 rounded text-[10px] font-bold border transition-all cursor-pointer ${
                                  activePortion.includes('Large') || activePortion.includes('350ml')
                                    ? 'bg-[#B91C1C] text-white border-[#B91C1C]'
                                    : 'bg-cream-100 text-earth-700 border-cream-300 hover:bg-cream-200'
                                }`}
                              >
                                {isMilkshake ? '350ml' : 'Large'} (₹{item.priceLarge})
                              </button>
                            </div>
                          )
                        ) : (
                          <span className="text-[11px] text-earth-600 font-medium">
                            ₹{activePrice} {item.portionNote && `• ${item.portionNote}`}
                          </span>
                        )}
                      </div>

                      {/* Quantity Stepper or Add Button */}
                      <div className="shrink-0">
                        {qtyInOrder > 0 ? (
                          <div className="flex items-center bg-white border border-[#B91C1C] rounded-lg shadow-2xs overflow-hidden">
                            <button
                              type="button"
                              onClick={() => handleModifyQuantity(item, activePortion, -1)}
                              className="px-2 py-1 text-earth-800 hover:bg-red-50 cursor-pointer"
                              title="Decrease"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-black text-[#B91C1C] min-w-[20px] text-center">
                              {qtyInOrder}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleModifyQuantity(item, activePortion, 1)}
                              className="px-2 py-1 text-earth-800 hover:bg-red-50 cursor-pointer"
                              title="Increase"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleModifyQuantity(item, activePortion, 1)}
                            className="px-3 py-1 rounded-lg bg-[#2C8B33] hover:bg-[#23732A] text-white font-bold text-xs shadow-2xs flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* 4. PICKUP DETAILS & CUSTOMER INFO */}
          <div className="bg-cream-100 p-3 sm:p-4 rounded-xl border border-cream-200 space-y-2.5 text-xs">
            <div className="flex items-center justify-between text-earth-800 font-bold uppercase text-[11px]">
              <span>Pickup & Customer Details:</span>
              <span className="text-leaf-800">Counter Takeaway</span>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-earth-700 mb-0.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Rahul Sawant"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-cream-300 text-xs focus:border-[#B91C1C] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-earth-700 mb-0.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-cream-300 text-xs focus:border-[#B91C1C] outline-none"
                />
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-earth-700 mb-0.5">
                  Pickup Date
                </label>
                <div className="relative">
                  <Calendar className="w-3.5 h-3.5 text-earth-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full pl-8 pr-2 py-1.5 rounded-lg bg-white border border-cream-300 text-xs focus:border-[#B91C1C] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-earth-700 mb-0.5">
                  Pickup Time Slot
                </label>
                <div className="relative">
                  <Clock className="w-3.5 h-3.5 text-earth-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full pl-8 pr-2 py-1.5 rounded-lg bg-white border border-cream-300 text-xs focus:border-[#B91C1C] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-[11px] font-semibold text-earth-700 mb-0.5">
                Special Instructions (Optional)
              </label>
              <input
                type="text"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g. Pack in ice box for 30m travel, less ice..."
                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-cream-300 text-xs focus:border-[#B91C1C] outline-none"
              />
            </div>
          </div>

        </div>

        {/* ========================================================
            STICKY FOOTER: ORDER SUMMARY & WHATSAPP ACTION
            ======================================================== */}
        <div className="p-3.5 sm:p-4 bg-cream-100 border-t border-cream-300 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-earth-600">Total Items:</span>
              <span className="font-extrabold text-xs text-earth-900">{totalCount} items</span>
              <span className="text-earth-400">•</span>
              <span className="font-heading font-black text-lg sm:text-xl text-[#B91C1C]">
                ₹{totalAmount.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-[10px] text-earth-500">
              Counter Pickup at {currentBranch.name.split('(')[0].trim()} • 11 AM - 12 AM
            </p>
          </div>

          <a
            href={orderItems.length > 0 ? whatsappLink : undefined}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (orderItems.length === 0) {
                e.preventDefault();
                alert('Please select at least one item.');
              }
            }}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-heading font-extrabold text-xs sm:text-sm text-white shadow-md transition-all cursor-pointer ${
              orderItems.length > 0
                ? 'bg-[#25D366] hover:bg-[#1EBE5B] active:scale-98'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4 fill-white" />
            <span>Send Order to {currentBranch.name.split('(')[0].trim()} WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
};
