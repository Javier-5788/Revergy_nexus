export interface LoginRequest {
  correo_usuario: string;
  password: string;
}

export interface AuthUser {
  id_usuario: number;
  correo_usuario: string;
  nombre_usuario?: string;
  rol?: string;
}

export interface LoginResponse {
  mensaje: string;
  access_token: string;
  usuario: AuthUser;
}