import { headers, url } from './api-helper';

export const searchMedia = async (token: string, query: string) => {
  const options = {
    method: 'GET',
    headers: headers(token),
  };

  const response = await fetch(
    url(`media/search?query=${encodeURIComponent(query)}`),
    options
  );

  if (response.ok) {
    return response.json();
  } else {
    const errorText = await response.text();
    console.error(`Search API error ${response.status}:`, errorText);
    throw new Error(`API Error ${response.status}: ${errorText}`);
  }
};

export const getMediaById = async (token: string, mediaId: string) => {
  const options = {
    method: 'GET',
    headers: headers(token),
  };
  const response = await fetch(url(`media/${mediaId}`), options);

  if (response.ok) {
    return response.json();
  } else {
    return {};
  }
};
