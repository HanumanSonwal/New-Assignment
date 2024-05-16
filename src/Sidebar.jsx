// Sidebar.js
import React from 'react';
import { Nav } from 'react-bootstrap';
// import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Nav defaultActiveKey="/" className="flex-column">
        <Nav.Link href="/" className="sidebar-link">
          <span className="sidebar-link-icon">
            <i className="fas fa-home"></i>
          </span>
          <span className="sidebar-link-text">Home</span>
        </Nav.Link>
        <Nav.Link href="/about" className="sidebar-link">
          <span className="sidebar-link-icon">
            <i className="fas fa-info-circle"></i>
          </span>
          <span className="sidebar-link-text">About</span>
        </Nav.Link>
        <Nav.Link href="/contact" className="sidebar-link">
          <span className="sidebar-link-icon">
            <i className="fas fa-envelope"></i>
          </span>
          <span className="sidebar-link-text">Contact</span>
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;