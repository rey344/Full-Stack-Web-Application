import axios, { AxiosInstance, AxiosError } from 'axios';
import {
  User,
  Project,
  Task,
  ApiResponse,
  PaginatedResponse,
  CreateUserData,
  UpdateUserData,
  CreateProjectData,
  UpdateProjectData,
  CreateTaskData,
  UpdateTaskData,
} from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          console.error('API Error:', error.response.data);
        } else if (error.request) {
          console.error('Network Error:', error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  // User API calls
  async getUsers(page = 1, limit = 10): Promise<PaginatedResponse<User>> {
    const response = await this.client.get<ApiResponse<PaginatedResponse<User>>>(
      `/users?page=${page}&limit=${limit}`
    );
    return response.data.data!;
  }

  async getUserById(id: number): Promise<User> {
    const response = await this.client.get<ApiResponse<User>>(`/users/${id}`);
    return response.data.data!;
  }

  async createUser(data: CreateUserData): Promise<User> {
    const response = await this.client.post<ApiResponse<User>>('/users', data);
    return response.data.data!;
  }

  async updateUser(id: number, data: UpdateUserData): Promise<User> {
    const response = await this.client.put<ApiResponse<User>>(`/users/${id}`, data);
    return response.data.data!;
  }

  async deleteUser(id: number): Promise<void> {
    await this.client.delete(`/users/${id}`);
  }

  // Project API calls
  async getProjects(
    page = 1,
    limit = 10,
    filters?: { user_id?: number; status?: string }
  ): Promise<PaginatedResponse<Project>> {
    let url = `/projects?page=${page}&limit=${limit}`;
    if (filters?.user_id) url += `&user_id=${filters.user_id}`;
    if (filters?.status) url += `&status=${filters.status}`;

    const response = await this.client.get<ApiResponse<PaginatedResponse<Project>>>(url);
    return response.data.data!;
  }

  async getProjectById(id: number): Promise<Project> {
    const response = await this.client.get<ApiResponse<Project>>(`/projects/${id}`);
    return response.data.data!;
  }

  async createProject(data: CreateProjectData): Promise<Project> {
    const response = await this.client.post<ApiResponse<Project>>('/projects', data);
    return response.data.data!;
  }

  async updateProject(id: number, data: UpdateProjectData): Promise<Project> {
    const response = await this.client.put<ApiResponse<Project>>(`/projects/${id}`, data);
    return response.data.data!;
  }

  async deleteProject(id: number): Promise<void> {
    await this.client.delete(`/projects/${id}`);
  }

  // Task API calls
  async getTasks(
    page = 1,
    limit = 10,
    filters?: { project_id?: number; status?: string; priority?: string }
  ): Promise<PaginatedResponse<Task>> {
    let url = `/tasks?page=${page}&limit=${limit}`;
    if (filters?.project_id) url += `&project_id=${filters.project_id}`;
    if (filters?.status) url += `&status=${filters.status}`;
    if (filters?.priority) url += `&priority=${filters.priority}`;

    const response = await this.client.get<ApiResponse<PaginatedResponse<Task>>>(url);
    return response.data.data!;
  }

  async getTaskById(id: number): Promise<Task> {
    const response = await this.client.get<ApiResponse<Task>>(`/tasks/${id}`);
    return response.data.data!;
  }

  async createTask(data: CreateTaskData): Promise<Task> {
    const response = await this.client.post<ApiResponse<Task>>('/tasks', data);
    return response.data.data!;
  }

  async updateTask(id: number, data: UpdateTaskData): Promise<Task> {
    const response = await this.client.put<ApiResponse<Task>>(`/tasks/${id}`, data);
    return response.data.data!;
  }

  async deleteTask(id: number): Promise<void> {
    await this.client.delete(`/tasks/${id}`);
  }
}

export default new ApiService();
