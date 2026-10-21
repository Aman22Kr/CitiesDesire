import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, ChevronDown, ChevronUp, Star, CheckCircle2 } from 'lucide-react';
import { FAQS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('Dining Experience Feedback');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('Please fill all required fields.', 'error');
      return;
    }

    setSubmitted(true);
    showToast('Your message has been dispatched to the guest concierge.', 'success');
  };

  return (
    <div className="min-h-screen bg-[#0c0a09] text-[#f5f5f4]">
      {/* Header Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#292524] bg-gradient-to-b from-[#141210] to-[#0c0a09]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1c1917] border border-[#c29b38]/40 text-[#c29b38] text-xs font-mono uppercase tracking-widest mb-6">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Concierge &amp; Inquiries</span>
          </div>

          <h1 className="font-heritage text-4xl sm:text-6xl font-bold text-[#f5f5f4]">
            Connect with CitiesDesire
          </h1>

          <p className="mt-4 text-sm text-[#a8a29e] max-w-xl mx-auto leading-relaxed">
            Whether inquiring about private dining buyouts, franchise partnerships, or sharing dining feedback, our hospitality team is here to assist you.
          </p>
        </div>
      </section>

      {/* Main Grid: Form & Contact Coordinates */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-[#141210] border border-[#292524] rounded-2xl p-6 sm:p-10">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#1c1917] border border-[#c29b38] mx-auto flex items-center justify-center text-[#c29b38]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-heritage text-2xl font-bold text-[#f5f5f4]">
                  Message Received!
                </h3>
                <p className="text-xs text-[#a8a29e] max-w-sm mx-auto">
                  Thank you for contacting CitiesDesire. A member of our executive guest relations desk will respond within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-5 py-2 text-xs uppercase tracking-wider font-semibold text-[#0c0a09] bg-[#c29b38] rounded"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-heritage text-2xl font-bold text-[#f5f5f4]">
                  Send an Inquiry or Guest Feedback
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#a8a29e] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Vikram Malhotra"
                      className="w-full px-4 py-2.5 bg-[#0c0a09] border border-[#292524] focus:border-[#c29b38] rounded text-xs text-[#f5f5f4] placeholder-[#78716c] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#a8a29e] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. vikram@domain.com"
                      className="w-full px-4 py-2.5 bg-[#0c0a09] border border-[#292524] focus:border-[#c29b38] rounded text-xs text-[#f5f5f4] placeholder-[#78716c] focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#a8a29e] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 bg-[#0c0a09] border border-[#292524] focus:border-[#c29b38] rounded text-xs text-[#f5f5f4] placeholder-[#78716c] focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#a8a29e] mb-1">
                      Inquiry Subject
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#0c0a09] border border-[#292524] rounded text-xs text-[#d6d3d1] focus:outline-none"
                    >
                      <option value="Dining Experience Feedback">Dining Experience Feedback</option>
                      <option value="Private Gold Dining Buyout">Private Gold Dining Buyout</option>
                      <option value="Corporate Catering">Corporate Catering</option>
                      <option value="Franchise & Global Expansion">Franchise &amp; Global Expansion</option>
                      <option value="Press & Media Inquiries">Press &amp; Media Inquiries</option>
                    </select>
                  </div>
                </div>

                {/* Rating Stars for Feedback */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#a8a29e] mb-1">
                    Your Dining Experience Rating
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setRating(s)}
                        className="p-1 text-[#c29b38] hover:scale-110 transition-transform"
                      >
                        <Star className={`w-5 h-5 ${s <= rating ? 'fill-[#c29b38]' : 'text-[#78716c]'}`} />
                      </button>
                    ))}
                    <span className="text-xs text-[#a8a29e] ml-2 font-mono">
                      {rating} of 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#a8a29e] mb-1">
                    Your Message / Review *
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Tell us about your visit or details of your upcoming event..."
                    className="w-full px-4 py-2.5 bg-[#0c0a09] border border-[#292524] focus:border-[#c29b38] rounded text-xs text-[#f5f5f4] placeholder-[#78716c] focus:outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 text-xs font-semibold uppercase tracking-wider text-[#0c0a09] bg-[#c29b38] hover:bg-[#d4ae4b] rounded transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Dispatch Message
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Office Coordinates & Hotline */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#141210] border border-[#292524] space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#c29b38]">
                Direct Contacts
              </span>
              <h3 className="font-heritage text-2xl font-bold text-[#f5f5f4]">
                Corporate Headquarters
              </h3>

              <div className="space-y-3.5 text-xs text-[#a8a29e]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#c29b38] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#f5f5f4] block">CitiesDesire Hospitality Pvt. Ltd.</strong>
                    <span>Scindia House, Atma Ram Mansion, Connaught Place, New Delhi 110001, India</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#c29b38] shrink-0" />
                  <div>
                    <span className="text-[#78716c] block text-[10px]">Guest Assistance Hotline</span>
                    <span className="font-mono text-[#f5f5f4]">+91 11 4151 1947</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#c29b38] shrink-0" />
                  <div>
                    <span className="text-[#78716c] block text-[10px]">Guest Relations &amp; Press</span>
                    <span className="text-[#f5f5f4]">concierge@citiesdesire.in</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick table reservation callout */}
            <div className="p-6 rounded-2xl bg-[#141210] border border-[#c29b38]/40 space-y-3">
              <h4 className="font-heritage text-xl font-bold text-[#f5f5f4]">
                Planning a Large Banquet?
              </h4>
              <p className="text-xs text-[#a8a29e] leading-relaxed">
                For gatherings exceeding 15 guests, our master chefs curate personalized multi-course tasting menus featuring off-menu heirloom recipes.
              </p>
              <a
                href="#/book-table"
                className="inline-block text-xs font-semibold uppercase tracking-wider text-[#c29b38] hover:underline pt-1"
              >
                Explore Private Dining &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-[#141210] border-t border-[#292524]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#c29b38]">
              Frequently Asked Questions
            </span>
            <h2 className="font-heritage text-3xl font-bold text-[#f5f5f4] mt-1">
              Everything You Need to Know
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-[#0c0a09] border border-[#292524] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4"
                  >
                    <span className="font-heritage text-base font-bold text-[#f5f5f4]">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#c29b38] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#78716c] shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-[#d6d3d1] leading-relaxed border-t border-[#292524]/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ad Placeholder */}
      <AdPlaceholder slotName="CitiesDesire Luxury Banquet Accommodations" />
    </div>
  );
};
