import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { ShoppingBag, Trash2, Plus, Minus, Sparkles, Tag, CheckCircle2, Truck, Store, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const DeliveryPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartItemCount,
    promoCode,
    discountAmount,
    applyPromoCode,
    removePromoCode,
    showToast,
  } = useApp();

  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [promoInput, setPromoInput] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliverySlot, setDeliverySlot] = useState('Standard (35-45 mins)');

  const [completedOrderNumber, setCompletedOrderNumber] = useState<string | null>(null);

  const deliveryFee = orderType === 'delivery' ? (cartTotal > 1000 ? 0 : 75) : 0;
  const packagingFee = 45; // 5 senses packaging
  const finalPayable = Math.max(0, cartTotal - discountAmount + deliveryFee + packagingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    applyPromoCode(promoInput);
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast('Your bag is currently empty.', 'error');
      return;
    }

    if (!recipientName.trim() || !recipientPhone.trim()) {
      showToast('Please provide your name and phone number.', 'error');
      return;
    }

    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      showToast('Please provide a delivery address.', 'error');
      return;
    }

    const orderId = `ORD-1947-${Math.floor(100000 + Math.random() * 900000)}`;
    setCompletedOrderNumber(orderId);
    clearCart();

    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#c29b38', '#d4ae4b', '#f5f5f4']
      });
    } catch (e) {
      // safe fallback
    }

    showToast(`Order placed successfully! Reference: ${orderId}`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#0c0a09] text-[#f5f5f4]">
      {/* Header Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-[#292524] bg-gradient-to-b from-[#141210] to-[#0c0a09]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-[#c29b38]">
            Sensory Home Dining
          </span>
          <h1 className="font-heritage text-4xl sm:text-6xl font-bold text-[#f5f5f4] mt-2">
            5 Senses Takeaway &amp; Delivery
          </h1>
          <p className="mt-4 text-sm text-[#a8a29e] max-w-xl mx-auto leading-relaxed">
            Every dish is packed in triple-insulated thermal boxes with our signature aroma card, fresh white butter garnish, and Delhi sitar soundscape QR code.
          </p>
        </div>
      </section>

      {/* Main Order Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {completedOrderNumber ? (
          <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-[#141210] border border-[#c29b38] text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#1c1917] border border-[#c29b38] mx-auto flex items-center justify-center text-[#c29b38]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono text-[#c29b38] uppercase tracking-wider">
                Order Received · #{completedOrderNumber}
              </span>
              <h2 className="font-heritage text-3xl font-bold text-[#f5f5f4] mt-2">
                Your 5-Senses Feast is Being Prepared
              </h2>
              <p className="text-xs text-[#a8a29e] mt-2 max-w-md mx-auto">
                Our kitchen brigade has begun simmering your order. You will receive an SMS dispatch update with courier tracking.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0c0a09] border border-[#292524] text-xs space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-[#78716c]">Estimated Arrival:</span>
                <span className="font-semibold text-[#f5f5f4]">Within 40 minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#78716c]">Temperature Guarantee:</span>
                <span className="font-semibold text-[#c29b38]">65°C Core Warmth Seal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#78716c]">Audio Soundscape:</span>
                <span className="text-[#d6d3d1]">Spotify QR enclosed inside</span>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-2">
              <Link
                to="/menu"
                className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0c0a09] bg-[#c29b38] hover:bg-[#d4ae4b] rounded"
              >
                Explore More Dishes
              </Link>
              <button
                onClick={() => setCompletedOrderNumber(null)}
                className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#f5f5f4] bg-[#1c1917] border border-[#292524] rounded"
              >
                Place Another Order
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Cart Items & 5-Senses Inclusions */}
            <div className="lg:col-span-7 space-y-8">
              {/* Cart List */}
              <div className="p-6 rounded-2xl bg-[#141210] border border-[#292524]">
                <div className="flex items-center justify-between pb-4 border-b border-[#292524]">
                  <h3 className="font-heritage text-2xl font-bold text-[#f5f5f4]">
                    Your Takeaway Bag ({cartItemCount} {cartItemCount === 1 ? 'item' : 'items'})
                  </h3>
                  {cart.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="text-xs text-[#78716c] hover:text-rose-400 transition-colors"
                    >
                      Clear Bag
                    </button>
                  )}
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <ShoppingBag className="w-10 h-10 text-[#78716c] mx-auto" />
                    <p className="text-xs text-[#a8a29e]">Your culinary bag is currently empty.</p>
                    <Link
                      to="/menu"
                      className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#0c0a09] bg-[#c29b38] rounded"
                    >
                      Browse Heritage Menu
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-[#292524]">
                    {cart.map((ci) => (
                      <div key={ci.menuItem.id} className="py-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={ci.menuItem.image}
                            alt={ci.menuItem.name}
                            className="w-14 h-14 rounded-lg object-cover bg-[#1c1917] shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <h4 className="font-semibold text-sm text-[#f5f5f4]">{ci.menuItem.name}</h4>
                            <p className="text-[11px] text-[#c29b38] capitalize">
                              {ci.spiceCustomization || 'Authentic'} spice · ₹{ci.menuItem.price} each
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 shrink-0">
                          <div className="flex items-center border border-[#292524] rounded bg-[#0c0a09]">
                            <button
                              onClick={() => updateQuantity(ci.menuItem.id, -1)}
                              className="px-2.5 py-1 text-xs text-[#a8a29e] hover:text-[#f5f5f4]"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-mono font-bold">{ci.quantity}</span>
                            <button
                              onClick={() => updateQuantity(ci.menuItem.id, 1)}
                              className="px-2.5 py-1 text-xs text-[#a8a29e] hover:text-[#f5f5f4]"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-mono text-xs font-bold text-[#f5f5f4] min-w-16 text-right">
                            ₹{ci.menuItem.price * ci.quantity}
                          </span>

                          <button
                            onClick={() => removeFromCart(ci.menuItem.id)}
                            className="p-1 text-[#78716c] hover:text-rose-400 transition-colors"
                            aria-label="Delete item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 5-Senses Unboxing Inclusions Box */}
              <div className="p-6 rounded-2xl bg-[#141210] border border-[#292524] space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#c29b38]" />
                  <h4 className="font-heritage text-lg font-bold text-[#f5f5f4]">
                    The 5-Senses Packaging Guarantee (Included Free)
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#a8a29e]">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#c29b38] shrink-0 mt-0.5" />
                    <span>Triple Thermal Wall keeping gravies steaming hot at 65°C</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#c29b38] shrink-0 mt-0.5" />
                    <span>Botanical Damask Rose &amp; Sandalwood Aroma Pouch</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#c29b38] shrink-0 mt-0.5" />
                    <span>Spotify QR card with 1947 dining lounge soundscape</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#c29b38] shrink-0 mt-0.5" />
                    <span>Complimentary mint coriander chutney &amp; sirka shallots</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Checkout & Bill Summary */}
            <div className="lg:col-span-5 space-y-6">
              {/* Order Mode Toggle */}
              <div className="p-1 rounded-xl bg-[#141210] border border-[#292524] grid grid-cols-2 gap-1 text-xs">
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                    orderType === 'delivery'
                      ? 'bg-[#c29b38] text-[#0c0a09] font-bold shadow-sm'
                      : 'text-[#a8a29e] hover:text-[#f5f5f4]'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  Doorstep Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                    orderType === 'pickup'
                      ? 'bg-[#c29b38] text-[#0c0a09] font-bold shadow-sm'
                      : 'text-[#a8a29e] hover:text-[#f5f5f4]'
                  }`}
                >
                  <Store className="w-4 h-4" />
                  Outlet Takeaway
                </button>
              </div>

              {/* Promo Code Card */}
              <div className="p-4 rounded-xl bg-[#141210] border border-[#292524]">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#c29b38] mb-2">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Heritage Discount Code</span>
                </div>

                {promoCode ? (
                  <div className="flex items-center justify-between p-2.5 rounded bg-[#0c0a09] border border-[#c29b38]/50 text-xs">
                    <div>
                      <span className="font-mono font-bold text-[#c29b38]">{promoCode}</span>
                      <span className="text-[11px] text-[#a8a29e] ml-2">15% Off Applied</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-[11px] text-rose-400 hover:text-rose-300"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Use code CITIES1947"
                      className="flex-1 px-3 py-2 bg-[#0c0a09] border border-[#292524] rounded text-xs text-[#f5f5f4] uppercase placeholder-[#78716c] focus:outline-none focus:border-[#c29b38]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0c0a09] bg-[#c29b38] hover:bg-[#d4ae4b] rounded"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Delivery Details Form */}
              <form onSubmit={handleCheckout} className="p-6 rounded-2xl bg-[#141210] border border-[#292524] space-y-4">
                <h4 className="font-heritage text-lg font-bold text-[#f5f5f4]">
                  {orderType === 'delivery' ? 'Delivery Destination' : 'Pickup Contact Info'}
                </h4>

                <div>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Recipient Name *"
                    className="w-full px-3 py-2 bg-[#0c0a09] border border-[#292524] rounded text-xs text-[#f5f5f4] placeholder-[#78716c] focus:outline-none focus:border-[#c29b38]"
                    required
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    placeholder="Contact Number (+91 Mobile) *"
                    className="w-full px-3 py-2 bg-[#0c0a09] border border-[#292524] rounded text-xs text-[#f5f5f4] placeholder-[#78716c] focus:outline-none focus:border-[#c29b38] font-mono"
                    required
                  />
                </div>

                {orderType === 'delivery' && (
                  <div>
                    <textarea
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      rows={2}
                      placeholder="Full Street Address, House/Apt No., Landmark *"
                      className="w-full px-3 py-2 bg-[#0c0a09] border border-[#292524] rounded text-xs text-[#f5f5f4] placeholder-[#78716c] focus:outline-none focus:border-[#c29b38]"
                      required
                    />
                  </div>
                )}

                {/* Bill Breakdown */}
                <div className="pt-4 border-t border-[#292524] space-y-2 text-xs">
                  <div className="flex justify-between text-[#a8a29e]">
                    <span>Subtotal:</span>
                    <span className="font-mono text-[#f5f5f4]">₹{cartTotal}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#c29b38]">
                      <span>Heritage Discount (15%):</span>
                      <span className="font-mono">-₹{discountAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#a8a29e]">
                    <span>5-Senses Thermal Eco-Packaging:</span>
                    <span className="font-mono text-[#f5f5f4]">₹{packagingFee}</span>
                  </div>

                  <div className="flex justify-between text-[#a8a29e]">
                    <span>Delivery Fee:</span>
                    <span className="font-mono text-[#f5f5f4]">
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-[#292524] flex justify-between font-bold text-sm text-[#f5f5f4]">
                    <span>Total Amount Payable:</span>
                    <span className="font-mono text-[#c29b38] text-base">₹{finalPayable}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={cart.length === 0}
                  className="w-full py-3.5 text-xs font-semibold uppercase tracking-wider text-[#0c0a09] bg-[#c29b38] hover:bg-[#d4ae4b] disabled:bg-[#3d3835] disabled:text-[#78716c] rounded transition-all shadow-lg flex items-center justify-center gap-2 mt-4"
                >
                  Place Takeaway Order (₹{finalPayable})
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[10px] text-center text-[#78716c] mt-2">
                  Simulated local order. State persisted safely in your browser localStorage.
                </p>
              </form>
            </div>
          </div>
        )}
      </section>

      {/* Ad Placeholder */}
      <AdPlaceholder slotName="CitiesDesire Cloud Kitchen Network" />
    </div>
  );
};
