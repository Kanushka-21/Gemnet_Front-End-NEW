import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import './Header.css'; // Assuming you have a CSS file for styling

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  return (
    <AntHeader className="header">
      <div className="logo">
        <Link to="/">GemNet</Link>
      </div>
      <nav className="nav">
        <Link to="/marketplace">Marketplace</Link>
        <Link to="/admin">Admin Dashboard</Link>
        <Link to="/buyer">Buyer Dashboard</Link>
        <Link to="/seller">Seller Dashboard</Link>
      </nav>
    </AntHeader>
  );
};

export default Header;