import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin } from 'lucide-react';
import { SwiggyLogo, ZomatoLogo } from './PartnerLogos';
import { InstagramIcon, FacebookIcon } from './SocialIcons';
import { STORE_LOCATIONS } from '../data/storeLocations';
import { DELIVERY_LINKS } from '../data/deliveryConfig';
import { useBulkOrder } from '../context/BulkOrderContext';

export const Footer: React.FC = () => {
  const { openBulkOrder } = useBulkOrder();
  return (
    <footer className="relative bg-[#F5EEDC] border-t-2 border-cream-300 text-earth-900 pt-6 pb-4 sm:pt-7 sm:pb-4 overflow-hidden">
      
      {/* Decorative Corner Mascot Accents */}
      <div className="absolute -bottom-6 -left-6 w-20 h-20 opacity-20 pointer-events-none select-none">
        <img src="/images/logo.png" alt="" className="w-full h-full object-contain filter blur-[0.5px]" />
      </div>
      <div className="absolute -bottom-6 -right-6 w-20 h-20 opacity-20 pointer-events-none select-none">
        <img src="/images/logo.png" alt="" className="w-full h-full object-contain filter blur-[0.5px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 4-Column Footer Grid: Balanced, tight, zero dead space */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 pb-5 border-b border-cream-300 items-start">
          
          {/* 1. Left Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-2 text-left">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <img 
                src="/images/logo.png" 
                alt="Mahabaleshwar Juice Center Logo" 
                className="h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="font-heading font-black text-lg sm:text-xl leading-none text-[#B91C1C]">
                  Mahabaleshwar
                </span>
                <span className="font-heading font-black text-[11px] tracking-wider text-[#2C8B33] uppercase leading-none mt-0.5">
                  JUICE CENTER
                </span>
              </div>
            </Link>

            <p className="font-heading font-bold text-xs text-[#B91C1C] italic">
              Fresh Fruits. Fresh Juices. Fresh Moments.
            </p>

            <p className="text-xs text-earth-800 font-medium leading-relaxed max-w-xs">
              Authentic Mahabaleshwar strawberry cream, thick dry fruit shakes, seasonal juices & treats made fresh daily.
            </p>

            <div className="pt-0.5">
              <a
                href="https://www.instagram.com/mahabaleshwar_juice_centre/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-earth-900 hover:text-[#E1306C] transition-colors font-bold"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-[#E1306C]" />
                <span>@mahabaleshwar_juice_centre</span>
              </a>
            </div>
          </div>

          {/* 2. Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-2 text-left">
            <h4 className="text-xs font-heading font-extrabold uppercase tracking-wider text-earth-900">
              Quick Links
            </h4>
            <ul className="space-y-1.5 text-xs font-semibold text-earth-800">
              <li>
                <Link to="/" className="hover:text-[#B91C1C] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#B91C1C] transition-colors">
                  All 180+ Menu Items
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openBulkOrder()}
                  className="hover:text-[#2C8B33] font-bold text-leaf-700 transition-colors cursor-pointer text-left"
                >
                  Bulk & Pre-Order (9+)
                </button>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#B91C1C] transition-colors">
                  About Our Journey
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Our 3 Outlets (3 cols) */}
          <div className="lg:col-span-3 space-y-2 text-left">
            <h4 className="text-xs font-heading font-extrabold uppercase tracking-wider text-earth-900">
              Our 3 Outlets
            </h4>
            <div className="space-y-2 text-xs text-earth-800">
              {STORE_LOCATIONS.map((store) => (
                <div key={store.id} className="leading-snug">
                  <a
                    href={store.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-start gap-1 font-bold text-earth-900 hover:text-[#B91C1C] transition-colors"
                  >
                    <MapPin className="w-3 h-3 text-[#B91C1C] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span>{store.name}</span>
                  </a>
                  <p className="text-[11px] text-earth-600 line-clamp-1 pl-4">
                    {store.address.split(',').slice(0, 2).join(',')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Online Delivery & Timings (3 cols) */}
          <div className="lg:col-span-3 flex flex-col items-start lg:items-end space-y-2 text-left lg:text-right">
            <h4 className="text-xs font-heading font-extrabold uppercase tracking-wider text-earth-900">
              Online Delivery
            </h4>

            {/* Timings */}
            <div className="flex items-center gap-1.5 text-xs font-bold text-earth-900">
              <Clock className="w-3.5 h-3.5 text-[#2C8B33]" />
              <span>11:00 AM - 12:00 AM Daily</span>
            </div>

            {/* Delivery Partners Box */}
            <div className="flex items-center gap-3 px-3 py-1.5 bg-white rounded-xl border border-cream-300 shadow-2xs">
              <a
                href={DELIVERY_LINKS.swiggy}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity flex items-center"
                title="Order Mahabaleshwar Juice on Swiggy"
                aria-label="Order on Swiggy"
              >
                <SwiggyLogo className="h-5 sm:h-6 w-auto" />
              </a>
              <div className="h-4 w-px bg-cream-300" />
              <a
                href={DELIVERY_LINKS.zomato}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity flex items-center"
                title="Order Mahabaleshwar Juice on Zomato"
                aria-label="Order on Zomato"
              >
                <ZomatoLogo className="h-4 sm:h-5 w-auto" />
              </a>
            </div>

          </div>

        </div>

        {/* Bottom Bar (Ultra Compact) */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-earth-700 font-medium">
          <p>© {new Date().getFullYear()} Mahabaleshwar Juice Center. All rights reserved.</p>
          
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/mahabaleshwar_juice_centre/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#E1306C] transition-colors font-bold text-earth-900"
              aria-label="Follow on Instagram"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-[#E1306C]" />
              <span>Instagram</span>
            </a>

            <span className="text-cream-400">|</span>

            <a
              href="https://www.facebook.com/p/Mahabaleshwar-juice-centre-Thane-100063525205631/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#1877F2] transition-colors font-bold text-earth-900"
              aria-label="Follow on Facebook"
            >
              <FacebookIcon className="w-3.5 h-3.5 text-[#1877F2]" />
              <span>Facebook</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
