import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Navigation, Clock, ShoppingBag } from 'lucide-react';
import { STORE_LOCATIONS } from '../data/storeLocations';
import { SwiggyLogo, ZomatoLogo } from '../components/PartnerLogos';

export const About: React.FC = () => {
  return (
    <div className="space-y-10 sm:space-y-14 py-6 sm:py-10 pb-4 sm:pb-6">
      
      {/* 1. Header Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-leaf-700">
          ® Since 2017 • Thane & Mulund
        </span>

        <h1 className="font-heading font-black text-3xl sm:text-5xl text-earth-900 tracking-tight">
          About Mahabaleshwar Juice Center
        </h1>

        <p className="font-heading font-bold text-base sm:text-lg text-strawberry-600">
          “Fresh Fruits. Fresh Juices. Fresh Moments.”
        </p>

        <p className="text-earth-700 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Founded in 2017, Mahabaleshwar Juice Center was started with a simple goal: bringing the authentic fruit cream and shake culture of Mahabaleshwar hill station directly to Thane and Mumbai.
        </p>
      </section>

      {/* 2. Brand & Story Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-cream-300 p-6 sm:p-10 shadow-2xs space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Mascot Image */}
            <div className="md:col-span-4 flex justify-center">
              <div className="p-4 bg-cream-50 rounded-2xl border border-cream-200 text-center space-y-2 max-w-[220px]">
                <img
                  src="/images/logo.png"
                  alt="Mahabaleshwar Juice Center Logo"
                  className="h-32 w-auto object-contain mx-auto"
                />
                <p className="text-xs font-bold text-earth-800">
                  Mahabaleshwar Juice Center
                </p>
                <p className="text-[11px] text-earth-500">
                  Original Brand Mascot
                </p>
              </div>
            </div>

            {/* Honest Story Text */}
            <div className="md:col-span-8 space-y-4">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-earth-900">
                Fresh Fruits & Real Ingredients
              </h2>
              
              <p className="text-earth-700 text-sm sm:text-base leading-relaxed">
                Mahabaleshwar is celebrated for its strawberries, mulberries, and cool orchard breezes. At Mahabaleshwar Juice Center, we serve those same beloved fruit combinations made fresh right in front of you.
              </p>

              <p className="text-earth-700 text-sm sm:text-base leading-relaxed">
                Whether it's our signature <strong>Strawberry Cream</strong> layered with thick dairy cream and vanilla ice cream, our thick <strong>Dryfruit Mastani</strong>, or a cold glass of freshly pressed <strong>Mosambi Juice</strong>, we use real fruits and clean ingredients without shortcuts.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-earth-800">
                <span className="flex items-center gap-1.5 bg-cream-100 px-3 py-1.5 rounded-lg border border-cream-200">
                  ✓ Fresh fruit sliced daily
                </span>
                <span className="flex items-center gap-1.5 bg-cream-100 px-3 py-1.5 rounded-lg border border-cream-200">
                  ✓ Pure cream & thick dairy
                </span>
                <span className="flex items-center gap-1.5 bg-cream-100 px-3 py-1.5 rounded-lg border border-cream-200">
                  ✓ 180+ authentic menu items
                </span>
              </div>
            </div>

          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-cream-200 text-center">
            <div className="p-3 rounded-xl bg-cream-50 border border-cream-200">
              <span className="font-black text-xl sm:text-2xl text-strawberry-600 block">2017</span>
              <span className="text-xs text-earth-600 font-medium">Established</span>
            </div>
            <div className="p-3 rounded-xl bg-cream-50 border border-cream-200">
              <span className="font-black text-xl sm:text-2xl text-leaf-700 block">3</span>
              <span className="text-xs text-earth-600 font-medium">Store Outlets</span>
            </div>
            <div className="p-3 rounded-xl bg-cream-50 border border-cream-200">
              <span className="font-black text-xl sm:text-2xl text-earth-900 block">180+</span>
              <span className="text-xs text-earth-600 font-medium">Menu Items</span>
            </div>
            <div className="p-3 rounded-xl bg-cream-50 border border-cream-200">
              <span className="font-black text-xl sm:text-2xl text-earth-900 block">Daily</span>
              <span className="text-xs text-earth-600 font-medium">11 AM – 12:30 AM</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Outlets Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-6 space-y-1">
          <h2 className="font-heading font-black text-xl sm:text-2xl text-earth-900">
            Our 3 Store Locations
          </h2>
          <p className="text-earth-600 text-xs sm:text-sm">
            Visit us in Thane (Kolbad & Vasant Vihar) or Mulund West (Mumbai)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STORE_LOCATIONS.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-xl border border-cream-300 p-5 shadow-2xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                {/* Store Title & Pin (Clickable to Google Maps) */}
                <a
                  href={store.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between gap-2 group/title hover:opacity-85 transition-opacity"
                  title="Open on Google Maps"
                >
                  <div>
                    <h3 className="font-heading font-bold text-base text-earth-900 leading-snug group-hover/title:text-strawberry-600 transition-colors">
                      {store.name}
                    </h3>
                    <span className="text-xs font-semibold text-leaf-700 block mt-0.5">
                      {store.landmark}
                    </span>
                  </div>
                  <span className="p-1.5 rounded-lg bg-cream-100 text-strawberry-600 shrink-0 group-hover/title:scale-110 transition-transform">
                    <MapPin className="w-4 h-4 fill-strawberry-600" />
                  </span>
                </a>

                {/* Address (Clickable to Google Maps) */}
                <a
                  href={store.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-earth-700 hover:text-strawberry-600 leading-relaxed block transition-colors"
                  title="Open on Google Maps"
                >
                  {store.address}
                </a>

                <div className="pt-2 border-t border-cream-200 space-y-1 text-xs text-earth-600">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-leaf-600 shrink-0" />
                    <span>{store.timings}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-strawberry-600 shrink-0" />
                    <a href={`tel:${store.phone}`} className="hover:underline text-earth-900 font-bold">
                      {store.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Delivery Links */}
              <div className="pt-2 border-t border-cream-200/80 space-y-1.5">
                <span className="text-[10px] font-bold text-earth-600 uppercase tracking-wider block">
                  Order Direct from Branch
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={store.swiggyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-white hover:bg-orange-50 border border-cream-300 hover:border-[#FC8019] text-[#FC8019] font-extrabold text-xs transition-colors shadow-2xs"
                    title={`Order from ${store.name} on Swiggy`}
                  >
                    <SwiggyLogo className="h-3.5 w-auto" />
                    <span>Swiggy</span>
                  </a>
                  <a
                    href={store.zomatoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-white hover:bg-red-50 border border-cream-300 hover:border-[#E23744] text-[#E23744] font-extrabold text-xs transition-colors shadow-2xs"
                    title={`Order from ${store.name} on Zomato`}
                  >
                    <ZomatoLogo className="h-3.5 w-auto" />
                    <span>Zomato</span>
                  </a>
                </div>
              </div>

              <div className="pt-1 flex items-center gap-2">
                <a
                  href={store.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-earth-900 hover:bg-earth-800 text-white font-bold text-xs transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                </a>
                <a
                  href={`tel:${store.phone}`}
                  className="inline-flex items-center justify-center p-2 rounded-lg bg-leaf-50 hover:bg-leaf-100 border border-leaf-300 text-leaf-800 transition-colors"
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

      {/* 4. Bottom Action Banner */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-cream-200 rounded-xl p-6 sm:p-8 border border-cream-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="font-heading font-bold text-lg text-earth-900">
              Ready to try our fresh creams & shakes?
            </h3>
            <p className="text-xs sm:text-sm text-earth-600 mt-0.5">
              Check out our complete menu with all 180+ authentic outlet rates.
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              to="/products"
              className="px-5 py-2.5 rounded-lg bg-strawberry-600 hover:bg-strawberry-700 text-white font-bold text-xs sm:text-sm transition-colors flex items-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>View Menu</span>
            </Link>
            <a
              href="tel:9967997522"
              className="px-4 py-2.5 rounded-lg bg-white hover:bg-cream-100 text-earth-800 font-bold text-xs sm:text-sm border border-cream-300 transition-colors"
            >
              Call: 9967997522
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
