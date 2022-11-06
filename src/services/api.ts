import axios from 'axios';

export const api = axios.create({
  // o iOS consegue acessar localhost, mas o Android não
  // uma solução é usar o IP da máquina
  baseURL: 'http://192.168.1.10:3333',
});
