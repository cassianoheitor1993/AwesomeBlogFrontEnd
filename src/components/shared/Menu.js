import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Navbar = styled.nav`
  width: 100%;
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
  }
`;

const NavTitle = styled.h1`
  font-size: 1.5em;
  color: white;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.2em;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 0px;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    display: none;
    flex-direction: column;
    width: 100%;
    background-color: #222;
    padding: 10px;
    position: absolute;
    top: 53px;
    left: 0;
    z-index: 10;

    &.open {
      display: block;
    }

    li {
      margin: 5px 0;
    }

    a {
      padding: 5px;
    }

    a:hover {
      background-color: #444;
      width: 100%;
      border-radius: 5px;
      margin: 0;
    }
  }
`;

const NavItem = styled.li`
  width: 100%;

  a {
    display: block;
    width: 100%;
    color: white;
    text-decoration: none;
    font-weight: 500;
    padding: 10px 20px;
    border-radius: 5px;
    margin: 0;

    &.active {
      background-color: #555;
      color: #ddd;
    }

    &:hover {
      background-color: #444;
      color: #ddd;
    }
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  color: white;
  font-size: 1.8em;
  border: none;
  cursor: pointer;
  z-index: 20;

  @media (max-width: 768px) {
    display: block;
    flex: 1;
    text-align: right;
    align-self: flex-end;
    align-items: center;
    align-content: center;
    top: 0;
  }
`;

const NavHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Navbar>
      <NavHeader>
        <NavTitle
          style={{
            fontSize: '1.5em',
            color: 'white',
            margin: 0,
          }}
        >
          <NavLink to="/" style={{ color: 'white', textDecoration: 'none' }}>
            Amazing Blog
          </NavLink>
        </NavTitle>
        <MenuButton onClick={toggleMenu}>
          <i className={`bi bi-${isOpen ? 'x' : 'list'}`}></i>
        </MenuButton>
      </NavHeader>
      <NavLinks className={isOpen ? 'open' : ''}>
        <NavItem>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
            About
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
            Contact
          </NavLink>
        </NavItem>
      </NavLinks>
    </Navbar>
  );
};

export default Menu;
