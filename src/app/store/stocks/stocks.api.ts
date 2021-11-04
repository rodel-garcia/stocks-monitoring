import { API_URL, Stock } from '../../app.definition';

export const getStocks = async (): Promise<Stock[]> => {
  return fetch(API_URL).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};
