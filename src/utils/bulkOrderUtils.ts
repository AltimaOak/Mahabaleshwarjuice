import { STORE_LOCATIONS, type StoreLocation } from '../data/storeLocations';

export interface BulkOrderItem {
  id: string;
  name: string;
  marathiName?: string;
  categoryName: string;
  portion: string; // e.g. 'Small', 'Large', '250ml', '350ml', 'Standard'
  unitPrice: number;
  quantity: number;
}

export interface BulkOrderFormData {
  branchId: string;
  customerName: string;
  customerPhone: string;
  pickupDate: string; // YYYY-MM-DD
  pickupTime: string; // e.g. "18:30"
  specialInstructions: string;
  items: BulkOrderItem[];
}

export const MIN_BULK_ITEMS = 9;

/**
 * Get store location by ID, fallback to first outlet.
 */
export const getBranchById = (branchId: string): StoreLocation => {
  const branch = STORE_LOCATIONS.find((b) => b.id === branchId);
  return branch || STORE_LOCATIONS[0];
};

/**
 * Clean 10-digit phone formatted with country code 91.
 */
export const getBranchWhatsAppPhone = (branch: StoreLocation): string => {
  const digits = branch.phone.replace(/\D/g, '');
  return digits.startsWith('91') ? digits : `91${digits}`;
};

export const getTotalItemCount = (items: BulkOrderItem[]): number => {
  return items.reduce((acc, item) => acc + item.quantity, 0);
};

export const getTotalAmount = (items: BulkOrderItem[]): number => {
  return items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
};

export const formatDisplayDate = (dateString: string): string => {
  if (!dateString) return '';
  try {
    const d = new Date(`${dateString}T00:00:00`);
    return d.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
};

export const formatDisplayTime = (timeString: string): string => {
  if (!timeString) return '';
  try {
    const [hoursStr, minutesStr] = timeString.split(':');
    let hours = parseInt(hoursStr, 10);
    const minutes = minutesStr || '00';
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  } catch {
    return timeString;
  }
};

/**
 * Natural, clean WhatsApp message without robotic ASCII art or emoji overload.
 */
export const generateWhatsAppOrderMessage = (data: BulkOrderFormData): string => {
  const branch = getBranchById(data.branchId);
  const totalCount = getTotalItemCount(data.items);
  const totalAmount = getTotalAmount(data.items);
  const displayDate = formatDisplayDate(data.pickupDate);
  const displayTime = formatDisplayTime(data.pickupTime);

  const lines: string[] = [];

  lines.push(`Hello Mahabaleshwar Juice Center (${branch.name.split('(')[0].trim()}),`);
  lines.push(`I would like to place a bulk pre-order for ${totalCount} items.`);
  lines.push(``);
  lines.push(`*Customer Details:*`);
  lines.push(`• Name: ${data.customerName.trim() || 'Customer'}`);
  lines.push(`• Contact: ${data.customerPhone.trim() || 'Not specified'}`);
  lines.push(`• Order Type: Store Pickup / Counter Takeaway`);
  lines.push(`• Pickup Outlet: ${branch.name}`);
  lines.push(`• Pickup Date & Time: ${displayDate || 'Today'}, ${displayTime || 'Earliest'}`);

  lines.push(``);
  lines.push(`*Items (${totalCount} items):*`);
  data.items.forEach((item, index) => {
    const lineTotal = item.unitPrice * item.quantity;
    const portionText = item.portion && item.portion !== 'Standard' ? ` (${item.portion})` : '';
    lines.push(`${index + 1}. ${item.name}${portionText} - Qty ${item.quantity} (₹${lineTotal})`);
  });

  lines.push(``);
  lines.push(`*Total Amount:* ₹${totalAmount.toLocaleString('en-IN')}`);

  if (data.specialInstructions && data.specialInstructions.trim()) {
    lines.push(`*Notes / Instructions:* ${data.specialInstructions.trim()}`);
  }

  lines.push(``);
  lines.push(`Please confirm if this order can be prepared for pickup. Thank you!`);

  return lines.join('\n');
};

export const createWhatsAppOrderLink = (data: BulkOrderFormData): string => {
  const branch = getBranchById(data.branchId);
  const phone = getBranchWhatsAppPhone(branch);
  const message = generateWhatsAppOrderMessage(data);
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};
