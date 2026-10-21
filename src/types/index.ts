export interface MenuItem {
  id: string;
  name: string;
  subtitle: string;
  category: 'signature' | 'starters' | 'mains' | 'breads' | 'biryani' | 'desserts' | 'beverages';
  isVeg: boolean;
  isChefSpecial?: boolean;
  price: number;
  originalYear?: string;
  description: string;
  story: string;
  spiceLevel: 1 | 2 | 3;
  servingSize: string;
  ingredients: string[];
  allergens: string[];
  calories: number;
  image: string;
  rating: number;
  reviewCount: number;
}

export interface Outlet {
  id: string;
  name: string;
  city: 'Delhi' | 'Gurugram' | 'Noida' | 'Ludhiana' | 'Mohali' | 'Bangkok';
  region: string;
  address: string;
  landmark: string;
  phone: string;
  timing: string;
  googleMapsUrl: string;
  features: string[];
  dineIn: boolean;
  delivery: boolean;
  isGoldEdition?: boolean;
}

export interface TableReservation {
  id: string;
  outletId: string;
  outletName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  date: string;
  timeSlot: string;
  guestsCount: number;
  seatingArea: 'heritage_indoor' | 'gold_private_dining' | 'window_alcove';
  occasion?: string;
  specialRequests?: string;
  createdAt: string;
  status: 'confirmed' | 'cancelled';
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  spiceCustomization?: 'mild' | 'regular' | 'spicy';
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  dishRecommended: string;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
}
