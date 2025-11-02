import apiClient from './apiClient';
import { Favourite } from '../types';

export const addFavourite = async (destinationGuideId?: string, tripItineraryId?: string): Promise<Favourite> => {
  const response = await apiClient.post<Favourite>('/favourites', {
    destinationGuideId,
    tripItineraryId,
  });
  return response.data;
};

export const deleteFavourite = async (id: string): Promise<void> => {
  await apiClient.delete(`/favourites/${id}`);
};

export const getFavourites = async (): Promise<Favourite[]> => {
  const response = await apiClient.get<Favourite[] | { favourites: Favourite[] }>('/favourites');
  // Backend returns array directly, not wrapped
  if (Array.isArray(response.data)) {
    return response.data;
  }
  // Fallback for wrapped response
  return (response.data as any).favourites || [];
};
