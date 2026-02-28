import React from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import UserList from './components/users/UserList';
import ProjectList from './components/projects/ProjectList';
import TaskList from './components/tasks/TaskList';
import './App.css';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'users' | 'projects' | 'tasks'>('projects');

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="container">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              Users
            </button>
            <button
              className={`tab ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              Projects
            </button>
            <button
              className={`tab ${activeTab === 'tasks' ? 'active' : ''}`}
              onClick={() => setActiveTab('tasks')}
            >
              Tasks
            </button>
          </div>
          <div className="tab-content">
            {activeTab === 'users' && <UserList />}
            {activeTab === 'projects' && <ProjectList />}
            {activeTab === 'tasks' && <TaskList />}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
