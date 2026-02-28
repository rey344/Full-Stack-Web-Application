import React, { useEffect, useState } from 'react';
import apiService from '../../services/api';
import { Task } from '../../types';
import Button from '../common/Button';
import '../styles/TaskList.css';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('');

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const filters: any = {};
      if (statusFilter) filters.status = statusFilter;
      if (priorityFilter) filters.priority = priorityFilter;
      
      const response = await apiService.getTasks(page, 10, filters);
      setTasks(response.data);
      setTotalPages(response.pagination.totalPages);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page, statusFilter, priorityFilter]);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await apiService.deleteTask(id);
        fetchTasks();
      } catch (err) {
        alert('Failed to delete task');
      }
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await apiService.updateTask(id, { status: newStatus as any });
      fetchTasks();
    } catch (err) {
      alert('Failed to update task status');
    }
  };

  const getPriorityBadge = (priority: string) => {
    return <span className={`priority-badge priority-${priority}`}>{priority}</span>;
  };

  const getStatusBadge = (status: string) => {
    return <span className={`status-badge status-${status}`}>{status.replace('_', ' ')}</span>;
  };

  if (loading) return <div className="loading">Loading tasks...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="task-list">
      <div className="list-header">
        <h2>Tasks</h2>
        <div className="filters">
          <div className="filter-group">
            <label>Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All</option>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Priority:</label>
            <select
              value={priorityFilter}
              onChange={(e) => {
                setPriorityFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </div>
      <div className="tasks-grid">
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
            <div className="task-header">
              <h3>{task.title}</h3>
              <div className="badges">
                {getPriorityBadge(task.priority)}
                {getStatusBadge(task.status)}
              </div>
            </div>
            <p className="task-description">{task.description}</p>
            {task.due_date && (
              <div className="task-due-date">
                Due: {new Date(task.due_date).toLocaleDateString()}
              </div>
            )}
            <div className="task-actions">
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task.id, e.target.value)}
                className="status-select"
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
              <Button variant="danger" onClick={() => handleDelete(task.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <Button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TaskList;
