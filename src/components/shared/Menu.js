import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Menu.css';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const savedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    setNotifications(savedNotifications);
  
    const ws = new WebSocket('ws://localhost:8081/ws/notifications/');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNotifications((prev) => {
        const updated = [...prev, data];
        localStorage.setItem('notifications', JSON.stringify(updated));
        return updated;
      });
    };
    
    ws.onclose = () => console.log('WebSocket connection closed');
    return () => ws.close();
  }, []);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const dismissNotification = (index) => {
    // remove the notification with the given index from the local storage
    const savedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    localStorage.setItem('notifications', JSON.stringify(savedNotifications.filter((_, i) => i !== index)));
    setNotifications(notifications.filter((_, i) => i !== index));
  };

  return (
    <nav className="navbar">
      <div className="nav-header">
        <h1 className="nav-title">
          <NavLink to="/" style={{ color: 'white', textDecoration: 'none' }}>
            Amazing Blog
          </NavLink>
        </h1>
        <button className="menu-button" onClick={toggleMenu}>
          <i className={`bi bi-${isOpen ? 'x' : 'list'}`}></i>
        </button>
        <div className="nav-links-container">
          <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
              Contact
            </NavLink>
          </li>
          </ul>
          <div className="notification-icon" onClick={toggleDropdown}>
            {showDropdown ? (
              <i className="bi bi-bell-fill"></i>
            ) : (
              <i className="bi bi-bell"></i>
            )}
            {notifications.length > 0 && (
              <span className="notification-count">{notifications.length}</span>
            )}
            {showDropdown && (
              <div className="notification-dropdown">
                <ul>
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <li key={index} className="notification-item">
                        <div className="notification-content">
                          <div className='card'>
                            <div className='card-body'>
                              <a href={notification.article_link} target='_blank' rel='noreferrer'>
                                <h6 className='card-title d-flex justify-content-between'>
                                  <span className='badge bg-primary'>
                                    <i class="bi bi-patch-exclamation-fill text-white"></i> New Article: </span><br></br>
                                </h6>
                                <h3 className='card-title fw-bold'>{notification.article_name}</h3>
                                <p className='card-subtitle mb-2 text-muted'>by {notification.article_author} | {notification.article_date}</p>
                                <p className='card-text'>{notification.article_summary}</p>
                              </a>
                              <button className='btn btn-danger' onClick={() => dismissNotification(index)}>Dismiss</button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li>There are no notifications for you</li>
                  )}
                </ul>
              </div>
            )}
        
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
