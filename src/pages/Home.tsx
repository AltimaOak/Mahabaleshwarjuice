import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Clock, MapPin, Navigation, BookOpen } from 'lucide-react';
import { SwiggyLogo, ZomatoLogo } from '../components/PartnerLogos';
import { STORE_LOCATIONS } from '../data/storeLocations';

export const Home: React.FC = () => {
  return (
    <div className="space-y-8 sm:space-y-12 pb-2 sm:pb-3 overflow-hidden">

      {/* ========================================================
          1. HERO SECTION (Matching Reference Mockup)
          ======================================================== */}
      <section className="pt-6 sm:pt-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center">

            {/* 1A. Left Side: Fresh Strawberries + Handwritten Script (Desktop) */}
            <div className="hidden lg:flex lg:col-span-3 flex-col items-center justify-center relative">
              {/* Calligraphy handwritten note */}
              <div className="mb-3 text-center">
                <span className="font-handwriting text-3xl xl:text-4xl text-[#8C705E] -rotate-6 inline-block select-none leading-snug">
                  Good Juices<br />Good Mood ♡
                </span>
              </div>

              {/* Wooden Plate of Strawberries */}
              <div className="w-56 xl:w-64 aspect-[3/4] rounded-3xl overflow-hidden shadow-natural border border-cream-200 bg-white transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <img
                  src="/images/hero_strawberries.jpg"
                  alt="Fresh Mahabaleshwar Strawberries"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* 1B. Center Column: Mascot Logo, Brand Headings & Main CTAs */}
            <div className="lg:col-span-6 flex flex-col items-center text-center space-y-4 max-w-xl mx-auto z-10">

              {/* Mascot Logo */}
              <div className="flex justify-center">
                <img
                  src="/images/logo.png"
                  alt="Mahabaleshwar Juice Center Mascot"
                  className="h-28 sm:h-36 w-auto object-contain drop-shadow-xs"
                />
              </div>

              {/* Brand Title */}
              <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#1C120B] tracking-tight leading-tight">
                Mahabaleshwar Juice Center
              </h1>

              {/* Sub-heading with Decorative Horizontal Lines */}
              <div className="flex items-center justify-center gap-3 w-full max-w-xs mx-auto text-xs font-bold tracking-widest text-[#695142] uppercase">
                <span className="w-8 sm:w-12 h-px bg-cream-400" />
                <span>SINCE 2017 • THANE & MULUND</span>
                <span className="w-8 sm:w-12 h-px bg-cream-400" />
              </div>

              {/* Tagline */}
              <p className="font-heading font-bold text-lg sm:text-2xl text-[#B91C1C] italic">
                “Fresh Fruits. Fresh Juices. Fresh Moments.”
              </p>

              {/* Short Description */}
              <p className="text-[#695142] text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
                Fresh strawberry cream, thick dry fruit shakes, seasonal juices, milkshakes, and delicious treats made to order.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 w-full sm:w-auto">
                {/* Red Button: View Menu & Order */}
                <Link
                  to="/products"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#B91C1C] hover:bg-[#991B1B] text-white font-bold text-xs sm:text-sm shadow-sm transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>View Menu & Order (Dine - Home)</span>
                </Link>

                {/* White Button: Call */}
                <a
                  href="tel:9967997522"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white hover:bg-cream-50 border border-cream-300 text-[#1C120B] font-bold text-xs sm:text-sm shadow-2xs transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#2C8B33] fill-[#2C8B33]" />
                  <span>Call 9967997522</span>
                </a>
              </div>

              {/* Opening Hours */}
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-earth-800 pt-1">
                <Clock className="w-4 h-4 text-[#2C8B33]" />
                <span>Open Everyday: 11:00 AM - 12:00 AM</span>
              </div>

            </div>

            {/* 1C. Right Side: Strawberry Shake Glass + Handwritten Script (Desktop) */}
            <div className="hidden lg:flex lg:col-span-3 flex-col items-center justify-center relative">
              {/* Calligraphy handwritten note */}
              <div className="mb-3 text-center">
                <span className="font-handwriting text-3xl xl:text-4xl text-[#8C705E] rotate-6 inline-block select-none leading-snug">
                  Fresh<br />Always ♡
                </span>
              </div>

              {/* Tall Strawberry Shake Glass */}
              <div className="w-56 xl:w-64 aspect-[3/4] rounded-3xl overflow-hidden shadow-natural border border-cream-200 bg-white transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <img
                  src="/images/hero_shake.jpg"
                  alt="Delicious Strawberry Milkshake"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>

          {/* Mobile/Tablet Preview of Side Images */}
          <div className="grid grid-cols-2 gap-3 mt-6 lg:hidden max-w-sm mx-auto">
            <div className="rounded-2xl overflow-hidden border border-cream-300 shadow-2xs aspect-[4/3]">
              <img src="/images/hero_strawberries.jpg" alt="Strawberries" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden border border-cream-300 shadow-2xs aspect-[4/3]">
              <img src="/images/hero_shake.jpg" alt="Strawberry Shake" className="w-full h-full object-cover" />
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          2. ORDER ONLINE FROM OUR DELIVERY (Matching Reference)
          ======================================================== */}
      <section className="max-w-xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-cream-300 rounded-2xl p-4 sm:p-5 shadow-2xs text-center">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#8C705E] mb-3.5">
            ORDER ONLINE FROM OUR DELIVERY
          </p>

          <div className="flex items-center justify-center gap-6 sm:gap-12">
            {/* Swiggy */}
            <a
              href="https://www.swiggy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-85 transition-opacity px-2 flex items-center"
              aria-label="Order on Swiggy"
            >
              <SwiggyLogo className="h-7 sm:h-8 w-auto" />
            </a>

            {/* Vertical Divider */}
            <div className="h-8 w-px bg-cream-300" />

            {/* Zomato */}
            <a
              href="https://www.zomato.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-85 transition-opacity px-2 flex items-center"
              aria-label="Order on Zomato"
            >
              <ZomatoLogo className="h-6 sm:h-7 w-auto" />
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. OUR 3 STORE LOCATIONS (Matching Reference Cards)
          ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#1C120B]">
            Our 3 Store Locations
          </h2>
          <p className="text-xs sm:text-sm text-[#695142]">
            Visit us at any of our outlets across Thane and Mumbai
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STORE_LOCATIONS.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-2xl border border-cream-300 p-5 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Card Title & Red Pin */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-heading font-bold text-sm sm:text-base text-[#1C120B] leading-snug">
                    {store.name}
                  </h3>
                  <span className="p-1 rounded-full text-[#B91C1C] shrink-0">
                    <MapPin className="w-4 h-4 fill-[#B91C1C]" />
                  </span>
                </div>

                {/* Address */}
                <p className="text-xs text-earth-700 leading-relaxed min-h-[3rem]">
                  {store.address}
                </p>

                {/* Hours & Phone */}
                <div className="pt-2 border-t border-cream-200/80 space-y-1.5 text-xs text-earth-700">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#2C8B33] shrink-0" />
                    <span>{store.timings}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold text-earth-900">
                    <Phone className="w-3.5 h-3.5 text-[#B91C1C] fill-[#B91C1C] shrink-0" />
                    <a href={`tel:${store.phone}`} className="hover:underline">
                      {store.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Dark Google Maps + Green Call Phone */}
              <div className="pt-2 flex items-center gap-2">
                <a
                  href={store.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#221A15] hover:bg-[#15100D] text-white font-bold text-xs shadow-2xs transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                </a>
                <a
                  href={`tel:${store.phone}`}
                  className="inline-flex items-center justify-center p-2.5 rounded-lg border border-[#2C8B33] text-[#2C8B33] hover:bg-leaf-50 transition-colors"
                  title={`Call ${store.name}`}
                  aria-label={`Call ${store.name}`}
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
