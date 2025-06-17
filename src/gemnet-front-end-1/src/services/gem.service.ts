import axios from 'axios';
import { Gem } from '../interfaces/gem.interface';

const API_URL = 'http://your-api-url.com/api/gems';

export const getGems = async (): Promise<Gem[]> => {
  const response = await axios.get<Gem[]>(API_URL);
  return response.data;
};

export const getGemById = async (id: string): Promise<Gem> => {
  const response = await axios.get<Gem>(`${API_URL}/${id}`);
  return response.data;
};

export const createGem = async (gem: Gem): Promise<Gem> => {
  const response = await axios.post<Gem>(API_URL, gem);
  return response.data;
};

export const updateGem = async (id: string, gem: Gem): Promise<Gem> => {
  const response = await axios.put<Gem>(`${API_URL}/${id}`, gem);
  return response.data;
};

export const deleteGem = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};