import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, CartItem, TableReservation } from '../types';
import { MENU_ITEMS, OUTLETS } from '../data/mockData';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface AppContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, spiceCustomization?: 'mild' | 'regular' | 'spicy') => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
  promoCode: string;
  discountAmount: number;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;

  favorites: string[];
  toggleFavorite: (itemId: string) => void;
  isFavorite: (itemId: string) => boolean;

  reservations: TableReservation[];
  addReservation: (reservationData: Omit<TableReservation, 'id' | 'createdAt' | 'status'>) => TableReservation;
  cancelReservation: (id: string) => void;

  recentlyViewed: string[];
  addToRecentlyViewed: (itemId: string) => void;

  searchHistory: string[];
  addSearchQuery: (query: string) => void;
  clearSearchHistory: () => void;

  isAudioPlaying: boolean;
  toggleAudio: () => void;

  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const STORAGE_KEYS = {
  CART: 'citiesdesire_cart_v1',
  RESERVATIONS: 'citiesdesire_reservations_v1',
  FAVORITES: 'citiesdesire_favorites_v1',
  RECENTLY_VIEWED: 'citiesdesire_recently_viewed_v1',
  SEARCH_HISTORY: 'citiesdesire_search_history_v1',
  PROMO: 'citiesdesire_promo_v1',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CART);
      return stored ? JSON.parse(stored) : [
        { menuItem: MENU_ITEMS[0], quantity: 1, spiceCustomization: 'regular' },
        { menuItem: MENU_ITEMS[8], quantity: 2, spiceCustomization: 'mild' }
      ];
    } catch {
      return [];
    }
  });

  // Reservations State
  const [reservations, setReservations] = useState<TableReservation[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
      return stored ? JSON.parse(stored) : [
        {
          id: 'RES-1947-8821',
          outletId: OUTLETS[0].id,
          outletName: OUTLETS[0].name,
          guestName: 'Aman Kumar',
          guestEmail: 'aman300rocking@gmail.com',
          guestPhone: '+91 98765 43210',
          date: '2026-10-25',
          timeSlot: '08:00 PM',
          guestsCount: 4,
          seatingArea: 'gold_private_dining',
          occasion: 'Heritage Culinary Tasting',
          specialRequests: 'Near historical portrait wall please',
          createdAt: '2026-10-20T20:00:00.000Z',
          status: 'confirmed'
        }
      ];
    } catch {
      return [];
    }
  });

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return stored ? JSON.parse(stored) : ['original-1947-butter-chicken', 'original-1947-dal-makhani'];
    } catch {
      return [];
    }
  });

  // Recently Viewed
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.RECENTLY_VIEWED);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Search History
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY);
      return stored ? JSON.parse(stored) : ['Butter Chicken', 'Dal Makhani', 'Aerocity'];
    } catch {
      return [];
    }
  });

  // Promo Code
  const [promoCode, setPromoCode] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.PROMO) || '';
    } catch {
      return '';
    }
  });

  // Ambient sound state
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.warn('Storage failed for cart', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
    } catch (e) {
      console.warn('Storage failed for reservations', e);
    }
  }, [reservations]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (e) {
      console.warn('Storage failed for favorites', e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RECENTLY_VIEWED, JSON.stringify(recentlyViewed));
    } catch (e) {
      console.warn('Storage failed for recent views', e);
    }
  }, [recentlyViewed]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(searchHistory));
    } catch (e) {
      console.warn('Storage failed for search history', e);
    }
  }, [searchHistory]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart operations
  const addToCart = (item: MenuItem, quantity = 1, spiceCustomization: 'mild' | 'regular' | 'spicy' = 'regular') => {
    setCart(prev => {
      const existingIndex = prev.findIndex(ci => ci.menuItem.id === item.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
          spiceCustomization
        };
        return next;
      }
      return [...prev, { menuItem: item, quantity, spiceCustomization }];
    });
    showToast(`Added "${item.name}" to your takeaway order.`, 'success');
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(ci => ci.menuItem.id !== itemId));
    showToast('Item removed from order.', 'info');
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(ci => {
          if (ci.menuItem.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, ci) => sum + (ci.menuItem.price * ci.quantity), 0);
  const cartItemCount = cart.reduce((sum, ci) => sum + ci.quantity, 0);

  const applyPromoCode = (code: string): boolean => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'CITIES1947' || normalized === 'HERITAGE15') {
      setPromoCode(normalized);
      localStorage.setItem(STORAGE_KEYS.PROMO, normalized);
      showToast('Heritage promo code applied! 15% discount granted.', 'success');
      return true;
    } else {
      showToast('Invalid promo code. Try using "CITIES1947"', 'error');
      return false;
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
    localStorage.removeItem(STORAGE_KEYS.PROMO);
    showToast('Promo code removed.', 'info');
  };

  const discountAmount = promoCode ? Math.round(cartTotal * 0.15) : 0;

  // Favorites
  const toggleFavorite = (itemId: string) => {
    setFavorites(prev => {
      const exists = prev.includes(itemId);
      const next = exists ? prev.filter(id => id !== itemId) : [...prev, itemId];
      showToast(exists ? 'Removed from favorites' : 'Saved to favorites', 'info');
      return next;
    });
  };

  const isFavorite = (itemId: string) => favorites.includes(itemId);

  // Reservations
  const addReservation = (data: Omit<TableReservation, 'id' | 'createdAt' | 'status'>): TableReservation => {
    const newReservation: TableReservation = {
      ...data,
      id: `RES-${Date.now().toString().slice(-4)}-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };
    setReservations(prev => [newReservation, ...prev]);
    showToast(`Table confirmed at ${data.outletName}! Booking ID: ${newReservation.id}`, 'success');
    return newReservation;
  };

  const cancelReservation = (id: string) => {
    setReservations(prev =>
      prev.map(r => (r.id === id ? { ...r, status: 'cancelled' as const } : r))
    );
    showToast('Reservation cancelled successfully.', 'info');
  };

  // Recently viewed
  const addToRecentlyViewed = (itemId: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== itemId);
      return [itemId, ...filtered].slice(0, 8);
    });
  };

  // Search History
  const addSearchQuery = (query: string) => {
    if (!query.trim()) return;
    setSearchHistory(prev => {
      const filtered = prev.filter(q => q.toLowerCase() !== query.toLowerCase());
      return [query.trim(), ...filtered].slice(0, 6);
    });
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  // Soundscape audio toggle
  const toggleAudio = () => {
    setIsAudioPlaying(prev => {
      const next = !prev;
      showToast(next ? 'Soundscape active: Sitar & Delhi Heritage Cadences' : 'Soundscape muted', 'info');
      return next;
    });
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
        promoCode,
        discountAmount,
        applyPromoCode,
        removePromoCode,
        favorites,
        toggleFavorite,
        isFavorite,
        reservations,
        addReservation,
        cancelReservation,
        recentlyViewed,
        addToRecentlyViewed,
        searchHistory,
        addSearchQuery,
        clearSearchHistory,
        isAudioPlaying,
        toggleAudio,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
