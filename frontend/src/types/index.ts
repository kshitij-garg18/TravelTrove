// User Types
export interface User {
  _id: string;
  email: string;
  role?: 'user' | 'admin';
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegisterData {
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// Destination Guide Types
export interface DestinationGuide {
  _id: string;
  title: string;
  summary: string;
  photos: string[];
  description?: string;
  location?: string;
  lodging?: LodgingInfo[];
  dining?: DiningInfo[];
  reviews?: Review[];
  ratings?: {
    average: number;
    count: number;
  };
}

export interface LodgingInfo {
  name: string;
  type: string;
  description: string;
  priceRange?: string;
  address?: string;
}

export interface DiningInfo {
  name: string;
  cuisine: string;
  description: string;
  priceRange?: string;
  address?: string;
}

export interface Review {
  _id: string;
  userId: {
    _id: string;
    email: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

export interface SearchParams {
  query?: string;
  location?: string;
  sortBy?: 'relevance' | 'rating' | 'reviews';
}

// Trip Itinerary Types
export interface TripItinerary {
  _id: string;
  destination: string;
  duration: number;
  activities: Activity[];
  lodging: LodgingInfo[];
  dining: DiningInfo[];
  userId?: {
    _id: string;
    email: string;
  };
  reviews?: Review[];
  ratings?: {
    average: number;
    count: number;
  };
  createdAt?: string;
}

export interface Activity {
  name: string;
  description: string;
  date?: string;
  time?: string;
}

export interface CreateItineraryData {
  destination: string;
  duration: number;
  activities: Activity[];
  lodging: LodgingInfo[];
  dining: DiningInfo[];
}

// Favourites Types
export interface Favourite {
  _id: string;
  userId: string;
  destinationGuideId?: string;
  tripItineraryId?: string;
  destinationGuide?: DestinationGuide;
  tripItinerary?: TripItinerary;
  createdAt: string;
}

// Travel Group Types
export interface TravelGroup {
  _id: string;
  name: string;
  description: string;
  creatorId: string;
  members: string[];
  destination?: string;
  tripItineraryId?: string;
  createdAt: string;
}

export interface CreateGroupData {
  name: string;
  description: string;
  destination?: string;
  tripItineraryId?: string;
}
