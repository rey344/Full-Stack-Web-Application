import React, { useEffect, useState } from 'react';
import apiService from '../../services/api';
import { Project } from '../../types';
import Button from '../common/Button';
import '../styles/ProjectList.css';

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('');

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const filters = statusFilter ? { status: statusFilter } : undefined;
      const response = await apiService.getProjects(page, 10, filters);
      setProjects(response.data);
      setTotalPages(response.pagination.totalPages);
      setError(null);
    } catch (err) {
      setError('Failed to fetch projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [page, statusFilter]);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await apiService.deleteProject(id);
        fetchProjects();
      } catch (err) {
        alert('Failed to delete project');
      }
    }
  };

  const getStatusBadge = (status: string) => {
    const statusClass = `status-badge status-${status}`;
    return <span className={statusClass}>{status}</span>;
  };

  if (loading) return <div className="loading">Loading projects...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="project-list">
      <div className="list-header">
        <h2>Projects</h2>
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
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <h3>{project.title}</h3>
              {getStatusBadge(project.status)}
            </div>
            <p className="project-description">{project.description}</p>
            <div className="project-meta">
              <small>Created: {new Date(project.created_at).toLocaleDateString()}</small>
            </div>
            <div className="project-actions">
              <Button variant="danger" onClick={() => handleDelete(project.id)}>
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

export default ProjectList;
