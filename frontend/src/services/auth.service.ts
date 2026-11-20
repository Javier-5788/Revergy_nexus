import { api } from './api';

import type {
  LoginRequest,
  LoginResponse,
} from '../types/auth.types';

export const authService = {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>('/auth/login', payload);
    return data;
  },
};

export const login = async (

  credentials: LoginRequest,

) => {

  const response =
    await api.post<LoginResponse>(

      '/auth/login',

      credentials,

    );

  return response.data;

};