import { headers, url } from './api-helper';

type Data = {
  mediaId: string
  time: string;
  location: string;
  details: string;
  invites: string[];
}

export const scheduleMedia =async (token: string, data: Data) => {
    const options = {
      method: 'POST',
      headers: headers(token),
      body: JSON.stringify(data)
    };
    const response = await fetch(
      url(`schedule`),
      options
    );

    if (response.ok) {
      return response.json();
    } else {
      return {};
    }
  }