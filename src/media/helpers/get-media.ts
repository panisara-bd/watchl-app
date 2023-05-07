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
    console.error(`Error searching: ${response.status}`);
    return [];
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
