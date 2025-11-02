import apiClient from './apiClient';
import { TripItinerary, CreateItineraryData } from '../types';

export const createItinerary = async (data: CreateItineraryData): Promise<TripItinerary> => {
  const response = await apiClient.post<TripItinerary>('/trip-itineraries', data);
  return response.data;
};

export const getItineraryById = async (id: string): Promise<TripItinerary> => {
  const response = await apiClient.get<TripItinerary>(`/trip-itineraries/${id}`);
  return response.data;
};

export const getAllItineraries = async (): Promise<TripItinerary[]> => {
  const response = await apiClient.get<TripItinerary[] | { itineraries: TripItinerary[] }>('/trip-itineraries');
  // Backend returns array directly or wrapped
  if (Array.isArray(response.data)) {
    return response.data;
  }
  return (response.data as any).itineraries || [];
};

export const deleteItinerary = async (id: string): Promise<void> => {
  await apiClient.delete(`/trip-itineraries/${id}`);
};
