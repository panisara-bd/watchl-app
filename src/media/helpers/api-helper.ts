export const headers = (token: string) => ({
    Authorization: `Bearer ${token}`,
  });
  
export const url = (route: string) =>
    `https://45277kz8ok.execute-api.eu-west-1.amazonaws.com/live/${route}`;
  