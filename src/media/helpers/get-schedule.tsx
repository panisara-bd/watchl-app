import { headers, url } from './api-helper';

export const getAllSchedule = async (token: string) => {
  const options = {
    method: 'GET',
    headers: headers(token),
  };
  const response = await fetch(url('schedule'), options);
  
  if (response.ok) {
    return response.json();
  } else {
    return;
  }
};
export const getScheduledMedia = async (token: string, time: string) => {
  const options = {
    method: 'GET',
    headers: headers(token),
  };
  const response = await fetch(url(`schedule/${time}`), options);

  if (response.ok) {
    return response.json();
  } else {
    return {};
  }
};
