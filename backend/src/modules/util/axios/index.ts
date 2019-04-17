import axios from 'axios';

export const GetAPIData = async (url: string): Promise<any> => {
  const response = await axios.get(url);
  return response.data;
};
