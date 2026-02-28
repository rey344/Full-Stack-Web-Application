import React from 'react';
import '../styles/Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Full-Stack Application</h1>
        <nav className="header-nav">
          <a href="/">Home</a>
          <a href="/users">Users</a>
          <a href="/projects">Projects</a>
          <a href="/tasks">Tasks</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
