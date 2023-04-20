export const fetchMedia = async (query: string) => {
  const url = `https://imdb8.p.rapidapi.com/title/find?q=${encodeURI(query)}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '508255ca30mshe81876e95f737e3p1fa130jsn78d6101ea2c8',
      'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
    },
  };
  const response = await fetch(url, options);

  if (response.ok) {    
    return response.json();
  } else {
    return {};
  }
};

