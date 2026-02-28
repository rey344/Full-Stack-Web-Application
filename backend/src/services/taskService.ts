import pool from '../config/database';
import { Task } from '../types';

export const taskService = {
  // Create a new task
  async createTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Promise<Task> {
    const query = `
      INSERT INTO tasks (project_id, title, description, status, priority, due_date)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    
    const result = await pool.query(query, [
      task.project_id,
      task.title,
      task.description,
      task.status || 'todo',
      task.priority || 'medium',
      task.due_date || null,
    ]);
    
    return result.rows[0];
  },

  // Get task by ID
  async getTaskById(id: number): Promise<Task | null> {
    const query = 'SELECT * FROM tasks WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  },

  // Get all tasks with filters and pagination
  async getAllTasks(
    filters: { project_id?: number; status?: string; priority?: string } = {},
    page = 1,
    limit = 10
  ): Promise<{ tasks: Task[]; total: number }> {
    const offset = (page - 1) * limit;
    const conditions: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (filters.project_id) {
      conditions.push(`project_id = $${paramCount}`);
      values.push(filters.project_id);
      paramCount++;
    }

    if (filters.status) {
      conditions.push(`status = $${paramCount}`);
      values.push(filters.status);
      paramCount++;
    }

    if (filters.priority) {
      conditions.push(`priority = $${paramCount}`);
      values.push(filters.priority);
      paramCount++;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Get total count
    const countQuery = `SELECT COUNT(*) FROM tasks ${whereClause}`;
    const countResult = await pool.query(countQuery, values);
    const total = parseInt(countResult.rows[0].count);

    // Get tasks
    values.push(limit, offset);
    const query = `
      SELECT * FROM tasks
      ${whereClause}
      ORDER BY 
        CASE priority 
          WHEN 'high' THEN 1 
          WHEN 'medium' THEN 2 
          WHEN 'low' THEN 3 
        END,
        due_date ASC NULLS LAST,
        created_at DESC
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;

    const result = await pool.query(query, values);
    return { tasks: result.rows, total };
  },

  // Update task
  async updateTask(id: number, updates: Partial<Task>): Promise<Task | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (updates.title) {
      fields.push(`title = $${paramCount}`);
      values.push(updates.title);
      paramCount++;
    }

    if (updates.description !== undefined) {
      fields.push(`description = $${paramCount}`);
      values.push(updates.description);
      paramCount++;
    }

    if (updates.status) {
      fields.push(`status = $${paramCount}`);
      values.push(updates.status);
      paramCount++;
    }

    if (updates.priority) {
      fields.push(`priority = $${paramCount}`);
      values.push(updates.priority);
      paramCount++;
    }

    if (updates.due_date !== undefined) {
      fields.push(`due_date = $${paramCount}`);
      values.push(updates.due_date);
      paramCount++;
    }

    if (fields.length === 0) {
      return this.getTaskById(id);
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const query = `
      UPDATE tasks
      SET ${fields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await pool.query(query, values);
    return result.rows[0] || null;
  },

  // Delete task
  async deleteTask(id: number): Promise<boolean> {
    const query = 'DELETE FROM tasks WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rowCount ? result.rowCount > 0 : false;
  },

  // Get tasks by project
  async getTasksByProject(projectId: number): Promise<Task[]> {
    const query = `
      SELECT * FROM tasks
      WHERE project_id = $1
      ORDER BY 
        CASE priority 
          WHEN 'high' THEN 1 
          WHEN 'medium' THEN 2 
          WHEN 'low' THEN 3 
        END,
        due_date ASC NULLS LAST
    `;
    const result = await pool.query(query, [projectId]);
    return result.rows;
  },
};
