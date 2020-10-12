import axios from 'axios';
import { User } from '../models/user';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;

export function login(email: string, senha: string) {
  return new Promise<any>(resolve => {
      setTimeout(() => {
          resolve({
                  email: "email",
                  senha: "senha"
              });
      }, 2000);
  }); 
    //api.post('/login', { email, senha });
}

export function register(user: User) {
    return api.post('/sessions', user);
}