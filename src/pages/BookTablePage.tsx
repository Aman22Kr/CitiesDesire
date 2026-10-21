import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { UtensilsCrossed, Calendar, Clock, Users, Sparkles, CheckCircle2, MapPin, Phone, AlertCircle, XCircle } from 'lucide-react';
import { OUTLETS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { TableReservation } from '../types';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const BookTablePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const outletFromQuery = searchParams.get('outlet');
  const { addReservation, reservations, cancelReservation, showToast } = useApp();

  const [outletId, setOutletId] = useState<string>(() => {
    if (outletFromQuery && OUTLETS.some((o) => o.id === outletFromQuery)) {
      return outletFromQuery;
    }
    return OUTLETS[0].id;
  });

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [date, setDate] = useState<string>(defaultDateStr);
  const [timeSlot, setTimeSlot] = useState<string>('08:00 PM');
  const [guestsCount, setGuestsCount] = useState<number>(4);
  const [seatingArea, setSeatingArea] = useState<'heritage_indoor' | 'gold_private_dining' | 'window_alcove'>('gold_private_dining');
  const [occasion, setOccasion] = useState<string>('Family Heritage Feast');
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  const [lastConfirmedReservation, setLastConfirmedReservation] = useState<TableReservation | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (outletFromQuery && OUTLETS.some((o) => o.id === outletFromQuery)) {
      setOutletId(outletFromQuery);
    }
  }, [outletFromQuery]);

  const lunchSlots = ['12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM'];
  const dinnerSlots = ['07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM'];

  const selectedOutlet = OUTLETS.find((o) => o.id === outletId) || OUTLETS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!guestName.trim()) newErrors.guestName = 'Please enter primary guest name.';
    if (!guestEmail.trim() || !guestEmail.includes('@')) newErrors.guestEmail = 'Valid email is required for booking voucher.';
    if (!guestPhone.trim() || guestPhone.length < 8) newErrors.guestPhone = 'Valid contact number is required.';
    if (!date) newErrors.date = 'Please select a reservation date.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast('Please correct form validation errors.', 'error');
      return;
    }

    setErrors({});
    const confirmed = addReservation({
      outletId: selectedOutlet.id,
      outletName: selectedOutlet.name,
      guestName: guestName.trim(),
      guestEmail: guestEmail.trim(),
      guestPhone: guestPhone.trim(),
      date,
      timeSlot,
      guestsCount,
      seatingArea,
      occasion,
      specialRequests: specialRequests.trim(),
    });

    setLastConfirmedReservation(confirmed);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c29b38', '#d4ae4b', '#f5f5f4', '#1c1917']
      });
    } catch (e) {
      // safe fallback
    }

    // scroll to confirmation
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0c0a09] text-[#f5f5f4]">
      {/* Header Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-[#292524] bg-gradient-to-b from-[#141210] to-[#0c0a09]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-[#c29b38]">
            Fine Dining Concierge
          </span>
          <h1 className="font-heritage text-4xl sm:text-6xl font-bold text-[#f5f5f4] mt-2">
            Reserve Your 1947 Table
          </h1>
          <p className="mt-4 text-sm text-[#a8a29e] max-w-xl mx-auto leading-relaxed">
            Reserve your table in our heritage halls or exclusive Gold Private Dining Rooms. Instant confirmation with persistent browser booking voucher.
          </p>
        </div>
      </section>

      {/* Main Reservation Flow */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Success Confirmation Card if just submitted */}
        {lastConfirmedReservation && (
          <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-[#141210] border border-[#c29b38] shadow-2xl relative overflow-hidden animate-in fade-in duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#c29b38]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#292524]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1c1917] border border-[#c29b38] flex items-center justify-center text-[#c29b38] shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-[#c29b38] uppercase tracking-wider">
                    Table Confirmed · Reference #{lastConfirmedReservation.id}
                  </span>
                  <h3 className="font-heritage text-2xl font-bold text-[#f5f5f4] mt-0.5">
                    We Look Forward to Welcoming You, {lastConfirmedReservation.guestName}!
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setLastConfirmedReservation(null)}
                className="text-xs text-[#a8a29e] hover:text-[#f5f5f4] transition-colors"
              >
                Dismiss Voucher
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-[#0c0a09] border border-[#292524]">
                <span className="text-[#78716c] uppercase font-mono text-[10px]">Outlet</span>
                <p className="font-semibold text-[#f5f5f4] mt-1">{lastConfirmedReservation.outletName}</p>
              </div>
              <div className="p-3 rounded-lg bg-[#0c0a09] border border-[#292524]">
                <span className="text-[#78716c] uppercase font-mono text-[10px]">Date &amp; Slot</span>
                <p className="font-semibold text-[#f5f5f4] mt-1">{lastConfirmedReservation.date} · {lastConfirmedReservation.timeSlot}</p>
              </div>
              <div className="p-3 rounded-lg bg-[#0c0a09] border border-[#292524]">
                <span className="text-[#78716c] uppercase font-mono text-[10px]">Party Size</span>
                <p className="font-semibold text-[#f5f5f4] mt-1 tabular-nums">{lastConfirmedReservation.guestsCount} Guests</p>
              </div>
              <div className="p-3 rounded-lg bg-[#0c0a09] border border-[#292524]">
                <span className="text-[#78716c] uppercase font-mono text-[10px]">Dining Alcove</span>
                <p className="font-semibold text-[#c29b38] mt-1 capitalize">
                  {lastConfirmedReservation.seatingArea.replace(/_/g, ' ')}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#292524] flex flex-wrap items-center justify-between gap-4 text-xs text-[#a8a29e]">
              <span>Need to modify? Call the outlet desk directly at <span className="font-mono text-[#f5f5f4]">{selectedOutlet.phone}</span></span>
              <span className="font-mono text-[11px] text-[#78716c]">Voucher saved in your browser localStorage</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Form Column */}
          <div className="lg:col-span-8 bg-[#141210] border border-[#292524] rounded-2xl p-6 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Select Outlet */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#c29b38] mb-2">
                  01. Select Dining Destination
                </label>
                <select
                  value={outletId}
                  onChange={(e) => setOutletId(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0c0a09] border border-[#292524] focus:border-[#c29b38] rounded-lg text-sm text-[#f5f5f4] focus:outline-none"
                >
                  {OUTLETS.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.city} — {o.name} {o.isGoldEdition ? '★ Gold Edition' : ''}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-[#78716c] mt-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#c29b38]" />
                  <span>{selectedOutlet.address}</span>
                </p>
              </div>

              {/* Step 2: Date & Party Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#c29b38] mb-2">
                    02. Dining Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0c0a09] border border-[#292524] focus:border-[#c29b38] rounded-lg text-sm text-[#f5f5f4] focus:outline-none"
                  />
                  {errors.date && <p className="text-xs text-rose-400 mt-1">{errors.date}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#c29b38] mb-2">
                    03. Number of Guests
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 4, 6, 8, 10, 12].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setGuestsCount(count)}
                        className={`flex-1 py-3 text-xs font-mono font-bold rounded border transition-colors ${
                          guestsCount === count
                            ? 'bg-[#c29b38] text-[#0c0a09] border-[#c29b38]'
                            : 'bg-[#0c0a09] text-[#a8a29e] border-[#292524] hover:border-[#3d3835]'
                        }`}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 3: Time Slot */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#c29b38] mb-2">
                  04. Choose Time Slot
                </label>
                <div className="space-y-3">
                  <div className="text-[11px] font-mono text-[#78716c]">Lunch Hours</div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {lunchSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTimeSlot(slot)}
                        className={`py-2 text-xs rounded border transition-colors ${
                          timeSlot === slot
                            ? 'bg-[#c29b38] text-[#0c0a09] border-[#c29b38] font-bold'
                            : 'bg-[#0c0a09] text-[#d6d3d1] border-[#292524] hover:border-[#3d3835]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>

                  <div className="text-[11px] font-mono text-[#78716c] pt-2">Dinner Hours</div>
                  <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
                    {dinnerSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTimeSlot(slot)}
                        className={`py-2 text-xs rounded border transition-colors ${
                          timeSlot === slot
                            ? 'bg-[#c29b38] text-[#0c0a09] border-[#c29b38] font-bold'
                            : 'bg-[#0c0a09] text-[#d6d3d1] border-[#292524] hover:border-[#3d3835]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 4: Seating Atmosphere */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#c29b38] mb-2">
                  05. Preferred Seating Atmosphere
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'gold_private_dining' as const,
                      title: 'Gold Private Dining',
                      desc: 'Regal velvet booth, chandelier lighting, dedicated butler.',
                    },
                    {
                      id: 'heritage_indoor' as const,
                      title: 'Heritage Main Hall',
                      desc: 'Vibrant dining room near the aroma of charcoal tandoor.',
                    },
                    {
                      id: 'window_alcove' as const,
                      title: 'Window Alcove',
                      desc: 'Intimate setting overlooking city lights or patio.',
                    },
                  ].map((seat) => (
                    <button
                      key={seat.id}
                      type="button"
                      onClick={() => setSeatingArea(seat.id)}
                      className={`p-4 rounded-xl text-left border transition-all ${
                        seatingArea === seat.id
                          ? 'bg-[#1c1917] border-[#c29b38]'
                          : 'bg-[#0c0a09] border-[#292524] hover:border-[#3d3835]'
                      }`}
                    >
                      <span className="font-heritage text-base font-bold text-[#f5f5f4] block">
                        {seat.title}
                      </span>
                      <span className="text-[11px] text-[#a8a29e] mt-1 block">
                        {seat.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 5: Guest Contact Details */}
              <div className="space-y-4 pt-4 border-t border-[#292524]">
                <label className="block text-xs font-mono uppercase tracking-wider text-[#c29b38]">
                  06. Primary Guest Details
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Full Name *"
                      className="w-full px-4 py-2.5 bg-[#0c0a09] border border-[#292524] focus:border-[#c29b38] rounded text-xs text-[#f5f5f4] placeholder-[#78716c] focus:outline-none"
                    />
                    {errors.guestName && <p className="text-[11px] text-rose-400 mt-1">{errors.guestName}</p>}
                  </div>

                  <div>
                    <input
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="Email Address *"
                      className="w-full px-4 py-2.5 bg-[#0c0a09] border border-[#292524] focus:border-[#c29b38] rounded text-xs text-[#f5f5f4] placeholder-[#78716c] focus:outline-none"
                    />
                    {errors.guestEmail && <p className="text-[11px] text-rose-400 mt-1">{errors.guestEmail}</p>}
                  </div>

                  <div>
                    <input
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="Phone (+91 / Mobile) *"
                      className="w-full px-4 py-2.5 bg-[#0c0a09] border border-[#292524] focus:border-[#c29b38] rounded text-xs text-[#f5f5f4] placeholder-[#78716c] focus:outline-none font-mono"
                    />
                    {errors.guestPhone && <p className="text-[11px] text-rose-400 mt-1">{errors.guestPhone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-[11px] text-[#a8a29e] mb-1">Occasion</label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0c0a09] border border-[#292524] rounded text-xs text-[#d6d3d1] focus:outline-none"
                    >
                      <option value="Family Heritage Feast">Family Heritage Feast</option>
                      <option value="Anniversary Celebration">Anniversary Celebration</option>
                      <option value="Birthday Dinner">Birthday Dinner</option>
                      <option value="Corporate Executive Dining">Corporate Executive Dining</option>
                      <option value="Casual Culinary Discovery">Casual Culinary Discovery</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#a8a29e] mb-1">Dietary / Seating Notes</label>
                    <input
                      type="text"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="e.g. High chair needed, Jain preparation, quiet corner"
                      className="w-full px-3 py-2 bg-[#0c0a09] border border-[#292524] rounded text-xs text-[#f5f5f4] placeholder-[#78716c] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 text-xs font-semibold tracking-wider uppercase text-[#0c0a09] bg-[#c29b38] hover:bg-[#d4ae4b] rounded-lg transition-all shadow-lg shadow-[#c29b38]/20 flex items-center justify-center gap-2"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  Confirm Table Reservation (Instant Confirmation)
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Outlet Preview & Saved Active Bookings */}
          <div className="lg:col-span-4 space-y-6">
            {/* Selected Outlet Card */}
            <div className="p-6 rounded-2xl bg-[#141210] border border-[#292524]">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#c29b38]">
                Selected Destination
              </span>
              <h3 className="font-heritage text-2xl font-bold text-[#f5f5f4] mt-1">
                {selectedOutlet.name}
              </h3>
              <p className="text-xs text-[#c29b38]">{selectedOutlet.city} · {selectedOutlet.region}</p>

              <div className="mt-4 space-y-2.5 text-xs text-[#a8a29e]">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#c29b38] shrink-0 mt-0.5" />
                  <span>{selectedOutlet.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#c29b38] shrink-0" />
                  <span>{selectedOutlet.timing}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#c29b38] shrink-0" />
                  <span className="font-mono text-[#f5f5f4]">{selectedOutlet.phone}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#292524] flex flex-wrap gap-1">
                {selectedOutlet.features.map((f, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#1c1917] text-[#a8a29e]">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Existing Stored Reservations List */}
            <div className="p-6 rounded-2xl bg-[#141210] border border-[#292524]">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#c29b38]">
                  Your Saved Bookings ({reservations.length})
                </h4>
              </div>

              {reservations.length === 0 ? (
                <p className="text-xs text-[#78716c]">No active reservations in this browser session.</p>
              ) : (
                <div className="space-y-3">
                  {reservations.map((res) => (
                    <div
                      key={res.id}
                      className={`p-3.5 rounded-lg border text-xs transition-colors ${
                        res.status === 'confirmed'
                          ? 'bg-[#0c0a09] border-[#292524]'
                          : 'bg-[#141210] border-[#292524]/60 opacity-60'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="font-mono text-[10px] text-[#c29b38]">{res.id}</span>
                          <h5 className="font-semibold text-[#f5f5f4] mt-0.5">{res.outletName}</h5>
                          <p className="text-[11px] text-[#a8a29e]">
                            {res.date} at {res.timeSlot} ({res.guestsCount} guests)
                          </p>
                        </div>

                        {res.status === 'confirmed' ? (
                          <button
                            onClick={() => cancelReservation(res.id)}
                            className="text-[11px] text-rose-400 hover:text-rose-300"
                            title="Cancel Booking"
                          >
                            Cancel
                          </button>
                        ) : (
                          <span className="text-[10px] text-rose-400 uppercase font-mono">Cancelled</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Ad Placeholder */}
      <AdPlaceholder slotName="CitiesDesire Signature Banquets &amp; Catering" />
    </div>
  );
};
