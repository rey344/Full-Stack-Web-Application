import pool from '../config/database';
import { Project } from '../types';

export const projectService = {
  // Create a new project
  async createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> {
    const query = `
      INSERT INTO projects (user_id, title, description, status)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    
    const result = await pool.query(query, [
      project.user_id,
      project.title,
      project.description,
      project.status || 'active',
    ]);
    
    return result.rows[0];
  },

  // Get project by ID
  async getProjectById(id: number): Promise<Project | null> {
    const query = 'SELECT * FROM projects WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  },

  // Get all projects with filters and pagination
  async getAllProjects(
    filters: { user_id?: number; status?: string } = {},
    page = 1,
    limit = 10
  ): Promise<{ projects: Project[]; total: number }> {
    const offset = (page - 1) * limit;
    const conditions: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (filters.user_id) {
      conditions.push(`user_id = $${paramCount}`);
      values.push(filters.user_id);
      paramCount++;
    }

    if (filters.status) {
      conditions.push(`status = $${paramCount}`);
      values.push(filters.status);
      paramCount++;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Get total count
    const countQuery = `SELECT COUNT(*) FROM projects ${whereClause}`;
    const countResult = await pool.query(countQuery, values);
    const total = parseInt(countResult.rows[0].count);

    // Get projects
    values.push(limit, offset);
    const query = `
      SELECT * FROM projects
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;

    const result = await pool.query(query, values);
    return { projects: result.rows, total };
  },

  // Update project
  async updateProject(id: number, updates: Partial<Project>): Promise<Project | null> {
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

    if (fields.length === 0) {
      return this.getProjectById(id);
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const query = `
      UPDATE projects
      SET ${fields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await pool.query(query, values);
    return result.rows[0] || null;
  },

  // Delete project
  async deleteProject(id: number): Promise<boolean> {
    const query = 'DELETE FROM projects WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rowCount ? result.rowCount > 0 : false;
  },

  // Get projects by user
  async getProjectsByUser(userId: number): Promise<Project[]> {
    const query = `
      SELECT * FROM projects
      WHERE user_id = $1
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  },
};
