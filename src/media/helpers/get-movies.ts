const headers = {
  'X-RapidAPI-Key': '508255ca30mshe81876e95f737e3p1fa130jsn78d6101ea2c8',
  'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
}
export const fetchMedia = async (query: string) => {
  const options = {
    method: 'GET', headers
  };
  const url = `https://imdb8.p.rapidapi.com/title/auto-complete?q=${encodeURI(query)}`;
  const response = await fetch(url, options);

  if (response.ok) {    
    return response.json();
  } else {
    return {};
  }
};

export const fetchById = async (id: string) => {
  const options = {
    method: 'GET', headers
  };
  const url = `https://imdb8.p.rapidapi.com/title/get-details?tconst=${id}`;
  const response = await fetch(url, options);

  if (response.ok) {    
    return response.json();
  } else {
    return {};
  }
}

