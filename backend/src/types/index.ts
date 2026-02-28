export interface User {
  id?: number;
  email: string;
  password_hash?: string;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Project {
  id?: number;
  user_id: number;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'archived';
  created_at?: Date;
  updated_at?: Date;
}

export interface Task {
  id?: number;
  project_id: number;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  due_date?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
