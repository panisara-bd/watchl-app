import { headers, url } from './api-helper';

export const deleteScheduledMedia = async (token: string, time: string) => {
  const options = {
    method: 'DELETE',
    headers: headers(token),
  };

  const response = await fetch(url(`schedule/${time}`), options);

  if (response.ok) {
    return true;
  } else {
    throw new Error(`Unable to delete scheduled media, got ${response.status}`);
  }
};
