import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2026 Full-Stack Application. Built with TypeScript, PostgreSQL, and Docker.</p>
      </div>
    </footer>
  );
};

export default Footer;
