import axios from 'axios';

const googleapi = axios.create({
  baseURL: 'https://customsearch.googleapis.com',
});

const keys = {
  key: 'AIzaSyBNrM8GWX8E0uh_6EM-n-jNXC-hC-EOWBQ',
  cx: '016267091777712849384:qntkpb0sd_o',
  term: 'tuberculose',
  sort: 'date'
}

export default googleapi;

export function getNews(startIndex: number = 1) {
  return googleapi.get(`/customsearch/v1?key=${keys.key}&cx=${keys.cx}&q=${keys.term}&sort=${keys.sort}&startIndex=${startIndex}`);
}