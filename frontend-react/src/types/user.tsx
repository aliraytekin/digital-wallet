export interface User {
  id: number,
  email: string;
  password: string;
}

export interface AuthUser {
  token: string;
  createdAt: number;
}

export interface UserRegisterInput {
  email: string;
  password: string;
  password_confirmation: string;
}

export interface UserLoginInput {
  email: string,
  password: string
}
