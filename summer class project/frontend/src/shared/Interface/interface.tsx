export interface Experience {
  _id?: string;
  title: string;
  company: string;
  period: string; // e.g. "2023 – Present"
}

export interface User {
  _id: string;
  username: string;
  email: string;
  about?: string;
  category: string;
  subcategory?: string; // Added this field based on your original API
  profileCompleted: boolean;
  skills?: string[];
  experiences?: Experience[];
  // Additional fields that might be useful
  createdAt?: string;
  updatedAt?: string;
}

export interface ILoginForm {
  username: string;
  password: string;
}

export interface IRegisterForm {
  username: string;
  email: string;
  password: string;
}

// Response interfaces for API calls
export interface LoginResponse {
  token: string;
  user: User;
  profileCompleted: boolean;
}

export interface RegisterResponse {
  token: string;
  user: User;
  profileCompleted: boolean;
}

export interface UserListResponse {
  users: User[];
  total?: number;
  page?: number;
  limit?: number;
}