import React, { useState } from 'react';
import { MessageSquarePlus, X, Star, Send, CheckCircle2, MessageCircle, Phone } from 'lucide-react';
import { STORE_LOCATIONS } from '../data/storeLocations';

export const FeedbackModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOutletId, setSelectedOutletId] = useState<string>(STORE_LOCATIONS[0].id);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comments, setComments] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Dynamic outlet and phone resolution
  const currentOutlet = STORE_LOCATIONS.find((loc) => loc.id === selectedOutletId);
  const currentOutletName = currentOutlet ? currentOutlet.name : 'Online Order (Swiggy / Zomato)';
  const currentOutletPhone = currentOutlet ? currentOutlet.phone : '9967997522';
  const whatsappNumber = `91${currentOutletPhone.replace(/\D/g, '')}`;

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
    `• *Outlet:* ${currentOutletName}\n` +
    `• *Outlet Phone:* ${currentOutletPhone}\n` +
    `• *Rating:* ${'⭐'.repeat(rating)} (${rating}/5)\n` +
    (name ? `• *Customer:* ${name}\n` : '') +
    (phone ? `• *Contact:* ${phone}\n` : '') +
    (comments ? `• *Comments:* ${comments}\n` : '')
  );

  return (
    <>
      {/* ========================================================
          SIMPLE FLOATING FEEDBACK BUTTON (Left Bottom Corner)
          ======================================================== */}
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="fixed bottom-5 left-5 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#B91C1C] hover:bg-[#991B1B] active:scale-95 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer"
        aria-label="Open Feedback Form"
        title="Share your feedback"
      >
        <MessageSquarePlus className="w-4 h-4" />
        <span>Feedback</span>
      </button>

      {/* ========================================================
          FEEDBACK MODAL DIALOG
          ======================================================== */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-earth-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-cream-300 overflow-hidden animate-in fade-in zoom-in-95 duration-200">

            {/* Header Strip */}
            <div className="bg-[#B91C1C] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-heading font-black text-lg sm:text-xl leading-tight">
                  Share Your Feedback
                </h3>
                <p className="text-xs text-white/85 font-medium mt-0.5">
                  Mahabaleshwar Juice Center • Freshness & Service
                </p>
              </div>
              <button
                onClick={resetForm}
                className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
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
                      Your review has been submitted for <strong>{currentOutletName}</strong>.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${whatsappFeedbackMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-2xs"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send to {currentOutletName.split('(')[0].trim()} on WhatsApp ({currentOutletPhone})</span>
                    </a>

                    <button
                      onClick={resetForm}
                      type="button"
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cream-200 hover:bg-cream-300 text-earth-800 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                /* Feedback Form View */
                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* 1. Outlet Selection with dynamic phone display */}
                  <div>
                    <label
                      htmlFor="feedback-outlet-select"
                      className="block text-xs font-bold text-earth-700 uppercase tracking-wider mb-1.5"
                    >
                      Which outlet did you visit / order from?
                    </label>
                    <select
                      id="feedback-outlet-select"
                      name="outlet"
                      value={selectedOutletId}
                      onChange={(e) => setSelectedOutletId(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-300 rounded-xl text-xs sm:text-sm font-semibold text-earth-900 focus:outline-none focus:ring-2 focus:ring-[#B91C1C]"
                    >
                      {STORE_LOCATIONS.map((loc) => (
                        <option key={loc.id} value={loc.id}>
                          {loc.name}
                        </option>
                      ))}
                      <option value="online">
                        Online Order (Swiggy / Zomato)
                      </option>
                    </select>

                    {/* Dynamic Outlet Phone Number Box */}
                    <div className="mt-2 flex items-center justify-between px-3 py-2 rounded-xl bg-cream-100 border border-cream-200 text-xs">
                      <span className="text-earth-600 font-medium">Outlet Contact Number:</span>
                      <a
                        href={`tel:${currentOutletPhone}`}
                        className="font-bold text-[#2C8B33] hover:underline flex items-center gap-1"
                        title={`Call ${currentOutletName}`}
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{currentOutletPhone}</span>
                      </a>
                    </div>
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
                              className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                                isFilled
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
                    <label
                      htmlFor="feedback-comments"
                      className="block text-xs font-bold text-earth-700 uppercase tracking-wider mb-1.5"
                    >
                      Your Review & Suggestions
                    </label>
                    <textarea
                      id="feedback-comments"
                      name="comments"
                      rows={3}
                      required
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      placeholder="Tell us what you liked about your drink, taste, sweetness, or staff service..."
                      className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-300 rounded-xl text-xs sm:text-sm text-earth-900 placeholder-earth-400 focus:outline-none focus:ring-2 focus:ring-[#B91C1C] resize-none"
                    />
                  </div>

                  {/* 4. Name & Phone (Optional) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="feedback-customer-name"
                        className="block text-[11px] font-bold text-earth-600 mb-1"
                      >
                        Your Name (Optional)
                      </label>
                      <input
                        id="feedback-customer-name"
                        name="customerName"
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Your Name"
                        className="w-full px-3 py-2 bg-cream-50 border border-cream-300 rounded-xl text-xs text-earth-900 focus:outline-none focus:ring-2 focus:ring-[#B91C1C]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="feedback-customer-phone"
                        className="block text-[11px] font-bold text-earth-600 mb-1"
                      >
                        Phone Number (Optional)
                      </label>
                      <input
                        id="feedback-customer-phone"
                        name="customerPhone"
                        type="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter Your Phone"
                        className="w-full px-3 py-2 bg-cream-50 border border-cream-300 rounded-xl text-xs text-earth-900 focus:outline-none focus:ring-2 focus:ring-[#B91C1C]"
                      />
                    </div>
                  </div>

                  {/* Submit Button & Direct WhatsApp */}
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3 px-4 rounded-xl bg-[#B91C1C] hover:bg-[#991B1B] text-white font-extrabold text-xs sm:text-sm shadow-2xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Feedback</span>
                    </button>

                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${whatsappFeedbackMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-colors"
                      title={`Send feedback directly to ${currentOutletName.split('(')[0].trim()} WhatsApp (${currentOutletPhone})`}
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
