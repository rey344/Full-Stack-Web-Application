import pool from '../config/database';
import { User } from '../types';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

export const userService = {
  // Create a new user
  async createUser(email: string, password: string, name: string): Promise<User> {
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
    
    const query = `
      INSERT INTO users (email, password_hash, name)
      VALUES ($1, $2, $3)
      RETURNING id, email, name, created_at, updated_at
    `;
    
    const result = await pool.query(query, [email, password_hash, name]);
    return result.rows[0];
  },

  // Get user by ID
  async getUserById(id: number): Promise<User | null> {
    const query = `
      SELECT id, email, name, created_at, updated_at
      FROM users
      WHERE id = $1
    `;
    
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  },

  // Get all users with pagination
  async getAllUsers(page = 1, limit = 10): Promise<{ users: User[]; total: number }> {
    const offset = (page - 1) * limit;
    
    const countQuery = 'SELECT COUNT(*) FROM users';
    const countResult = await pool.query(countQuery);
    const total = parseInt(countResult.rows[0].count);
    
    const query = `
      SELECT id, email, name, created_at, updated_at
      FROM users
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;
    
    const result = await pool.query(query, [limit, offset]);
    return { users: result.rows, total };
  },

  // Update user
  async updateUser(id: number, updates: Partial<User>): Promise<User | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (updates.email) {
      fields.push(`email = $${paramCount}`);
      values.push(updates.email);
      paramCount++;
    }

    if (updates.name) {
      fields.push(`name = $${paramCount}`);
      values.push(updates.name);
      paramCount++;
    }

    if (fields.length === 0) {
      return this.getUserById(id);
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const query = `
      UPDATE users
      SET ${fields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING id, email, name, created_at, updated_at
    `;

    const result = await pool.query(query, values);
    return result.rows[0] || null;
  },

  // Delete user
  async deleteUser(id: number): Promise<boolean> {
    const query = 'DELETE FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rowCount ? result.rowCount > 0 : false;
  },

  // Check if email exists
  async emailExists(email: string): Promise<boolean> {
    const query = 'SELECT id FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows.length > 0;
  },
};
