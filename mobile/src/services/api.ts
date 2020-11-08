import axios from 'axios';
import { User } from '../models/user';
import LoginResponse from './../interfaces/login-response.interface';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;

export function login(email: string, senha: string): Promise<LoginResponse> {
  return new Promise<LoginResponse>(resolve => {
      setTimeout(() => {
          resolve({
                  user: {
                    name: 'Yuri',
                    nasc: new Date(),
                    gender: 2,
                    treatmentStart: new Date("11/01/2020"),
                    treatmentDuration: 10,
                    email: "",
                    role: 1,
                    canSendNews: true,
                    canNotify: true,
                    password: "123",
                    picture: null
                  }
              });
      }, 2000);
  }); 
    //api.post('/login', { email, senha });
}

export function register(user: User) {
    return api.post('/sessions', user);
}