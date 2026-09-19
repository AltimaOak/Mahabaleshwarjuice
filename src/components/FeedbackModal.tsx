import React, { useState } from 'react';
import { MessageSquarePlus, X, Star, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { STORE_LOCATIONS } from '../data/storeLocations';

export const FeedbackModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState(STORE_LOCATIONS[0].name);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comments, setComments] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setComments('');
    setRating(5);
    setIsSubmitted(false);
    setIsOpen(false);
  };

  const ratingLabels = ['', 'Needs Improvement', 'Fair Taste', 'Good & Refreshing', 'Very Delicious!', 'Loved It! Outstanding 🍓'];

  const whatsappFeedbackMessage = encodeURIComponent(
    `*Customer Feedback for Mahabaleshwar Juice Center*\n` +
    `• *Outlet:* ${selectedOutlet}\n` +
    `• *Rating:* ${'⭐'.repeat(rating)} (${rating}/5)\n` +
    (name ? `• *Customer:* ${name}\n` : '') +
    (phone ? `• *Contact:* ${phone}\n` : '') +
    (comments ? `• *Comments:* ${comments}\n` : '')
  );

  return (
    <>
      {/* ========================================================
          FLOATING ACTION BUTTON (Left Bottom Corner)
          ======================================================== */}
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="fixed bottom-5 left-5 z-40 flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-[#B91C1C] hover:bg-[#991B1B] active:scale-95 text-white font-bold text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all duration-200 border-2 border-white/95 cursor-pointer group"
        aria-label="Open Feedback Form"
        title="Share your feedback"
      >
        <div className="relative w-7 h-7 rounded-full bg-white/20 border border-white/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
          <MessageSquarePlus className="w-4 h-4 text-white" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400 text-[8px] font-black text-earth-950 items-center justify-center leading-none">
              ★
            </span>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-heading font-extrabold tracking-wide">Feedback</span>
          <span className="inline-flex items-center text-[10px] font-bold bg-white/20 px-1.5 py-0.5 rounded-full text-amber-300">
            ★
          </span>
        </div>
      </button>

      {/* ========================================================
          FEEDBACK MODAL DIALOG
          ======================================================== */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-earth-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-cream-300 overflow-hidden animate-in fade-in zoom-in-95 duration-200">

            {/* Header Strip */}
            <div className="bg-strawberry-600 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-heading font-black text-lg sm:text-xl leading-tight">
                  Share Your Feedback
                </h3>
                <p className="text-xs text-strawberry-100 font-medium mt-0.5">
                  Mahabaleshwar Juice Center • Freshness & Service
                </p>
              </div>
              <button
                onClick={resetForm}
                className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
                aria-label="Close feedback modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6">
              {isSubmitted ? (
                /* Success Confirmation View */
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 bg-leaf-100 text-leaf-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-heading font-black text-xl text-earth-900">
                      Thank You for Your Feedback!
                    </h4>
                    <p className="text-xs sm:text-sm text-earth-600 max-w-sm mx-auto">
                      Your reviews inspire our local team to continue crafting the freshest, purest juices and shakes daily.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                    <a
                      href={`https://wa.me/919967997522?text=${whatsappFeedbackMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-2xs"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Also send to Manager on WhatsApp</span>
                    </a>

                    <button
                      onClick={resetForm}
                      type="button"
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cream-200 hover:bg-cream-300 text-earth-800 text-xs font-bold transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                /* Feedback Form View */
                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* 1. Outlet Selection */}
                  <div>
                    <label className="block text-xs font-bold text-earth-700 uppercase tracking-wider mb-1.5">
                      Which outlet did you visit / order from?
                    </label>
                    <select
                      value={selectedOutlet}
                      onChange={(e) => setSelectedOutlet(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-300 rounded-xl text-xs sm:text-sm font-semibold text-earth-900 focus:outline-none focus:ring-2 focus:ring-strawberry-500"
                    >
                      {STORE_LOCATIONS.map((loc) => (
                        <option key={loc.id} value={loc.name}>
                          {loc.name}
                        </option>
                      ))}
                      <option value="Online Order (Swiggy / Zomato)">
                        Online Order (Swiggy / Zomato)
                      </option>
                    </select>
                  </div>

                  {/* 2. Star Rating */}
                  <div>
                    <label className="block text-xs font-bold text-earth-700 uppercase tracking-wider mb-1.5">
                      Your Rating
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const isFilled = (hoverRating || rating) >= star;
                        return (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                            aria-label={`Rate ${star} star`}
                          >
                            <Star
                              className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${isFilled
                                  ? 'fill-amber-400 text-amber-500'
                                  : 'text-cream-300 hover:text-amber-300'
                                }`}
                            />
                          </button>
                        );
                      })}
                      <span className="text-xs font-bold text-earth-700 ml-2">
                        {ratingLabels[hoverRating || rating]}
                      </span>
                    </div>
                  </div>

                  {/* 3. Comments */}
                  <div>
                    <label className="block text-xs font-bold text-earth-700 uppercase tracking-wider mb-1.5">
                      Your Review & Suggestions
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      placeholder="Tell us what you liked about your drink, taste, sweetness, or staff service..."
                      className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-300 rounded-xl text-xs sm:text-sm text-earth-900 placeholder-earth-400 focus:outline-none focus:ring-2 focus:ring-strawberry-500 resize-none"
                    />
                  </div>

                  {/* 4. Name & Phone (Optional) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-earth-600 mb-1">
                        Your Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Your Name"
                        className="w-full px-3 py-2 bg-cream-50 border border-cream-300 rounded-xl text-xs text-earth-900 focus:outline-none focus:ring-2 focus:ring-strawberry-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-earth-600 mb-1">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter Your Phone"
                        className="w-full px-3 py-2 bg-cream-50 border border-cream-300 rounded-xl text-xs text-earth-900 focus:outline-none focus:ring-2 focus:ring-strawberry-500"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3 px-4 rounded-xl bg-strawberry-600 hover:bg-strawberry-700 text-white font-extrabold text-xs sm:text-sm shadow-2xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Feedback</span>
                    </button>

                    <a
                      href={`https://wa.me/919967997522?text=${whatsappFeedbackMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-colors"
                      title="Send via WhatsApp directly"
                      aria-label="Send via WhatsApp"
                    >
                      <MessageCircle className="w-5 h-5 text-emerald-600" />
                    </a>
                  </div>

                </form>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
};
