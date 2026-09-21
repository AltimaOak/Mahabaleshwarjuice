import React, { useState } from 'react';
import { MapPin, X } from 'lucide-react';
import { CELEBRITY_VISITS } from '../data/galleryData';
import type { CelebrityVisit } from '../data/galleryData';

export const Gallery: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [activePhoto, setActivePhoto] = useState<CelebrityVisit | null>(null);

  const branches = [
    { label: 'All Outlets', value: 'all' },
    { label: 'Vasant Vihar', value: 'Vasant Vihar' },
    { label: 'Kolbad', value: 'Kolbad' },
    { label: 'Mulund West', value: 'Mulund' },
  ];

  const filteredVisits = CELEBRITY_VISITS.filter((visit) => {
    if (selectedBranch === 'all') return true;
    return visit.outlet.toLowerCase().includes(selectedBranch.toLowerCase());
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Simple Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="font-heading font-black text-2xl sm:text-4xl text-[#1C120B]">
          Celebrity & Guest Gallery
        </h1>
        <p className="text-xs sm:text-sm text-[#695142] leading-relaxed">
          Moments captured with actor, creator, and guest visits across our Thane & Mulund outlets.
        </p>
      </div>

      {/* Simple Outlet Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {branches.map((b) => (
          <button
            key={b.value}
            type="button"
            onClick={() => setSelectedBranch(b.value)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer border ${
              selectedBranch === b.value
                ? 'bg-[#B91C1C] text-white border-[#B91C1C] shadow-2xs'
                : 'bg-white text-earth-800 border-cream-300 hover:bg-cream-100'
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>

      {/* Simple Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredVisits.map((item) => (
          <div
            key={item.id}
            onClick={() => setActivePhoto(item)}
            className="bg-white border border-cream-300 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col"
          >
            {/* Image Box */}
            <div className="aspect-[4/3] bg-cream-100 relative overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/65 backdrop-blur-xs text-white text-[11px] font-semibold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-red-400" />
                {item.outlet}
              </span>
            </div>

            {/* Photo Info */}
            <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-heading font-bold text-base text-[#1C120B]">
                    {item.name}
                  </h3>
                  {item.role && (
                    <span className="text-[11px] text-earth-500 font-medium">
                      {item.role}
                    </span>
                  )}
                </div>
                {item.caption && (
                  <p className="text-xs text-earth-700 leading-relaxed mt-1">
                    {item.caption}
                  </p>
                )}
              </div>

              {item.date && (
                <div className="pt-2 border-t border-cream-200 text-[11px] text-earth-400 font-medium">
                  {item.date}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Simple Lightbox Modal */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-xl border border-cream-300 relative animate-in zoom-in-95 duration-150"
          >
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[4/3] bg-earth-900">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-lg text-[#1C120B]">
                  {activePhoto.name}
                </h3>
                <span className="text-xs font-semibold text-[#B91C1C] bg-red-50 px-2.5 py-1 rounded-lg border border-red-100">
                  {activePhoto.outlet}
                </span>
              </div>
              {activePhoto.caption && (
                <p className="text-xs text-earth-700 leading-relaxed">
                  {activePhoto.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
