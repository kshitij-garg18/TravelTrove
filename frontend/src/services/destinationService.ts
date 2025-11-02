import apiClient from './apiClient';
import { DestinationGuide, SearchParams } from '../types';

export const searchDestinations = async (params: SearchParams = {}): Promise<DestinationGuide[]> => {
  const response = await apiClient.get<{ destinationGuides: DestinationGuide[] }>('/destination-guides/search', {
    params,
  });
  return response.data.destinationGuides;
};

export const getDestinationById = async (id: string): Promise<DestinationGuide> => {
  const response = await apiClient.get<DestinationGuide>(`/destination-guides/${id}`);
  return response.data;
};
