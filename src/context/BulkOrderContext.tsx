import React, { createContext, useContext, useState } from 'react';
import type { MenuItem } from '../data/menuData';

interface BulkOrderContextType {
  isOpen: boolean;
  openBulkOrder: (prefillItem?: MenuItem, portion?: string) => void;
  closeBulkOrder: () => void;
  prefillItem: MenuItem | null;
  prefillPortion?: string;
}

const BulkOrderContext = createContext<BulkOrderContextType | undefined>(undefined);

export const BulkOrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prefillItem, setPrefillItem] = useState<MenuItem | null>(null);
  const [prefillPortion, setPrefillPortion] = useState<string | undefined>(undefined);

  const openBulkOrder = (item?: MenuItem, portion?: string) => {
    setPrefillItem(item || null);
    setPrefillPortion(portion);
    setIsOpen(true);
  };

  const closeBulkOrder = () => {
    setIsOpen(false);
    setPrefillItem(null);
    setPrefillPortion(undefined);
  };

  return (
    <BulkOrderContext.Provider
      value={{
        isOpen,
        openBulkOrder,
        closeBulkOrder,
        prefillItem,
        prefillPortion,
      }}
    >
      {children}
    </BulkOrderContext.Provider>
  );
};

export const useBulkOrder = (): BulkOrderContextType => {
  const context = useContext(BulkOrderContext);
  if (!context) {
    throw new Error('useBulkOrder must be used within a BulkOrderProvider');
  }
  return context;
};
