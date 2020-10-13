import axios from 'axios';

const googleapi = axios.create({
  baseURL: 'https://customsearch.googleapis.com',
});

const keys = {
  key: 'AIzaSyBNrM8GWX8E0uh_6EM-n-jNXC-hC-EOWBQ',
  cx: '016267091777712849384:qntkpb0sd_o'
}

export default googleapi;

export function getNews(searchTerm: string) {
  return googleapi.get('/customsearch/v1?key=AIzaSyBNrM8GWX8E0uh_6EM-n-jNXC-hC-EOWBQ&cx=016267091777712849384:qntkpb0sd_o&q=tuberculose');
}